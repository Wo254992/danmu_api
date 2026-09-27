import { globals } from '../configs/globals.js';
import { simpleHash } from './codec-util.js';
import { loadFavorites } from './favorite-util.js';
import { log } from './log-util.js';

export const queryCacheKeys = [
  'animes', 'episodeIds', 'episodeNum', 'reqRecords', 'lastSelectMap', 'todayReqNum'
];
export const persistentCacheKeys = [...queryCacheKeys, 'favoriteCache'];

// 后端按配置选择；暂时不可用不等于改用另一个后端的旧快照。
export function cacheSources() {
  const upstash = globals.redisUrl && globals.redisToken;
  return {
    query: globals.deployPlatform === 'node' && globals.localRedisUrl
      ? 'localRedis' : upstash ? 'upstash' : 'file',
    favorite: upstash ? 'upstash' : 'file'
  };
}

export function canPersistCacheKey(key) {
  if (queryCacheKeys.includes(key)) return globals.queryCacheInitialized;
  if (key === 'favoriteCache' || key === 'favoritesCache') return globals.favoriteCacheInitialized;
  return true;
}

// 查询数据和收藏分别恢复；低优先级后端、热启用的后端只接收之后的写入。
export async function restoreCacheGroups(backend, read, hashes) {
  const sources = cacheSources();
  let success = true;
  for (const [source, flag, keys] of [
    [sources.query, 'queryCacheInitialized', queryCacheKeys],
    [sources.favorite, 'favoriteCacheInitialized', ['favoriteCache']]
  ]) {
    if (source !== backend || globals[flag]) continue;
    try {
      const snapshot = parseCacheSnapshot(await read(keys), keys);
      applyCacheSnapshot(snapshot, hashes);
      globals[flag] = true;
    } catch (error) {
      log('error', `[cache] ${backend} ${keys[0]} 恢复失败，将重试: ${error.message}`);
      success = false;
    }
  }
  return success;
}

// 先验证整份快照，任何读取/解析错误都不能留下半恢复的全局状态。
export function parseCacheSnapshot(values, keys = persistentCacheKeys) {
  if (!Array.isArray(values) || values.length !== keys.length) {
    throw new Error('持久化缓存响应不完整');
  }
  return values.map((raw, index) => {
    const key = keys[index];
    if (raw === null) return { key };
    if (typeof raw !== 'string') throw new Error(`缓存 ${key} 响应无效`);
    const value = JSON.parse(raw);
    const valid = ['animes', 'episodeIds', 'reqRecords'].includes(key)
      ? Array.isArray(value)
      : ['episodeNum', 'todayReqNum'].includes(key)
        ? Number.isFinite(value)
        : value !== null && typeof value === 'object' && !Array.isArray(value);
    if (!valid) throw new Error(`缓存 ${key} 数据无效`);
    return { key, value, hash: simpleHash(raw) };
  });
}

export function applyCacheSnapshot(snapshot, hashes) {
  for (const { key, value, hash } of snapshot) {
    delete hashes[key];
    if (hash === undefined) continue; // 成功确认缺失，允许下次补写。
    if (key === 'lastSelectMap') globals.lastSelectMap = new Map(Object.entries(value));
    else if (key === 'favoriteCache') loadFavorites(value);
    else globals[key] = value;
    hashes[key] = hash;
  }
}
