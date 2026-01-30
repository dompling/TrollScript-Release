# TrollScript

<p align="center">
  <img src="https://raw.githubusercontent.com/dompling/TrollScript-Release/main/AppIcon.png" width="128" height="128" alt="TrollScript Logo">
</p>

<p align="center">
  <strong>基于 TrollStore 的 iOS JavaScript 脚本执行器</strong>
</p>

<p align="center">
  <a href="https://github.com/dompling/TrollScript-Release/releases/latest">
    <img src="https://img.shields.io/github/v/release/dompling/TrollScript-Release?style=flat-square" alt="Release">
  </a>
  <img src="https://img.shields.io/badge/iOS-16.0%2B-blue?style=flat-square" alt="iOS 16.0+">
  <img src="https://img.shields.io/badge/TrollStore-Required-orange?style=flat-square" alt="TrollStore Required">
  <a href="https://github.com/dompling/TrollScript-Release/releases">
    <img src="https://img.shields.io/github/downloads/dompling/TrollScript-Release/total?style=flat-square" alt="Downloads">
  </a>
</p>

---

## 简介

TrollScript 是一款利用 TrollStore 特权的 iOS JavaScript 脚本执行器。通过内置的 JavaScript 运行时，你可以编写和执行各种自动化脚本，访问系统级
API，实现普通 App 无法完成的功能。

## 功能特性

- **脚本管理** - 创建、编辑、删除、导入导出脚本
- **语法高亮** - 内置代码编辑器，支持 JavaScript 语法高亮
- **丰富的 API** - 15+ 原生模块，覆盖网络、位置、通知等功能
- **通知触发** - 监听指定 App 通知，自动执行脚本
- **iCloud 同步** - 支持 CloudKit 数据库和 iCloud Drive 两种同步模式
- **快捷指令** - 完整 App Intents 支持，可在快捷指令中运行脚本
- **版本更新** - 应用内检测新版本
- **崩溃恢复** - 内置崩溃捕获与恢复机制
- **性能监控** - 实时内存、CPU、FPS 监控

## 系统要求

- iOS 16.0 或更高版本
- 已安装 [TrollStore](https://github.com/opa334/TrollStore)

## JavaScript API

TrollScript 内置丰富的原生模块，[查看完整中文 API 文档](API.md) [查看完整 English API 文档](API.en.md)。

> [示例脚本 (TrollScript-Store)](https://github.com/dompling/TrollScript-Release/tree/main/templates/TestScripts)

## 触发器

| 类型   | 说明                                         |
|------|--------------------------------------------|
| 定时任务 | Cron 定时执行脚本                                |
| 剪切板  | 复制了特定的文字内容之后触发脚本                           |
| 文件监控 | 文件变化的时候触发                                  |
| 通知监控 | APP 发送通知的时候，触发脚本（兼容性未知 作者的手机系统：IOS 16.3.1） |

> 脚本同时触发，可能会发生崩溃或者其他未知问题，请注意使用。可以反馈修复。

### 全局参数

1. **$triggerInput**
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

2. **$args**
    - 快捷指令参数

```typescript
interface $args {
    text?: string           // 输入内容
    json?: string           // 输入JSON
}
```

3. **脚本返回值**
   - 控制台显示返回值
   - 返回给快捷指令
```javascript
const test = "123"
return test;
```

## 安装方式

### 方式一：直接下载

1. 前往 [Releases](https://github.com/dompling/TrollScript-Release/releases/latest) 页面
2. 下载最新的 `.tipa` 文件
3. 在 TrollStore 中安装

### 方式二：URL Scheme 安装

如果已安装 TrollStore，可以点击以下链接直接安装:

```
apple-magnifier://install?url=https://github.com/dompling/TrollScript-Release/releases/latest/download/TrollScript_latest.tipa
```

## 高级功能

### 脚本导入/导出

支持两种导出格式：

- `.trollscript` - 完整格式，包含代码和元数据
- `.js` - 纯 JavaScript 代码

导入支持：`.trollscript`、`.js`、`.json`、`.txt` 格式

### 脚本商店

TrollScript 支持脚本商店功能，通过脚本商店可以方便地获取和分享脚本。

[默认商店 (TrollScript-Store)](https://github.com/dompling/TrollScript-Store)

### URL Scheme

TrollScript 支持多种 URL Scheme，可用于从其他应用快速操作：

#### 安装脚本

从 URL 下载并导入脚本：

```
trollscript://install?url=https://example.com/script.js
```

#### 商店安装

从脚本商店直接安装脚本（用于商店一键安装）：

```
trollscript://store?id=脚本ID&name=脚本名称&url=https://example.com/script.js
```

| 参数     | 说明             |
|--------|----------------|
| `id`   | 脚本唯一标识（用于版本追踪） |
| `name` | 脚本显示名称         |
| `url`  | 脚本下载地址         |

#### 运行脚本

通过脚本 ID 或名称运行已安装的脚本：

```
trollscript://run?id=脚本UUID
trollscript://run?name=脚本名称
```

#### 导入脚本

通过 Base64 编码的内容导入脚本：

```
trollscript://import?content=Base64编码内容&name=脚本名称
```

#### 打开应用

仅打开 TrollScript 应用：

```
trollscript://open
```

#### 添加商店订阅

通过 URL 添加脚本商店订阅源：

```
trollscript://subscribe?name=订阅源名称&url=https://example.com/store.json
```

| 参数     | 说明          |
|--------|-------------|
| `name` | 订阅源显示名称     |
| `url`  | 订阅源 JSON 地址 |

### NPM 支持

为了方便开发者编写脚本，提供了 TypeScript 定义包：

[![npm version](https://badge.fury.io/js/%40dompling%2Ftrollscript-types.svg)](https://www.npmjs.com/package/@dompling/trollscript-types)

```bash
npm install --save-dev @dompling/trollscript-types
```

## 截图

<p align="center">
  <img src="images/2781768272086_.pic_hd-portrait.png" width="35%" alt="Screenshot 3">
  <img src="images/2791768272087_.pic_hd-portrait.png" width="35%" alt="Screenshot 4">
</p>
<p align="center">
  <img src="images/2761768272084_.pic_hd-left.png" width="35%" alt="Screenshot 1">
  <img src="images/2771768272085_.pic_hd-left.png" width="35%" alt="Screenshot 2">
</p>

## 更新日志

查看 [Releases](https://github.com/dompling/TrollScript-Release/releases) 获取完整更新日志。

## 反馈问题

如遇问题，请在 [Issues](https://github.com/dompling/TrollScript-Release/issues) 中反馈。

## 免责声明

- 本项目仅供学习研究使用
- 请勿用于非法用途
- 使用本软件产生的任何后果由用户自行承担

## 致谢

- [TrollStore](https://github.com/opa334/TrollStore)
- [Highlightr](https://github.com/raspu/Highlightr)

---

<p align="center">
  Made with ❤️
</p>
