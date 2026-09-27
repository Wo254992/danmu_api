import { globals } from '../configs/globals.js';
import { getLocalCaches, judgeLocalCacheValid } from './cache-util.js';
import { getRedisCaches } from './redis-util.js';
import { cacheSources } from './cache-state-util.js';

let initializing = null;

// 先尝试 Local Redis；各后端的失败独立处理，不阻断其他数据的恢复。
export async function initializePersistentCaches(deployPlatform) {
  if (initializing) return initializing;
  initializing = (async () => {
    globals.deployPlatform = deployPlatform;
    if (deployPlatform === 'node' && globals.localRedisUrl) {
      const { getLocalRedisCaches } = await import('./local-redis-util.js');
      await getLocalRedisCaches();
    }
    if (globals.redisUrl && globals.redisToken) await getRedisCaches();
    if (deployPlatform === 'node') {
      await judgeLocalCacheValid('/api/v2/favorite/list', deployPlatform);
      if (globals.localCacheValid) await getLocalCaches();
    }
    // 没有启用持久化后端时使用本进程内存；以后开启文件缓存也不导入旧数据。
    if (deployPlatform !== 'node' || !globals.localCacheValid) {
      const sources = cacheSources();
      if (sources.query === 'file') globals.queryCacheInitialized = true;
      if (sources.favorite === 'file') globals.favoriteCacheInitialized = true;
    }
    return globals.queryCacheInitialized;
  })();
  try {
    return await initializing;
  } finally {
    initializing = null;
  }
}
