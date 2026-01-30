# 功能介绍

## 触发器

| 类型   | 说明                                         |
|------|--------------------------------------------|
| 定时任务 | Cron 定时执行脚本                                |
| 剪切板  | 复制了特定的文字内容之后触发脚本                           |
| 文件监控 | 文件变化的时候触发                                  |
| 通知监控 | APP 发送通知的时候，触发脚本（兼容性未知 作者的手机系统：IOS 16.3.1） |

> 脚本同时触发，可能会发生崩溃或者其他未知问题，请注意使用。可以反馈修复。

## 全局参数

> 特定环境下才会有

**$triggerInput**
- 通知监控参数

```typescript
interface $triggerInput {
    type: "notification";     // 触发类型
    bundleId: string;         // 来源 App Bundle ID
    title: string;            // 通知标题
    message: string;          // 通知内容
    timestamp: number;        // 时间戳 (毫秒)
}
```

**$args**
- 快捷指令参数

```typescript
interface $args {
    text?: string           // 输入内容
    json?: string           // 输入JSON
}
```

**脚本返回值**

- 控制台显示返回值
- 返回给快捷指令

```javascript
const test = "123"
return test;
```
