
# 文章
得物
https://tech.meituan.com/2016/11/18/disruptor.html
https://www.iteye.com/blog/brokendreams-2255720
http://ifeve.com/dissecting-disruptor-whats-so-special/
https://github.com/LMAX-Exchange/disruptor/wiki/Performance-Results
https://lmax-exchange.github.io/disruptor/
https://logging.apache.org/log4j/2.x/manual/async.html

## 实战文档
https://juejin.cn/post/6844904095573114893?from=search-suggest
https://www.sofastack.tech/blog/sofa-trcaer-disruptor-practice/


# 和其他技术的区别
```
ArrayBlockingQueue是基于数组ArrayList实现的，通过ReentrantLock独占锁保证线程安全；
Disruptor是基于环形数组队列RingBuffer实现的，通过CAS乐观锁保证线程安全。在多种生产者-消费者模式下的性能对比。
```

# Disruptor 的使用场景
```
加密货币交易撮合引擎
Log4j2基于Disruptor实现的异步日志处理
Canal+Disruptor实现高效的数据同步
知名开源框架Apache Strom
```

## 撮合应用的特点
```
纯内存的、CPU密集型的
应用启动时加载数据库未处理订单、写日志、撮合成功发送消息到MQ会涉及IO操作。

有状态的
正因为应用是有状态的，所以需要通过Disruptor提升单机的性能和吞吐量。

在学习或者实际做架构设计时，一般大多数情况都建议将应用设计为无状态的，可以通过水平扩展，实现应用的高可用、高性能。而有状态的应用一般有单点故障问题，难以通过水平扩展提升应用的性能，但是做架构设计的时候，还是需要从实际的场景出发，而撮合应用场景很显然更适合设计成有状态的。在数字加密货币交易平台，每一种数字加密货币都是由唯一的“交易对”去标识的，类似股票交易中的股票代码，针对不同交易对的买卖交易单是天然隔离的，而同种交易对的买卖交易单必须是在同一个应用去处理的，否则匹配撮合的时候是有问题的。如果使用无状态的设计，那么所有的交易对都必须在一个集群内处理，而且每个应用都必须要有全量交易对的订单数据，这样就会存在两个问题：多个应用撮合匹配结果不一致，以哪个为准、热点交易对如何做隔离，所以解决方案就是根据交易对维度对订单做分片，同一个交易对的订单消息路由到同一个撮合应用进行处理，这样其实就是将撮合应用设计成有状态的。每一种交易对每个时刻有且只有一个应用能处理，然后再通过k8s的Liveness和Readiness探针做自动故障转移和恢复来解决单点故障的问题，最后通过本地缓存Caffeine+高性能队列Disruptor提升单pod的吞吐量。16C64G的配置在实际业务场景压测的结果是，单机最大TPS在200w/s左右，对于整个交易系统而言性能瓶颈已经不在撮合应用，因为极端情况下可以配置成一个pod处理一个交易对。

```

# 消费者模式
```
单消费者

多消费者广播模式

消费者组模式，按顺序消费

after自定义消费模式

https://github.com/jamie20241210/jamie_relearning_mq/tree/disruptor_1

```
## sequence

## endOfBatch
一组消息的最后一个。
```
protected void onEvent(ClearingEvent event, boolean endOfBatch) throws Exception {

    //非订单刷新/账户刷新 才更新底层redis
    String requestType = event.getRequest().getType();
    if(!"order.flush".equals(requestType) &&  !"account.recover".equals(requestType)){
      this.results.addAll(event.getClearingResults());
    }

    this.deduplicationInfos.addAll(event.getDeduplicationInfos());
    this.configs.putAll(event.getSystemConfigs());

    if (endOfBatch) {
      persist(event.getOffset());

      this.deduplicationInfos.clear();
      this.results.clear();
      this.configs.clear();
    }
  }
```




# 消费者等待策略
Wait Strategy：等待策略，定义了当消费者无法从 RingBuffer 获取数据时，如何等待。

# 时间循环处理器
Event Processor：事件循环处理器，EventProcessor 继承了 Runnable 接口，它的子类实现了 run 方法，内部有一个 while 循环，不断尝试从 RingBuffer 中获取数据，交给 EventHandler 去处理。

# 定序器
Sequence：RingBuffer 是一个数组，Sequence （序号）就是用来标记生产者数据生产到哪了，消费者数据消费到哪了。

Sequencer：分为单生产者和多生产者两种实现，生产者发布数据时需要先申请下可用序号，Sequencer 就是用来协调申请序号的。

Sequence Barrier：见下文分析。


# 使用建议

Disruptor 是基于生产者消费者模式，如果生产快消费慢，就会导致生产者无法写入数据。因此，不建议在 Disruptor 消费线程中处理耗时较长的业务。

一个 EventHandler 对应一个线程，一个线程只服务于一个 EventHandler。Disruptor 需要为每一个EventHandler（EventProcessor） 创建一个线程。因此在创建 Disruptor 时不推荐传入指定的线程池，而是由 Disruptor 自身根据 EventHandler 数量去创建对应的线程。





