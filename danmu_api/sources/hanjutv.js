import BaseSource from './base.js';
import { globals } from '../configs/globals.js';
import { log } from "../utils/log-util.js";
import { httpGet } from "../utils/http-util.js";
import { convertToAsciiSum } from "../utils/codec-util.js";
import { generateValidStartDate } from "../utils/time-util.js";
import { addAnime, removeEarliestAnime } from "../utils/cache-util.js";
import { titleMatches, strictTitleMatch, normalizeSpaces } from "../utils/common-util.js";

// =====================
// 获取韩剧TV弹幕
// =====================
export default class HanjutvSource extends BaseSource {
  async search(keyword) {
    try {
      const resp = await httpGet(`https://hxqapi.hiyun.tv/wapi/search/aggregate/search?keyword=${keyword}&scope=101&page=1`, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      // 判断 resp 和 resp.data 是否存在
      if (!resp || !resp.data) {
        log("info", "hanjutvSearchresp: 请求失败或无数据返回");
        return [];
      }

      // 判断 seriesData 是否存在
      if (!resp.data.seriesData || !resp.data.seriesData.seriesList) {
        log("info", "hanjutvSearchresp: seriesData 或 seriesList 不存在");
        return [];
      }

      // 正常情况下输出 JSON 字符串
      log("info", `hanjutvSearchresp: ${JSON.stringify(resp.data.seriesData.seriesList)}`);

      let resList = [];
      for (const anime of resp.data.seriesData.seriesList) {
        const animeId = convertToAsciiSum(anime.sid);
        resList.push({...anime, animeId});
      }
      return resList;
    } catch (error) {
      // 捕获请求中的错误
      log("error", "getHanjutvAnimes error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      return [];
    }
  }

  async getDetail(id) {
    try {
      const resp = await httpGet(`https://hxqapi.hiyun.tv/wapi/series/series/detail?sid=${id}`, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      // 判断 resp 和 resp.data 是否存在
      if (!resp || !resp.data) {
        log("info", "getHanjutvDetail: 请求失败或无数据返回");
        return [];
      }

      // 判断 seriesData 是否存在
      if (!resp.data.series) {
        log("info", "getHanjutvDetail: series 不存在");
        return [];
      }

      // 正常情况下输出 JSON 字符串
      log("info", `getHanjutvDetail: ${JSON.stringify(resp.data.series)}`);

      return resp.data.series;
    } catch (error) {
      // 捕获请求中的错误
      log("error", "getHanjutvDetail error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      return [];
    }
  }

  async getEpisodes(id) {
    try {
      const resp = await httpGet(`https://hxqapi.hiyun.tv/wapi/series/series/detail?sid=${id}`, {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });

      // 判断 resp 和 resp.data 是否存在
      if (!resp || !resp.data) {
        log("info", "getHanjutvEposides: 请求失败或无数据返回");
        return [];
      }

      // 判断 seriesData 是否存在
      if (!resp.data.episodes) {
        log("info", "getHanjutvEposides: episodes 不存在");
        return [];
      }

      const sortedEpisodes = resp.data.episodes.sort((a, b) => a.serialNo - b.serialNo);

      // 正常情况下输出 JSON 字符串
      log("info", `getHanjutvEposides: ${JSON.stringify(sortedEpisodes)}`);

      return sortedEpisodes;
    } catch (error) {
      // 捕获请求中的错误
      log("error", "getHanjutvEposides error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      return [];
    }
  }

  async handleAnimes(sourceAnimes, queryTitle, curAnimes) {
    const cateMap = {1: "韩剧", 2: "综艺", 3: "电影", 4: "日剧", 5: "美剧", 6: "泰剧", 7: "国产剧"}

    function getCategory(key) {
      return cateMap[key] || "其他";
    }

    const tmpAnimes = [];

    // 添加错误处理，确保sourceAnimes是数组
    if (!sourceAnimes || !Array.isArray(sourceAnimes)) {
      log("error", "[Hanjutv] sourceAnimes is not a valid array");
      return [];
    }

    // 使用 map 和 async 时需要返回 Promise 数组，并等待所有 Promise 完成
    // 对于韩剧TV，完全信任其搜索API，不做标题过滤（因为韩剧TV可能使用不同译名）
    // 但在结果中标记匹配类型用于排序：严格匹配的排前面
    const processHanjutvAnimes = await Promise.all(sourceAnimes
      .map(async (anime) => {
        // 计算匹配类型用于排序：严格匹配 > 宽松匹配 > API返回
        const normalizedAnimeName = normalizeSpaces(anime.name);
        const normalizedQueryTitle = normalizeSpaces(queryTitle);
        
        let matchType = 1; // 默认为1（API返回的结果）
        
        // 如果标题匹配度更高，则提升优先级
        if (strictTitleMatch(anime.name, queryTitle)) {
          matchType = 3; // 严格匹配，最高优先级
        } else if (normalizedAnimeName.includes(normalizedQueryTitle)) {
          matchType = 2; // 宽松匹配，中等优先级
        }
        // 否则保持 matchType = 1（API返回但标题不直接匹配，如不同译名）
        
        try {
          const detail = await this.getDetail(anime.sid);
          const eps = await this.getEpisodes(anime.sid);
          let links = [];
          for (const ep of eps) {
            const epTitle = ep.title && ep.title.trim() !== "" ? `第${ep.serialNo}集：${ep.title}` : `第${ep.serialNo}集`;
            links.push({
              "name": epTitle,
              "url": ep.pid,
              "title": `【hanjutv】 ${epTitle}`
            });
          }

          if (links.length > 0) {
            // 提取别名信息（韩剧TV API返回的alias字段）
            const aliases = detail.alias || [];
            
            // 检查查询词是否匹配别名，如果匹配则使用别名作为主标题
            let displayName = anime.name;
            const normalizedQueryTitle = normalizeSpaces(queryTitle);
            
            // 遍历别名，找到最匹配的那个
            for (const alias of aliases) {
              const normalizedAlias = normalizeSpaces(alias);
              if (normalizedAlias === normalizedQueryTitle || normalizedAlias.includes(normalizedQueryTitle)) {
                displayName = alias; // 使用匹配的别名作为显示名称
                break;
              }
            }
// 选择一个可靠的时间字段来推断年份（搜索结果的 updateTime 可能不存在）
const inferYear = (() => {
  const t =
    anime.updateTime ??
    detail.updateTime ??
    detail.publishTime ??
    (eps && eps.length > 0 ? eps[0].publishTime : null);
  if (!t) return null;
  const y = new Date(t).getFullYear();
  return Number.isFinite(y) ? y : null;
})();

const isValidYear = (y) => Number.isFinite(y) && y >= 1900 && y <= 2100;
const yearForTitle = isValidYear(inferYear) ? inferYear : null;

let transformedAnime = {
  animeId: anime.animeId,
  bangumiId: String(anime.animeId),
  animeTitle: yearForTitle
    ? `${displayName}(${yearForTitle})【${getCategory(detail.category)}】from hanjutv`
    : `${displayName}【${getCategory(detail.category)}】from hanjutv`,
  type: getCategory(detail.category),
  typeDescription: getCategory(detail.category),
  imageUrl: anime.image.thumb,
  // 如果年份不可用，使用 1900 作为兜底（避免被误认为“当前年份”）
  startDate: generateValidStartDate(yearForTitle ?? 1900),
  episodeCount: links.length,
  rating: detail.rank,
  isFavorited: true,
  source: "hanjutv",
  matchType: matchType, // 添加匹配类型标记用于排序
  aliases: aliases, // 保存别名数组，用于自动匹配
};

// 计算一个“质量分”，用于去重时挑选更靠谱的条目
const nonEmptyEpTitleCount = eps.filter(ep => ep.title && ep.title.trim() !== "").length;
const hasUpdateTime = (anime.updateTime ?? detail.updateTime) ? 1 : 0;
const rankScore = Number.isFinite(Number(detail.rank)) ? Number(detail.rank) : 0;
const qualityScore = matchType * 100 + hasUpdateTime * 20 + nonEmptyEpTitleCount + rankScore / 10;

// 返回带匹配类型 & 去重Key 的结果，用于后续排序/去重
const dedupeKey = `${detail.category}|${normalizeSpaces(displayName)}`;
return { anime: transformedAnime, links: links, matchType: matchType, qualityScore, dedupeKey };
          }
          return null; // 如果没有剧集则返回null
        } catch (error) {
          log("error", `[Hanjutv] Error processing anime: ${error.message}`);
          return null;
        }
      })
    );

    // 过滤掉 null 值并按匹配类型排序
    const validResults = processHanjutvAnimes.filter(result => result !== null);
    
    // 按匹配类型排序：严格匹配(3) > 宽松匹配(2) > API返回(1)
    validResults.sort((a, b) => b.matchType - a.matchType);
// ==============
// 去重：韩剧TV 同名条目经常会返回多个 sid（同一部剧的不同版本/索引）
// 规则：同一 (category + 标题) 只保留“质量分”更高的那个
// ==============
const bestByKey = new Map();
for (const result of validResults) {
  const key = result.dedupeKey ?? `${result.anime.type}|${result.anime.animeTitle}`;
  const prev = bestByKey.get(key);
  if (!prev || (result.qualityScore ?? 0) > (prev.qualityScore ?? 0)) {
    bestByKey.set(key, result);
  }
}

const dedupedResults = Array.from(bestByKey.values());

// 再次排序：严格匹配(3) > 宽松匹配(2) > API返回(1)，同一匹配类型下按质量分
dedupedResults.sort((a, b) => {
  if (b.matchType !== a.matchType) return b.matchType - a.matchType;
  return (b.qualityScore ?? 0) - (a.qualityScore ?? 0);
});

// 提取动漫信息和添加到缓存（使用去重后的结果）
for (const result of dedupedResults) {
  tmpAnimes.push(result.anime);
  addAnime({ ...result.anime, links: result.links });

  if (globals.animes.length > globals.MAX_ANIMES) removeEarliestAnime();
}

this.sortAndPushAnimesByYear(tmpAnimes, curAnimes);

return processHanjutvAnimes;
  }

  async getEpisodeDanmu(id) {
    let allDanmus = [];
    let fromAxis = 0;
    const maxAxis = 100000000;

    try {
      while (fromAxis < maxAxis) {
        const resp = await httpGet(`https://hxqapi.zmdcq.com/api/danmu/playItem/list?fromAxis=${fromAxis}&pid=${id}&toAxis=${maxAxis}`, {
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
          retries: 1,
        });

        // 将当前请求的 episodes 拼接到总数组
        if (resp.data && resp.data.danmus) {
          allDanmus = allDanmus.concat(resp.data.danmus);
        }

        // 获取 nextAxis，更新 fromAxis
        const nextAxis = resp.data.nextAxis || maxAxis;
        if (nextAxis >= maxAxis) {
          break; // 如果 nextAxis 达到或超过最大值，退出循环
        }
        fromAxis = nextAxis;
      }

      return allDanmus;
    } catch (error) {
      // 捕获请求中的错误
      log("error", "fetchHanjutvEpisodeDanmu error:", {
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
      return allDanmus; // 返回已收集的 episodes
    }
  }

  formatComments(comments) {
    return comments.map(c => ({
      cid: Number(c.did),
      p: `${(c.t / 1000).toFixed(2)},${c.tp === 2 ? 5 : c.tp},${Number(c.sc)},[hanjutv]`,
      m: c.con,
      t: Math.round(c.t / 1000)
    }));
  }
}