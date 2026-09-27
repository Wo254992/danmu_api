import { globals } from '../configs/globals.js';
import { log } from './log-util.js'
import { simpleHash, serializeValue } from "./codec-util.js";
import { persistentCacheKeys, canPersistCacheKey, restoreCacheGroups, parseCacheSnapshot, applyCacheSnapshot } from './cache-state-util.js';

let initializing = null;

// =====================
// upstash redis 读写请求 （先简单实现，不加锁）
// =====================

// 使用 GET 发送简单命令（如 PING 检查连接）
export async function pingRedis() {
  const url = `${globals.redisUrl}/ping`;
  log("info", `[system] [redis] 开始发送 PING 请求:`, url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
      headers: {
        'Authorization': `Bearer ${globals.redisToken}`
      }
    });
    return await response.json(); // 预期: ["PONG"]
  } catch (error) {
    log("error", `[system] [redis] 请求失败:`, error.message);
    log("error", '- [system] [redis] 错误类型:', error.name);
    if (error.cause) {
      log("error", '- [system] [redis] 码:', error.cause.code);  // e.g., 'ECONNREFUSED', 'ETIMEDOUT', 'ECONNRESET'
      log("error", '- [system] [redis] 原因:', error.cause.message);
    }
  }
}

// 使用 GET 发送 GET 命令（读取键值）
export async function getRedisKey(key) {
  const url = `${globals.redisUrl}/get/${key}`;
  log("info", `[system] [redis] 开始发送 GET 请求:`, url);
  try {
    const response = await fetch(url, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
      headers: {
        'Authorization': `Bearer ${globals.redisToken}`
      }
    });
    return await response.json(); // 预期: ["value"] 或 null
  } catch (error) {
    log("error", `[system] [redis] 请求失败:`, error.message);
    log("error", '- [system] [redis] 错误类型:', error.name);
    if (error.cause) {
      log("error", '- [system] [redis] 码:', error.cause.code);  // e.g., 'ECONNREFUSED', 'ETIMEDOUT', 'ECONNRESET'
      log("error", '- [system] [redis] 原因:', error.cause.message);
    }
  }
}

// 使用 POST 发送 SET 命令，仅在值变化时更新
export async function setRedisKey(key, value) {
  if (!canPersistCacheKey(key)) return { result: 'ERROR' };
  const serializedValue = serializeValue(key, value);
  const currentHash = simpleHash(serializedValue);

  // 检查值是否变化
  if (globals.upstashHashes[key] === currentHash) {
    log("info", `[system] [redis] 键 ${key} 无变化，跳过 SET 请求`);
    return { result: "OK" }; // 模拟成功响应
  }

  const url = `${globals.redisUrl}/set/${key}`;
  log("info", `[system] [redis] 开始发送 SET 请求:`, url);
  try {
    const response = await fetch(url, {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
      headers: {
        'Authorization': `Bearer ${globals.redisToken}`,
        'Content-Type': 'application/json'
      },
      body: serializedValue
    });
    const result = await response.json();
    if (!response.ok || result?.result !== 'OK') throw new Error(`SET 未成功: ${JSON.stringify(result)}`);
    globals.upstashHashes[key] = currentHash;
    log("info", `[system] [redis] 键 ${key} 更新成功`);
    return result; // 预期: ["OK"]
  } catch (error) {
    log("error", `[system] [redis] SET 请求失败:`, error.message);
    log("error", '- [system] [redis] 错误类型:', error.name);
    if (error.cause) {
      log("error", '- [system] [redis] 码:', error.cause.code);
      log("error", '- [system] [redis] 原因:', error.cause.message);
    }
    return { result: 'ERROR' };
  }
}

// 使用 POST 发送 SETEX 命令，仅在值变化时更新
export async function setRedisKeyWithExpiry(key, value, expirySeconds) {
  if (!canPersistCacheKey(key)) return { result: 'ERROR' };
  const serializedValue = serializeValue(key, value);
  const currentHash = simpleHash(serializedValue);

  // 检查值是否变化
  if (globals.upstashHashes[key] === currentHash) {
    log("info", `[system] [redis] 键 ${key} 无变化，跳过 SETEX 请求`);
    return { result: "OK" }; // 模拟成功响应
  }

  const url = `${globals.redisUrl}/set/${key}?EX=${expirySeconds}`;
  log("info", `[system] [redis] 开始发送 SETEX 请求:`, url);
  try {
    const response = await fetch(url, {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
      headers: {
        'Authorization': `Bearer ${globals.redisToken}`,
        'Content-Type': 'application/json'
      },
      body: serializedValue
    });
    const result = await response.json();
    if (!response.ok || result?.result !== 'OK') throw new Error(`SETEX 未成功: ${JSON.stringify(result)}`);
    globals.upstashHashes[key] = currentHash;
    log("info", `[system] [redis] 键 ${key} 更新成功（带过期时间 ${expirySeconds}s）`);
    return result;
  } catch (error) {
    log("error", `[system] [redis] SETEX 请求失败:`, error.message);
    log("error", '- [system] [redis] 错误类型:', error.name);
    if (error.cause) {
      log("error", '- [system] [redis] 码:', error.cause.code);
      log("error", '- [system] [redis] 原因:', error.cause.message);
    }
    return { result: 'ERROR' };
  }
}

// 通用的 pipeline 请求函数
export async function runPipeline(commands) {
  const url = `${globals.redisUrl}/pipeline`;
  log("info", `[system] [redis] 开始发送 PIPELINE 请求:`, url);
  try {
    const response = await fetch(url, {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
      headers: {
        'Authorization': `Bearer ${globals.redisToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commands) // commands 是一个数组，包含多个 Redis 命令
    });
    if (!response.ok) throw new Error(`Pipeline HTTP ${response.status}`);
    const result = await response.json();
    return result; // 返回结果数组，按命令顺序
  } catch (error) {
    log("error", `[system] [redis] Pipeline 请求失败:`, error.message);
    log("error", '- [system] [redis] 错误类型:', error.name);
    if (error.cause) {
      log("error", '- [system] [redis] 码:', error.cause.code);
      log("error", '- [system] [redis] 原因:', error.cause.message);
    }
  }
}

// 优化后的 getRedisCaches，单次请求获取所有键
export async function getRedisCaches() {
  if (initializing) return initializing;
  initializing = (async () => {
    try {
      const success = await restoreCacheGroups('upstash', async keys => {
        const results = await runPipeline(keys.map(key => ['GET', key]));
        const values = readPipelineValues(results, keys.length);
        globals.redisValid = true;
        return values;
      }, globals.upstashHashes);
      globals.redisCacheInitialized = success;
      return success;
    } catch (error) {
      log('error', `[system] [redis] 恢复失败，将重试: ${error.message}`);
      return false;
    }
  })();
  try {
    return await initializing;
  } finally {
    initializing = null;
  }
}

function readPipelineValues(results, count) {
  if (!Array.isArray(results) || results.length !== count) throw new Error('Redis GET 响应不完整');
  return results.map(result => {
    if (!result || result.error || !Object.prototype.hasOwnProperty.call(result, 'result')) {
      throw new Error('Redis GET 失败');
    }
    return result.result;
  });
}

// serverless 多实例场景下单独刷新收藏缓存。
// Redis 中的收藏是跨实例的持久数据，但实例内存中的 favoriteCache 只在首次初始化时加载，
// 预热实例可能错过其他实例新增的收藏，这里在收藏相关请求时直接从 Redis 重新读取。
export async function getFavoriteCachesFromRedis() {
  if (!globals.redisValid) return false;
  try {
    const results = await runPipeline([['GET', 'favoriteCache']]);
    const [raw] = readPipelineValues(results, 1);
    const snapshot = parseCacheSnapshot([raw], ['favoriteCache']);
    // 只刷新收藏；成功确认缺失时清除旧内存，避免跨实例删除后又被写回。
    if (raw === null) globals.favoriteCache = new Map();
    applyCacheSnapshot(snapshot, globals.upstashHashes);
    globals.favoriteCacheInitialized = true;
    return true;
  } catch (error) {
    log("error", `[system] [redis] getFavoriteCachesFromRedis failed: ${error.message}`);
    return false;
  }
}

// 优化后的 updateRedisCaches，仅更新有变化的变量
export async function updateRedisCaches() {
  if (!globals.queryCacheInitialized && !globals.favoriteCacheInitialized) return false;
  try {
    log("info", '[system] [redis] updateCaches start.');
    const commands = [];
    const updates = [];

    // 检查每个变量的哈希值
    const variables = persistentCacheKeys.filter(canPersistCacheKey).map(key => ({ key, value: globals[key] }));

    for (const { key, value } of variables) {
      const serializedValue = serializeValue(key, value);
      const currentHash = simpleHash(serializedValue);
      if (currentHash !== globals.upstashHashes[key]) {
        commands.push(['SET', key, serializedValue]);
        updates.push({ key, hash: currentHash });
      }
    }

    // 如果有需要更新的键，执行 pipeline
    if (commands.length > 0) {
      log("info", `[system] [redis] Updating ${commands.length} changed keys: ${updates.map(u => u.key).join(', ')}`);
      const results = await runPipeline(commands);

      // 检查每个操作的结果
      let successCount = 0;
      let failureCount = 0;

      // 按发出的命令逐项确认，空响应、缺项和错误响应都不能标记为已保存。
      updates.forEach(({ key, hash }, index) => {
        const result = Array.isArray(results) ? results[index] : null;
        if (result?.result === 'OK' && !result.error) {
          globals.upstashHashes[key] = hash;
          successCount++;
        } else {
          failureCount++;
          log("warn", `[system] [redis] Failed to update Redis key: ${key}, result: ${JSON.stringify(result)}`);
        }
      });

      if (failureCount === 0) {
        log("info", `[system] [redis] Redis update completed successfully: ${successCount} keys updated`);
      } else {
        log("warn", `[system] [redis] Redis update partially failed: ${successCount} succeeded, ${failureCount} failed`);
      }
      return failureCount === 0;
    } else {
      log("info", '[system] [redis] No changes detected, skipping Redis update.');
      return true;
    }
  } catch (error) {
    log("error", `[system] [redis] updateRedisCaches failed: ${error.message}`, error.stack);
    log("error", `[system] [redis] Error details - Name: ${error.name}, Cause: ${error.cause ? error.cause.message : 'N/A'}`);
    return false;
  }
}

// 判断redis是否可用
export async function judgeRedisValid(path) {
  if (!globals.redisValid && globals.redisUrl && globals.redisToken && path !== "/favicon.ico" && path !== "/robots.txt") {
    const res = await pingRedis();
    if (res && res.result && res.result === "PONG") {
      globals.redisValid = true;
    }
  }
}
