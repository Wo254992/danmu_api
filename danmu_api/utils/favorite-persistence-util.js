import { globals } from '../configs/globals.js';
import { saveFavorites } from './favorite-util.js';
import { writeFavoriteCacheToFile } from './cache-util.js';
import { setRedisKey } from './redis-util.js';

let saving = null;

// 保存失败保留当前内存和待保存标记；不回滚已在其他后端成功的变更。
// 所有收藏保存共用队列，每轮写同一份快照；并发修改后继续保存最新版本。
export async function persistFavorites() {
  globals.favoritePersistencePending = true;
  globals.favoritePersistenceRevision++;
  if (saving) return saving;
  saving = (async () => {
    if (!globals.favoriteCacheInitialized) throw new Error('收藏数据尚未恢复，请稍后重试');
    while (true) {
      const serialized = JSON.stringify(saveFavorites());
      const snapshot = JSON.parse(serialized);
      const writes = [];
      if (globals.deployPlatform === 'node' && globals.localRedisUrl) {
        writes.push((async () => {
          const { setLocalRedisKey } = await import('./local-redis-util.js');
          return (await setLocalRedisKey('favoriteCache', snapshot))?.result === 'OK';
        })());
      }
      if (globals.redisUrl && globals.redisToken) {
        writes.push(setRedisKey('favoriteCache', snapshot).then(result => result?.result === 'OK'));
      }
      if (globals.deployPlatform === 'node' && globals.localCacheEnabled && globals.localCacheValid) {
        writes.push(writeFavoriteCacheToFile(snapshot));
      }
      const results = await Promise.allSettled(writes);
      if (results.some(result => result.status !== 'fulfilled' || result.value !== true)) {
        throw new Error('收藏更改已保留在内存，持久化尚未完成，请重试');
      }
      if (serialized !== JSON.stringify(saveFavorites())) continue;
      globals.favoritePersistencePending = false;
      return;
    }
  })();
  try {
    await saving;
  } finally {
    saving = null;
  }
}

export async function retryFavoritePersistence() {
  if (globals.favoritePersistencePending) await persistFavorites();
}
