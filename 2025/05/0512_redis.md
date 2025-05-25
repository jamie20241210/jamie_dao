
# api文档
ACL（Access Control List）命令用于管理用户权限和访问控制。、
    通过 ACL，可以限制用户对特定命令或数据的访问，增强系统的安全性。
    多用户环境: 在多用户环境中，ACL 允许为不同的用户设置不同的权限，确保数据的安全和隐私。
APPEND  将一个字符串追加到指定键的值后。如果该键不存在，则会创建该键并将其值设置为追加的字符串。
ASKING 该命令用于在 Redis 集群中，当客户端收到一个 -ASK 重定向时，通知 Redis 该客户端正在遵循重定向。此命令用于处理集群中的键迁移。
    在 Redis 集群中，当某个键被迁移到另一个节点时，客户端会收到 -ASK 重定向。使用 ASKING 命令可以确保客户端在新的节点上继续进行操作，而不会因为重定向而中断。
AUTH 该命令用于对 Redis 服务器进行身份验证。只有在成功认证后，客户端才能执行其他命令。
    在需要保护 Redis 数据的情况下，使用 AUTH 命令可以确保只有授权用户才能访问 Redis 实例。这在生产环境中尤其重要，以防止未授权访问和数据泄露。
BF
    Bloom Filter 是一种空间效率高的概率数据结构，用于测试一个元素是否在一个集合中。它允许误报（即可能会错误地报告某个元素存在于集合中），但不允许漏报（即不会错误地报告某个元素不存在于集合中）。
    Bloom Filter 使用一个位数组（bit array）来表示集合的状态，初始时所有位都设置为 0。
BGREWRITEAOF
    异步重写 AOF（Append-Only File）文件，将当前的写操作记录压缩到一个新的 AOF 文件中。

BGSAVE
    异步保存数据库到磁盘。Redis 会在后台创建一个 RDB（Redis Database）快照。

BIT
    BITCOUNT

BL BR
    BLMPOP BRPOP BZPOPMIN
    从一个列表中弹出一个元素，并将其推入到另一个列表中。如果没有元素可用，则会阻塞直到有元素可用。
CF.ADD
    向 Cuckoo Filter 中添加一个元素。

CLIENT
    指示服务器是否在下一个请求中跟踪键的访问情况。

cluster

cms
    Count-Min Sketch 

COMMAND

config

copy
    将一个键的值复制到一个新键。

DBSIZE
    返回当前数据库中的键的数量。

desc
    将键的整数值减 1。如果键不存在，则使用 0 作为初始值。

EVAL

EXPIRE
    设置键的过期时间（以秒为单位）。

EXPIREAT
    功能: 将键的过期时间设置为指定的 Unix 时间戳。

FT
    FT 是指 RedisSearch 模块的命令前缀。RedisSearch 是一个强大的全文搜索引擎，允许用户在 Redis 中执行复杂的搜索查询和文本分析

FUNCTION

json

LATENCY
     提供可读的延迟分析报告，帮助诊断性能问题。

list

MEMORY 

PERSIST: 移除键的过期时间，使其永久存在，适用于需要持久化的数据。
PEXPIRE: 设置键的过期时间（以毫秒为单位），用于控制数据的生命周期。
PEXPIREAT: 将键的过期时间设置为 Unix 毫秒时间戳，便于精确控制过期。
PEXPIRETIME: 返回键的过期时间（以 Unix 毫秒时间戳表示），用于检查过期状态。

OBJECT ENCODING: 返回 Redis 对象的内部编码，便于了解数据存储方式。
OBJECT FREQ: 返回 Redis 对象的对数访问频率计数器，帮助分析对象的使用情况。
OBJECT IDLETIME: 返回 Redis 对象自上次访问以来的时间，便于监控对象的活跃性。
OBJECT REFCOUNT: 返回键值的引用计数，帮助管理内存使用。

MONITOR: 实时监听服务器接收到的所有请求，便于调试和监控。
MOVE: 将一个键移动到另一个数据库，适用于数据库之间的数据管理。
MSET: 原子性地创建或修改一个或多个键的字符串值，便于批量操作。
MSETNX: 仅在所有键不存在时原子性地修改一个或多个键的字符串值，防止覆盖现有数据。
MULTI: 开始一个事务，允许将多个命令打包在一起执行。

MIGRATE: 原子性地将一个键从一个 Redis 实例转移到另一个实例，适用于数据迁移。
MODULE LIST: 返回所有已加载的模块，便于查看当前可用的扩展功能。
MODULE LOAD: 加载一个模块，允许扩展 Redis 的功能。
MODULE LOADEX: 使用扩展参数加载模块，提供更多配置选项。
MODULE UNLOAD: 卸载一个模块，适用于移除不再需要的功能。

PFADD
    向 HyperLogLog 键添加元素，如果键不存在则创建该键，适用于大规模数据的基数估计。

PSYNC: 用于复制的内部命令，处理主从复制中的数据同步。
QUIT: 关闭与 Redis 服务器的连接，适用于结束会话。
RESET: 重置连接，通常用于清理状态。

PUBSUB
    过期与订阅

RANDOMKEY
    键管理命令

角色和复制命令
    启用对 Redis 集群副本节点的只读查询，适用于负载均衡。

RPOP
    返回并移除列表的最后一个元素，如果最后一个元素被移除则删除列表。

set

SCRIPT

TS
    时间序列



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
1:M 31 Mar 2025 10:15:53.910 * Reading RDB base file on AOF loading...ßß
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

## redis 存储太大了
```

org.springframework.data.redis.serializer.SerializationException: Could not read JSON:String value length (20051112) exceeds the maximum allowed (20000000, from `StreamReadConstraints.getMaxStringLength()`) 

	at org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer.deserialize(GenericJackson2JsonRedisSerializer.java:311)
	at org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer.deserialize(GenericJackson2JsonRedisSerializer.java:281)
	at org.springframework.data.redis.core.AbstractOperations.deserializeValue(AbstractOperations.java:380)
	at org.springframework.data.redis.core.AbstractOperations$ValueDeserializingRedisCallback.doInRedis(AbstractOperations.java:63)
	at org.springframework.data.redis.core.RedisTemplate.execute(RedisTemplate.java:411)
	at org.springframework.data.redis.core.RedisTemplate.execute(RedisTemplate.java:378)
	at org.springframework.data.redis.core.AbstractOperations.execute(AbstractOperations.java:117)
	at org.springframework.data.redis.core.DefaultValueOperations.get(DefaultValueOperations.java:49)
	at com.cjlabs.redis.TestRedisTemplateBigValue.redisTemplateReadBigValue(TestRedisTemplateBigValue.java:66)
	at java.base/java.lang.reflect.Method.invoke(Method.java:568)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
	at java.base/java.util.ArrayList.forEach(ArrayList.java:1511)
Caused by: com.fasterxml.jackson.core.exc.StreamConstraintsException: String value length (20051112) exceeds the maximum allowed (20000000, from `StreamReadConstraints.getMaxStringLength()`)
	at com.fasterxml.jackson.core.StreamReadConstraints._constructException(StreamReadConstraints.java:654)
	at com.fasterxml.jackson.core.StreamReadConstraints.validateStringLength(StreamReadConstraints.java:589)
	at com.fasterxml.jackson.core.util.ReadConstrainedTextBuffer.validateStringLength(ReadConstrainedTextBuffer.java:27)
	at com.fasterxml.jackson.core.util.TextBuffer.finishCurrentSegment(TextBuffer.java:1017)
	at com.fasterxml.jackson.core.json.UTF8StreamJsonParser._finishString2(UTF8StreamJsonParser.java:2544)
	at com.fasterxml.jackson.core.json.UTF8StreamJsonParser._finishAndReturnString(UTF8StreamJsonParser.java:2520)
	at com.fasterxml.jackson.core.json.UTF8StreamJsonParser.getText(UTF8StreamJsonParser.java:294)
	at com.fasterxml.jackson.databind.deser.std.BaseNodeDeserializer._deserializeAnyScalar(JsonNodeDeserializer.java:667)
	at com.fasterxml.jackson.databind.deser.std.JsonNodeDeserializer.deserialize(JsonNodeDeserializer.java:109)
	at com.fasterxml.jackson.databind.deser.std.JsonNodeDeserializer.deserialize(JsonNodeDeserializer.java:25)
	at org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer$TypeResolver.readTree(GenericJackson2JsonRedisSerializer.java:402)
	at org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer$TypeResolver.resolveType(GenericJackson2JsonRedisSerializer.java:366)
	at org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer.resolveType(GenericJackson2JsonRedisSerializer.java:341)
	at org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer.deserialize(GenericJackson2JsonRedisSerializer.java:309)
	... 11 more


```

```
默认20M
```

```
1M

数据存储完成！
读取 String 结构耗时: 50 毫秒
set size: 10
读取 Set 结构耗时: 33 毫秒
读取 Hash 结构耗时: 23 毫秒
读取 List 结构耗时: 20 毫秒
zsetValues size: 10
读取 ZSet 结构耗时: 26 毫秒
数据读取完成！


18M

数据存储完成！
读取 String 结构耗时: 414 毫秒
set size: 10
读取 Set 结构耗时: 444 毫秒
读取 Hash 结构耗时: 335 毫秒
读取 List 结构耗时: 353 毫秒
zsetValues size: 10
读取 ZSet 结构耗时: 532 毫秒
数据读取完成！

```







