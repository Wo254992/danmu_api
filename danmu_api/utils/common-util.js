import { globals } from '../configs/globals.js';
import { log } from './log-util.js'

// =====================
// 通用工具方法
// =====================

// 打印数据前200个字符
export function printFirst200Chars(data) {
  let dataToPrint;

  if (typeof data === 'string') {
    dataToPrint = data;  // 如果是字符串，直接使用
  } else if (Array.isArray(data)) {
    dataToPrint = JSON.stringify(data);  // 如果是数组，转为字符串
  } else if (typeof data === 'object') {
    dataToPrint = JSON.stringify(data);  // 如果是对象，转为字符串
  } else {
    log("error", "Unsupported data type");
    return;
  }

  log("info", dataToPrint.slice(0, 200));  // 打印前200个字符
}

// 正则表达式：提取episode标题中的内容
export const extractEpisodeTitle = (title) => {
  const match = title.match(/【(.*?)】/);  // 匹配【】中的内容
  return match ? match[1] : null;  // 返回方括号中的内容，若没有匹配到，则返回null
};

// 正则表达式：提取anime标题中的内容
export const extractAnimeTitle = (str) => str.split('(')[0].trim();

// 提取年份的辅助函数
export function extractYear(animeTitle) {
  const match = animeTitle.match(/\((\d{4})\)/);
  return match ? parseInt(match[1]) : null;
}

export function convertChineseNumber(chineseNumber) {
  // 如果是阿拉伯数字，直接转换
  if (/^\d+$/.test(chineseNumber)) {
    return Number(chineseNumber);
  }

  // 中文数字映射（简体+繁体）
  const digits = {
    // 简体
    '零': 0, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
    '六': 6, '七': 7, '八': 8, '九': 9,
    // 繁体
    '壹': 1, '貳': 2, '參': 3, '肆': 4, '伍': 5,
    '陸': 6, '柒': 7, '捌': 8, '玖': 9
  };

  // 单位映射（简体+繁体）
  const units = {
    // 简体
    '十': 10, '百': 100, '千': 1000,
    // 繁体
    '拾': 10, '佰': 100, '仟': 1000
  };

  let result = 0;
  let current = 0;
  let lastUnit = 1;

  for (let i = 0; i < chineseNumber.length; i++) {
    const char = chineseNumber[i];

    if (digits[char] !== undefined) {
      // 数字
      current = digits[char];
    } else if (units[char] !== undefined) {
      // 单位
      const unit = units[char];

      if (current === 0) current = 1;

      if (unit >= lastUnit) {
        // 更大的单位，重置结果
        result = current * unit;
      } else {
        // 更小的单位，累加到结果
        result += current * unit;
      }

      lastUnit = unit;
      current = 0;
    }
  }

  // 处理最后的个位数
  if (current > 0) {
    result += current;
  }

  return result;
}

// 解析fileName，提取动漫名称和平台偏好
export function parseFileName(fileName) {
  if (!fileName || typeof fileName !== 'string') {
    return { cleanFileName: '', preferredPlatform: '' };
  }

  const atIndex = fileName.indexOf('@');
  if (atIndex === -1) {
    // 没有@符号，直接返回原文件名
    return { cleanFileName: fileName.trim(), preferredPlatform: '' };
  }

  // 找到@符号，需要分离平台标识
  const beforeAt = fileName.substring(0, atIndex).trim();
  const afterAt = fileName.substring(atIndex + 1).trim();

  // 检查@符号后面是否有季集信息（如 S01E01）
  const seasonEpisodeMatch = afterAt.match(/^(\w+)\s+(S\d+E\d+)$/);
  if (seasonEpisodeMatch) {
    // 格式：动漫名称@平台 S01E01
    const platform = seasonEpisodeMatch[1];
    const seasonEpisode = seasonEpisodeMatch[2];
    return {
      cleanFileName: `${beforeAt} ${seasonEpisode}`,
      preferredPlatform: normalizePlatformName(platform)
    };
  } else {
    // 检查@符号前面是否有季集信息
    const beforeAtMatch = beforeAt.match(/^(.+?)\s+(S\d+E\d+)$/);
    if (beforeAtMatch) {
      // 格式：动漫名称 S01E01@平台
      const title = beforeAtMatch[1];
      const seasonEpisode = beforeAtMatch[2];
      return {
        cleanFileName: `${title} ${seasonEpisode}`,
        preferredPlatform: normalizePlatformName(afterAt)
      };
    } else {
      // 格式：动漫名称@平台（没有季集信息）
      return {
        cleanFileName: beforeAt,
        preferredPlatform: normalizePlatformName(afterAt)
      };
    }
  }
}

// 将用户输入的平台名称映射为标准平台名称
function normalizePlatformName(inputPlatform) {
  if (!inputPlatform || typeof inputPlatform !== 'string') {
    return '';
  }

  const input = inputPlatform.trim();

  // 直接返回输入的平台名称（如果有效）
  if (globals.allowedPlatforms.includes(input)) {
    return input;
  }

  // 如果输入的平台名称无效，返回空字符串
  return '';
}

// 根据指定平台创建动态平台顺序
export function createDynamicPlatformOrder(preferredPlatform) {
  if (!preferredPlatform) {
    return [...globals.platformOrderArr]; // 返回默认顺序的副本
  }

  // 验证平台是否有效
  if (!globals.allowedPlatforms.includes(preferredPlatform)) {
    log("warn", `Invalid platform: ${preferredPlatform}, using default order`);
    return [...globals.platformOrderArr];
  }

  // 创建新的平台顺序，将指定平台放在最前面
  const dynamicOrder = [preferredPlatform];

  // 添加其他平台（排除已指定的平台）
  for (const platform of globals.platformOrderArr) {
    if (platform !== preferredPlatform && platform !== null) {
      dynamicOrder.push(platform);
    }
  }

  // 最后添加 null（用于回退逻辑）
  dynamicOrder.push(null);

  return dynamicOrder;
}

/**
 * 规范化标题中的空格（移除所有空格以便进行空格无关的匹配）
 * @param {string} str - 输入字符串
 * @returns {string} 规范化后的字符串（移除所有空格）
 */
export function normalizeSpaces(str) {
  if (!str) return '';
  // 移除所有空格（包括多个连续空格、制表符等）
  return String(str).trim().replace(/\s+/g, '');
}

/**
 * 规范化标题中的标点符号（全角/半角统一 + 一些常见“看起来一样”的符号统一）
 *
 * 目的：让“宇宙Marry Me？” 与 “宇宙Marry Me?” 这类仅标点不同的标题可被识别为同一部剧。
 *
 * 注意：这里不做“去掉标点”的激进处理，只做“等价符号映射”，避免误把不同标题合并。
 *
 * @param {string} str - 输入字符串
 * @returns {string} 规范化后的字符串
 */
export function normalizePunctuations(str) {
  if (!str) return '';

  const s = String(str);

  // 全角 -> 半角（仅对常见标点做显式映射，避免改变字母/数字等）
  const map = {
    '？': '?',
    '！': '!',
    '：': ':',
    '；': ';',
    '（': '(',
    '）': ')',
    '【': '[',
    '】': ']',
    '「': '"',
    '」': '"',
    '『': '"',
    '』': '"',
    '“': '"',
    '”': '"',
    '‘': '\'',
    '’': '\'',
    '，': ',',
    '。': '.',
    '、': ',',
    '～': '~',
    '－': '-',
    '—': '-',
    '–': '-',
    '·': '·', // 保留（中点容易影响标题识别，不与 '.' 合并）
  };

  return s.replace(/[？！？：；（）【】「」『』“”‘’，。、～－—–·]/g, (ch) => map[ch] ?? ch);
}

/**
 * 用于标题匹配的规范化：
 * 1) 去掉空格
 * 2) 标点符号全角/半角等价归一
 * 3) 英文小写化
 */
export function normalizeTitleForMatch(str) {
  return normalizeSpaces(normalizePunctuations(str)).toLowerCase();
}

/**
 * 判断两个标题是否“只存在等价标点差异”（或大小写/空格差异）
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
export function equivalentTitleIgnorePunct(a, b) {
  if (!a || !b) return false;
  return normalizeTitleForMatch(a) === normalizeTitleForMatch(b);
}

/**
 * 计算“标题 vs 搜索词”的匹配度分数（分数越高越靠前）
 * 目标：完全匹配一定排第一，其次 标题+纯数字（如2/3/4），再到其他包含/相似
 *
 * @param {string} title - 动漫标题
 * @param {string} query - 搜索关键词
 * @param {string} qNormPrecomputed - 预先算好的 normalizeTitleForMatch(query)，可选
 * @returns {number} score
 */
export function computeTitleMatchScore(title, query, qNormPrecomputed = null) {
  if (!title || !query) return 0;

  const tRaw = String(title);
  const qRaw = String(query);

  const tNorm = normalizeTitleForMatch(tRaw);
  const qNorm = qNormPrecomputed ?? normalizeTitleForMatch(qRaw);

  // 1) 完全匹配（含空格/标点等价）最高分
  if (tNorm === qNorm) return 1000000;

  // 2) 标题以关键词开头：优先“关键词+纯数字”（如2/3/4）
  if (tNorm.startsWith(qNorm)) {
    const rest = tNorm.slice(qNorm.length);
    if (/^\d+$/.test(rest)) {
      // 关键词+纯数字：排在完全匹配后面
      return 900000 - rest.length;
    }
    // 关键词+其他后缀（如 关键词越南语版）
    return 800000 - Math.min(rest.length, 1000);
  }

  // 3) 包含匹配：出现越靠前越优先
  const idx = tNorm.indexOf(qNorm);
  if (idx !== -1) {
    return 700000 - Math.min(idx, 5000);
  }

  // 4) 兜底相似度（bigram）
  const sim = bigramSimilarity(tNorm, qNorm);
  return Math.floor(sim * 1000);
}

/**
 * bigram 相似度：用于兜底排序
 */
function bigramSimilarity(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;

  const aBigrams = toBigrams(a);
  const bBigrams = toBigrams(b);
  if (aBigrams.length === 0 || bBigrams.length === 0) return 0;

  const bCount = new Map();
  for (const x of bBigrams) {
    bCount.set(x, (bCount.get(x) ?? 0) + 1);
  }

  let hit = 0;
  for (const x of aBigrams) {
    const c = bCount.get(x) ?? 0;
    if (c > 0) {
      hit += 1;
      bCount.set(x, c - 1);
    }
  }

  // Dice coefficient
  return (2 * hit) / (aBigrams.length + bBigrams.length);
}

function toBigrams(s) {
  const arr = [];
  for (let i = 0; i < s.length - 1; i++) {
    arr.push(s.slice(i, i + 2));
  }
  return arr;
}

/**
 * 严格标题匹配函数
 * @param {string} title - 动漫标题
 * @param {string} query - 搜索关键词
 * @returns {boolean} 是否匹配
 */
export function strictTitleMatch(title, query) {
  if (!title || !query) return false;

  const t = normalizeSpaces(title);
  const q = normalizeSpaces(query);

  // 完全匹配
  if (t === q) return true;

  // 标题以搜索词开头，且后面跟着空格、括号等分隔符
  const separators = [' ', '(', '（', ':', '：', '-', '—', '·', '第', 'S', 's'];
  for (const sep of separators) {
    if (t.startsWith(q + sep)) return true;
  }

  return false;
}

/**
 * 根据配置选择匹配模式
 * @param {string} title - 动漫标题
 * @param {string} query - 搜索关键词
 * @returns {boolean} 是否匹配
 */
export function titleMatches(title, query) {
  if (globals.strictTitleMatch) {
    return strictTitleMatch(title, query);
  } else {
    // 宽松模糊匹配（规范化空格后进行匹配）
    const normalizedTitle = normalizeSpaces(title);
    const normalizedQuery = normalizeSpaces(query);
    return normalizedTitle.includes(normalizedQuery);
  }
}

/**
 * 计算标题与搜索关键词的匹配分数（用于排序：分数越高越靠前）
 * 规则（从高到低）：
 * 1) 完全等价匹配（忽略空格/大小写/等价标点）
 * 2) 前缀匹配：关键词后紧跟纯数字（常见为第 N 季/编号）
 * 3) 前缀匹配：关键词后续其他内容（如“特别篇/国语版/越南语版”等）
 * 4) 包含匹配：关键词出现在标题中更靠前位置者优先
 * 5) 兜底：基于 bigram 的相似度
 * @param {string} title - 动漫标题
 * @param {string} query - 搜索关键词
 * @returns {number} 匹配分数
 */
export function computeTitleMatchScore(title, query) {
  if (!title || !query) return 0;

  const t = normalizeTitleForMatch(title);
  const q = normalizeTitleForMatch(query);

  if (!t || !q) return 0;

  // 完全匹配
  if (t === q) return 1000;

  // 前缀匹配
  if (t.startsWith(q)) {
    const rest = t.slice(q.length);

    // 关键词后紧跟纯数字（常见：第2/第3...）
    if (/^\d+(?:$|[\(\[\{].*)/.test(rest)) {
      return 930 - Math.min(rest.length, 30);
    }

    // 关键词后续其他内容（如语言版本/特别篇等）
    return 900 - Math.min(rest.length, 60);
  }

  // 包含匹配（越靠前越好，越短越好）
  const idx = t.indexOf(q);
  if (idx !== -1) {
    const extra = t.length - q.length;
    return 800 - Math.min(idx, 50) - Math.min(extra, 80);
  }

  // 兜底：bigram 相似度（0~1）
  const sim = bigramSimilarity(t, q);
  return Math.floor(500 * sim);
}

function bigramSimilarity(a, b) {
  if (!a || !b) return 0;
  if (a === b) return 1;

  // 长度过短时退化为字符集合
  if (a.length < 2 || b.length < 2) {
    const setA = new Set(a.split(''));
    const setB = new Set(b.split(''));
    let inter = 0;
    for (const ch of setA) {
      if (setB.has(ch)) inter++;
    }
    const denom = setA.size + setB.size;
    return denom === 0 ? 0 : (2 * inter) / denom;
  }

  const gramsA = new Map();
  for (let i = 0; i < a.length - 1; i++) {
    const g = a.slice(i, i + 2);
    gramsA.set(g, (gramsA.get(g) || 0) + 1);
  }

  let inter = 0;
  let countB = 0;
  for (let i = 0; i < b.length - 1; i++) {
    const g = b.slice(i, i + 2);
    countB++;
    const n = gramsA.get(g) || 0;
    if (n > 0) {
      inter++;
      gramsA.set(g, n - 1);
    }
  }

  const countA = a.length - 1;
  const denom = countA + countB;
  return denom === 0 ? 0 : (2 * inter) / denom;
}

/**
 * 数据类型校验
 * @param {string} value - 值
 * @param {string} expectedType - 期望类型
 * @param {string} fieldName - 参数名称
 */
export function validateType(value, expectedType) {
  const fieldName = value?.constructor?.name;  // 获取字段名
  if (expectedType === "array") {
    if (!Array.isArray(value)) {
      throw new TypeError(`${value} 必须是一个数组，但传入的是 ${fieldName}`);
    }
  } else if (typeof value !== expectedType) {
    throw new TypeError(`${value} 必须是 ${expectedType}，但传入的是 ${fieldName}`);
  }
}