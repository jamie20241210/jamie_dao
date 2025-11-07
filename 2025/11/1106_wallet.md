

```
1/ 并发扫块，如何处理，因为会有很多异常的区块，，，，记录异常的区块么？
2/ 并发扫块，如何确保大家都在扫不同的区块。
3/ 大区块，一个区块需要扫描很久，block + tx，，有什么办法？

4/ 我们应该按照链扫块，还是按照币种扫块
5/ 


主任务负责主流程（扫块 + 正常入账）；
失败的块/交易 记录下来；
独立任务（补偿任务） 异步处理失败记录。





```





```
CREATE TABLE `config_chain`
(
    `id`                                  BIGINT UNSIGNED                            NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `chain_code`                          VARCHAR(50)                                NOT NULL COMMENT '链编码（唯一标识，如 ETH、BSC、TRON、SOL）',
    `chain_name`                          VARCHAR(50)                                NOT NULL COMMENT '链名称，如 BNB Smart Chain',
    `chain_id`                            VARCHAR(50)                                         DEFAULT NULL COMMENT '链ID（EVM 链 chainId，如 1）',
    
    `rpc_url`                             VARCHAR(500)                               NOT NULL COMMENT '主 RPC 节点 URL',
    `rpc_timeout_ms`                      INT                                        NOT NULL DEFAULT 10000 COMMENT 'RPC 超时时间（毫秒）',
    
    `explorer_url`                        VARCHAR(255)                                        DEFAULT NULL COMMENT '区块浏览器 URL 前缀',
    `explorer_tx_path`                    VARCHAR(100)                               NOT NULL DEFAULT '/tx/' COMMENT '交易浏览路径',
    `explorer_addr_path`                  VARCHAR(100)                               NOT NULL DEFAULT '/address/' COMMENT '地址浏览路径',
    `explorer_token_path`                 VARCHAR(100)                               NOT NULL DEFAULT '/token/' COMMENT '代币浏览路径',
    `explorer_block_path`                 VARCHAR(100)                               NOT NULL DEFAULT '/block/' COMMENT '区块浏览路径',
    
    `deposit_confirm_number_default`      INT                                        NOT NULL DEFAULT 64 COMMENT '默认充值确认数',
    `withdraw_confirm_number_default`     INT                                        NOT NULL DEFAULT 64 COMMENT '默认提现确认数',
   
    `layer2_flag`                         TINYINT                                    NOT NULL DEFAULT 0 COMMENT '是否为 L2 链（0=否，1=是）',
    `fast_deposit_confirm_number_default` INT                                        NOT NULL DEFAULT 6 COMMENT '默认快速确认数（L2 快速入账）',
    `fast_deposit_enabled_default`        TINYINT                                    NOT NULL DEFAULT 0 COMMENT '是否默认支持快速入账',
    `withdraw_l1_confirm_default`         TINYINT                                    NOT NULL DEFAULT 0 COMMENT '默认提现是否要求 L1 完整确认',
    
    `scan_batch_size`                     INT                                        NOT NULL DEFAULT 50 COMMENT '每次扫链区块批次大小',
    `scan_max_range`                      INT                                        NOT NULL DEFAULT 1000 COMMENT '单次扫描最大区块范围',
    `big_block_flag`                      TINYINT                                    NOT NULL DEFAULT 0 COMMENT '是否大区块链',
    `need_memo_flag`                      TINYINT                                    NOT NULL DEFAULT 0 COMMENT '是否需要 Memo/Tag（默认）',
    
    `support_smart_contract`              TINYINT                                    NOT NULL DEFAULT 0 COMMENT '是否支持智能合约',
    `support_token`                       TINYINT                                    NOT NULL DEFAULT 0 COMMENT '是否支持代币',
    
    `scan_flag_default`                   TINYINT                                    NOT NULL DEFAULT 1 COMMENT '默认扫链开关',
    `collect_flag_default`                TINYINT                                    NOT NULL DEFAULT 1 COMMENT '默认归集开关',
    
    `third_gas_pay_flag_default`          TINYINT                                    NOT NULL DEFAULT 1 COMMENT '默认是否支持第三方代付 Gas',
    `third_gas_pay_amount_default`        DECIMAL(36, 18)                            NOT NULL DEFAULT 0 COMMENT '默认第三方代付 Gas 数量',
     
    `collect_threshold_default`           DECIMAL(36, 18)                            NOT NULL DEFAULT 0 COMMENT '默认归集阈值',
    `collect_reserve_amount_default`      DECIMAL(36, 18)                            NOT NULL DEFAULT 0 COMMENT '默认归集保留金额',

    `sort_order`                          INT                                        NOT NULL DEFAULT 0 COMMENT '排序',
    `visible_flag`                        TINYINT                                    NOT NULL DEFAULT 1 COMMENT '是否前端可见',
   
    `extra_config`                        JSON                                                DEFAULT NULL COMMENT '扩展配置',
    `remark`                              VARCHAR(500)                                        DEFAULT NULL COMMENT '备注',
   
   
    `del_flag`                            ENUM ('NORMAL', 'ABNORMAL')                NOT NULL DEFAULT 'NORMAL' COMMENT '删除标志',
    `create_user`                         VARCHAR(50)                                NOT NULL COMMENT '创建人',
    `create_date`                         BIGINT                                     NOT NULL COMMENT '创建时间（UTC 毫秒）',
    `update_user`                         VARCHAR(50)                                         DEFAULT NULL COMMENT '更新人',
    `update_date`                         BIGINT                                     NOT NULL COMMENT '更新时间（UTC 毫秒）',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_chain_code` (`chain_code`),
    KEY `idx_chain_status` (`chain_status`),
    KEY `idx_sort_order` (`sort_order`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4 COMMENT ='链配置表';



  CREATE TABLE `config_coin` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `coin_code` VARCHAR(50) NOT NULL COMMENT '币种编码（唯一标识，如 USDT、BTC、ETH）',
    `decimals` INT NOT NULL DEFAULT 18 COMMENT '币种精度',
    `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序',
    `icon_url` VARCHAR(500) DEFAULT NULL COMMENT '币种图标 URL',
   
    `extra_config` JSON DEFAULT NULL COMMENT '扩展配置',
    `remark` VARCHAR(500) DEFAULT NULL COMMENT '备注',
    `del_flag` ENUM('NORMAL', 'ABNORMAL') NOT NULL DEFAULT 'NORMAL' COMMENT '删除标志',
    `create_user` VARCHAR(50) NOT NULL COMMENT '创建人',
    `create_date` BIGINT NOT NULL COMMENT '创建时间（UTC 毫秒）',
    `update_user` VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    `update_date` BIGINT NOT NULL COMMENT '更新时间（UTC 毫秒）',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_coin_code` (`coin_code`),
    KEY `idx_coin_status` (`coin_status`),
    KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='币种配置表';



CREATE TABLE `config_chain_coin` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
    `chain_code` VARCHAR(50) NOT NULL COMMENT '链编码（关联 config_chain.chain_code）',
    `coin_code` VARCHAR(50) NOT NULL COMMENT '币种编码（关联 config_coin.coin_code）',
    `contract_address` VARCHAR(100) DEFAULT NULL COMMENT '合约地址（主链币为 NULL）',
    `coin_type` ENUM('MASTER_COIN', 'TOKEN_COIN') NOT NULL DEFAULT 'TOKEN_COIN' COMMENT '币种类型',
    
    `gas_price_min`                       DECIMAL(10, 4)                             NOT NULL DEFAULT 1.2000 COMMENT '默认 Gas 价格倍数',
    `gas_price_max`                       DECIMAL(10, 4)                             NOT NULL DEFAULT 1.2000 COMMENT '默认 Gas 价格倍数',

    `deposit_confirm_number` INT DEFAULT NULL COMMENT '覆盖充值确认数（NULL 使用链默认）',
    `withdraw_confirm_number` INT DEFAULT NULL COMMENT '覆盖提现确认数（NULL 使用链默认）',
    
    `fast_deposit_confirm_number` INT DEFAULT NULL COMMENT '覆盖快速确认数',
    `fast_deposit_enabled` TINYINT DEFAULT NULL COMMENT '覆盖是否支持快速入账',
    `withdraw_l1_confirm` TINYINT DEFAULT NULL COMMENT '覆盖提现是否要求 L1 完整确认',
    `need_memo_flag` TINYINT DEFAULT NULL COMMENT '覆盖是否需要 Memo/Tag',
    `scan_flag` TINYINT DEFAULT NULL COMMENT '覆盖扫链开关',
    `collect_flag` TINYINT DEFAULT NULL COMMENT '覆盖归集开关',
    `third_gas_pay_flag` TINYINT DEFAULT NULL COMMENT '覆盖是否第三方代付 Gas',
    `third_gas_pay_amount` DECIMAL(36, 18) DEFAULT NULL COMMENT '覆盖第三方代付 Gas 数量',
    `gas_price_multiplier` DECIMAL(10, 4) DEFAULT NULL COMMENT '覆盖 Gas 价格倍数',
    `gas_limit` BIGINT DEFAULT NULL COMMENT '覆盖 Gas Limit',
    `min_deposit_amount` DECIMAL(36, 18) NOT NULL DEFAULT 0 COMMENT '最小充值金额',
    `min_withdraw_amount` DECIMAL(36, 18) NOT NULL DEFAULT 0 COMMENT '最小提现金额',
    `withdraw_fee_type` ENUM('FIXED', 'PERCENTAGE', 'DYNAMIC') NOT NULL DEFAULT 'FIXED' COMMENT '提现手续费类型',
    `withdraw_fee_fixed` DECIMAL(36, 18) NOT NULL DEFAULT 0 COMMENT '固定手续费值',
    `withdraw_fee_percentage` DECIMAL(10, 6) NOT NULL DEFAULT 0 COMMENT '百分比手续费',
    `withdraw_fee_min` DECIMAL(36, 18) NOT NULL DEFAULT 0 COMMENT '手续费最小值',
    `withdraw_fee_max` DECIMAL(36, 18) NOT NULL DEFAULT 0 COMMENT '手续费最大值',
    `withdraw_fee_coin_code` VARCHAR(50) DEFAULT NULL COMMENT '手续费币种',
    `withdraw_enabled` TINYINT NOT NULL DEFAULT 1 COMMENT '是否允许提现',
    `collect_threshold` DECIMAL(36, 18) DEFAULT NULL COMMENT '覆盖归集阈值',
    `collect_target_address` VARCHAR(100) DEFAULT NULL COMMENT '归集目标地址',
    `collect_reserve_amount` DECIMAL(36, 18) DEFAULT NULL COMMENT '覆盖归集保留金额',
    `scan_enabled` TINYINT NOT NULL DEFAULT 1 COMMENT '是否扫描该币种',
    `status` ENUM('ACTIVE', 'MAINTENANCE', 'DISABLED') NOT NULL DEFAULT 'ACTIVE' COMMENT '状态',
    `maintenance_start_time` BIGINT DEFAULT NULL COMMENT '维护开始时间',
    `maintenance_end_time` BIGINT DEFAULT NULL COMMENT '维护结束时间',
    `sort_order` INT NOT NULL DEFAULT 0 COMMENT '排序',
    `extra_config` JSON DEFAULT NULL COMMENT '扩展配置',
    `remark` VARCHAR(500) DEFAULT NULL COMMENT '备注',
    `del_flag` ENUM('NORMAL', 'ABNORMAL') NOT NULL DEFAULT 'NORMAL' COMMENT '删除标志',
    `create_user` VARCHAR(50) NOT NULL COMMENT '创建人',
    `create_date` BIGINT NOT NULL COMMENT '创建时间（UTC 毫秒）',
    `update_user` VARCHAR(50) DEFAULT NULL COMMENT '更新人',
    `update_date` BIGINT NOT NULL COMMENT '更新时间（UTC 毫秒）',
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_chain_coin_contract` (`chain_code`, `coin_code`, `contract_address`),
    KEY `idx_chain_code` (`chain_code`),
    KEY `idx_coin_code` (`coin_code`),
    KEY `idx_contract_address` (`contract_address`),
    KEY `idx_status` (`status`),
    KEY `idx_is_default` (`is_default`),
    KEY `idx_sort_order` (`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='链币种关联配置表';



```