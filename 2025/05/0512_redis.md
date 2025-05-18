
# 相关文档
## Redis 运行一段时间后报错导致挂掉，有什么办法解决呢？
```
使用 docker 安装的 Redis ，版本 7.4.1 ，挂载 config 和 data 文件夹到宿主机，运行一段时间（一个月）后突然发现挂掉了，查看日志有如下信息，看上去像是 aof 文件损坏，如何避免这个问题呢？

1:C 31 Mar 2025 10:15:53.909 # WARNING Memory overcommit must be enabled! Without it, a background save or replication may fail under low memory condition. Being disabled, it can also cause failures without low memory condition, see https://github.com/jemalloc/jemalloc/issues/1328. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
1:C 31 Mar 2025 10:15:53.909 * oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
1:C 31 Mar 2025 10:15:53.909 * Redis version=7.4.1, bits=64, commit=00000000, modified=0, pid=1, just started
1:C 31 Mar 2025 10:15:53.909 * Configuration loaded
1:M 31 Mar 2025 10:15:53.909 * monotonic clock: POSIX clock_gettime
1:M 31 Mar 2025 10:15:53.910 # Failed to write PID file: Permission denied
1:M 31 Mar 2025 10:15:53.910 * Running mode=standalone, port=6379.
1:M 31 Mar 2025 10:15:53.910 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
1:M 31 Mar 2025 10:15:53.910 * Server initialized
1:M 31 Mar 2025 10:15:53.910 * Reading RDB base file on AOF loading...
1:M 31 Mar 2025 10:15:53.910 * Loading RDB produced by version 7.4.1
1:M 31 Mar 2025 10:15:53.910 * RDB age 159448 seconds
1:M 31 Mar 2025 10:15:53.910 * RDB memory usage when created 3.08 Mb
1:M 31 Mar 2025 10:15:53.910 * RDB is base AOF
1:M 31 Mar 2025 10:15:53.915 * Done loading RDB, keys loaded: 1103, keys expired: 0.
1:M 31 Mar 2025 10:15:53.916 * DB loaded from base file appendonly.aof.12754.base.rdb: 0.006 seconds
1:M 31 Mar 2025 10:15:54.042 # Bad file format reading the append only file appendonly.aof.12754.incr.aof: make a backup of your AOF file, then use ./redis-check-aof --fix <filename.manifest>



感谢大家，在大家的提示下，我找到了问题原因：

Redis 依赖 Linux 的内存过量提交机制（ Memory Overcommit ），但当前系统 未启用 该机制，导致：

后台保存（ BGSAVE ）或 AOF 持久化 可能失败。

主从复制 可能失败。

即使内存充足，也可能出现 OOM （ Out of Memory ）相关错误，导致 Redis 启动失败或进程崩溃。


具体解决方案 gpt 有提供


我看报错的提示查了一下是因为操作系统没开启 Linux 的内存过量提交机制，导致 AOF 文件写失败
```











