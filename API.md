# TrollScript API Reference (v1.0.0)

TrollScript provides a powerful JavaScript environment with access to various system features. Below is the comprehensive API reference for all available modules.

---

## Table of Contents

- [console](#console) - 控制台输出
- [device](#device) - 设备信息
- [clipboard](#clipboard) - 剪贴板操作
- [storage](#storage) - 本地存储
- [icloud](#icloud) - iCloud 文件操作
- [file](#file) - 文件操作
- [http](#http) - 网络请求
- [network](#network) - 网络操作
- [app](#app) - 应用操作
- [ui](#ui) - UI 交互
- [haptic](#haptic) - 触觉反馈
- [display](#display) - 显示控制
- [util](#util) - 工具函数
- [location](#location) - 定位服务
- [weather](#weather) - 天气查询
- [health](#health) - 健康数据(HealthKit)
- [calendar](#calendar) - 系统日历
- [reminder](#reminder) - 提醒事项
- [contacts](#contacts) - 通讯录操作
- [notification](#notification) - 本地通知
- [alarm](#alarm) - 闹钟和定时提醒
- [media](#media) - 音乐媒体控制
- [mail](#mail) - 邮件操作
- [sms](#sms) - 短信操作
- [sql](#sql) - SQL 数据库查询
- [shortcuts](#shortcuts) - 快捷指令操作
- [bluetooth](#bluetooth) - 蓝牙操作
- [webview](#webview) - 网页视图操作

---

## console

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

设备信息

### `device.info`

**Signature:** `info()`

获取设备信息

**Returns:** `{ name: string, model: string, systemName: string, systemVersion: string, identifier: string }`

---

### `device.battery`

**Signature:** `battery()`

获取电池信息

**Returns:** `{ level: number, state: string, lowPowerMode: boolean }`

---

### `device.screen`

**Signature:** `screen()`

获取屏幕信息

**Returns:** `{ width: number, height: number, scale: number, brightness: number }`

---

## clipboard

剪贴板操作

### `clipboard.getText`

**Signature:** `getText()`

获取剪贴板文本

**Returns:** `string`

---

### `clipboard.setText`

**Signature:** `setText(text)`

设置剪贴板文本

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `text` | `string` | 要设置的文本内容 | No |

**Returns:** `void`

---

### `clipboard.clear`

**Signature:** `clear()`

清空剪贴板

**Returns:** `void`

---

## storage

本地存储

### `storage.get`

**Signature:** `get(key)`

获取存储值

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | 键名 | No |

**Returns:** `any`

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

---

## icloud

iCloud 文件操作

### `icloud.isAvailable`

**Signature:** `isAvailable()`

检查 iCloud 是否可用

**Returns:** `boolean`

---

### `icloud.containerPath`

**Signature:** `containerPath()`

获取 iCloud 容器路径

**Returns:** `string | null`

---

### `icloud.read`

**Signature:** `read(path)`

读取 iCloud 文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径（相对于 iCloud 容器） | No |

**Returns:** `string`

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

---

### `icloud.delete`

**Signature:** `delete(path)`

删除 iCloud 文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |

**Returns:** `boolean`

---

### `icloud.list`

**Signature:** `list(path?)`

列出 iCloud 目录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 目录路径，默认为根目录 | Yes |

**Returns:** `[string]`

---

## file

文件操作

### `file.read`

**Signature:** `read(path)`

读取文件内容

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件绝对路径 | No |

**Returns:** `string`

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

---

### `file.exists`

**Signature:** `exists(path)`

检查文件是否存在

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件绝对路径 | No |

**Returns:** `boolean`

---

### `file.delete`

**Signature:** `delete(path)`

删除文件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件绝对路径 | No |

**Returns:** `boolean`

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

---

### `file.list`

**Signature:** `list(path)`

列出目录内容

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 目录路径 | No |

**Returns:** `[string]`

---

### `file.mkdir`

**Signature:** `mkdir(path)`

创建目录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 目录路径 | No |

**Returns:** `boolean`

---

### `file.stat`

**Signature:** `stat(path)`

获取文件信息

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |

**Returns:** `{ size: number, modificationDate: number, creationDate: number, type: string }`

---

### `file.isDirectory`

**Signature:** `isDirectory(path)`

判断是否是目录

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |

**Returns:** `boolean`

---

### `file.documentsPath`

**Signature:** `documentsPath()`

获取文档目录路径

**Returns:** `string`

---

### `file.cachePath`

**Signature:** `cachePath()`

获取缓存目录路径

**Returns:** `string`

---

### `file.tempPath`

**Signature:** `tempPath()`

获取临时目录路径

**Returns:** `string`

---

### `file.debug`

**Signature:** `debug(path)`

调试路径访问权限详情

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |

**Returns:** `string`

---

### `file.rootRead`

**Signature:** `rootRead(path)`

使用 Root 权限读取受保护文件（需要 TrollStore）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件绝对路径 | No |

**Returns:** `string | null`

---

### `file.rootList`

**Signature:** `rootList(path)`

使用 Root 权限列出受保护目录（需要 TrollStore）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 目录绝对路径 | No |

**Returns:** `[string] | null`

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

---

### `file.rootCheck`

**Signature:** `rootCheck(path)`

使用 Root 权限检查路径信息（需要 TrollStore）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件或目录路径 | No |

**Returns:** `{ exists: boolean, isDirectory: boolean, size: number }`

---

### `file.rootExists`

**Signature:** `rootExists(path)`

使用 Root 权限检查文件是否存在（需要 TrollStore）

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | 文件路径 | No |

**Returns:** `boolean`

---

### `file.rootAvailable`

**Signature:** `rootAvailable()`

检查 Root Helper 是否可用

**Returns:** `boolean`

---

## http

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

---

## network

网络操作

### `network.isReachable`

**Signature:** `isReachable()`

检查网络是否可用

**Returns:** `boolean`

---

### `network.getConnectionType`

**Signature:** `getConnectionType()`

获取连接类型

**Returns:** `'wifi' | 'cellular' | 'none'`

---

### `network.getIPAddress`

**Signature:** `getIPAddress()`

获取设备 IP 地址

**Returns:** `string | null`

---

### `network.getWiFiInfo`

**Signature:** `getWiFiInfo()`

获取 WiFi 信息

**Returns:** `{ ssid: string, bssid: string } | null`

---

### `network.encodeURL`

**Signature:** `encodeURL(string)`

URL 编码

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要编码的字符串 | No |

**Returns:** `string`

---

### `network.decodeURL`

**Signature:** `decodeURL(string)`

URL 解码

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要解码的字符串 | No |

**Returns:** `string`

---

### `network.parseURL`

**Signature:** `parseURL(url)`

解析 URL 组件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 要解析的 URL | No |

**Returns:** `{ scheme: string, host: string, path: string, query: string, params: object }`

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

---

### `network.ping`

**Signature:** `ping(host)`

Ping 主机

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `host` | `string` | 主机名或 IP | No |

**Returns:** `Promise<{ latency: number, success: boolean }>`

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

---

### `network.getAirplaneMode`

**Signature:** `getAirplaneMode()`

获取飞行模式状态

**Returns:** `boolean`

---

### `network.setAirplaneMode`

**Signature:** `setAirplaneMode(enabled)`

设置飞行模式

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

---

### `network.listVPNs`

**Signature:** `listVPNs()`

列出 VPN 配置

**Returns:** `[{ name: string, active: boolean }]`

---

### `network.connectVPN`

**Signature:** `connectVPN(name?)`

连接 VPN

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | VPN 名称，默认第一个 | Yes |

**Returns:** `boolean`

---

### `network.disconnectVPN`

**Signature:** `disconnectVPN()`

断开 VPN

**Returns:** `boolean`

---

### `network.getVPNStatus`

**Signature:** `getVPNStatus()`

获取 VPN 状态

**Returns:** `{ connected: boolean, name?: string }`

---

### `network.getWiFiEnabled`

**Signature:** `getWiFiEnabled()`

获取 WiFi 开关状态

**Returns:** `boolean`

---

### `network.setWiFi`

**Signature:** `setWiFi(enabled)`

设置 WiFi 开关

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

---

### `network.openSettings`

**Signature:** `openSettings(section?)`

打开系统设置

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `section` | `string` | 设置页面（如 'WIFI'） | Yes |

**Returns:** `boolean`

---

## app

应用操作

### `app.version`

**Signature:** `version()`

获取应用版本

**Returns:** `string`

---

### `app.open`

**Signature:** `open(url)`

打开 URL/Scheme

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 要打开的 URL | No |

**Returns:** `Promise<boolean>`

---

### `app.canOpen`

**Signature:** `canOpen(url)`

检查是否能打开

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 要检查的 URL | No |

**Returns:** `boolean`

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

---

### `app.exportLogs`

**Signature:** `exportLogs()`

导出日志为字符串

**Returns:** `string`

---

### `app.getCrashReports`

**Signature:** `getCrashReports()`

获取所有崩溃报告

**Returns:** `[CrashReport]`

---

### `app.getLastCrash`

**Signature:** `getLastCrash()`

获取最近一次崩溃报告

**Returns:** `CrashReport | null`

---

### `app.clearLogs`

**Signature:** `clearLogs()`

清除所有日志

**Returns:** `void`

---

## ui

UI 交互

### `ui.alert`

**Signature:** `alert(title, message?, buttonTitle?)`

显示提示框

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 标题 | No |
| `message` | `string` | 内容 | Yes |
| `buttonTitle` | `string` | 按钮文字 | Yes |

**Returns:** `Promise<void>`

---

### `ui.toast`

**Signature:** `toast(message, duration?)`

显示 Toast 提示

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `message` | `string` | 提示内容 | No |
| `duration` | `number` | 持续时间(秒) | Yes |

**Returns:** `void`

---

### `ui.confirm`

**Signature:** `confirm(title, message?, confirmTitle?, cancelTitle?)`

显示确认对话框

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 标题 | No |
| `message` | `string` | 内容 | Yes |
| `confirmTitle` | `string` | 确认按钮文字 | Yes |
| `cancelTitle` | `string` | 取消按钮文字 | Yes |

**Returns:** `Promise<boolean>`

---

### `ui.prompt`

**Signature:** `prompt(title, message?, defaultValue?, placeholder?)`

显示输入对话框

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 标题 | No |
| `message` | `string` | 内容 | Yes |
| `defaultValue` | `string` | 默认值 | Yes |
| `placeholder` | `string` | 占位符 | Yes |

**Returns:** `Promise<string | null>`

---

### `ui.actionSheet`

**Signature:** `actionSheet(title, message?, actions)`

显示操作表单

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 标题 | No |
| `message` | `string` | 内容 | Yes |
| `actions` | `string[]` | 选项列表 | No |

**Returns:** `Promise<number>`

---

### `ui.showLoading`

**Signature:** `showLoading(message?)`

显示加载指示器

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `message` | `string` | 加载提示 | Yes |

**Returns:** `void`

---

### `ui.hideLoading`

**Signature:** `hideLoading()`

隐藏加载指示器

**Returns:** `void`

---

## haptic

触觉反馈

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

显示控制

### `display.getBrightness`

**Signature:** `getBrightness()`

获取屏幕亮度

**Returns:** `number`

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

---

### `display.getOrientation`

**Signature:** `getOrientation()`

获取屏幕方向

**Returns:** `'portrait' | 'landscape'`

---

### `display.isLowPowerModeEnabled`

**Signature:** `isLowPowerModeEnabled()`

低电量模式是否开启

**Returns:** `boolean`

---

### `display.setLowPowerMode`

**Signature:** `setLowPowerMode(enabled)`

设置低电量模式

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

---

### `display.getNightShiftStatus`

**Signature:** `getNightShiftStatus()`

获取夜览状态

**Returns:** `boolean`

---

### `display.setNightShift`

**Signature:** `setNightShift(enabled)`

设置夜览

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

---

### `display.getTrueToneStatus`

**Signature:** `getTrueToneStatus()`

获取原彩显示状态

**Returns:** `boolean`

---

### `display.setTrueTone`

**Signature:** `setTrueTone(enabled)`

设置原彩显示

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

---

### `display.isAutoBrightnessEnabled`

**Signature:** `isAutoBrightnessEnabled()`

自动亮度是否开启

**Returns:** `boolean`

---

### `display.setAutoBrightness`

**Signature:** `setAutoBrightness(enabled)`

设置自动亮度

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `boolean`

---

### `display.openSettings`

**Signature:** `openSettings()`

打开显示设置

**Returns:** `boolean`

---

## util

工具函数

### `util.uuid`

**Signature:** `uuid()`

生成 UUID

**Returns:** `string`

---

### `util.md5`

**Signature:** `md5(string)`

计算 MD5

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要计算的字符串 | No |

**Returns:** `string`

---

### `util.base64Encode`

**Signature:** `base64Encode(string)`

Base64 编码

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要编码的字符串 | No |

**Returns:** `string`

---

### `util.base64Decode`

**Signature:** `base64Decode(string)`

Base64 解码

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | 要解码的字符串 | No |

**Returns:** `string`

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

---

## location

定位服务

### `location.requestAccess`

**Signature:** `requestAccess()`

请求定位权限

**Returns:** `void`

---

### `location.getAccessStatus`

**Signature:** `getAccessStatus()`

获取权限状态

**Returns:** `'authorized' | 'denied' | 'restricted' | 'notDetermined' | 'unknown'`

---

### `location.isAuthorized`

**Signature:** `isAuthorized()`

检查是否已授权

**Returns:** `boolean`

---

### `location.getCurrent`

**Signature:** `getCurrent()`

获取当前位置

**Returns:** `Promise<{ lat: number, lng: number, alt: number, course: number, speed: number, timestamp: number }>`

---

### `location.current`

**Signature:** `current()`

获取当前位置(别名)

**Returns:** `Promise<{ lat: number, lng: number, alt: number, course: number, speed: number, timestamp: number }>`

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

---

### `location.geocode`

**Signature:** `geocode(address)`

地址转坐标

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | 地址字符串 | No |

**Returns:** `Promise<[{ lat: number, lng: number, name: string }]>`

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

---

### `location.isLocationServicesEnabled`

**Signature:** `isLocationServicesEnabled()`

定位服务是否开启

**Returns:** `boolean`

---

## weather

天气查询

### `weather.current`

**Signature:** `current(city)`

获取当前天气

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `city` | `string` | 城市名 | No |

**Returns:** `Promise<{ temp: number, condition: string, text: string }>`

---

### `weather.forecast`

**Signature:** `forecast(city, days)`

获取天气预报

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `city` | `string` | 城市名 | No |
| `days` | `number` | 天数 | No |

**Returns:** `Promise<[{ date: string, high: number, low: number, condition: string }]>`

---

### `weather.byLocation`

**Signature:** `byLocation(lat, lng)`

根据经纬度获取天气

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `lat` | `number` | 纬度 | No |
| `lng` | `number` | 经度 | No |

**Returns:** `Promise<{ temp: number, condition: string, text: string }>`

---

## health

健康数据(HealthKit)

### `health.isAvailable`

**Signature:** `isAvailable()`

检查 HealthKit 是否可用

**Returns:** `boolean`

---

### `health.requestAccess`

**Signature:** `requestAccess(types)`

请求健康数据权限

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `types` | `string[]` | 权限类型列表 ('stepCount', 'heartRate', 'sleepAnalysis', 'activeEnergyBurned', 'distanceWalkingRunning', 'bodyMass', 'height') | No |

**Returns:** `Promise<boolean>`

---

### `health.getAuthorizationStatus`

**Signature:** `getAuthorizationStatus(type)`

获取授权状态

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `type` | `string` | 权限类型 | No |

**Returns:** `'authorized' | 'denied' | 'notDetermined'`

---

### `health.getTodaySteps`

**Signature:** `getTodaySteps()`

获取今日步数

**Returns:** `Promise<number>`

---

### `health.getSteps`

**Signature:** `getSteps(startTimestamp, endTimestamp)`

获取指定日期步数

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `startTimestamp` | `number` | 开始时间戳 | No |
| `endTimestamp` | `number` | 结束时间戳 | No |

**Returns:** `Promise<number>`

---

### `health.getLatestHeartRate`

**Signature:** `getLatestHeartRate()`

获取最新心率

**Returns:** `Promise<{ value: number, date: number }>`

---

### `health.getHeartRateHistory`

**Signature:** `getHeartRateHistory(startTimestamp, endTimestamp, limit)`

获取心率历史

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `startTimestamp` | `number` | 开始时间戳 | No |
| `endTimestamp` | `number` | 结束时间戳 | No |
| `limit` | `number` | 限制条数 | Yes |

**Returns:** `Promise<[{ value: number, date: number }]>`

---

### `health.getLatestSleep`

**Signature:** `getLatestSleep()`

获取最近睡眠

**Returns:** `Promise<{ startDate: number, endDate: number, value: string }>`

---

### `health.getSleepHistory`

**Signature:** `getSleepHistory(days)`

获取睡眠历史

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `days` | `number` | 天数 | No |

**Returns:** `Promise<[{ startDate: number, endDate: number, value: string }]>`

---

### `health.getTodayActiveEnergy`

**Signature:** `getTodayActiveEnergy()`

获取今日活动能量

**Returns:** `Promise<number>`

---

### `health.getTodayDistance`

**Signature:** `getTodayDistance()`

获取今日行走距离

**Returns:** `Promise<number>`

---

### `health.getLatestWeight`

**Signature:** `getLatestWeight()`

获取最新体重

**Returns:** `Promise<{ value: number, date: number }>`

---

### `health.getHeight`

**Signature:** `getHeight()`

获取身高

**Returns:** `Promise<{ value: number, date: number }>`

---

### `health.getTodaySummary`

**Signature:** `getTodaySummary()`

获取今日健康摘要

**Returns:** `Promise<{ steps: number, activeEnergy: number, distance: number }>`

---

### `health.getSupportedTypes`

**Signature:** `getSupportedTypes()`

获取支持的数据类型

**Returns:** `string[]`

---

## calendar

系统日历

### `calendar.isAuthorized`

**Signature:** `isAuthorized()`

检查权限状态

**Returns:** `boolean`

---

### `calendar.requestAccess`

**Signature:** `requestAccess()`

请求日历权限

**Returns:** `Promise<boolean>`

---

### `calendar.getCalendars`

**Signature:** `getCalendars()`

获取所有日历

**Returns:** `Promise<[{ id: string, title: string, color: string }]>`

---

### `calendar.getToday`

**Signature:** `getToday()`

获取今日事件

**Returns:** `Promise<[{ id: string, title: string, startDate: number, endDate: number, calendar: string }]>`

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

---

### `calendar.delete`

**Signature:** `delete(id)`

删除日历事件

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 事件 ID | No |

**Returns:** `Promise<boolean>`

---

## reminder

提醒事项

### `reminder.isAuthorized`

**Signature:** `isAuthorized()`

检查权限状态

**Returns:** `boolean`

---

### `reminder.requestAccess`

**Signature:** `requestAccess()`

请求提醒事项权限

**Returns:** `Promise<boolean>`

---

### `reminder.getLists`

**Signature:** `getLists()`

获取所有提醒列表

**Returns:** `Promise<[{ id: string, title: string, color: string }]>`

---

### `reminder.getAll`

**Signature:** `getAll(listId?)`

获取所有提醒事项

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `listId` | `string` | 列表 ID | Yes |

**Returns:** `Promise<[{ id: string, title: string, isCompleted: boolean, listId: string, dueDate?: number }]>`

---

### `reminder.create`

**Signature:** `create(title, options?)`

创建提醒事项

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | 标题 | No |
| `options` | `object` | 选项 { listId, notes, dueDate, priority } | Yes |

**Returns:** `Promise<string>`

---

### `reminder.complete`

**Signature:** `complete(id)`

标记为已完成

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 提醒事项 ID | No |

**Returns:** `Promise<boolean>`

---

### `reminder.delete`

**Signature:** `delete(id)`

删除提醒事项

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 提醒事项 ID | No |

**Returns:** `Promise<boolean>`

---

## contacts

通讯录操作

### `contacts.requestAccess`

**Signature:** `requestAccess()`

请求通讯录权限

**Returns:** `{ granted: boolean, error?: string }`

---

### `contacts.getAccessStatus`

**Signature:** `getAccessStatus()`

获取权限状态

**Returns:** `'authorized' | 'denied' | 'restricted' | 'notDetermined'`

---

### `contacts.isAuthorized`

**Signature:** `isAuthorized()`

检查是否已授权

**Returns:** `boolean`

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

---

### `contacts.getCount`

**Signature:** `getCount()`

获取联系人总数

**Returns:** `number`

---

### `contacts.search`

**Signature:** `search(query)`

按名字搜索联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `query` | `string` | 搜索关键词（匹配姓名） | No |

**Returns:** `[Contact]`

---

### `contacts.searchByPhone`

**Signature:** `searchByPhone(phone)`

按电话搜索联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `phone` | `string` | 电话号码（支持模糊匹配） | No |

**Returns:** `[Contact]`

---

### `contacts.searchByEmail`

**Signature:** `searchByEmail(email)`

按邮箱搜索联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `email` | `string` | 邮箱地址（支持模糊匹配） | No |

**Returns:** `[Contact]`

---

### `contacts.getById`

**Signature:** `getById(id)`

根据 ID 获取联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 联系人唯一标识符 | No |

**Returns:** `Contact | null`

---

### `contacts.create`

**Signature:** `create(data)`

创建联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `data` | `object` | 联系人数据 { givenName, familyName, phoneNumbers?, emailAddresses?, ... } | No |

**Returns:** `{ success: boolean, id?: string, error?: string }`

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

---

### `contacts.delete`

**Signature:** `delete(id)`

删除联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | 联系人唯一标识符 | No |

**Returns:** `{ success: boolean, error?: string }`

---

### `contacts.getGroups`

**Signature:** `getGroups()`

获取所有分组

**Returns:** `[{ id: string, name: string }]`

---

### `contacts.getContactsInGroup`

**Signature:** `getContactsInGroup(groupId)`

获取分组内联系人

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `groupId` | `string` | 分组唯一标识符 | No |

**Returns:** `[Contact]`

---

## notification

本地通知

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

---

### `notification.getDelivered`

**Signature:** `getDelivered()`

获取已发送通知

**Returns:** `Promise<[{ id: string, title: string, body: string, date: number }]>`

---

### `notification.requestPermission`

**Signature:** `requestPermission()`

请求通知权限

**Returns:** `Promise<boolean>`

---

### `notification.getPermissionStatus`

**Signature:** `getPermissionStatus()`

获取权限状态

**Returns:** `Promise<'authorized' | 'denied' | 'notDetermined' | 'provisional' | 'ephemeral' | 'unknown'>`

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

---

## alarm

闹钟和定时提醒

### `alarm.requestAccess`

**Signature:** `requestAccess()`

请求通知权限

**Returns:** `Promise<boolean>`

---

### `alarm.getAccessStatus`

**Signature:** `getAccessStatus()`

获取权限状态

**Returns:** `Promise<'authorized' | 'denied' | 'notDetermined'>`

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

---

### `alarm.getPending`

**Signature:** `getPending()`

获取待触发的闹钟

**Returns:** `Promise<[{ id: string, title: string, date: number, repeat?: string }]>`

---

### `alarm.getCount`

**Signature:** `getCount()`

获取闹钟数量

**Returns:** `Promise<number>`

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

**Signature:** `openClockApp()`

打开系统时钟

**Returns:** `void`

---

### `alarm.openTimer`

**Signature:** `openTimer()`

打开计时器

**Returns:** `void`

---

## media

音乐媒体控制

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

**Returns:** `'playing' | 'paused' | 'stopped'`

---

### `media.isPlaying`

**Signature:** `isPlaying()`

是否正在播放

**Returns:** `boolean`

---

### `media.getNowPlaying`

**Signature:** `getNowPlaying()`

获取当前播放信息

**Returns:** `{ title: string, artist: string, album: string, duration: number, artwork?: string }`

---

### `media.getVolume`

**Signature:** `getVolume()`

获取音量

**Returns:** `number`

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

**Returns:** `'none' | 'one' | 'all'`

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

**Returns:** `'off' | 'songs' | 'albums'`

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

**Signature:** `requestAccess()`

请求音乐库权限

**Returns:** `Promise<boolean>`

---

### `media.getAccessStatus`

**Signature:** `getAccessStatus()`

获取权限状态

**Returns:** `Promise<'authorized' | 'denied' | 'notDetermined' | 'restricted'>`

---

### `media.searchSongs`

**Signature:** `searchSongs(query)`

搜索音乐库

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `query` | `string` | 搜索关键词 | No |

**Returns:** `Promise<[{ id: string, title: string, artist: string, album: string }]>`

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

---

### `media.getAlbums`

**Signature:** `getAlbums()`

获取所有专辑

**Returns:** `Promise<[{ id: string, title: string, artist: string }]>`

---

### `media.getArtists`

**Signature:** `getArtists()`

获取所有艺术家

**Returns:** `Promise<[{ id: string, name: string }]>`

---

### `media.getPlaylists`

**Signature:** `getPlaylists()`

获取播放列表

**Returns:** `Promise<[{ id: string, name: string }]>`

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

---

## mail

邮件操作

### `mail.canSendMail`

**Signature:** `canSendMail()`

检查是否能发送邮件

**Returns:** `boolean`

---

### `mail.getStatus`

**Signature:** `getStatus()`

获取邮件功能状态

**Returns:** `'available' | 'unavailable'`

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

---

### `mail.sendAdvanced`

**Signature:** `sendAdvanced(options)`

发送邮件(完整选项)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `options` | `object` | 选项 { to, cc, bcc, subject, body, isHtml, attachments } | No |

**Returns:** `Promise<boolean>`

---

### `mail.openMailApp`

**Signature:** `openMailApp()`

打开邮件 App

**Returns:** `void`

---

### `mail.openSpecificMailApp`

**Signature:** `openSpecificMailApp(appName)`

打开指定邮件 App

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `appName` | `string` | App 名称 | No |

**Returns:** `void`

---

### `mail.isValidEmail`

**Signature:** `isValidEmail(email)`

验证邮箱格式

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `email` | `string` | 邮箱地址 | No |

**Returns:** `boolean`

---

### `mail.getInstalledMailApps`

**Signature:** `getInstalledMailApps()`

检测已安装的邮件 App

**Returns:** `string[]`

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

---

### `mail.getTemplates`

**Signature:** `getTemplates()`

获取可用模板列表

**Returns:** `string[]`

---

## sms

短信操作

### `sms.checkAccess`

**Signature:** `checkAccess()`

检查短信权限

**Returns:** `boolean`

---

### `sms.tryAccess`

**Signature:** `tryAccess()`

尝试直接访问短信数据库(调试用)

**Returns:** `boolean`

---

### `sms.read`

**Signature:** `read(limit?)`

读取最近的短信

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | 限制条数 (默认 10) | Yes |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

---

### `sms.getVerificationCode`

**Signature:** `getVerificationCode(minutes?)`

获取验证码

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `minutes` | `number` | 查找最近几分钟内的验证码 (默认 5) | Yes |

**Returns:** `string | null`

---

### `sms.search`

**Signature:** `search(keyword)`

搜索短信

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `keyword` | `string` | 关键词 | No |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

---

### `sms.getByAddress`

**Signature:** `getByAddress(address)`

按号码获取短信

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | 发送者号码 | No |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

---

### `sms.getChats`

**Signature:** `getChats()`

获取会话列表

**Returns:** `[{ id: string, name: string, lastMessage: string, date: number }]`

---

### `sms.getStatistics`

**Signature:** `getStatistics()`

获取短信统计

**Returns:** `{ total: number, unread: number, senders: number }`

---

### `sms.getLatest`

**Signature:** `getLatest()`

获取最新短信

**Returns:** `{ id: string, content: string, sender: string, date: number } | null`

---

### `sms.getUnread`

**Signature:** `getUnread()`

获取未读短信

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

---

## sql

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

---

### `sql.tables`

**Signature:** `tables(dbPath)`

列出数据库中的所有表

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `dbPath` | `string` | 数据库路径 | No |

**Returns:** `string[]`

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

---

## shortcuts

快捷指令操作

### `shortcuts.run`

**Signature:** `run(name)`

运行快捷指令

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 快捷指令名称 | No |

**Returns:** `Promise<string>`

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

---

### `shortcuts.openGallery`

**Signature:** `openGallery()`

打开快捷指令库

**Returns:** `void`

---

### `shortcuts.openShortcut`

**Signature:** `openShortcut(name)`

打开指定快捷指令

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | 快捷指令名称 | No |

**Returns:** `void`

---

### `shortcuts.createNew`

**Signature:** `createNew()`

创建新快捷指令

**Returns:** `void`

---

### `shortcuts.importFromUrl`

**Signature:** `importFromUrl(url)`

通过链接导入快捷指令

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 快捷指令 URL | No |

**Returns:** `void`

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

蓝牙操作

### `bluetooth.isEnabled`

**Signature:** `isEnabled()`

蓝牙是否开启

**Returns:** `boolean`

---

### `bluetooth.getStatus`

**Signature:** `getStatus()`

获取蓝牙状态

**Returns:** `'poweredOn' | 'poweredOff' | 'unauthorized' | 'unknown'`

---

### `bluetooth.setEnabled`

**Signature:** `setEnabled(enabled)`

设置蓝牙开关

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | 是否开启 | No |

**Returns:** `void`

---

### `bluetooth.turnOn`

**Signature:** `turnOn()`

打开蓝牙

**Returns:** `void`

---

### `bluetooth.turnOff`

**Signature:** `turnOff()`

关闭蓝牙

**Returns:** `void`

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

---

### `bluetooth.stopScan`

**Signature:** `stopScan()`

停止扫描

**Returns:** `void`

---

### `bluetooth.openSettings`

**Signature:** `openSettings()`

打开蓝牙设置

**Returns:** `void`

---

## webview

网页视图操作

### `webview.open`

**Signature:** `open(url)`

打开网页并等待加载

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | 网页 URL | No |

**Returns:** `Promise<void>`

---

### `webview.loadHTML`

**Signature:** `loadHTML(html, baseURL?)`

加载 HTML 内容

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `html` | `string` | HTML 字符串 | No |
| `baseURL` | `string` | 基础 URL | Yes |

**Returns:** `Promise<void>`

---

### `webview.evaluate`

**Signature:** `evaluate(script)`

执行页面内 JavaScript

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `script` | `string` | JS 代码 | No |

**Returns:** `Promise<any>`

---

### `webview.getTitle`

**Signature:** `getTitle()`

获取页面标题

**Returns:** `Promise<string>`

---

### `webview.getURL`

**Signature:** `getURL()`

获取当前 URL

**Returns:** `Promise<string>`

---

### `webview.getHTML`

**Signature:** `getHTML()`

获取页面 HTML 源码

**Returns:** `Promise<string>`

---

### `webview.close`

**Signature:** `close()`

关闭网页视图

**Returns:** `void`

---

### `webview.isOpen`

**Signature:** `isOpen()`

检查是否已打开

**Returns:** `boolean`

---

### `webview.screenshot`

**Signature:** `screenshot()`

截取页面截图

**Returns:** `Promise<string>`

---

