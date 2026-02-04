# TrollScript API Reference (v1.2.0)

TrollScript provides a powerful JavaScript environment with access to various system features. Below is the comprehensive API reference for all available modules.

## Trigger Compatibility Legend

The following icons indicate API compatibility when running in background trigger mode:

| Icon | Status | Description |
|:----:|--------|-------------|
| ✅ | **Full** | 完全支持 - 在触发器下可正常运行 |
| ⚠️ | **Limited** | 有限支持 - 部分功能可能受限或不生效 |
| ❌ | **None** | 不支持 - 需要前台运行，触发器下不可用 |

---

## Table of Contents

- [console](#console) ✅ - 控制台输出
- [device](#device) ✅ - 设备信息
- [clipboard](#clipboard) ⚠️ - 剪贴板操作
- [storage](#storage) ✅ - 本地存储
- [icloud](#icloud) ✅ - iCloud 文件操作
- [file](#file) ✅ - 文件操作
- [http](#http) ✅ - 网络请求（异步 Promise 模式）
- [network](#network) ⚠️ - 网络操作
- [app](#app) ⚠️ - 应用操作与管理
- [haptic](#haptic) ⚠️ - 触觉反馈
- [display](#display) ⚠️ - 显示控制
- [hud](#hud) ✅ - HUD 浮窗系统 - 创建悬浮窗口和 UI 元素
- [util](#util) ✅ - 工具函数
- [location](#location) ⚠️ - 定位服务
- [calendar](#calendar) ⚠️ - 系统日历
- [reminder](#reminder) ⚠️ - 提醒事项
- [contacts](#contacts) ⚠️ - 通讯录操作
- [sms](#sms) ✅ - 短信操作
- [sql](#sql) ✅ - SQLite 数据库操作
- [shortcuts](#shortcuts) ❌ - 快捷指令操作
- [system](#system) ✅ - 系统设置控制

---

## console

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

控制台输出

### `console.log`

**Signature:** `log(...args)`

输出日志信息

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | 要输出的内容 | No |

**Returns:** `void`

---

### `console.error`

**Signature:** `error(...args)`

输出错误信息

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | 要输出的内容 | No |

**Returns:** `void`

---

### `console.warn`

**Signature:** `warn(...args)`

输出警告信息

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | 要输出的内容 | No |

**Returns:** `void`

---

### `console.info`

**Signature:** `info(...args)`

输出提示信息

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | 要输出的内容 | No |

**Returns:** `void`

---

### `console.debug`

**Signature:** `debug(...args)`

输出调试信息

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | 要输出的内容 | No |

**Returns:** `void`

---

### `console.clear`

**Signature:** `clear()`

清空控制台

**Returns:** `void`

---

## device

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

设备信息

### `device.info`

**Signature:** `info()`

获取设备信息

**Returns:** `{ name: string, model: string, systemName: string, systemVersion: string, identifier: string }`

*包含设备名称、型号、系统版本等信息的对象*

---

### `device.battery`

**Signature:** `battery()`

获取电池信息

**Returns:** `{ level: number, state: string, lowPowerMode: boolean }`

*包含电量(0-1)、充电状态、低电量模式等信息的对象*

---

### `device.screen`

**Signature:** `screen()`

获取屏幕信息

**Returns:** `{ width: number, height: number, scale: number, brightness: number }`

*包含屏幕尺寸、缩放比例、亮度等信息的对象*

---

## clipboard

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

剪贴板操作

### `clipboard.getText`

**Signature:** `getText()`

获取剪贴板文本

**Returns:** `string`

*剪贴板中的文本内容*

---

### `clipboard.setText`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `setText(text)`

设置剪贴板文本

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `text` | `string` | 要设置的文本内容 | No |

**Returns:** `void`

---

### `clipboard.clear`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `clear()`

清空剪贴板

**Returns:** `void`

---

### `clipboard.hasText`

**Signature:** `hasText()`

检查剪贴板是否包含文本

**Returns:** `boolean`

*剪贴板是否有文本内容*

---

## storage

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

本地存储

### `storage.get`

**Signature:** `get(key)`

获取存储值

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | 键名 | No |

**Returns:** `any`

*存储的值，如果不存在返回 undefined*

---

### `storage.set`

**Signature:** `set(key, value)`

设置存储值

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | 键名 | No |
| `value` | `any` | 要存储的值 | No |

**Returns:** `void`

---

### `storage.remove`

**Signature:** `remove(key)`

删除存储值

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | 键名 | No |

**Returns:** `void`

---

### `storage.clear`

**Signature:** `clear()`

清空所有存储

**Returns:** `void`

---

### `storage.has`

**Signature:** `has(key)`

检查键是否存在

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | 键名 | No |

**Returns:** `boolean`

*是否存在*

---

### `storage.keys`

**Signature:** `keys()`

获取所有存储的键

**Returns:** `string[]`

*所有键名的数组*

---

## icloud

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

iCloud 文件操作

### `icloud.containerPath`

**Signature:** `containerPath()`

获取 iCloud 容器路径

**Returns:** `string \| null`

*iCloud 容器的本地路径，不可用时返回 null*

---

### `icloud.read`

**Signature:** `read(path)`

读取 iCloud 文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径（相对于 iCloud 容器） | No |

**Returns:** `string`

*文件内容*

---

### `icloud.write`

**Signature:** `write(path, content)`

写入 iCloud 文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |
| `content` | `string` | 要写入的内容 | No |

**Returns:** `boolean`

*是否写入成功*

---

### `icloud.delete`

**Signature:** `delete(path)`

删除 iCloud 文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |

**Returns:** `boolean`

*是否删除成功*

---

### `icloud.list`

**Signature:** `list(path?)`

列出 iCloud 目录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 目录路径，默认为根目录 | Yes |

**Returns:** `[string]`

*文件名列表数组*

---

## file

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

文件操作

### `file.read`

**Signature:** `read(path)`

读取文件内容

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件绝对路径 | No |

**Returns:** `string`

*文件内容*

---

### `file.write`

**Signature:** `write(path, content)`

写入文件内容

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件绝对路径 | No |
| `content` | `string` | 要写入的内容 | No |

**Returns:** `boolean`

*是否写入成功*

---

### `file.append`

**Signature:** `append(path, content)`

追加文件内容

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件绝对路径 | No |
| `content` | `string` | 要追加的内容 | No |

**Returns:** `boolean`

*是否追加成功*

---

### `file.exists`

**Signature:** `exists(path)`

检查文件是否存在

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件绝对路径 | No |

**Returns:** `boolean`

*文件是否存在*

---

### `file.delete`

**Signature:** `delete(path)`

删除文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件绝对路径 | No |

**Returns:** `boolean`

*是否删除成功*

---

### `file.move`

**Signature:** `move(from, to)`

移动文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `from` | `string` | 源路径 | No |
| `to` | `string` | 目标路径 | No |

**Returns:** `boolean`

*是否移动成功*

---

### `file.copy`

**Signature:** `copy(from, to)`

复制文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `from` | `string` | 源路径 | No |
| `to` | `string` | 目标路径 | No |

**Returns:** `boolean`

*是否复制成功*

---

### `file.list`

**Signature:** `list(path)`

列出目录内容

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 目录路径 | No |

**Returns:** `[string]`

*文件名列表数组*

---

### `file.mkdir`

**Signature:** `mkdir(path)`

创建目录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 目录路径 | No |

**Returns:** `boolean`

*是否创建成功*

---

### `file.stat`

**Signature:** `stat(path)`

获取文件信息

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |

**Returns:** `{ size: number, modificationDate: number, creationDate: number, type: string }`

*包含大小(字节)、修改时间(时间戳)、创建时间(时间戳)、类型(file/directory)的对象*

---

### `file.isDirectory`

**Signature:** `isDirectory(path)`

判断是否是目录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |

**Returns:** `boolean`

*是否是目录*

---

### `file.documentsPath`

**Signature:** `documentsPath()`

获取文档目录路径

**Returns:** `string`

*Documents 目录的绝对路径*

---

### `file.cachePath`

**Signature:** `cachePath()`

获取缓存目录路径

**Returns:** `string`

*Caches 目录的绝对路径*

---

### `file.tempPath`

**Signature:** `tempPath()`

获取临时目录路径

**Returns:** `string`

*Temporary 目录的绝对路径*

---

### `file.debug`

**Signature:** `debug(path)`

调试路径访问权限详情

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |

**Returns:** `string`

*调试信息字符串*

---

### `file.rootRead`

**Signature:** `rootRead(path)`

使用 Root 权限读取受保护文件（需要 TrollStore）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件绝对路径 | No |

**Returns:** `string \| null`

*文件内容，读取失败返回 null*

---

### `file.rootList`

**Signature:** `rootList(path)`

使用 Root 权限列出受保护目录（需要 TrollStore）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 目录绝对路径 | No |

**Returns:** `[string] \| null`

*文件名列表，失败返回 null*

---

### `file.rootCopy`

**Signature:** `rootCopy(src, dest)`

使用 Root 权限复制受保护文件（需要 TrollStore）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `src` | `string` | 源文件路径 | No |
| `dest` | `string` | 目标文件路径 | No |

**Returns:** `boolean`

*是否复制成功*

---

### `file.rootCheck`

**Signature:** `rootCheck(path)`

使用 Root 权限检查路径信息（需要 TrollStore）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件或目录路径 | No |

**Returns:** `{ readable: boolean, writable: boolean, exists: boolean, isDirectory: boolean }`

*包含读写权限、存在状态等调试信息的对象*

---

### `file.rootExists`

**Signature:** `rootExists(path)`

使用 Root 权限检查文件是否存在（需要 TrollStore）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |

**Returns:** `boolean`

*是否存在*

---

### `file.rootAvailable`

**Signature:** `rootAvailable()`

检查 Root Helper 是否可用

**Returns:** `boolean`

*是否可用*

---

## http

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

网络请求（异步 Promise 模式）

### `http.get`

**Signature:** `get(url, options?)`

发送 GET 请求（异步，返回 Promise）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*返回 Promise，resolve 时包含成功状态、状态码、响应数据、响应头的对象。设置 sync: true 可使用同步模式*

---

### `http.post`

**Signature:** `post(url, options?)`

发送 POST 请求（异步，返回 Promise）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { body, headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*返回 Promise，resolve 时包含响应结果。设置 sync: true 可使用同步模式*

---

### `http.put`

**Signature:** `put(url, options?)`

发送 PUT 请求（异步，返回 Promise）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { body, headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*返回 Promise，resolve 时包含响应结果*

---

### `http.delete`

**Signature:** `delete(url, options?)`

发送 DELETE 请求（异步，返回 Promise）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*返回 Promise，resolve 时包含响应结果*

---

### `http.patch`

**Signature:** `patch(url, options?)`

发送 PATCH 请求（异步，返回 Promise）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { body, headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*返回 Promise，resolve 时包含响应结果*

---

### `http.head`

**Signature:** `head(url, options?)`

发送 HEAD 请求（异步，返回 Promise）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*返回 Promise，resolve 时包含响应结果（HEAD 请求通常 data 为空）*

---

### `http.request`

**Signature:** `request(url, options)`

发送自定义 HTTP 请求（异步，返回 Promise）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { method, body, headers, timeout, insecure, sync } | No |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*返回 Promise，resolve 时包含响应结果*

---

### `http.download`

**Signature:** `download(url, path, options?)`

下载文件（异步，返回 Promise）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 下载地址 | No |
| `path` | `string` | 保存路径 | No |
| `options` | `object` | 请求选项 { insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, path?: string, error?: string }>`

*返回 Promise，resolve 时包含成功状态和本地文件路径*

---

## network

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

网络操作

> **Trigger Note:** openSettings 方法需要 UI 交互，Daemon 模式下不可用

### `network.isReachable`

**Signature:** `isReachable()`

检查网络是否可用

**Returns:** `boolean`

*网络是否可用*

---

### `network.getConnectionType`

**Signature:** `getConnectionType()`

获取连接类型

**Returns:** `'wifi' \| 'cellular' \| 'none'`

*连接类型(wifi/cellular/none)*

---

### `network.getIPAddress`

**Signature:** `getIPAddress()`

获取设备 IP 地址

**Returns:** `string \| null`

*IP 地址*

---

### `network.encodeURL`

**Signature:** `encodeURL(string)`

URL 编码

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要编码的字符串 | No |

**Returns:** `string`

*编码后的 URL 字符串*

---

### `network.decodeURL`

**Signature:** `decodeURL(string)`

URL 解码

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要解码的字符串 | No |

**Returns:** `string`

*解码后的 URL 字符串*

---

### `network.parseURL`

**Signature:** `parseURL(url)`

解析 URL 组件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 要解析的 URL | No |

**Returns:** `{ scheme: string, host: string, path: string, query: string, params: object }`

*包含 URL 组件的对象*

---

### `network.buildURL`

**Signature:** `buildURL(baseURL, params?)`

构建带参数的 URL

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `baseURL` | `string` | 基础 URL | No |
| `params` | `object` | 查询参数 | Yes |

**Returns:** `string`

*构建的 URL 字符串*

---

### `network.ping`

**Signature:** `ping(host)`

Ping 主机

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `host` | `string` | 主机名或 IP | No |

**Returns:** `{ success: boolean, latency: number }`

*包含成功状态和延迟（毫秒）的对象*

---

### `network.download`

**Signature:** `download(url, filename?)`

下载文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 下载地址 | No |
| `filename` | `string` | 保存文件名 | Yes |

**Returns:** `{ success: boolean, path?: string, error?: string }`

*包含成功状态和本地文件路径的对象*

---

### `network.listVPNs`

**Signature:** `listVPNs()`

列出 VPN 配置

**Returns:** `[{ name: string, active: boolean }]`

*VPN 配置列表*

---

### `network.connectVPN`

**Signature:** `connectVPN(name?)`

连接 VPN

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | VPN 名称，默认第一个 | Yes |

**Returns:** `boolean`

*是否发起连接成功*

---

### `network.disconnectVPN`

**Signature:** `disconnectVPN()`

断开 VPN

**Returns:** `boolean`

*是否发起断开成功*

---

### `network.getVPNStatus`

**Signature:** `getVPNStatus()`

获取 VPN 状态

**Returns:** `{ connected: boolean, name?: string }`

*包含连接状态和 VPN 名称的对象*

---

### `network.openSettings`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openSettings(section?)`

打开系统设置

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `section` | `string` | 设置页面（如 'WIFI'） | Yes |

**Returns:** `boolean`

*是否成功打开*

---

## app

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

应用操作与管理

> **Trigger Note:** open/launch 方法需要前台运行，vibrate 方法后台可能不生效

### `app.version`

**Signature:** `version()`

获取应用版本

**Returns:** `string`

*应用版本号*

---

### `app.build`

**Signature:** `build()`

获取应用构建号

**Returns:** `string`

*应用构建号 (CFBundleVersion)*

---

### `app.bundleId`

**Signature:** `bundleId()`

获取应用 Bundle ID

**Returns:** `string`

*应用的 Bundle Identifier*

---

### `app.info`

**Signature:** `info()`

获取应用完整信息

**Returns:** `AppInfo`

*包含 name, version, build, bundleId, language 的应用信息对象*

---

### `app.open`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `open(url)`

打开 URL/Scheme

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 要打开的 URL | No |

**Returns:** `boolean`

*是否成功打开*

---

### `app.canOpen`

**Signature:** `canOpen(url)`

检查是否能打开

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 要检查的 URL | No |

**Returns:** `boolean`

*是否能打开*

---

### `app.vibrate`

**Signature:** `vibrate()`

震动反馈

**Returns:** `void`

---

### `app.getLogs`

**Signature:** `getLogs(limit?)`

获取应用日志

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | 返回的日志条数 | Yes |

**Returns:** `[LogMessage]`

*日志对象数组*

---

### `app.exportLogs`

**Signature:** `exportLogs()`

导出日志为字符串

**Returns:** `string`

*导出的日志内容*

---

### `app.getCrashReports`

**Signature:** `getCrashReports()`

获取所有崩溃报告

**Returns:** `[CrashReport]`

*崩溃报告数组*

---

### `app.getLastCrash`

**Signature:** `getLastCrash()`

获取最近一次崩溃报告

**Returns:** `CrashReport \| null`

*最近一次崩溃报告*

---

### `app.clearLogs`

**Signature:** `clearLogs()`

清除所有日志

**Returns:** `void`

---

### `app.exit`

**Signature:** `exit(code?)`

退出应用（仅用于调试）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `code` | `number` | 退出码，默认为 0 | Yes |

**Returns:** `void`

---

### `app.openSettings`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openSettings()`

打开应用设置页面

**Returns:** `boolean`

*是否成功打开设置*

---

### `app.list`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `list()`

获取所有已安装应用列表 (TrollStore 权限)

**Returns:** `[AppInfo]`

*应用信息数组，包含 bundleIdentifier, name, version, type 等字段*

---

### `app.getAppInfo`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `getAppInfo(bundleId)`

获取指定应用的详细信息 (TrollStore 权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `bundleId` | `string` | 应用的 Bundle Identifier | No |

**Returns:** `AppInfo \| null`

*应用信息对象，包含 bundleIdentifier, name, version, build, type, teamID, bundlePath, dataContainerPath, urlSchemes 等*

---

### `app.launch`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `launch(bundleId)`

启动指定应用 (TrollStore 权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `bundleId` | `string` | 应用的 Bundle Identifier | No |

**Returns:** `boolean`

*是否成功启动*

---

### `app.terminate`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `terminate(bundleId)`

终止指定应用 (TrollStore 权限，需要后台权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `bundleId` | `string` | 应用的 Bundle Identifier | No |

**Returns:** `boolean`

*是否成功终止*

---

### `app.isInstalled`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `isInstalled(bundleId)`

检查应用是否已安装

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `bundleId` | `string` | 应用的 Bundle Identifier | No |

**Returns:** `boolean`

*是否已安装*

---

### `app.getDataContainer`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `getDataContainer(bundleId)`

获取应用数据容器路径 (TrollStore 权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `bundleId` | `string` | 应用的 Bundle Identifier | No |

**Returns:** `string \| null`

*数据容器路径，未找到返回 null*

---

### `app.cpuUsage`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `cpuUsage()`

获取 CPU 使用率（进程级 + 系统级）

**Returns:** `CPUUsage`

*包含 process (进程 CPU %) 和 system (系统 CPU 对象，含 total/user/system/idle/nice/cores) 的对象*

---

### `app.memoryUsage`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `memoryUsage()`

获取内存使用情况

**Returns:** `MemoryUsage`

*包含 usage (当前使用 MB), peak (峰值 MB), unit (单位) 的对象*

---

### `app.fps`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `fps()`

获取当前帧率

**Returns:** `FPSInfo`

*包含 fps (帧率), isWarning (警告状态), isCritical (危险状态) 的对象*

---

### `app.performanceSnapshot`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `performanceSnapshot()`

获取完整性能指标快照

**Returns:** `PerformanceSnapshot`

*包含 cpu, memory, fps, isMonitoring, timestamp 的完整性能快照*

---

### `app.startMonitoring`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `startMonitoring()`

开启性能监控（FPS 采样、指标记录）

**Returns:** `boolean`

*是否成功开启*

---

### `app.stopMonitoring`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `stopMonitoring()`

停止性能监控

**Returns:** `boolean`

*是否成功停止*

---

### `app.performanceRecords`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `performanceRecords(limit?)`

获取历史性能记录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | 返回的记录数量，默认 50 | Yes |

**Returns:** `[PerformanceRecord]`

*性能记录数组，包含 id, scriptName, executionTime, peakMemory, averageCPU, timestamp, success*

---

### `app.clearPerformanceRecords`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `clearPerformanceRecords()`

清除所有性能记录

**Returns:** `void`

---

## haptic

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

触觉反馈

> **Trigger Note:** 触觉反馈在后台模式下可能不生效，需要设备支持

### `haptic.impact`

**Signature:** `impact(style?)`

触觉冲击反馈

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `style` | `string` | 'light' \| 'medium' \| 'heavy' \| 'soft' \| 'rigid' | Yes |

**Returns:** `void`

---

### `haptic.notification`

**Signature:** `notification(type)`

通知触觉反馈

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `type` | `string` | 'success' \| 'warning' \| 'error' | No |

**Returns:** `void`

---

### `haptic.selection`

**Signature:** `selection()`

选择触觉反馈

**Returns:** `void`

---

### `haptic.vibrate`

**Signature:** `vibrate()`

设备振动

**Returns:** `void`

---

### `haptic.light`

**Signature:** `light()`

轻度冲击

**Returns:** `void`

---

### `haptic.medium`

**Signature:** `medium()`

中度冲击

**Returns:** `void`

---

### `haptic.heavy`

**Signature:** `heavy()`

重度冲击

**Returns:** `void`

---

### `haptic.success`

**Signature:** `success()`

成功反馈

**Returns:** `void`

---

### `haptic.warning`

**Signature:** `warning()`

警告反馈

**Returns:** `void`

---

### `haptic.error`

**Signature:** `error()`

错误反馈

**Returns:** `void`

---

## display

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

显示控制

> **Trigger Note:** 亮度设置和 keepAwake 后台可能不生效，openSettings 需要 UI 交互

### `display.getBrightness`

**Signature:** `getBrightness()`

获取屏幕亮度

**Returns:** `number`

*当前亮度(0.0-1.0)*

---

### `display.setBrightness`

**Signature:** `setBrightness(value)`

设置屏幕亮度

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `value` | `number` | 亮度值 (0.0 - 1.0) | No |

**Returns:** `boolean`

*是否设置成功*

---

### `display.increaseBrightness`

**Signature:** `increaseBrightness(amount?)`

增加亮度

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `amount` | `number` | 增加量 (默认 0.1) | Yes |

**Returns:** `boolean`

*是否设置成功*

---

### `display.decreaseBrightness`

**Signature:** `decreaseBrightness(amount?)`

降低亮度

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `amount` | `number` | 减少量 (默认 0.1) | Yes |

**Returns:** `boolean`

*是否设置成功*

---

### `display.getScreenInfo`

**Signature:** `getScreenInfo()`

获取屏幕信息

**Returns:** `{ width: number, height: number, scale: number, nativeWidth: number, nativeHeight: number }`

*包含宽度、高度、缩放比例和原生分辨率的对象*

---

### `display.getOrientation`

**Signature:** `getOrientation()`

获取屏幕方向

**Returns:** `'portrait' \| 'landscape'`

*屏幕方向*

---

### `display.isLowPowerModeEnabled`

**Signature:** `isLowPowerModeEnabled()`

低电量模式是否开启

**Returns:** `boolean`

*是否开启*

---

### `display.setLowPowerMode`

**Signature:** `setLowPowerMode(enabled)`

设置低电量模式

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `display.isAutoBrightnessEnabled`

**Signature:** `isAutoBrightnessEnabled()`

自动亮度是否开启

**Returns:** `boolean`

*是否开启*

---

### `display.setAutoBrightness`

**Signature:** `setAutoBrightness(enabled)`

设置自动亮度

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `display.openSettings`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openSettings()`

打开显示设置

**Returns:** `boolean`

*是否成功打开*

---

### `display.keepAwake`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `keepAwake(enabled)`

保持屏幕常亮

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否保持常亮 | No |

**Returns:** `boolean`

*是否设置成功*

---

## hud

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

HUD 浮窗系统 - 创建悬浮窗口和 UI 元素

> **Trigger Note:** 在触发器模式下完全支持，可创建系统级悬浮窗口

### `hud.createWindow`

**Signature:** `createWindow(config)`

创建 HUD 窗口

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `config` | `object` | 窗口配置 { id?, width?, height?, x?, y?, draggable?, dismissible?, autoClear?, style? }，style 为 { backgroundColor?, textColor?, fontSize?, fontWeight?, cornerRadius?, padding?, opacity?, shadow? } | No |

**Returns:** `Window`

*窗口对象，可用于添加元素和控制窗口*

---

### `hud.getWindow`

**Signature:** `getWindow(id)`

根据 ID 获取已存在的窗口

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 窗口 ID | No |

**Returns:** `Window \| null`

*窗口对象，未找到返回 null*

---

### `hud.getScreenSize`

**Signature:** `getScreenSize()`

获取屏幕尺寸信息

**Returns:** `{ width: number, height: number, scale: number }`

*包含 width, height, scale 的屏幕信息对象*

---

### `hud.clearAll`

**Signature:** `clearAll()`

清除所有 HUD 窗口

**Returns:** `void`

---

### `hud.getAllWindows`

**Signature:** `getAllWindows()`

获取所有窗口 ID 列表

**Returns:** `[string]`

*窗口 ID 数组*

---

## util

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

工具函数

### `util.uuid`

**Signature:** `uuid()`

生成 UUID

**Returns:** `string`

*生成的 UUID*

---

### `util.md5`

**Signature:** `md5(string)`

计算 MD5

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要计算的字符串 | No |

**Returns:** `string`

*MD5 哈希值*

---

### `util.base64Encode`

**Signature:** `base64Encode(string)`

Base64 编码

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要编码的字符串 | No |

**Returns:** `string`

*Base64 编码字符串*

---

### `util.base64Decode`

**Signature:** `base64Decode(string)`

Base64 解码

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要解码的字符串 | No |

**Returns:** `string`

*解码后的原始字符串*

---

### `util.sha256`

**Signature:** `sha256(string)`

计算 SHA256 哈希

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要计算的字符串 | No |

**Returns:** `string`

*SHA256 哈希值*

---

### `util.formatDate`

**Signature:** `formatDate(timestamp, format?)`

格式化时间戳为字符串

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `timestamp` | `number` | 时间戳（毫秒） | No |
| `format` | `string` | 格式模式（如 'yyyy-MM-dd'），默认为 'yyyy-MM-dd HH:mm:ss' | Yes |

**Returns:** `string`

*格式化后的日期字符串*

---

### `util.now`

**Signature:** `now()`

获取当前时间戳（毫秒）

**Returns:** `number`

*当前时间戳*

---

### `util.sleep`

**Signature:** `sleep(ms)`

休眠指定时长

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `ms` | `number` | 休眠时长（毫秒） | No |

**Returns:** `void`

---

## location

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

定位服务

> **Trigger Note:** requestAccess 需要 UI 交互，getCurrent 需要预先获得权限

### `location.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

请求定位权限

**Returns:** `void`

---

### `location.getAccessStatus`

**Signature:** `getAccessStatus()`

获取权限状态

**Returns:** `'authorized' \| 'denied' \| 'restricted' \| 'notDetermined' \| 'unknown'`

*权限状态*

---

### `location.isAuthorized`

**Signature:** `isAuthorized()`

检查是否已授权

**Returns:** `boolean`

*是否已授权*

---

### `location.getCurrent`

**Signature:** `getCurrent()`

获取当前位置

**Returns:** `{ lat: number, lng: number, alt: number, course: number, speed: number, accuracy: number, timestamp: number } \| null`

*位置信息对象(包含经纬度、海拔、精度等)，失败返回 null*

---

### `location.current`

**Signature:** `current()`

获取当前位置(别名)

**Returns:** `{ lat: number, lng: number, alt: number, course: number, speed: number, accuracy: number, timestamp: number } \| null`

*位置信息对象，失败返回 null*

---

### `location.distance`

**Signature:** `distance(lat1, lng1, lat2, lng2)`

计算两点距离

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `lat1` | `number` | 点1纬度 | No |
| `lng1` | `number` | 点1经度 | No |
| `lat2` | `number` | 点2纬度 | No |
| `lng2` | `number` | 点2经度 | No |

**Returns:** `number`

*距离(米)*

---

### `location.geocode`

**Signature:** `geocode(address)`

地址转坐标

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | 地址字符串 | No |

**Returns:** `[{ lat: number, lng: number, name: string }]`

*地理位置对象数组*

---

### `location.reverseGeocode`

**Signature:** `reverseGeocode(lat, lng, locale?)`

坐标转地址

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `lat` | `number` | 纬度 | No |
| `lng` | `number` | 经度 | No |
| `locale` | `string` | 语言区域标识(可选，如 'zh_CN'、'en_US'，默认使用系统语言) | Yes |

**Returns:** `[{ name: string, country: string, locality: string, administrativeArea: string, subLocality: string, thoroughfare: string, postalCode: string }]`

*地址信息对象数组*

---

### `location.isLocationServicesEnabled`

**Signature:** `isLocationServicesEnabled()`

定位服务是否开启

**Returns:** `boolean`

*是否开启*

---

### `location.hasTrollStorePermission`

**Signature:** `hasTrollStorePermission()`

检查是否有 TrollStore 权限

**Returns:** `boolean`

*是否有权限*

---

### `location.setLocationServicesEnabled`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `setLocationServicesEnabled(enabled)`

开关系统定位服务(需要 TrollStore 权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | true 开启，false 关闭 | No |

**Returns:** `{ success: boolean, enabled?: boolean, message?: string }`

*操作结果(success 表示是否成功，enabled 为当前状态)*

---

### `location.toggleLocationServices`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `toggleLocationServices()`

切换定位服务状态(需要 TrollStore 权限)

**Returns:** `{ success: boolean, enabled?: boolean, message?: string }`

*操作结果(success 表示是否成功，enabled 为切换后状态)*

---

## calendar

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

系统日历

> **Trigger Note:** requestAccess 需要 UI 交互，其他操作需要预先获得权限

### `calendar.isAuthorized`

**Signature:** `isAuthorized()`

检查权限状态

**Returns:** `boolean`

---

### `calendar.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

请求日历权限

**Returns:** `boolean`

*是否授权成功*

---

### `calendar.getCalendars`

**Signature:** `getCalendars()`

获取所有日历

**Returns:** `[{ id: string, title: string, color: string, type: number, allowsModify: boolean }]`

*日历列表数组*

---

### `calendar.getToday`

**Signature:** `getToday()`

获取今日事件

**Returns:** `[{ id: string, title: string, startDate: number, endDate: number, calendar: string, calendarId: string, isAllDay: boolean, location: string, notes: string }]`

*今日事件数组*

---

### `calendar.getEvents`

**Signature:** `getEvents(start, end, calendarId?)`

获取日历事件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `start` | `number` | 开始时间戳 | No |
| `end` | `number` | 结束时间戳 | No |
| `calendarId` | `string` | 日历 ID | Yes |

**Returns:** `[{ id: string, title: string, startDate: number, endDate: number, calendar: string, calendarId: string, isAllDay: boolean, location: string, notes: string }]`

*事件数组*

---

### `calendar.create`

**Signature:** `create(title, start, end, options?)`

创建日历事件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 标题 | No |
| `start` | `number` | 开始时间戳 | No |
| `end` | `number` | 结束时间戳 | No |
| `options` | `object` | 选项 { calendarId, notes, location, url, allDay } | Yes |

**Returns:** `string \| null`

*创建的事件 ID，失败返回 null*

---

### `calendar.delete`

**Signature:** `delete(id)`

删除日历事件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 事件 ID | No |

**Returns:** `boolean`

*是否删除成功*

---

## reminder

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

提醒事项

> **Trigger Note:** requestAccess 需要 UI 交互，其他操作需要预先获得权限

### `reminder.isAuthorized`

**Signature:** `isAuthorized()`

检查权限状态

**Returns:** `boolean`

*是否已授权*

---

### `reminder.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

请求提醒事项权限

**Returns:** `boolean`

*是否授权成功*

---

### `reminder.getLists`

**Signature:** `getLists()`

获取所有提醒列表

**Returns:** `[{ id: string, title: string, color: string, isSystem: boolean }]`

*提醒列表数组*

---

### `reminder.getAll`

**Signature:** `getAll(listId?)`

获取所有提醒事项

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `listId` | `string` | 列表 ID | Yes |

**Returns:** `[{ id: string, title: string, isCompleted: boolean, listId: string, listTitle: string, notes: string, priority: number, creationDate: number, dueDate?: number, isOverdue?: boolean }]`

*提醒事项数组*

---

### `reminder.create`

**Signature:** `create(title, options?)`

创建提醒事项

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 标题 | No |
| `options` | `object` | 选项 { listId, notes, dueDate, priority, location: { latitude, longitude, radius, onArrive, name } } | Yes |

**Returns:** `string \| { success: boolean, id?: string, title?: string, isSystemReminder?: boolean }`

*创建的提醒 ID，如果是位置提醒则返回详细对象*

---

### `reminder.complete`

**Signature:** `complete(id)`

标记为已完成

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 提醒事项 ID | No |

**Returns:** `boolean`

*是否成功*

---

### `reminder.delete`

**Signature:** `delete(id)`

删除提醒事项

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 提醒事项 ID | No |

**Returns:** `boolean`

*是否成功*

---

### `reminder.getSorted`

**Signature:** `getSorted(options?)`

获取排序后的提醒

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `options` | `object` | { sortBy: 'createdAt'\|'dueDate'\|'priority'\|'title', ascending: boolean, completed: boolean } | Yes |

**Returns:** `[Reminder]`

*排序后的提醒列表*

---

### `reminder.getUpcoming`

**Signature:** `getUpcoming(days?)`

获取即将到期的提醒

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `days` | `number` | 未来几天，默认 7 天 | Yes |

**Returns:** `[Reminder]`

*即将到期的提醒列表*

---

### `reminder.getOverdue`

**Signature:** `getOverdue()`

获取已过期的提醒

**Returns:** `[Reminder]`

*已过期的提醒列表*

---

### `reminder.reorder`

**Signature:** `reorder(ids)`

批量重排序

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `ids` | `string[]` | 按顺序排列的 ID 数组 | No |

**Returns:** `{ success: boolean, error?: string }`

*操作结果（注意：系统提醒不支持重排序）*

---

### `reminder.createSystemReminder`

**Signature:** `createSystemReminder(title, options?)`

创建系统提醒（支持位置触发等高级功能）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 标题 | No |
| `options` | `object` | { listId, notes, dueDate, priority, location: { latitude, longitude, radius, onArrive, name } } | Yes |

**Returns:** `string \| { success: boolean, id?: string, title?: string, isSystemReminder?: boolean }`

*包含成功状态和系统提醒详情的对象*

---

### `reminder.getSystemLists`

**Signature:** `getSystemLists()`

获取系统管理的提醒列表

**Returns:** `[{ id: string, title: string, color: string, isSystem: boolean }]`

*系统提醒列表数组*

---

## contacts

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

通讯录操作

> **Trigger Note:** requestAccess 需要 UI 交互，其他操作需要预先获得权限

### `contacts.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

请求通讯录权限

**Returns:** `{ granted: boolean, error?: string }`

*包含授权结果的对象*

---

### `contacts.getAccessStatus`

**Signature:** `getAccessStatus()`

获取权限状态

**Returns:** `'authorized' \| 'denied' \| 'restricted' \| 'notDetermined'`

*权限状态*

---

### `contacts.isAuthorized`

**Signature:** `isAuthorized()`

检查是否已授权

**Returns:** `boolean`

*是否已授权*

---

### `contacts.getAll`

**Signature:** `getAll(offset?, limit?)`

获取所有联系人（支持分页）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `offset` | `number` | 跳过的记录数，默认 0 | Yes |
| `limit` | `number` | 返回的最大数量，默认全部 | Yes |

**Returns:** `[Contact]`

*联系人对象数组*

---

### `contacts.getCount`

**Signature:** `getCount()`

获取联系人总数

**Returns:** `number`

*联系人总数*

---

### `contacts.search`

**Signature:** `search(query)`

按名字搜索联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `query` | `string` | 搜索关键词（匹配姓名字段） | No |

**Returns:** `[Contact]`

*匹配的联系人对象数组*

---

### `contacts.searchByPhone`

**Signature:** `searchByPhone(phone)`

按电话号码搜索联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `phone` | `string` | 电话号码（支持模糊匹配） | No |

**Returns:** `[Contact]`

*匹配的联系人对象数组*

---

### `contacts.getById`

**Signature:** `getById(id)`

根据唯一标识符获取联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 联系人唯一标识符 | No |

**Returns:** `Contact \| null`

*联系人对象，未找到返回 null*

---

### `contacts.create`

**Signature:** `create(data)`

创建新联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `data` | `object` | 联系人数据，包含 givenName, familyName, phoneNumbers, emailAddresses 等 | No |

**Returns:** `{ success: boolean, id?: string, error?: string }`

*包含成功状态和新联系人 ID 的对象*

---

### `contacts.delete`

**Signature:** `delete(id)`

删除指定联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 联系人唯一标识符 | No |

**Returns:** `{ success: boolean, error?: string }`

*包含成功状态的对象*

---

### `contacts.getGroups`

**Signature:** `getGroups()`

获取所有联系人分组

**Returns:** `[{ id: string, name: string }]`

*分组对象数组*

---

## sms

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

短信操作

> **Trigger Note:** 需要 TrollStore Root 权限才能访问短信数据库

### `sms.isRealDataAvailable`

**Signature:** `isRealDataAvailable()`

检查是否可以访问真实短信数据

**Returns:** `boolean`

*应用是否有权访问短信数据库*

---

### `sms.read`

**Signature:** `read(limit?, offset?)`

读取最近的短信

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | 最大返回数量（默认 50） | Yes |
| `offset` | `number` | 跳过的消息数（默认 0） | Yes |

**Returns:** `[{ id: number, guid: string, address: string, text: string, date: string, isFromMe: boolean, isRead: boolean, service: string, hasAttachments: boolean }]`

*短信对象数组*

---

### `sms.search`

**Signature:** `search(keyword, limit?)`

按关键词搜索短信

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `keyword` | `string` | 搜索关键词 | No |
| `limit` | `number` | 最大返回数量（默认 50） | Yes |

**Returns:** `[{ id: number, guid: string, address: string, text: string, date: string, isFromMe: boolean, isRead: boolean }]`

*匹配的短信对象数组*

---

### `sms.getByAddress`

**Signature:** `getByAddress(address, limit?)`

获取指定号码的短信

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | 发送者号码或地址 | No |
| `limit` | `number` | 最大返回数量（默认 50） | Yes |

**Returns:** `[{ id: number, guid: string, address: string, text: string, date: string, isFromMe: boolean, isRead: boolean }]`

*短信对象数组*

---

### `sms.getChats`

**Signature:** `getChats(limit?)`

获取会话列表

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | 最大返回数量（默认 50） | Yes |

**Returns:** `[{ id: number, identifier: string, displayName: string, unreadCount: number, participants: [string], lastMessageDate: string }]`

*会话对象数组*

---

### `sms.getStatistics`

**Signature:** `getStatistics()`

获取短信统计信息

**Returns:** `{ totalMessages: number, unreadCount: number, chatCount: number, contactCount: number, attachmentCount: number }`

*包含统计信息的对象*

---

### `sms.getLatest`

**Signature:** `getLatest()`

获取最新短信

**Returns:** `{ id: number, guid: string, address: string, text: string, date: string, isFromMe: boolean, isRead: boolean } \| null`

*最新短信对象或 null*

---

### `sms.getUnread`

**Signature:** `getUnread(limit?)`

获取未读短信

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | 最大返回数量（默认 50） | Yes |

**Returns:** `[{ id: number, guid: string, address: string, text: string, date: string, isFromMe: boolean, isRead: boolean }]`

*未读短信对象数组*

---

### `sms.helperCheck`

**Signature:** `helperCheck()`

通过 Root Helper 检查短信数据库访问权限

**Returns:** `object`

*访问状态信息*

---

### `sms.helperCopy`

**Signature:** `helperCopy()`

通过 Root Helper 复制短信数据库到临时目录

**Returns:** `{ success: boolean, path: string, error: string }`

*复制操作结果*

---

### `sms.helperList`

**Signature:** `helperList(path)`

通过 Root Helper 列出目录内容

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 要列出的目录路径 | No |

**Returns:** `object`

*目录列表结果*

---

### `sms.helperAvailable`

**Signature:** `helperAvailable()`

检查 Root Helper 是否可用

**Returns:** `boolean`

*Root Helper 是否可访问*

---

## sql

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

SQLite 数据库操作

### `sql.open`

**Signature:** `open(name?)`

打开或创建 SQLite 数据库

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'）。文件将在 Documents 目录下创建为 {name}.sqlite | Yes |

**Returns:** `boolean`

*数据库是否成功打开*

---

### `sql.close`

**Signature:** `close(name?)`

关闭数据库连接

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |

**Returns:** `boolean`

*始终返回 true*

---

### `sql.execute`

**Signature:** `execute(name?, sql, params?)`

执行 INSERT、UPDATE、DELETE 或 DDL 语句

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |
| `sql` | `string` | 要执行的 SQL 语句 | No |
| `params` | `any[]` | 预处理语句的参数（使用 ? 占位符） | Yes |

**Returns:** `{ success: boolean, changes?: number, lastInsertId?: number, error?: string }`

*包含成功状态、受影响行数和最后插入行 ID 的结果对象*

---

### `sql.exec`

**Signature:** `exec(name?, sql, params?)`

execute() 的别名

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |
| `sql` | `string` | 要执行的 SQL 语句 | No |
| `params` | `any[]` | 预处理语句的参数 | Yes |

**Returns:** `{ success: boolean, changes?: number, lastInsertId?: number, error?: string }`

*结果对象*

---

### `sql.query`

**Signature:** `query(name?, sql, params?)`

执行 SELECT 查询并返回所有匹配的行

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |
| `sql` | `string` | 要执行的 SELECT 查询 | No |
| `params` | `any[]` | 预处理语句的参数 | Yes |

**Returns:** `[object]`

*行对象数组（列名 -> 值）*

---

### `sql.queryOne`

**Signature:** `queryOne(name?, sql, params?)`

执行 SELECT 查询并返回第一行

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |
| `sql` | `string` | 要执行的 SELECT 查询 | No |
| `params` | `any[]` | 预处理语句的参数 | Yes |

**Returns:** `object \| null`

*第一行对象，如果没有结果则返回 null*

---

### `sql.tableExists`

**Signature:** `tableExists(name?, tableName)`

检查数据库中是否存在指定表

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |
| `tableName` | `string` | 要检查的表名 | No |

**Returns:** `boolean`

*表是否存在*

---

### `sql.getTables`

**Signature:** `getTables(name?)`

列出数据库中的所有表

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |

**Returns:** `[string]`

*表名数组*

---

### `sql.getTableInfo`

**Signature:** `getTableInfo(name?, tableName)`

获取表的列信息

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |
| `tableName` | `string` | 表名 | No |

**Returns:** `[{ cid: number, name: string, type: string, notnull: boolean, pk: boolean }]`

*列信息对象数组*

---

### `sql.beginTransaction`

**Signature:** `beginTransaction(name?)`

开始数据库事务

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |

**Returns:** `boolean`

*事务是否成功开始*

---

### `sql.commit`

**Signature:** `commit(name?)`

提交当前事务

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |

**Returns:** `boolean`

*提交是否成功*

---

### `sql.rollback`

**Signature:** `rollback(name?)`

回滚当前事务

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |

**Returns:** `boolean`

*回滚是否成功*

---

### `sql.vacuum`

**Signature:** `vacuum(name?)`

通过回收未使用的空间来优化数据库

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 数据库名称（默认为 'default'） | Yes |

**Returns:** `boolean`

*vacuum 操作是否成功*

---

## shortcuts

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

快捷指令操作

> **Trigger Note:** 运行快捷指令和打开 App 都需要前台 UI 交互，Daemon 模式下完全不可用

### `shortcuts.run`

**Signature:** `run(name, input?)`

运行快捷指令

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 快捷指令名称 | No |
| `input` | `string` | 输入文本（可选） | Yes |

**Returns:** `boolean`

*是否成功打开快捷指令*

---

### `shortcuts.runWithCallback`

**Signature:** `runWithCallback(name, input?)`

运行快捷指令（带 x-callback-url 回调）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 快捷指令名称 | No |
| `input` | `string` | 输入文本（可选） | Yes |

**Returns:** `boolean`

*是否成功打开快捷指令*

---

### `shortcuts.open`

**Signature:** `open()`

打开快捷指令 App

**Returns:** `boolean`

*是否成功打开*

---

### `shortcuts.openGallery`

**Signature:** `openGallery()`

打开快捷指令中心/库

**Returns:** `boolean`

*是否成功打开*

---

### `shortcuts.create`

**Signature:** `create(name)`

创建新快捷指令

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 快捷指令名称 | No |

**Returns:** `boolean`

*是否成功打开创建界面*

---

### `shortcuts.import`

**Signature:** `import(url)`

通过链接导入快捷指令

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 快捷指令 URL | No |

**Returns:** `boolean`

*是否成功打开导入界面*

---

### `shortcuts.isAvailable`

**Signature:** `isAvailable()`

检查是否安装快捷指令 App

**Returns:** `boolean`

*是否可用*

---

### `shortcuts.donateInteraction`

**Signature:** `donateInteraction(title, identifier)`

捐赠 Siri 建议

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 建议标题/调用短语 | No |
| `identifier` | `string` | 交互标识符 | No |

**Returns:** `boolean`

*是否成功捐赠*

---

### `shortcuts.deleteInteraction`

**Signature:** `deleteInteraction(identifier)`

删除指定的 Siri 建议

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `identifier` | `string` | 交互标识符 | No |

**Returns:** `boolean`

*是否成功删除*

---

### `shortcuts.deleteAllInteractions`

**Signature:** `deleteAllInteractions()`

删除所有 Siri 建议

**Returns:** `boolean`

*是否成功删除*

---

## system

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

系统设置控制

> **Trigger Note:** 大部分方法需要 TrollStore 权限才能正常工作

### `system.isWiFiEnabled`

**Signature:** `isWiFiEnabled()`

检查 WiFi 是否开启

**Returns:** `boolean`

*WiFi 是否开启*

---

### `system.setWiFi`

**Signature:** `setWiFi(enabled)`

设置 WiFi 开关 (TrollStore 权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 WiFi | No |

**Returns:** `boolean`

*是否设置成功*

---

### `system.isBluetoothEnabled`

**Signature:** `isBluetoothEnabled()`

检查蓝牙是否开启

**Returns:** `boolean`

*蓝牙是否开启*

---

### `system.setBluetooth`

**Signature:** `setBluetooth(enabled)`

设置蓝牙开关 (TrollStore 权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启蓝牙 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `system.isAirplaneModeEnabled`

**Signature:** `isAirplaneModeEnabled()`

检查飞行模式是否开启

**Returns:** `boolean`

*飞行模式是否开启*

---

### `system.setAirplaneMode`

**Signature:** `setAirplaneMode(enabled)`

设置飞行模式 (TrollStore 权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启飞行模式 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `system.isDoNotDisturbEnabled`

**Signature:** `isDoNotDisturbEnabled()`

检查勿扰模式是否开启

**Returns:** `boolean`

*勿扰模式是否开启*

---

### `system.setDoNotDisturb`

**Signature:** `setDoNotDisturb(enabled)`

设置勿扰模式

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启勿扰模式 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `system.getVolume`

**Signature:** `getVolume(category?)`

获取系统音量

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `category` | `string` | 音量类别: 'System', 'Ringer', 'Media'，默认 'Media' | Yes |

**Returns:** `number`

*当前音量 (0.0 - 1.0)*

---

### `system.setVolume`

**Signature:** `setVolume(level, category?)`

设置系统音量

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `level` | `number` | 音量级别 (0.0 - 1.0) | No |
| `category` | `string` | 音量类别: 'System', 'Ringer', 'Media'，默认 'Media' | Yes |

**Returns:** `boolean`

*是否设置成功*

---

### `system.hasFlashlight`

**Signature:** `hasFlashlight()`

检查设备是否有闪光灯

**Returns:** `boolean`

*是否有闪光灯*

---

### `system.isFlashlightOn`

**Signature:** `isFlashlightOn()`

检查闪光灯是否开启

**Returns:** `boolean`

*闪光灯是否开启*

---

### `system.setFlashlight`

**Signature:** `setFlashlight(enabled, level?)`

设置闪光灯

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启闪光灯 | No |
| `level` | `number` | 亮度级别 (0.0 - 1.0)，默认 1.0 | Yes |

**Returns:** `boolean`

*是否设置成功*

---

### `system.isOrientationLockEnabled`

**Signature:** `isOrientationLockEnabled()`

检查方向锁定是否开启

**Returns:** `boolean`

*方向锁定是否开启*

---

### `system.setOrientationLock`

**Signature:** `setOrientationLock(enabled)`

设置方向锁定

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启方向锁定 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `system.isLowPowerModeEnabled`

**Signature:** `isLowPowerModeEnabled()`

检查低电量模式是否开启

**Returns:** `boolean`

*低电量模式是否开启*

---

### `system.setLowPowerMode`

**Signature:** `setLowPowerMode(enabled)`

设置低电量模式 (TrollStore 权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启低电量模式 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `system.isLocationServicesEnabled`

**Signature:** `isLocationServicesEnabled()`

检查位置服务是否开启

**Returns:** `boolean`

*位置服务是否开启*

---

### `system.setLocationServices`

**Signature:** `setLocationServices(enabled)`

设置位置服务 (TrollStore 权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启位置服务 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `system.isCellularDataEnabled`

**Signature:** `isCellularDataEnabled()`

检查蜂窝数据是否开启

**Returns:** `boolean`

*蜂窝数据是否开启*

---

### `system.setCellularData`

**Signature:** `setCellularData(enabled)`

设置蜂窝数据 (TrollStore 权限)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启蜂窝数据 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `system.openSettings`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openSettings(section?)`

打开系统设置

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `section` | `string` | 设置页面: 'WIFI', 'BLUETOOTH', 'CELLULAR', 'VPN', 'GENERAL', 'DISPLAY', 'SOUND', 'NOTIFICATION', 'PRIVACY', 'BATTERY', 'STORAGE', 'WALLPAPER', 'SIRI', 'ACCESSIBILITY', 'DND', 'SCREEN_TIME', 'PASSWORDS' | Yes |

**Returns:** `boolean`

*是否成功打开*

---

