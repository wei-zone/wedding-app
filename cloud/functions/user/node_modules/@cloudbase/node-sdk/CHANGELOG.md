# v2.1.1

-   [fix] 修复数据库处理 query 或 data 内容时 undefined 转为 null 导致报错的问题

# v2.1.0

-   [add] 新增获取云函数下全部环境变量方法 getCloudbaseContext
-   [add] 请求时对 env 参数校验，若 init 时未指定 env，则 warning 提示使用默认环境， 若指定 env 但请求时发现为空，则抛错处理
-   [add] createTicket 时 校验私钥中环境与 init 指定环境是否一致，不一致则报错

# v2.0.2

-   [add] 新增扩展注册，调用方法

# v2.0.1

-   [fix] 修复 db transaction add 接口未携带事务 ID 导致异常问题

# v2.0.0

-   [add] 支持 db 新特性&灰度兼容

# v1.1.1

-   [fix] 修复函数调函数时请求签名问题

# v1.1.0

-   [add] 支持函数灰度发布
-   [fix] 修复 elemMatch 中使用 neq 无效 bug

# v1.0.2

-   [fix] 本地调试逻辑优化

# v1.0.0

-   [add] 迁移 tcb-admin-node sdk 功能至本仓库
