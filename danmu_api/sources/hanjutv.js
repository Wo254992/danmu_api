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

            // 目标：保留“真别名/译名”的自动匹配能力，但避免 alias 污染导致不相关作品“伪装成搜索词”
            // 核心：alias 只有在“有佐证字段也命中 query”时，才允许用于改名 & 提升 matchType
            const normalizedQueryTitle = normalizeSpaces(queryTitle);
            let matchedAlias = null;
            let displayName = anime.name;

            const stripHtml = (html) => String(html || "")
              .replace(/<[^>]+>/g, " ")
              .replace(/&nbsp;/g, " ")
              .replace(/&quot;/g, "\"")
              .replace(/&#39;/g, "'")
              .replace(/&amp;/g, "&");

            // 这些字段相对更可信（不会像 alias 那样被塞“关联词”）
            const displayHeading = (detail.display && detail.display.heading) ? detail.display.heading : "";
            const evidenceText = normalizeSpaces([
              detail.name,
              detail.shorthand,
              displayHeading,
              stripHtml(detail.intro),
              detail.crew,
            ].filter(Boolean).join(" "));

            // alias 只有在“佐证字段也包含 query”时才可信
            // 额外兜底：alias 只有 1 个且就是 query，也可以认为较可信（减少漏掉真别名）
            // 再额外兜底：当 alias 精确等于 query，且标题与 query 仅 1 个字差异（如 无用/没用），也允许改名
            const aliasOnlyQuery = (aliases.length === 1) && (normalizeSpaces(aliases[0]) === normalizedQueryTitle);

            const editDistanceLE1 = (a, b) => {
              if (a === b) return true;
              const la = a.length;
              const lb = b.length;
              if (Math.abs(la - lb) > 1) return false;

              let i = 0;
              let j = 0;
              let diff = 0;

              while (i < la && j < lb) {
                if (a[i] === b[j]) {
                  i++;
                  j++;
                  continue;
                }
                diff++;
                if (diff > 1) return false;

                if (la > lb) {
                  i++;
                } else if (lb > la) {
                  j++;
                } else {
                  i++;
                  j++;
                }
              }

              if (i < la || j < lb) diff++;
              return diff <= 1;
            };

            const nearTitleHit = (() => {
              const nQuery = normalizedQueryTitle;
              const nName1 = normalizeSpaces(anime.name);
              const nName2 = normalizeSpaces(detail.name);
              if (!nQuery) return false;
              if (Math.min(nQuery.length, nName1.length, nName2.length) < 4) return false;
              return editDistanceLE1(nName1, nQuery) || editDistanceLE1(nName2, nQuery);
            })();

            const isNoisyAlias = (s) => {
              const t = String(s || "");
              // 典型“话题词/人物词/营销词”黑名单（可以按你日志继续加）
              // 这些词出现在 alias 里，基本不可能是“剧名别名”
              if (/(剧组|主演|演员|吻戏|花絮|预告|中字|高清|合集|cut|ost|主题曲|片尾曲|金所泫|黄旼炫|李帝勋)/i.test(t)) return true;
              // 太短的词（1字）很容易误伤；2字也容易是泛词，谨慎点：只允许>=2，但配合其他规则
              return false;
            };

            const looksLikeTitle = (s) => {
              const t = String(s || "").trim();
              if (!t) return false;
              // 纯数字、纯符号不算标题
              if (/^[\d\W_]+$/.test(t)) return false;
              // 太长也可能是营销句，不像标题（这里给个上限，避免“冬季治愈风🍃...”这种）
              if (t.length > 20) return false;
              return true;
            };

            // 可信策略：
            // 1) 佐证字段包含 query 或 aliasOnlyQuery 或 nearTitleHit：一律可信（你原来的）
            // 2) 若 alias 中存在“精确等于 query”的项，并且 query 看起来像标题且不是噪声词：也可信
            const hasExactAliasHit = aliases.some(a => normalizeSpaces(a) === normalizedQueryTitle);
            const exactAliasLooksSafe = hasExactAliasHit && looksLikeTitle(queryTitle) && !isNoisyAlias(queryTitle);

            const canTrustAliasForDisplay = evidenceText.includes(normalizedQueryTitle) || aliasOnlyQuery || nearTitleHit || exactAliasLooksSafe;

            const isSafeAliasForDisplay = (aliasNorm, queryNorm) => {
              // 1) 完全相等：允许（是否改名由 canTrustAliasForDisplay 决定）
              if (aliasNorm === queryNorm) return true;

              // 2) 以 query 开头，后面只允许“季数/数字/常见季数写法”
              if (aliasNorm.startsWith(queryNorm)) {
                const rest = aliasNorm.slice(queryNorm.length).trim();
                if (rest === "") return true;
                if (/^(\d+|第\d+季|s\d+|season\d+)$/i.test(rest)) return true;
              }

              return false;
            };
            for (const alias of aliases) {
              const normalizedAlias = normalizeSpaces(alias);
              if (isSafeAliasForDisplay(normalizedAlias, normalizedQueryTitle)) {
                matchedAlias = alias;

                // 只有“可信 alias”才允许改名成搜索词，避免 Crash/搜查班长/姐妹茶馆 伪装成“模范出租车”
                if (canTrustAliasForDisplay) {
                  displayName = alias;
                }

                break;
              }
            }

            // 只有“可信 alias 命中”才提升 matchType（否则保持 1，后面强命中存在时会被过滤掉）
            if (matchedAlias && canTrustAliasForDisplay && matchType < 2) {
              matchType = 2;
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
  // 使用 displayName：只有“安全 alias”才会改名，从而兼顾自动匹配与防伪装
  animeTitle: yearForTitle
    ? `${displayName}(${yearForTitle})【${getCategory(detail.category)}】from hanjutv`
    : `${displayName}【${getCategory(detail.category)}】from hanjutv`,
  originTitle: anime.name,
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
  matchedAlias: matchedAlias,
};

// 计算一个“质量分”，用于去重时挑选更靠谱的条目
const nonEmptyEpTitleCount = eps.filter(ep => ep.title && ep.title.trim() !== "").length;
const hasUpdateTime = (anime.updateTime ?? detail.updateTime) ? 1 : 0;
const rankScore = Number.isFinite(Number(detail.rank)) ? Number(detail.rank) : 0;
const qualityScore = matchType * 100 + hasUpdateTime * 20 + nonEmptyEpTitleCount + rankScore / 10;

// 返回带匹配类型 & 去重Key 的结果，用于后续排序/去重
// 去重 key 用“真实剧名”而不是 alias（因为 alias 不可靠）
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

    // ==============
    // 两全其美：强命中存在时，过滤弱相关（避免“模范出租车”搜出“姐妹茶馆”等话题关联综艺）
    // 规则：如果去重后存在 matchType>=2 的结果，则丢弃 matchType==1 的弱相关
    // 这样既不会漏掉“真别名命中”（因为 alias 命中已提升到 2），也能挡住“伪装/话题关联”
    // ==============
    const hasStrongMatch = dedupedResults.some(r => (r.matchType ?? 1) >= 2);
    const finalResults = hasStrongMatch
      ? dedupedResults.filter(r => (r.matchType ?? 1) >= 2)
      : dedupedResults;

    // 提取动漫信息和添加到缓存（使用最终结果）
    for (const result of finalResults) {
      tmpAnimes.push(result.anime);
      addAnime({ ...result.anime, links: result.links });

      if (globals.animes.length > globals.MAX_ANIMES) removeEarliestAnime();
    }

    this.sortAndPushAnimesByYear(tmpAnimes, curAnimes);

    // 返回最终的 anime 列表（不要返回 processHanjutvAnimes，否则会把去重/过滤成果丢掉）
    return tmpAnimes;
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