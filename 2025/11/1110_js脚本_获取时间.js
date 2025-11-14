// 获取昨天的开始和结束时间（UTC）
function getYesterdayTimestamps() {
  const now = new Date();

  // 获取 UTC 时间的“昨天 00:00:00”
  const startOfYesterdayUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
    0, 0, 0
  );

  // 获取 UTC 时间的“昨天 23:59:59”
  const endOfYesterdayUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 1,
    23, 59, 59
  );

  return {
    startUTC: startOfYesterdayUTC / 1000,  // 秒级时间戳
    endUTC: endOfYesterdayUTC / 1000,      // 秒级时间戳
    startUTCms: startOfYesterdayUTC,       // 毫秒级时间戳
    endUTCms: endOfYesterdayUTC            // 毫秒级时间戳
  };
}

// 示例输出
const result = getYesterdayTimestamps();
console.log("UTC 昨天开始时间戳(秒):", result.startUTC);
console.log("UTC 昨天结束时间戳(秒):", result.endUTC);
console.log("UTC 昨天开始时间:", new Date(result.startUTCms).toISOString());
console.log("UTC 昨天结束时间:", new Date(result.endUTCms).toISOString());
