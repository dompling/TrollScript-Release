# TrollScript API Reference (v1.1.0)

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
- [http](#http) ✅ - 网络请求
- [network](#network) ⚠️ - 网络操作
- [app](#app) ⚠️ - 应用操作
- [haptic](#haptic) ⚠️ - 触觉反馈
- [display](#display) ⚠️ - 显示控制
- [util](#util) ✅ - 工具函数
- [location](#location) ⚠️ - 定位服务
- [calendar](#calendar) ⚠️ - 系统日历
- [reminder](#reminder) ⚠️ - 提醒事项
- [contacts](#contacts) ⚠️ - 通讯录操作
- [notification](#notification) ⚠️ - 本地通知
- [alarm](#alarm) ⚠️ - 闹钟和定时提醒
- [media](#media) ⚠️ - 音乐媒体控制
- [mail](#mail) ❌ - 邮件操作
- [sms](#sms) ✅ - 短信操作
- [sql](#sql) ✅ - SQL 数据库查询
- [shortcuts](#shortcuts) ❌ - 快捷指令操作
- [bluetooth](#bluetooth) ⚠️ - 蓝牙操作
- [memo](#memo) ✅ - 备忘录操作（iCloud 同步）

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

### `console.table`

**Signature:** `table(data)`

以表格形式输出

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `data` | `object \| array` | 要显示的表格数据 | No |

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

## icloud

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

iCloud 文件操作

### `icloud.isAvailable`

**Signature:** `isAvailable()`

检查 iCloud 是否可用

**Returns:** `boolean`

*是否可用*

---

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

网络请求

### `http.get`

**Signature:** `get(url, options?)`

发送 GET 请求

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

*包含状态码、响应数据、响应头的对象*

---

### `http.post`

**Signature:** `post(url, options?)`

发送 POST 请求

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { body, headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.put`

**Signature:** `put(url, options?)`

发送 PUT 请求

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { body, headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.delete`

**Signature:** `delete(url, options?)`

发送 DELETE 请求

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.patch`

**Signature:** `patch(url, options?)`

发送 PATCH 请求

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { body, headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.head`

**Signature:** `head(url, options?)`

发送 HEAD 请求

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.request`

**Signature:** `request(url, options)`

发送自定义请求

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 请求地址 | No |
| `options` | `object` | 请求选项 { method, body, headers, timeout } | No |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.download`

**Signature:** `download(url, path)`

下载文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 下载地址 | No |
| `path` | `string` | 保存路径 | No |

**Returns:** `Promise<{ path: string }>`

*包含本地文件路径的对象*

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

### `network.getWiFiInfo`

**Signature:** `getWiFiInfo()`

获取 WiFi 信息

**Returns:** `{ ssid: string, bssid: string } \| null`

*包含 SSID 和 BSSID 的对象*

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

**Returns:** `Promise<{ latency: number, success: boolean }>`

*包含延迟和成功状态的对象*

---

### `network.download`

**Signature:** `download(url, filename?)`

下载文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 下载地址 | No |
| `filename` | `string` | 保存文件名 | Yes |

**Returns:** `Promise<{ path: string }>`

*包含本地文件路径的对象*

---

### `network.getAirplaneMode`

**Signature:** `getAirplaneMode()`

获取飞行模式状态

**Returns:** `boolean`

*是否开启*

---

### `network.setAirplaneMode`

**Signature:** `setAirplaneMode(enabled)`

设置飞行模式

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

*是否设置成功*

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

### `network.getWiFiEnabled`

**Signature:** `getWiFiEnabled()`

获取 WiFi 开关状态

**Returns:** `boolean`

*是否开启*

---

### `network.setWiFi`

**Signature:** `setWiFi(enabled)`

设置 WiFi 开关

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

*是否设置成功*

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

应用操作

> **Trigger Note:** open 方法需要前台运行，vibrate 方法后台可能不生效

### `app.version`

**Signature:** `version()`

获取应用版本

**Returns:** `string`

*应用版本号*

---

### `app.open`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `open(url)`

打开 URL/Scheme

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 要打开的 URL | No |

**Returns:** `Promise<boolean>`

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

**Returns:** `void`

---

### `display.increaseBrightness`

**Signature:** `increaseBrightness(amount?)`

增加亮度

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `amount` | `number` | 增加量 (默认 0.1) | Yes |

**Returns:** `void`

---

### `display.decreaseBrightness`

**Signature:** `decreaseBrightness(amount?)`

降低亮度

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `amount` | `number` | 减少量 (默认 0.1) | Yes |

**Returns:** `void`

---

### `display.getScreenInfo`

**Signature:** `getScreenInfo()`

获取屏幕信息

**Returns:** `{ width: number, height: number, scale: number }`

*包含宽度、高度、缩放比例的对象*

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

### `display.getNightShiftStatus`

**Signature:** `getNightShiftStatus()`

获取夜览状态

**Returns:** `boolean`

*是否开启*

---

### `display.setNightShift`

**Signature:** `setNightShift(enabled)`

设置夜览

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `display.getTrueToneStatus`

**Signature:** `getTrueToneStatus()`

获取原彩显示状态

**Returns:** `boolean`

*是否开启*

---

### `display.setTrueTone`

**Signature:** `setTrueTone(enabled)`

设置原彩显示

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

### `display.getAutoLockTime`

**Signature:** `getAutoLockTime()`

获取自动锁定时间

**Returns:** `number`

*自动锁定时间(秒)，0 表示永不*

---

### `display.setAutoLock`

**Signature:** `setAutoLock(seconds)`

设置自动锁定时间

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `seconds` | `number` | 锁定时间(秒)，0 表示永不 | No |

**Returns:** `boolean`

*是否设置成功*

---

### `display.keepAwake`

**Signature:** `keepAwake(enabled)`

保持屏幕常亮

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否保持常亮 | No |

**Returns:** `void`

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

### `util.formatDate`

**Signature:** `formatDate(date, format)`

格式化日期

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `date` | `Date` | 日期对象 | No |
| `format` | `string` | 格式字符串 (如 'yyyy-MM-dd') | No |

**Returns:** `string`

*格式化后的日期字符串*

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

**Returns:** `Promise<{ lat: number, lng: number, alt: number, course: number, speed: number, timestamp: number }>`

*位置信息对象(包含经纬度、海拔等)*

---

### `location.current`

**Signature:** `current()`

获取当前位置(别名)

**Returns:** `Promise<{ lat: number, lng: number, alt: number, course: number, speed: number, timestamp: number }>`

*位置信息对象*

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

**Returns:** `Promise<[{ lat: number, lng: number, name: string }]>`

*地理位置对象数组*

---

### `location.reverseGeocode`

**Signature:** `reverseGeocode(lat, lng)`

坐标转地址

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `lat` | `number` | 纬度 | No |
| `lng` | `number` | 经度 | No |

**Returns:** `Promise<[{ name: string, country: string, locality: string, administrativeArea: string }]>`

*地址信息对象数组*

---

### `location.isLocationServicesEnabled`

**Signature:** `isLocationServicesEnabled()`

定位服务是否开启

**Returns:** `boolean`

*是否开启*

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

**Returns:** `Promise<boolean>`

*是否授权成功*

---

### `calendar.getCalendars`

**Signature:** `getCalendars()`

获取所有日历

**Returns:** `Promise<[{ id: string, title: string, color: string }]>`

*日历列表数组*

---

### `calendar.getToday`

**Signature:** `getToday()`

获取今日事件

**Returns:** `Promise<[{ id: string, title: string, startDate: number, endDate: number, calendar: string }]>`

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

**Returns:** `Promise<[{ id: string, title: string, startDate: number, endDate: number, calendar: string }]>`

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

**Returns:** `Promise<string>`

*创建的事件 ID*

---

### `calendar.delete`

**Signature:** `delete(id)`

删除日历事件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 事件 ID | No |

**Returns:** `Promise<boolean>`

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

**Returns:** `Promise<boolean>`

*是否授权成功*

---

### `reminder.getLists`

**Signature:** `getLists()`

获取所有提醒列表

**Returns:** `Promise<[{ id: string, title: string, color: string }]>`

*提醒列表数组*

---

### `reminder.getAll`

**Signature:** `getAll(listId?)`

获取所有提醒事项

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `listId` | `string` | 列表 ID | Yes |

**Returns:** `Promise<[{ id: string, title: string, isCompleted: boolean, listId: string, dueDate?: number }]>`

*提醒事项数组*

---

### `reminder.create`

**Signature:** `create(title, options?)`

创建提醒事项

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 标题 | No |
| `options` | `object` | 选项 { listId, notes, dueDate, priority, sortOrder, isPinned } | Yes |

**Returns:** `Promise<string>`

*创建的提醒 ID*

---

### `reminder.complete`

**Signature:** `complete(id)`

标记为已完成

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 提醒事项 ID | No |

**Returns:** `Promise<boolean>`

*是否成功*

---

### `reminder.delete`

**Signature:** `delete(id)`

删除提醒事项

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 提醒事项 ID | No |

**Returns:** `Promise<boolean>`

*是否成功*

---

### `reminder.getSorted`

**Signature:** `getSorted(options)`

获取排序后的提醒

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `options` | `object` | { sortBy: 'createdAt'\|'dueDate'\|'priority'\|'title', ascending: boolean, completed: boolean } | Yes |

**Returns:** `Promise<[Reminder]>`

*排序后的提醒列表*

---

### `reminder.getUpcoming`

**Signature:** `getUpcoming(days)`

获取即将到期的提醒

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `days` | `number` | 未来几天，默认 7 天 | Yes |

**Returns:** `Promise<[Reminder]>`

*即将到期的提醒列表*

---

### `reminder.getOverdue`

**Signature:** `getOverdue()`

获取已过期的提醒

**Returns:** `Promise<[Reminder]>`

*已过期的提醒列表*

---

### `reminder.reorder`

**Signature:** `reorder(ids)`

批量重排序

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `ids` | `string[]` | 按顺序排列的 ID 数组 | No |

**Returns:** `Promise<object>`

*{ success: boolean, count: number }*

---

### `reminder.createSystemReminder`

**Signature:** `createSystemReminder(title, options?)`

创建系统提醒（支持位置触发）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 标题 | No |
| `options` | `object` | { listId, notes, dueDate, priority, location: { latitude, longitude, radius, onArrive, name } } | Yes |

**Returns:** `Promise<object>`

*{ success: boolean, id: string, title: string, isSystemReminder: true }*

---

### `reminder.getSystemLists`

**Signature:** `getSystemLists()`

获取系统提醒列表

**Returns:** `Promise<[{ id: string, title: string, isSystem: true }]>`

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

获取所有联系人

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
| `query` | `string` | 搜索关键词（匹配姓名） | No |

**Returns:** `[Contact]`

*联系人对象数组*

---

### `contacts.searchByPhone`

**Signature:** `searchByPhone(phone)`

按电话搜索联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `phone` | `string` | 电话号码（支持模糊匹配） | No |

**Returns:** `[Contact]`

*联系人对象数组*

---

### `contacts.searchByEmail`

**Signature:** `searchByEmail(email)`

按邮箱搜索联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `email` | `string` | 邮箱地址（支持模糊匹配） | No |

**Returns:** `[Contact]`

*联系人对象数组*

---

### `contacts.getById`

**Signature:** `getById(id)`

根据 ID 获取联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 联系人唯一标识符 | No |

**Returns:** `Contact \| null`

*联系人对象*

---

### `contacts.create`

**Signature:** `create(data)`

创建联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `data` | `object` | 联系人数据 { givenName, familyName, phoneNumbers?, emailAddresses?, ... } | No |

**Returns:** `{ success: boolean, id?: string, error?: string }`

*包含成功状态和 ID 的对象*

---

### `contacts.update`

**Signature:** `update(id, data)`

更新联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 联系人唯一标识符 | No |
| `data` | `object` | 要更新的字段 | No |

**Returns:** `{ success: boolean, error?: string }`

*包含成功状态的对象*

---

### `contacts.delete`

**Signature:** `delete(id)`

删除联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 联系人唯一标识符 | No |

**Returns:** `{ success: boolean, error?: string }`

*包含成功状态的对象*

---

### `contacts.getGroups`

**Signature:** `getGroups()`

获取所有分组

**Returns:** `[{ id: string, name: string }]`

*分组数组*

---

### `contacts.getContactsInGroup`

**Signature:** `getContactsInGroup(groupId)`

获取分组内联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `groupId` | `string` | 分组唯一标识符 | No |

**Returns:** `[Contact]`

*联系人对象数组*

---

## notification

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

本地通知

> **Trigger Note:** requestPermission 需要 UI 交互，其他操作需要预先获得权限

### `notification.send`

**Signature:** `send(title, body, options?)`

发送通知

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 通知标题 | No |
| `body` | `string` | 通知内容 | No |
| `options` | `object` | 选项 { url, userInfo, sound, badge } | Yes |

**Returns:** `Promise<string>`

*发送的通知 ID*

---

### `notification.cancel`

**Signature:** `cancel(id)`

取消通知

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 通知 ID | No |

**Returns:** `void`

---

### `notification.cancelAll`

**Signature:** `cancelAll()`

取消所有通知

**Returns:** `void`

---

### `notification.getPending`

**Signature:** `getPending()`

获取待发送通知

**Returns:** `Promise<[{ id: string, title: string, body: string, date: number }]>`

*待发送通知列表*

---

### `notification.getDelivered`

**Signature:** `getDelivered()`

获取已发送通知

**Returns:** `Promise<[{ id: string, title: string, body: string, date: number }]>`

*已发送通知列表*

---

### `notification.requestPermission`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestPermission()`

请求通知权限

**Returns:** `Promise<boolean>`

*是否授权成功*

---

### `notification.getPermissionStatus`

**Signature:** `getPermissionStatus()`

获取权限状态

**Returns:** `Promise<'authorized' \| 'denied' \| 'notDetermined' \| 'provisional' \| 'ephemeral' \| 'unknown'>`

*权限状态*

---

### `notification.setBadge`

**Signature:** `setBadge(count)`

设置角标数字

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `count` | `number` | 角标数 | No |

**Returns:** `void`

---

### `notification.getBadge`

**Signature:** `getBadge()`

获取角标数字

**Returns:** `Promise<number>`

*角标数字*

---

### `notification.clearBadge`

**Signature:** `clearBadge()`

清除角标

**Returns:** `void`

---

### `notification.schedule`

**Signature:** `schedule(title, body, date, options?)`

定时通知

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 通知标题 | No |
| `body` | `string` | 通知内容 | No |
| `date` | `number` | 触发时间戳 | No |
| `options` | `object` | 选项 { url, userInfo, sound, badge, repeat: 'daily'\|'weekly'\|'monthly' } | Yes |

**Returns:** `Promise<string>`

*发送的通知 ID*

---

## alarm

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

闹钟和定时提醒

> **Trigger Note:** requestAccess 和打开系统应用的方法需要 UI 交互

### `alarm.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

请求通知权限

**Returns:** `Promise<boolean>`

*是否授权成功*

---

### `alarm.getAccessStatus`

**Signature:** `getAccessStatus()`

获取权限状态

**Returns:** `Promise<'authorized' \| 'denied' \| 'notDetermined'>`

*权限状态*

---

### `alarm.createOnce`

**Signature:** `createOnce(timestamp, title, options?)`

创建一次性闹钟

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `timestamp` | `number` | 触发时间戳 | No |
| `title` | `string` | 标题 | No |
| `options` | `object` | 选项 { sound } | Yes |

**Returns:** `Promise<string>`

*创建的闹钟 ID*

---

### `alarm.createDaily`

**Signature:** `createDaily(hour, minute, title, options?)`

创建每日重复闹钟

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `hour` | `number` | 小时 (0-23) | No |
| `minute` | `number` | 分钟 (0-59) | No |
| `title` | `string` | 标题 | No |
| `options` | `object` | 选项 { sound } | Yes |

**Returns:** `Promise<string>`

*创建的闹钟 ID*

---

### `alarm.createWeekly`

**Signature:** `createWeekly(weekday, hour, minute, title, options?)`

创建每周重复闹钟

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `weekday` | `number` | 周几 (1-7, 周日为1) | No |
| `hour` | `number` | 小时 (0-23) | No |
| `minute` | `number` | 分钟 (0-59) | No |
| `title` | `string` | 标题 | No |
| `options` | `object` | 选项 { sound } | Yes |

**Returns:** `Promise<string>`

*创建的闹钟 ID*

---

### `alarm.createCountdown`

**Signature:** `createCountdown(seconds, title, options?)`

创建倒计时提醒

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `seconds` | `number` | 秒数 | No |
| `title` | `string` | 标题 | No |
| `options` | `object` | 选项 { sound } | Yes |

**Returns:** `Promise<string>`

*创建的闹钟 ID*

---

### `alarm.getPending`

**Signature:** `getPending()`

获取待触发的闹钟

**Returns:** `Promise<[{ id: string, title: string, date: number, repeat?: string }]>`

*待触发闹钟列表*

---

### `alarm.getCount`

**Signature:** `getCount()`

获取闹钟数量

**Returns:** `Promise<number>`

*闹钟数量*

---

### `alarm.cancel`

**Signature:** `cancel(id)`

取消指定闹钟

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 闹钟 ID | No |

**Returns:** `void`

---

### `alarm.cancelAll`

**Signature:** `cancelAll()`

取消所有闹钟

**Returns:** `void`

---

### `alarm.openClockApp`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openClockApp()`

打开系统时钟

**Returns:** `void`

---

### `alarm.openTimer`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openTimer()`

打开计时器

**Returns:** `void`

---

## media

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

音乐媒体控制

> **Trigger Note:** requestAccess 需要 UI 交互，媒体控制需要预先获得权限且 Audio Session 正确配置

### `media.play`

**Signature:** `play()`

播放

**Returns:** `void`

---

### `media.pause`

**Signature:** `pause()`

暂停

**Returns:** `void`

---

### `media.stop`

**Signature:** `stop()`

停止

**Returns:** `void`

---

### `media.togglePlayPause`

**Signature:** `togglePlayPause()`

切换播放/暂停

**Returns:** `void`

---

### `media.next`

**Signature:** `next()`

下一首

**Returns:** `void`

---

### `media.previous`

**Signature:** `previous()`

上一首

**Returns:** `void`

---

### `media.skipToBeginning`

**Signature:** `skipToBeginning()`

跳到开头

**Returns:** `void`

---

### `media.getPlaybackState`

**Signature:** `getPlaybackState()`

获取播放状态

**Returns:** `'playing' \| 'paused' \| 'stopped'`

*播放状态*

---

### `media.isPlaying`

**Signature:** `isPlaying()`

是否正在播放

**Returns:** `boolean`

*是否正在播放*

---

### `media.getNowPlaying`

**Signature:** `getNowPlaying()`

获取当前播放信息

**Returns:** `{ title: string, artist: string, album: string, duration: number, artwork?: string }`

*当前播放信息对象*

---

### `media.getVolume`

**Signature:** `getVolume()`

获取音量

**Returns:** `number`

*当前音量(0.0-1.0)*

---

### `media.setVolume`

**Signature:** `setVolume(volume)`

设置音量

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `volume` | `number` | 音量 (0.0 - 1.0) | No |

**Returns:** `void`

---

### `media.getRepeatMode`

**Signature:** `getRepeatMode()`

获取重复模式

**Returns:** `'none' \| 'one' \| 'all'`

*重复模式*

---

### `media.setRepeatMode`

**Signature:** `setRepeatMode(mode)`

设置重复模式

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `mode` | `string` | 'none' \| 'one' \| 'all' | No |

**Returns:** `void`

---

### `media.getShuffleMode`

**Signature:** `getShuffleMode()`

获取随机播放模式

**Returns:** `'off' \| 'songs' \| 'albums'`

*随机播放模式*

---

### `media.setShuffleMode`

**Signature:** `setShuffleMode(mode)`

设置随机播放模式

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `mode` | `string` | 'off' \| 'songs' \| 'albums' | No |

**Returns:** `void`

---

### `media.getCurrentTime`

**Signature:** `getCurrentTime()`

获取当前播放时间

**Returns:** `number`

*当前播放时间(秒)*

---

### `media.setCurrentTime`

**Signature:** `setCurrentTime(time)`

设置播放时间

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `time` | `number` | 时间 (秒) | No |

**Returns:** `void`

---

### `media.seekForward`

**Signature:** `seekForward(seconds?)`

快进

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `seconds` | `number` | 秒数 (默认 15) | Yes |

**Returns:** `void`

---

### `media.seekBackward`

**Signature:** `seekBackward(seconds?)`

快退

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `seconds` | `number` | 秒数 (默认 15) | Yes |

**Returns:** `void`

---

### `media.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

请求音乐库权限

**Returns:** `Promise<boolean>`

*是否授权成功*

---

### `media.getAccessStatus`

**Signature:** `getAccessStatus()`

获取权限状态

**Returns:** `Promise<'authorized' \| 'denied' \| 'notDetermined' \| 'restricted'>`

*权限状态*

---

### `media.searchSongs`

**Signature:** `searchSongs(query)`

搜索音乐库

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `query` | `string` | 搜索关键词 | No |

**Returns:** `Promise<[{ id: string, title: string, artist: string, album: string }]>`

*歌曲列表数组*

---

### `media.playSong`

**Signature:** `playSong(persistentID)`

播放指定歌曲

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `persistentID` | `string` | 歌曲 ID | No |

**Returns:** `void`

---

### `media.getAllSongs`

**Signature:** `getAllSongs()`

获取所有歌曲

**Returns:** `Promise<[{ id: string, title: string, artist: string, album: string }]>`

*歌曲列表数组*

---

### `media.getAlbums`

**Signature:** `getAlbums()`

获取所有专辑

**Returns:** `Promise<[{ id: string, title: string, artist: string }]>`

*专辑列表数组*

---

### `media.getArtists`

**Signature:** `getArtists()`

获取所有艺术家

**Returns:** `Promise<[{ id: string, name: string }]>`

*艺术家列表数组*

---

### `media.getPlaylists`

**Signature:** `getPlaylists()`

获取播放列表

**Returns:** `Promise<[{ id: string, name: string }]>`

*播放列表数组*

---

### `media.playAlbum`

**Signature:** `playAlbum(id)`

播放专辑

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 专辑 ID | No |

**Returns:** `void`

---

### `media.playArtist`

**Signature:** `playArtist(id)`

播放艺术家

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 艺术家 ID | No |

**Returns:** `void`

---

### `media.playPlaylist`

**Signature:** `playPlaylist(id)`

播放播放列表

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 播放列表 ID | No |

**Returns:** `void`

*无返回值*

---

## mail

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

邮件操作

> **Trigger Note:** 所有邮件发送和打开邮件应用的方法都需要 UI 交互，Daemon 模式下完全不可用

### `mail.canSendMail`

**Signature:** `canSendMail()`

检查是否能发送邮件

**Returns:** `boolean`

*是否能发送*

---

### `mail.getStatus`

**Signature:** `getStatus()`

获取邮件功能状态

**Returns:** `'available' \| 'unavailable'`

*邮件功能状态*

---

### `mail.send`

**Signature:** `send(to, subject, body)`

发送简单邮件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `to` | `string[]` | 收件人列表 | No |
| `subject` | `string` | 主题 | No |
| `body` | `string` | 正文 | No |

**Returns:** `Promise<boolean>`

*是否发送成功*

---

### `mail.sendAdvanced`

**Signature:** `sendAdvanced(options)`

发送邮件(完整选项)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `options` | `object` | 选项 { to, cc, bcc, subject, body, isHtml, attachments } | No |

**Returns:** `Promise<boolean>`

*是否发送成功*

---

### `mail.openMailApp`

**Signature:** `openMailApp()`

打开邮件 App

**Returns:** `void`

*无返回值*

---

### `mail.openSpecificMailApp`

**Signature:** `openSpecificMailApp(appName)`

打开指定邮件 App

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `appName` | `string` | App 名称 | No |

**Returns:** `void`

*无返回值*

---

### `mail.isValidEmail`

**Signature:** `isValidEmail(email)`

验证邮箱格式

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `email` | `string` | 邮箱地址 | No |

**Returns:** `boolean`

*是否有效*

---

### `mail.getInstalledMailApps`

**Signature:** `getInstalledMailApps()`

检测已安装的邮件 App

**Returns:** `string[]`

*已安装的邮件 App 名称数组*

---

### `mail.fromTemplate`

**Signature:** `fromTemplate(templateName, variables)`

从模板生成邮件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `templateName` | `string` | 模板名称 | No |
| `variables` | `object` | 变量字典 | No |

**Returns:** `Promise<string>`

*生成的邮件内容*

---

### `mail.getTemplates`

**Signature:** `getTemplates()`

获取可用模板列表

**Returns:** `string[]`

*模板名称数组*

---

## sms

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

短信操作

> **Trigger Note:** 需要 TrollStore Root 权限才能访问短信数据库

### `sms.checkAccess`

**Signature:** `checkAccess()`

检查短信权限

**Returns:** `boolean`

*是否有权限*

---

### `sms.tryAccess`

**Signature:** `tryAccess()`

尝试直接访问短信数据库(调试用)

**Returns:** `boolean`

*是否访问成功*

---

### `sms.read`

**Signature:** `read(limit?)`

读取最近的短信

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | 限制条数 (默认 10) | Yes |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

*短信对象数组*

---

### `sms.getVerificationCode`

**Signature:** `getVerificationCode(minutes?)`

获取验证码

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `minutes` | `number` | 查找最近几分钟内的验证码 (默认 5) | Yes |

**Returns:** `string \| null`

*验证码或 null*

---

### `sms.search`

**Signature:** `search(keyword)`

搜索短信

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `keyword` | `string` | 关键词 | No |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

*短信对象数组*

---

### `sms.getByAddress`

**Signature:** `getByAddress(address)`

按号码获取短信

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | 发送者号码 | No |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

*短信对象数组*

---

### `sms.getChats`

**Signature:** `getChats()`

获取会话列表

**Returns:** `[{ id: string, name: string, lastMessage: string, date: number }]`

*会话列表数组*

---

### `sms.getStatistics`

**Signature:** `getStatistics()`

获取短信统计

**Returns:** `{ total: number, unread: number, senders: number }`

*统计信息对象*

---

### `sms.getLatest`

**Signature:** `getLatest()`

获取最新短信

**Returns:** `{ id: string, content: string, sender: string, date: number } \| null`

*最新短信对象或 null*

---

### `sms.getUnread`

**Signature:** `getUnread()`

获取未读短信

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

*未读短信对象数组*

---

## sql

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

SQL 数据库查询

### `sql.query`

**Signature:** `query(dbPath, sql, params?)`

执行 SELECT 查询并返回结果

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `dbPath` | `string` | 数据库路径 | No |
| `sql` | `string` | SQL 语句 | No |
| `params` | `any[]` | 参数列表 | Yes |

**Returns:** `any[]`

*查询结果数组*

---

### `sql.execute`

**Signature:** `execute(dbPath, sql, params?)`

执行 INSERT/UPDATE/DELETE

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `dbPath` | `string` | 数据库路径 | No |
| `sql` | `string` | SQL 语句 | No |
| `params` | `any[]` | 参数列表 | Yes |

**Returns:** `{ changes: number, lastInsertRowId: number }`

*执行结果对象*

---

### `sql.tables`

**Signature:** `tables(dbPath)`

列出数据库中的所有表

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `dbPath` | `string` | 数据库路径 | No |

**Returns:** `string[]`

*表名数组*

---

### `sql.schema`

**Signature:** `schema(dbPath, tableName)`

获取表结构

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `dbPath` | `string` | 数据库路径 | No |
| `tableName` | `string` | 表名 | No |

**Returns:** `string`

*表结构 SQL*

---

## shortcuts

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

快捷指令操作

> **Trigger Note:** 运行快捷指令和打开 App 都需要前台 UI 交互，Daemon 模式下完全不可用

### `shortcuts.run`

**Signature:** `run(name)`

运行快捷指令

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 快捷指令名称 | No |

**Returns:** `Promise<string>`

*快捷指令执行结果*

---

### `shortcuts.runWithText`

**Signature:** `runWithText(name, text)`

运行快捷指令(带文本输入)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 快捷指令名称 | No |
| `text` | `string` | 输入文本 | No |

**Returns:** `Promise<string>`

*快捷指令执行结果*

---

### `shortcuts.runWithClipboard`

**Signature:** `runWithClipboard(name)`

运行快捷指令(剪贴板输入)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 快捷指令名称 | No |

**Returns:** `Promise<string>`

---

### `shortcuts.runAdvanced`

**Signature:** `runAdvanced(name, options)`

运行快捷指令(高级选项)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 快捷指令名称 | No |
| `options` | `object` | 选项 { input, showOutput } | No |

**Returns:** `Promise<any>`

---

### `shortcuts.openApp`

**Signature:** `openApp()`

打开快捷指令 App

**Returns:** `void`

*无返回值*

---

### `shortcuts.openGallery`

**Signature:** `openGallery()`

打开快捷指令库

**Returns:** `void`

*无返回值*

---

### `shortcuts.openShortcut`

**Signature:** `openShortcut(name)`

打开指定快捷指令

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 快捷指令名称 | No |

**Returns:** `void`

*无返回值*

---

### `shortcuts.createNew`

**Signature:** `createNew()`

创建新快捷指令

**Returns:** `void`

*无返回值*

---

### `shortcuts.importFromUrl`

**Signature:** `importFromUrl(url)`

通过链接导入快捷指令

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 快捷指令 URL | No |

**Returns:** `void`

*无返回值*

---

### `shortcuts.isAvailable`

**Signature:** `isAvailable()`

检查是否安装快捷指令

**Returns:** `boolean`

---

### `shortcuts.getCommonShortcuts`

**Signature:** `getCommonShortcuts()`

获取常用快捷指令模板

**Returns:** `string[]`

---

## bluetooth

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

蓝牙操作

> **Trigger Note:** openSettings 需要 UI 交互，扫描功能可能需要前台运行

### `bluetooth.isEnabled`

**Signature:** `isEnabled()`

蓝牙是否开启

**Returns:** `boolean`

---

### `bluetooth.getStatus`

**Signature:** `getStatus()`

获取蓝牙状态

**Returns:** `'poweredOn' \| 'poweredOff' \| 'unauthorized' \| 'unknown'`

---

### `bluetooth.setEnabled`

**Signature:** `setEnabled(enabled)`

设置蓝牙开关

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `void`

*无返回值*

---

### `bluetooth.turnOn`

**Signature:** `turnOn()`

打开蓝牙

**Returns:** `void`

*无返回值*

---

### `bluetooth.turnOff`

**Signature:** `turnOff()`

关闭蓝牙

**Returns:** `void`

*无返回值*

---

### `bluetooth.getPairedDevices`

**Signature:** `getPairedDevices()`

获取配对设备

**Returns:** `Promise<[{ name: string, uuid: string, isConnected: boolean }]>`

---

### `bluetooth.getConnectedDevices`

**Signature:** `getConnectedDevices()`

获取已连接设备

**Returns:** `Promise<[{ name: string, uuid: string } মল`

---

### `bluetooth.connectDevice`

**Signature:** `connectDevice(id)`

连接设备

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 设备 UUID | No |

**Returns:** `Promise<boolean>`

---

### `bluetooth.disconnectDevice`

**Signature:** `disconnectDevice(id)`

断开设备

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 设备 UUID | No |

**Returns:** `Promise<boolean>`

---

### `bluetooth.startScan`

**Signature:** `startScan()`

开始扫描

**Returns:** `void`

*无返回值*

---

### `bluetooth.stopScan`

**Signature:** `stopScan()`

停止扫描

**Returns:** `void`

*无返回值*

---

### `bluetooth.openSettings`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openSettings()`

打开蓝牙设置

**Returns:** `void`

*无返回值*

---

## memo

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

备忘录操作（iCloud 同步）

### `memo.create`

**Signature:** `create(title, content, tags?)`

创建备忘录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 备忘录标题 | No |
| `content` | `string` | 备忘录内容 | No |
| `tags` | `[string]` | 标签列表 | Yes |

**Returns:** `object`

*{ success: 是否成功, id: 备忘录ID, memo: 备忘录对象 }*

---

### `memo.getAll`

**Signature:** `getAll()`

获取所有备忘录

**Returns:** `[object]`

*备忘录数组 [{ id: ID, title: 标题, content: 内容, createdAt: 创建时间, updatedAt: 更新时间, tags: 标签 }]*

---

### `memo.getById`

**Signature:** `getById(id)`

根据 ID 获取备忘录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 备忘录 ID | No |

**Returns:** `object \| null`

*备忘录对象或 null（不存在时）*

---

### `memo.search`

**Signature:** `search(keyword)`

搜索备忘录（标题和内容）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `keyword` | `string` | 搜索关键词 | No |

**Returns:** `[object]`

*匹配的备忘录数组*

---

### `memo.update`

**Signature:** `update(id, data)`

更新备忘录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 备忘录 ID | No |
| `data` | `object` | 更新数据 { title?: 新标题, content?: 新内容, tags?: 新标签 } | No |

**Returns:** `object`

*{ success: 是否成功, id: 备忘录ID }*

---

### `memo.delete`

**Signature:** `delete(id)`

删除备忘录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 备忘录 ID | No |

**Returns:** `object`

*{ success: 是否成功, id: 已删除的ID }*

---

### `memo.clear`

**Signature:** `clear()`

清空所有备忘录

**Returns:** `object`

*{ success: 是否成功 }*

---

### `memo.count`

**Signature:** `count()`

获取备忘录数量

**Returns:** `number`

*备忘录总数*

---

