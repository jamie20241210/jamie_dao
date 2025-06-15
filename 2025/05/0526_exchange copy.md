

googleauth
spring-boot-starter-data-redis
redisson
pagehelper
micrometer
undertow
xxljob-autoregister-spring-boot-starter
redisson
lombok

第三方登录对接

安全
数据库的保存，需要安全措施

内部操作风控
外部操作风控

所有的配置都在Apollo中

# 注意事项
## 多语言

## 批量操作

## 安全控制，东西需要加密存储
private String username;
private String email;
private String passwordHash;
private String salt;
超过一定次数就锁定
private Boolean accountLocked;
private Integer failedAttempts;

加密存储的totp字段
private byte[] totpSecretEncrypted;
private Boolean totpEnabled;

恢复邮箱
private String recoveryEmail;
恢复手机号码

最后一次使用的totp验证码
防止重复使用


aes加密或者揭秘，直接是放在Apollo等配置中心中
是单独部署的一套，或者单独的namespace，因为太过于重要了。

jwt绑定ip，
jwt，签发时间
jwt，过期时间
jwt绑定ip，限制登录地点
jwt绑定权限（不太正常）user admin
绑定用户的ua，浏览器的hash值，防止盗用
jwtid，记录当个token的使用记录。
管理用户的多个token。。可以单独的剔除单设备的token

异地登陆检测

在token过期前30%的时间内，自动刷新
扫码登录，前端生成二维码
登陆接口，必须输入ga

30分钟 没有操作电脑，那就直接需要重新登录
超管只能在工作时间登录

一些低风险接口，无所谓。

网关
xss
csrf

系统操作日志，
异常行为监测
强制开启https，如果是http直接转到https
log打印时脱敏，


网关以及服务间通讯，需要通过专门的通讯工具。





