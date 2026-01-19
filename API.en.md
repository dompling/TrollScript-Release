# TrollScript API Reference (v1.0.0)

TrollScript provides a powerful JavaScript environment with access to various system features. Below is the comprehensive API reference for all available modules.

---

## Table of Contents

- [console](#console) - Console output
- [device](#device) - Device information
- [clipboard](#clipboard) - Clipboard operations
- [storage](#storage) - Local storage
- [icloud](#icloud) - iCloud file operations
- [file](#file) - File operations
- [http](#http) - Network requests
- [network](#network) - Network operations
- [app](#app) - App operations
- [ui](#ui) - UI Interaction
- [haptic](#haptic) - Haptic feedback
- [display](#display) - Display control
- [util](#util) - Utility functions
- [location](#location) - Location services
- [calendar](#calendar) - System calendar
- [reminder](#reminder) - Reminders
- [contacts](#contacts) - Contacts operations
- [notification](#notification) - Local notifications
- [alarm](#alarm) - Alarms and Timers
- [media](#media) - Music & Media control
- [mail](#mail) - Mail operations
- [sms](#sms) - SMS operations
- [sql](#sql) - SQL Database Query
- [shortcuts](#shortcuts) - Shortcuts operations
- [bluetooth](#bluetooth) - Bluetooth operations
- [webview](#webview) - Webview operations
- [memo](#memo) - Memo operations (iCloud Sync)

---

## console

Console output

### `console.log`

**Signature:** `log(...args)`

Output log information

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | Content to output | No |

**Returns:** `void`

---

### `console.error`

**Signature:** `error(...args)`

Output error information

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | Content to output | No |

**Returns:** `void`

---

### `console.warn`

**Signature:** `warn(...args)`

Output warning information

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | Content to output | No |

**Returns:** `void`

---

### `console.info`

**Signature:** `info(...args)`

Output informational message

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | Content to output | No |

**Returns:** `void`

---

### `console.debug`

**Signature:** `debug(...args)`

Output debug information

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | Content to output | No |

**Returns:** `void`

---

### `console.table`

**Signature:** `table(data)`

Output as a table

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `data` | `object \| array` | Table data to display | No |

**Returns:** `void`

---

### `console.clear`

**Signature:** `clear()`

Clear console

**Returns:** `void`

---

## device

Device information

### `device.info`

**Signature:** `info()`

Get device information

**Returns:** `{ name: string, model: string, systemName: string, systemVersion: string, identifier: string }`

---

### `device.battery`

**Signature:** `battery()`

Get battery information

**Returns:** `{ level: number, state: string, lowPowerMode: boolean }`

---

### `device.screen`

**Signature:** `screen()`

Get screen information

**Returns:** `{ width: number, height: number, scale: number, brightness: number }`

---

## clipboard

Clipboard operations

### `clipboard.getText`

**Signature:** `getText()`

Get clipboard text

**Returns:** `string`

---

### `clipboard.setText`

**Signature:** `setText(text)`

Set clipboard text

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `text` | `string` | Text content to set | No |

**Returns:** `void`

---

### `clipboard.clear`

**Signature:** `clear()`

Clear clipboard

**Returns:** `void`

---

## storage

Local storage

### `storage.get`

**Signature:** `get(key)`

Get stored value

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | Key name | No |

**Returns:** `any`

---

### `storage.set`

**Signature:** `set(key, value)`

Set stored value

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | Key name | No |
| `value` | `any` | Value to store | No |

**Returns:** `void`

---

### `storage.remove`

**Signature:** `remove(key)`

Remove stored value

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | Key name | No |

**Returns:** `void`

---

### `storage.clear`

**Signature:** `clear()`

Clear all storage

**Returns:** `void`

---

### `storage.has`

**Signature:** `has(key)`

Check if key exists

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | Key name | No |

**Returns:** `boolean`

---

## icloud

iCloud file operations

### `icloud.isAvailable`

**Signature:** `isAvailable()`

Check if iCloud is available

**Returns:** `boolean`

---

### `icloud.containerPath`

**Signature:** `containerPath()`

Get iCloud container path

**Returns:** `string | null`

---

### `icloud.read`

**Signature:** `read(path)`

Read iCloud file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path (relative to iCloud container) | No |

**Returns:** `string`

---

### `icloud.write`

**Signature:** `write(path, content)`

Write to iCloud file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |
| `content` | `string` | Content to write | No |

**Returns:** `boolean`

---

### `icloud.delete`

**Signature:** `delete(path)`

Delete iCloud file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `boolean`

---

### `icloud.list`

**Signature:** `list(path?)`

List iCloud directory

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Directory path, defaults to root | Yes |

**Returns:** `[string]`

---

## file

File operations

### `file.read`

**Signature:** `read(path)`

Read file content

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `string`

---

### `file.write`

**Signature:** `write(path, content)`

Write file content

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |
| `content` | `string` | Content to write | No |

**Returns:** `boolean`

---

### `file.append`

**Signature:** `append(path, content)`

Append to file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |
| `content` | `string` | Content to append | No |

**Returns:** `boolean`

---

### `file.exists`

**Signature:** `exists(path)`

Check if file exists

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `boolean`

---

### `file.delete`

**Signature:** `delete(path)`

Delete file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `boolean`

---

### `file.move`

**Signature:** `move(from, to)`

Move file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `from` | `string` | Source path | No |
| `to` | `string` | Destination path | No |

**Returns:** `boolean`

---

### `file.copy`

**Signature:** `copy(from, to)`

Copy file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `from` | `string` | Source path | No |
| `to` | `string` | Destination path | No |

**Returns:** `boolean`

---

### `file.list`

**Signature:** `list(path)`

List directory contents

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Directory path | No |

**Returns:** `[string]`

---

### `file.mkdir`

**Signature:** `mkdir(path)`

Create directory

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Directory path | No |

**Returns:** `boolean`

---

### `file.stat`

**Signature:** `stat(path)`

Get file statistics

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `{ size: number, modificationDate: number, creationDate: number, type: string }`

---

### `file.isDirectory`

**Signature:** `isDirectory(path)`

Check if path is a directory

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `boolean`

---

### `file.documentsPath`

**Signature:** `documentsPath()`

Get Documents path

**Returns:** `string`

---

### `file.cachePath`

**Signature:** `cachePath()`

Get Caches path

**Returns:** `string`

---

### `file.tempPath`

**Signature:** `tempPath()`

Get Temporary path

**Returns:** `string`

---

### `file.debug`

**Signature:** `debug(path)`

Debug path access permissions

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `string`

---

### `file.rootRead`

**Signature:** `rootRead(path)`

Read protected file using Root (Requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `string | null`

---

### `file.rootList`

**Signature:** `rootList(path)`

List protected directory using Root (Requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute directory path | No |

**Returns:** `[string] | null`

---

### `file.rootCopy`

**Signature:** `rootCopy(src, dest)`

Copy protected file using Root (Requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `src` | `string` | Source path | No |
| `dest` | `string` | Destination path | No |

**Returns:** `boolean`

---

### `file.rootCheck`

**Signature:** `rootCheck(path)`

Check path info using Root (Requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File or directory path | No |

**Returns:** `{ readable: boolean, writable: boolean, exists: boolean, isDirectory: boolean }`

---

### `file.rootExists`

**Signature:** `rootExists(path)`

Check file existence using Root (Requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `boolean`

---

### `file.rootAvailable`

**Signature:** `rootAvailable()`

Check if Root Helper is available

**Returns:** `boolean`

---

## http

Network requests

### `http.get`

**Signature:** `get(url, options?)`

Send GET request

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Request URL | No |
| `options` | `object` | Request options { headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.post`

**Signature:** `post(url, options?)`

Send POST request

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Request URL | No |
| `options` | `object` | Request options { body, headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.put`

**Signature:** `put(url, options?)`

Send PUT request

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Request URL | No |
| `options` | `object` | Request options { body, headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.delete`

**Signature:** `delete(url, options?)`

Send DELETE request

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Request URL | No |
| `options` | `object` | Request options { headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.patch`

**Signature:** `patch(url, options?)`

Send PATCH request

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Request URL | No |
| `options` | `object` | Request options { body, headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.head`

**Signature:** `head(url, options?)`

Send HEAD request

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Request URL | No |
| `options` | `object` | Request options { headers, timeout } | Yes |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.request`

**Signature:** `request(url, options)`

Send custom request

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Request URL | No |
| `options` | `object` | Request options { method, body, headers, timeout } | No |

**Returns:** `Promise<{ status: number, data: string, headers: object }>`

---

### `http.download`

**Signature:** `download(url, path)`

Download file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Download URL | No |
| `path` | `string` | Save path | No |

**Returns:** `Promise<{ path: string }>`

---

## network

Network operations

### `network.isReachable`

**Signature:** `isReachable()`

Check if network is reachable

**Returns:** `boolean`

---

### `network.getConnectionType`

**Signature:** `getConnectionType()`

Get connection type

**Returns:** `'wifi' | 'cellular' | 'none'`

---

### `network.getIPAddress`

**Signature:** `getIPAddress()`

Get device IP address

**Returns:** `string | null`

---

### `network.getWiFiInfo`

**Signature:** `getWiFiInfo()`

Get WiFi information

**Returns:** `{ ssid: string, bssid: string } | null`

---

### `network.encodeURL`

**Signature:** `encodeURL(string)`

URL encode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | String to encode | No |

**Returns:** `string`

---

### `network.decodeURL`

**Signature:** `decodeURL(string)`

URL decode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | String to decode | No |

**Returns:** `string`

---

### `network.parseURL`

**Signature:** `parseURL(url)`

Parse URL components

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | URL to parse | No |

**Returns:** `{ scheme: string, host: string, path: string, query: string, params: object }`

---

### `network.buildURL`

**Signature:** `buildURL(baseURL, params?)`

Build URL with parameters

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `baseURL` | `string` | Base URL | No |
| `params` | `object` | Query parameters | Yes |

**Returns:** `string`

---

### `network.ping`

**Signature:** `ping(host)`

Ping host

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `host` | `string` | Hostname or IP | No |

**Returns:** `Promise<{ latency: number, success: boolean }>`

---

### `network.download`

**Signature:** `download(url, filename?)`

Download file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Download URL | No |
| `filename` | `string` | Save filename | Yes |

**Returns:** `Promise<{ path: string }>`

---

### `network.getAirplaneMode`

**Signature:** `getAirplaneMode()`

Get Airplane Mode status

**Returns:** `boolean`

---

### `network.setAirplaneMode`

**Signature:** `setAirplaneMode(enabled)`

Set Airplane Mode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

---

### `network.listVPNs`

**Signature:** `listVPNs()`

List VPN configurations

**Returns:** `[{ name: string, active: boolean }]`

---

### `network.connectVPN`

**Signature:** `connectVPN(name?)`

Connect VPN

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | VPN name, defaults to first one | Yes |

**Returns:** `boolean`

---

### `network.disconnectVPN`

**Signature:** `disconnectVPN()`

Disconnect VPN

**Returns:** `boolean`

---

### `network.getVPNStatus`

**Signature:** `getVPNStatus()`

Get VPN status

**Returns:** `{ connected: boolean, name?: string }`

---

### `network.getWiFiEnabled`

**Signature:** `getWiFiEnabled()`

Get WiFi switch status

**Returns:** `boolean`

---

### `network.setWiFi`

**Signature:** `setWiFi(enabled)`

Set WiFi switch

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

---

### `network.openSettings`

**Signature:** `openSettings(section?)`

Open system settings

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `section` | `string` | Settings page (e.g., 'WIFI') | Yes |

**Returns:** `boolean`

---

## app

App operations

### `app.version`

**Signature:** `version()`

Get app version

**Returns:** `string`

---

### `app.open`

**Signature:** `open(url)`

Open URL/Scheme

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | URL to open | No |

**Returns:** `Promise<boolean>`

---

### `app.canOpen`

**Signature:** `canOpen(url)`

Check if URL can be opened

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | URL to check | No |

**Returns:** `boolean`

---

### `app.vibrate`

**Signature:** `vibrate()`

Vibrate feedback

**Returns:** `void`

---

### `app.getLogs`

**Signature:** `getLogs(limit?)`

Get app logs

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | Number of logs to return | Yes |

**Returns:** `[LogMessage]`

---

### `app.exportLogs`

**Signature:** `exportLogs()`

Export logs as string

**Returns:** `string`

---

### `app.getCrashReports`

**Signature:** `getCrashReports()`

Get all crash reports

**Returns:** `[CrashReport]`

---

### `app.getLastCrash`

**Signature:** `getLastCrash()`

Get last crash report

**Returns:** `CrashReport | null`

---

### `app.clearLogs`

**Signature:** `clearLogs()`

Clear all logs

**Returns:** `void`

---

## ui

UI Interaction

### `ui.alert`

**Signature:** `alert(title, message?, buttonTitle?)`

Show alert

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Title | No |
| `message` | `string` | Content | Yes |
| `buttonTitle` | `string` | Button text | Yes |

**Returns:** `Promise<void>`

---

### `ui.toast`

**Signature:** `toast(message, duration?)`

Show Toast message

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `message` | `string` | Message content | No |
| `duration` | `number` | Duration (seconds) | Yes |

**Returns:** `void`

---

### `ui.confirm`

**Signature:** `confirm(title, message?, confirmTitle?, cancelTitle?)`

Show confirm dialog

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Title | No |
| `message` | `string` | Content | Yes |
| `confirmTitle` | `string` | Confirm button text | Yes |
| `cancelTitle` | `string` | Cancel button text | Yes |

**Returns:** `Promise<boolean>`

---

### `ui.prompt`

**Signature:** `prompt(title, message?, defaultValue?, placeholder?)`

Show prompt dialog

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Title | No |
| `message` | `string` | Content | Yes |
| `defaultValue` | `string` | Default value | Yes |
| `placeholder` | `string` | Placeholder | Yes |

**Returns:** `Promise<string | null>`

---

### `ui.actionSheet`

**Signature:** `actionSheet(title, message?, actions)`

Show Action Sheet

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Title | No |
| `message` | `string` | Content | Yes |
| `actions` | `string[]` | List of options | No |

**Returns:** `Promise<number>`

---

### `ui.showLoading`

**Signature:** `showLoading(message?)`

Show loading indicator

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `message` | `string` | Loading message | Yes |

**Returns:** `void`

---

### `ui.hideLoading`

**Signature:** `hideLoading()`

Hide loading indicator

**Returns:** `void`

---

## haptic

Haptic feedback

### `haptic.impact`

**Signature:** `impact(style?)`

Impact feedback

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `style` | `string` | 'light' \| 'medium' \| 'heavy' \| 'soft' \| 'rigid' | Yes |

**Returns:** `void`

---

### `haptic.notification`

**Signature:** `notification(type)`

Notification feedback

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `type` | `string` | 'success' \| 'warning' \| 'error' | No |

**Returns:** `void`

---

### `haptic.selection`

**Signature:** `selection()`

Selection feedback

**Returns:** `void`

---

### `haptic.vibrate`

**Signature:** `vibrate()`

Vibrate device

**Returns:** `void`

---

### `haptic.light`

**Signature:** `light()`

Light impact

**Returns:** `void`

---

### `haptic.medium`

**Signature:** `medium()`

Medium impact

**Returns:** `void`

---

### `haptic.heavy`

**Signature:** `heavy()`

Heavy impact

**Returns:** `void`

---

### `haptic.success`

**Signature:** `success()`

Success feedback

**Returns:** `void`

---

### `haptic.warning`

**Signature:** `warning()`

Warning feedback

**Returns:** `void`

---

### `haptic.error`

**Signature:** `error()`

Error feedback

**Returns:** `void`

---

## display

Display control

### `display.getBrightness`

**Signature:** `getBrightness()`

Get screen brightness

**Returns:** `number`

---

### `display.setBrightness`

**Signature:** `setBrightness(value)`

Set screen brightness

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `value` | `number` | Brightness value (0.0 - 1.0) | No |

**Returns:** `void`

---

### `display.increaseBrightness`

**Signature:** `increaseBrightness(amount?)`

Increase brightness

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `amount` | `number` | Amount to increase (default 0.1) | Yes |

**Returns:** `void`

---

### `display.decreaseBrightness`

**Signature:** `decreaseBrightness(amount?)`

Decrease brightness

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `amount` | `number` | Amount to decrease (default 0.1) | Yes |

**Returns:** `void`

---

### `display.getScreenInfo`

**Signature:** `getScreenInfo()`

Get screen info

**Returns:** `{ width: number, height: number, scale: number }`

---

### `display.getOrientation`

**Signature:** `getOrientation()`

Get screen orientation

**Returns:** `'portrait' | 'landscape'`

---

### `display.isLowPowerModeEnabled`

**Signature:** `isLowPowerModeEnabled()`

Is Low Power Mode enabled

**Returns:** `boolean`

---

### `display.setLowPowerMode`

**Signature:** `setLowPowerMode(enabled)`

Set Low Power Mode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

---

### `display.getNightShiftStatus`

**Signature:** `getNightShiftStatus()`

Get Night Shift status

**Returns:** `boolean`

---

### `display.setNightShift`

**Signature:** `setNightShift(enabled)`

Set Night Shift

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

---

### `display.getTrueToneStatus`

**Signature:** `getTrueToneStatus()`

Get True Tone status

**Returns:** `boolean`

---

### `display.setTrueTone`

**Signature:** `setTrueTone(enabled)`

Set True Tone

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

---

### `display.isAutoBrightnessEnabled`

**Signature:** `isAutoBrightnessEnabled()`

Is Auto Brightness enabled

**Returns:** `boolean`

---

### `display.setAutoBrightness`

**Signature:** `setAutoBrightness(enabled)`

Set Auto Brightness

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

---

### `display.openSettings`

**Signature:** `openSettings()`

Open display settings

**Returns:** `boolean`

---

### `display.getAutoLockTime`

**Signature:** `getAutoLockTime()`

Get auto-lock time

**Returns:** `number`

---

### `display.setAutoLock`

**Signature:** `setAutoLock(seconds)`

Set auto-lock time

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `seconds` | `number` | Lock time in seconds, 0 means never | No |

**Returns:** `boolean`

---

### `display.keepAwake`

**Signature:** `keepAwake(enabled)`

Keep screen awake

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to keep awake | No |

**Returns:** `void`

---

## util

Utility functions

### `util.uuid`

**Signature:** `uuid()`

Generate UUID

**Returns:** `string`

---

### `util.md5`

**Signature:** `md5(string)`

Calculate MD5

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | String to calculate | No |

**Returns:** `string`

---

### `util.base64Encode`

**Signature:** `base64Encode(string)`

Base64 encode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | String to encode | No |

**Returns:** `string`

---

### `util.base64Decode`

**Signature:** `base64Decode(string)`

Base64 decode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | String to decode | No |

**Returns:** `string`

---

### `util.formatDate`

**Signature:** `formatDate(date, format)`

Format date

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `date` | `Date` | Date object | No |
| `format` | `string` | Format string (e.g., 'yyyy-MM-dd') | No |

**Returns:** `string`

---

## location

Location services

### `location.requestAccess`

**Signature:** `requestAccess()`

Request location access

**Returns:** `void`

---

### `location.getAccessStatus`

**Signature:** `getAccessStatus()`

Get access status

**Returns:** `'authorized' | 'denied' | 'restricted' | 'notDetermined' | 'unknown'`

---

### `location.isAuthorized`

**Signature:** `isAuthorized()`

Check if authorized

**Returns:** `boolean`

---

### `location.getCurrent`

**Signature:** `getCurrent()`

Get current location

**Returns:** `Promise<{ lat: number, lng: number, alt: number, course: number, speed: number, timestamp: number }>`

---

### `location.current`

**Signature:** `current()`

Get current location (alias)

**Returns:** `Promise<{ lat: number, lng: number, alt: number, course: number, speed: number, timestamp: number }>`

---

### `location.distance`

**Signature:** `distance(lat1, lng1, lat2, lng2)`

Calculate distance between two points

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `lat1` | `number` | Point 1 Latitude | No |
| `lng1` | `number` | Point 1 Longitude | No |
| `lat2` | `number` | Point 2 Latitude | No |
| `lng2` | `number` | Point 2 Longitude | No |

**Returns:** `number`

---

### `location.geocode`

**Signature:** `geocode(address)`

Address to coordinates

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | Address string | No |

**Returns:** `Promise<[{ lat: number, lng: number, name: string }]>`

---

### `location.reverseGeocode`

**Signature:** `reverseGeocode(lat, lng)`

Coordinates to address

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `lat` | `number` | Latitude | No |
| `lng` | `number` | Longitude | No |

**Returns:** `Promise<[{ name: string, country: string, locality: string, administrativeArea: string }]>`

---

### `location.isLocationServicesEnabled`

**Signature:** `isLocationServicesEnabled()`

Is location services enabled

**Returns:** `boolean`

---

## calendar

System calendar

### `calendar.isAuthorized`

**Signature:** `isAuthorized()`

Check authorization status

**Returns:** `boolean`

---

### `calendar.requestAccess`

**Signature:** `requestAccess()`

Request calendar access

**Returns:** `Promise<boolean>`

---

### `calendar.getCalendars`

**Signature:** `getCalendars()`

Get all calendars

**Returns:** `Promise<[{ id: string, title: string, color: string }]>`

---

### `calendar.getToday`

**Signature:** `getToday()`

Get events for today

**Returns:** `Promise<[{ id: string, title: string, startDate: number, endDate: number, calendar: string }]>`

---

### `calendar.getEvents`

**Signature:** `getEvents(start, end, calendarId?)`

Get calendar events

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `start` | `number` | Start timestamp | No |
| `end` | `number` | End timestamp | No |
| `calendarId` | `string` | Calendar ID | Yes |

**Returns:** `Promise<[{ id: string, title: string, startDate: number, endDate: number, calendar: string }]>`

---

### `calendar.create`

**Signature:** `create(title, start, end, options?)`

Create calendar event

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Title | No |
| `start` | `number` | Start timestamp | No |
| `end` | `number` | End timestamp | No |
| `options` | `object` | Options { calendarId, notes, location, url, allDay } | Yes |

**Returns:** `Promise<string>`

---

### `calendar.delete`

**Signature:** `delete(id)`

Delete calendar event

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Event ID | No |

**Returns:** `Promise<boolean>`

---

## reminder

Reminders

### `reminder.isAuthorized`

**Signature:** `isAuthorized()`

Check authorization status

**Returns:** `boolean`

---

### `reminder.requestAccess`

**Signature:** `requestAccess()`

Request reminder access

**Returns:** `Promise<boolean>`

---

### `reminder.getLists`

**Signature:** `getLists()`

Get all reminder lists

**Returns:** `Promise<[{ id: string, title: string, color: string }]>`

---

### `reminder.getAll`

**Signature:** `getAll(listId?)`

Get all reminders

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `listId` | `string` | List ID | Yes |

**Returns:** `Promise<[{ id: string, title: string, isCompleted: boolean, listId: string, dueDate?: number }]>`

---

### `reminder.create`

**Signature:** `create(title, options?)`

Create reminder

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Title | No |
| `options` | `object` | Options { listId, notes, dueDate, priority, sortOrder, isPinned } | Yes |

**Returns:** `Promise<string>`

---

### `reminder.complete`

**Signature:** `complete(id)`

Mark as completed

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Reminder ID | No |

**Returns:** `Promise<boolean>`

---

### `reminder.delete`

**Signature:** `delete(id)`

Delete reminder

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Reminder ID | No |

**Returns:** `Promise<boolean>`

---

### `reminder.getSorted`

**Signature:** `getSorted(options)`

Get sorted reminders

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `options` | `object` | { sortBy: 'createdAt'\|'dueDate'\|'priority'\|'title', ascending: boolean, completed: boolean } | Yes |

**Returns:** `Promise<[Reminder]>`

---

### `reminder.getUpcoming`

**Signature:** `getUpcoming(days)`

Get upcoming reminders

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `days` | `number` | Upcoming days (default 7) | Yes |

**Returns:** `Promise<[Reminder]>`

---

### `reminder.getOverdue`

**Signature:** `getOverdue()`

Get overdue reminders

**Returns:** `Promise<[Reminder]>`

---

### `reminder.reorder`

**Signature:** `reorder(ids)`

Batch reorder

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `ids` | `string[]` | Array of IDs in order | No |

**Returns:** `Promise<object>`

---

### `reminder.createSystemReminder`

**Signature:** `createSystemReminder(title, options?)`

Create system reminder (supports location trigger)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Title | No |
| `options` | `object` | { listId, notes, dueDate, priority, location: { latitude, longitude, radius, onArrive, name } } | Yes |

**Returns:** `Promise<object>`

---

### `reminder.getSystemLists`

**Signature:** `getSystemLists()`

Get system reminder lists

**Returns:** `Promise<[{ id: string, title: string, isSystem: true }]>`

---

## contacts

Contacts operations

### `contacts.requestAccess`

**Signature:** `requestAccess()`

Request contacts access

**Returns:** `{ granted: boolean, error?: string }`

---

### `contacts.getAccessStatus`

**Signature:** `getAccessStatus()`

Get access status

**Returns:** `'authorized' | 'denied' | 'restricted' | 'notDetermined'`

---

### `contacts.isAuthorized`

**Signature:** `isAuthorized()`

Check if authorized

**Returns:** `boolean`

---

### `contacts.getAll`

**Signature:** `getAll(offset?, limit?)`

Get all contacts

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `offset` | `number` | Number of records to skip (default 0) | Yes |
| `limit` | `number` | Max number to return (default all) | Yes |

**Returns:** `[Contact]`

---

### `contacts.getCount`

**Signature:** `getCount()`

Get total contact count

**Returns:** `number`

---

### `contacts.search`

**Signature:** `search(query)`

Search contacts by name

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `query` | `string` | Search keyword (matches name) | No |

**Returns:** `[Contact]`

---

### `contacts.searchByPhone`

**Signature:** `searchByPhone(phone)`

Search contacts by phone

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `phone` | `string` | Phone number (supports fuzzy match) | No |

**Returns:** `[Contact]`

---

### `contacts.searchByEmail`

**Signature:** `searchByEmail(email)`

Search contacts by email

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `email` | `string` | Email address (supports fuzzy match) | No |

**Returns:** `[Contact]`

---

### `contacts.getById`

**Signature:** `getById(id)`

Get contact by ID

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Contact unique identifier | No |

**Returns:** `Contact | null`

---

### `contacts.create`

**Signature:** `create(data)`

Create contact

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `data` | `object` | Contact data { givenName, familyName, phoneNumbers?, emailAddresses?, ... } | No |

**Returns:** `{ success: boolean, id?: string, error?: string }`

---

### `contacts.update`

**Signature:** `update(id, data)`

Update contact

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Contact unique identifier | No |
| `data` | `object` | Fields to update | No |

**Returns:** `{ success: boolean, error?: string }`

---

### `contacts.delete`

**Signature:** `delete(id)`

Delete contact

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Contact unique identifier | No |

**Returns:** `{ success: boolean, error?: string }`

---

### `contacts.getGroups`

**Signature:** `getGroups()`

Get all groups

**Returns:** `[{ id: string, name: string }]`

---

### `contacts.getContactsInGroup`

**Signature:** `getContactsInGroup(groupId)`

Get contacts in group

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `groupId` | `string` | Group unique identifier | No |

**Returns:** `[Contact]`

---

## notification

Local notifications

### `notification.send`

**Signature:** `send(title, body, options?)`

Send notification

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Notification title | No |
| `body` | `string` | Notification body | No |
| `options` | `object` | Options { url, userInfo, sound, badge } | Yes |

**Returns:** `Promise<string>`

---

### `notification.cancel`

**Signature:** `cancel(id)`

Cancel notification

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Notification ID | No |

**Returns:** `void`

---

### `notification.cancelAll`

**Signature:** `cancelAll()`

Cancel all notifications

**Returns:** `void`

---

### `notification.getPending`

**Signature:** `getPending()`

Get pending notifications

**Returns:** `Promise<[{ id: string, title: string, body: string, date: number }]>`

---

### `notification.getDelivered`

**Signature:** `getDelivered()`

Get delivered notifications

**Returns:** `Promise<[{ id: string, title: string, body: string, date: number }]>`

---

### `notification.requestPermission`

**Signature:** `requestPermission()`

Request notification permission

**Returns:** `Promise<boolean>`

---

### `notification.getPermissionStatus`

**Signature:** `getPermissionStatus()`

Get permission status

**Returns:** `Promise<'authorized' | 'denied' | 'notDetermined' | 'provisional' | 'ephemeral' | 'unknown'>`

---

### `notification.setBadge`

**Signature:** `setBadge(count)`

Set badge count

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `count` | `number` | Badge number | No |

**Returns:** `void`

---

### `notification.getBadge`

**Signature:** `getBadge()`

Get badge count

**Returns:** `Promise<number>`

---

### `notification.clearBadge`

**Signature:** `clearBadge()`

Clear badge

**Returns:** `void`

---

### `notification.schedule`

**Signature:** `schedule(title, body, date, options?)`

Schedule notification

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Notification title | No |
| `body` | `string` | Notification body | No |
| `date` | `number` | Trigger timestamp | No |
| `options` | `object` | Options { url, userInfo, sound, badge, repeat: 'daily'\|'weekly'\|'monthly' } | Yes |

**Returns:** `Promise<string>`

---

## alarm

Alarms and Timers

### `alarm.requestAccess`

**Signature:** `requestAccess()`

Request notification access

**Returns:** `Promise<boolean>`

---

### `alarm.getAccessStatus`

**Signature:** `getAccessStatus()`

Get access status

**Returns:** `Promise<'authorized' | 'denied' | 'notDetermined'>`

---

### `alarm.createOnce`

**Signature:** `createOnce(timestamp, title, options?)`

Create one-time alarm

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `timestamp` | `number` | Trigger timestamp | No |
| `title` | `string` | Title | No |
| `options` | `object` | Options { sound } | Yes |

**Returns:** `Promise<string>`

---

### `alarm.createDaily`

**Signature:** `createDaily(hour, minute, title, options?)`

Create daily repeating alarm

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `hour` | `number` | Hour (0-23) | No |
| `minute` | `number` | Minute (0-59) | No |
| `title` | `string` | Title | No |
| `options` | `object` | Options { sound } | Yes |

**Returns:** `Promise<string>`

---

### `alarm.createWeekly`

**Signature:** `createWeekly(weekday, hour, minute, title, options?)`

Create weekly repeating alarm

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `weekday` | `number` | Weekday (1-7, Sunday is 1) | No |
| `hour` | `number` | Hour (0-23) | No |
| `minute` | `number` | Minute (0-59) | No |
| `title` | `string` | Title | No |
| `options` | `object` | Options { sound } | Yes |

**Returns:** `Promise<string>`

---

### `alarm.createCountdown`

**Signature:** `createCountdown(seconds, title, options?)`

Create countdown timer

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `seconds` | `number` | Seconds | No |
| `title` | `string` | Title | No |
| `options` | `object` | Options { sound } | Yes |

**Returns:** `Promise<string>`

---

### `alarm.getPending`

**Signature:** `getPending()`

Get pending alarms

**Returns:** `Promise<[{ id: string, title: string, date: number, repeat?: string }]>`

---

### `alarm.getCount`

**Signature:** `getCount()`

Get alarm count

**Returns:** `Promise<number>`

---

### `alarm.cancel`

**Signature:** `cancel(id)`

Cancel specific alarm

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Alarm ID | No |

**Returns:** `void`

---

### `alarm.cancelAll`

**Signature:** `cancelAll()`

Cancel all alarms

**Returns:** `void`

---

### `alarm.openClockApp`

**Signature:** `openClockApp()`

Open Clock app

**Returns:** `void`

---

### `alarm.openTimer`

**Signature:** `openTimer()`

Open Timer

**Returns:** `void`

---

## media

Music & Media control

### `media.play`

**Signature:** `play()`

Play

**Returns:** `void`

---

### `media.pause`

**Signature:** `pause()`

Pause

**Returns:** `void`

---

### `media.stop`

**Signature:** `stop()`

Stop

**Returns:** `void`

---

### `media.togglePlayPause`

**Signature:** `togglePlayPause()`

Toggle Play/Pause

**Returns:** `void`

---

### `media.next`

**Signature:** `next()`

Next track

**Returns:** `void`

---

### `media.previous`

**Signature:** `previous()`

Previous track

**Returns:** `void`

---

### `media.skipToBeginning`

**Signature:** `skipToBeginning()`

Skip to beginning

**Returns:** `void`

---

### `media.getPlaybackState`

**Signature:** `getPlaybackState()`

Get playback state

**Returns:** `'playing' | 'paused' | 'stopped'`

---

### `media.isPlaying`

**Signature:** `isPlaying()`

Is currently playing

**Returns:** `boolean`

---

### `media.getNowPlaying`

**Signature:** `getNowPlaying()`

Get current playing info

**Returns:** `{ title: string, artist: string, album: string, duration: number, artwork?: string }`

---

### `media.getVolume`

**Signature:** `getVolume()`

Get volume

**Returns:** `number`

---

### `media.setVolume`

**Signature:** `setVolume(volume)`

Set volume

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `volume` | `number` | Volume (0.0 - 1.0) | No |

**Returns:** `void`

---

### `media.getRepeatMode`

**Signature:** `getRepeatMode()`

Get repeat mode

**Returns:** `'none' | 'one' | 'all'`

---

### `media.setRepeatMode`

**Signature:** `setRepeatMode(mode)`

Set repeat mode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `mode` | `string` | 'none' \| 'one' \| 'all' | No |

**Returns:** `void`

---

### `media.getShuffleMode`

**Signature:** `getShuffleMode()`

Get shuffle mode

**Returns:** `'off' | 'songs' | 'albums'`

---

### `media.setShuffleMode`

**Signature:** `setShuffleMode(mode)`

Set shuffle mode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `mode` | `string` | 'off' \| 'songs' \| 'albums' | No |

**Returns:** `void`

---

### `media.getCurrentTime`

**Signature:** `getCurrentTime()`

Get current playback time

**Returns:** `number`

---

### `media.setCurrentTime`

**Signature:** `setCurrentTime(time)`

Set playback time

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `time` | `number` | Time (seconds) | No |

**Returns:** `void`

---

### `media.seekForward`

**Signature:** `seekForward(seconds?)`

Seek forward

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `seconds` | `number` | Seconds (default 15) | Yes |

**Returns:** `void`

---

### `media.seekBackward`

**Signature:** `seekBackward(seconds?)`

Seek backward

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `seconds` | `number` | Seconds (default 15) | Yes |

**Returns:** `void`

---

### `media.requestAccess`

**Signature:** `requestAccess()`

Request music library access

**Returns:** `Promise<boolean>`

---

### `media.getAccessStatus`

**Signature:** `getAccessStatus()`

Get access status

**Returns:** `Promise<'authorized' | 'denied' | 'notDetermined' | 'restricted'>`

---

### `media.searchSongs`

**Signature:** `searchSongs(query)`

Search music library

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `query` | `string` | Search keyword | No |

**Returns:** `Promise<[{ id: string, title: string, artist: string, album: string }]>`

---

### `media.playSong`

**Signature:** `playSong(persistentID)`

Play specific song

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `persistentID` | `string` | Song ID | No |

**Returns:** `void`

---

### `media.getAllSongs`

**Signature:** `getAllSongs()`

Get all songs

**Returns:** `Promise<[{ id: string, title: string, artist: string, album: string }]>`

---

### `media.getAlbums`

**Signature:** `getAlbums()`

Get all albums

**Returns:** `Promise<[{ id: string, title: string, artist: string }]>`

---

### `media.getArtists`

**Signature:** `getArtists()`

Get all artists

**Returns:** `Promise<[{ id: string, name: string }]>`

---

### `media.getPlaylists`

**Signature:** `getPlaylists()`

Get playlists

**Returns:** `Promise<[{ id: string, name: string }]>`

---

### `media.playAlbum`

**Signature:** `playAlbum(id)`

Play album

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Album ID | No |

**Returns:** `void`

---

### `media.playArtist`

**Signature:** `playArtist(id)`

Play artist

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Artist ID | No |

**Returns:** `void`

---

### `media.playPlaylist`

**Signature:** `playPlaylist(id)`

Play playlist

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Playlist ID | No |

**Returns:** `void`

---

## mail

Mail operations

### `mail.canSendMail`

**Signature:** `canSendMail()`

Check if can send mail

**Returns:** `boolean`

---

### `mail.getStatus`

**Signature:** `getStatus()`

Get mail service status

**Returns:** `'available' | 'unavailable'`

---

### `mail.send`

**Signature:** `send(to, subject, body)`

Send simple email

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `to` | `string[]` | Recipients list | No |
| `subject` | `string` | Subject | No |
| `body` | `string` | Body | No |

**Returns:** `Promise<boolean>`

---

### `mail.sendAdvanced`

**Signature:** `sendAdvanced(options)`

Send email (advanced options)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `options` | `object` | Options { to, cc, bcc, subject, body, isHtml, attachments } | No |

**Returns:** `Promise<boolean>`

---

### `mail.openMailApp`

**Signature:** `openMailApp()`

Open Mail app

**Returns:** `void`

---

### `mail.openSpecificMailApp`

**Signature:** `openSpecificMailApp(appName)`

Open specific mail app

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `appName` | `string` | App name | No |

**Returns:** `void`

---

### `mail.isValidEmail`

**Signature:** `isValidEmail(email)`

Validate email format

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `email` | `string` | Email address | No |

**Returns:** `boolean`

---

### `mail.getInstalledMailApps`

**Signature:** `getInstalledMailApps()`

Detect installed mail apps

**Returns:** `string[]`

---

### `mail.fromTemplate`

**Signature:** `fromTemplate(templateName, variables)`

Generate email from template

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `templateName` | `string` | Template name | No |
| `variables` | `object` | Variables dictionary | No |

**Returns:** `Promise<string>`

---

### `mail.getTemplates`

**Signature:** `getTemplates()`

Get available templates

**Returns:** `string[]`

---

## sms

SMS operations

### `sms.checkAccess`

**Signature:** `checkAccess()`

Check SMS access

**Returns:** `boolean`

---

### `sms.tryAccess`

**Signature:** `tryAccess()`

Try direct SMS database access (Debug)

**Returns:** `boolean`

---

### `sms.read`

**Signature:** `read(limit?)`

Read recent SMS

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | Limit count (default 10) | Yes |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

---

### `sms.getVerificationCode`

**Signature:** `getVerificationCode(minutes?)`

Get verification code

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `minutes` | `number` | Look back minutes (default 5) | Yes |

**Returns:** `string | null`

---

### `sms.search`

**Signature:** `search(keyword)`

Search SMS

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `keyword` | `string` | Keyword | No |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

---

### `sms.getByAddress`

**Signature:** `getByAddress(address)`

Get SMS by number

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | Sender number | No |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

---

### `sms.getChats`

**Signature:** `getChats()`

Get conversation list

**Returns:** `[{ id: string, name: string, lastMessage: string, date: number }]`

---

### `sms.getStatistics`

**Signature:** `getStatistics()`

Get SMS statistics

**Returns:** `{ total: number, unread: number, senders: number }`

---

### `sms.getLatest`

**Signature:** `getLatest()`

Get latest SMS

**Returns:** `{ id: string, content: string, sender: string, date: number } | null`

---

### `sms.getUnread`

**Signature:** `getUnread()`

Get unread SMS

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

---

## sql

SQL Database Query

### `sql.query`

**Signature:** `query(dbPath, sql, params?)`

Execute SELECT query

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `dbPath` | `string` | Database path | No |
| `sql` | `string` | SQL statement | No |
| `params` | `any[]` | Parameter list | Yes |

**Returns:** `any[]`

---

### `sql.execute`

**Signature:** `execute(dbPath, sql, params?)`

Execute INSERT/UPDATE/DELETE

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `dbPath` | `string` | Database path | No |
| `sql` | `string` | SQL statement | No |
| `params` | `any[]` | Parameter list | Yes |

**Returns:** `{ changes: number, lastInsertRowId: number }`

---

### `sql.tables`

**Signature:** `tables(dbPath)`

List all tables in database

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `dbPath` | `string` | Database path | No |

**Returns:** `string[]`

---

### `sql.schema`

**Signature:** `schema(dbPath, tableName)`

Get table schema

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `dbPath` | `string` | Database path | No |
| `tableName` | `string` | Table name | No |

**Returns:** `string`

---

## shortcuts

Shortcuts operations

### `shortcuts.run`

**Signature:** `run(name)`

Run shortcut

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Shortcut name | No |

**Returns:** `Promise<string>`

---

### `shortcuts.runWithText`

**Signature:** `runWithText(name, text)`

Run shortcut (with text input)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Shortcut name | No |
| `text` | `string` | Input text | No |

**Returns:** `Promise<string>`

---

### `shortcuts.runWithClipboard`

**Signature:** `runWithClipboard(name)`

Run shortcut (clipboard input)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Shortcut name | No |

**Returns:** `Promise<string>`

---

### `shortcuts.runAdvanced`

**Signature:** `runAdvanced(name, options)`

Run shortcut (advanced options)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Shortcut name | No |
| `options` | `object` | Options { input, showOutput } | No |

**Returns:** `Promise<any>`

---

### `shortcuts.openApp`

**Signature:** `openApp()`

Open Shortcuts app

**Returns:** `void`

---

### `shortcuts.openGallery`

**Signature:** `openGallery()`

Open Shortcuts Gallery

**Returns:** `void`

---

### `shortcuts.openShortcut`

**Signature:** `openShortcut(name)`

Open specific shortcut

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Shortcut name | No |

**Returns:** `void`

---

### `shortcuts.createNew`

**Signature:** `createNew()`

Create new shortcut

**Returns:** `void`

---

### `shortcuts.importFromUrl`

**Signature:** `importFromUrl(url)`

Import shortcut from URL

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Shortcut URL | No |

**Returns:** `void`

---

### `shortcuts.isAvailable`

**Signature:** `isAvailable()`

Check if Shortcuts installed

**Returns:** `boolean`

---

### `shortcuts.getCommonShortcuts`

**Signature:** `getCommonShortcuts()`

Get common shortcut templates

**Returns:** `string[]`

---

## bluetooth

Bluetooth operations

### `bluetooth.isEnabled`

**Signature:** `isEnabled()`

Is Bluetooth enabled

**Returns:** `boolean`

---

### `bluetooth.getStatus`

**Signature:** `getStatus()`

Get Bluetooth status

**Returns:** `'poweredOn' | 'poweredOff' | 'unauthorized' | 'unknown'`

---

### `bluetooth.setEnabled`

**Signature:** `setEnabled(enabled)`

Set Bluetooth switch

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `void`

---

### `bluetooth.turnOn`

**Signature:** `turnOn()`

Turn on Bluetooth

**Returns:** `void`

---

### `bluetooth.turnOff`

**Signature:** `turnOff()`

Turn off Bluetooth

**Returns:** `void`

---

### `bluetooth.getPairedDevices`

**Signature:** `getPairedDevices()`

Get paired devices

**Returns:** `Promise<[{ name: string, uuid: string, isConnected: boolean }]>`

---

### `bluetooth.getConnectedDevices`

**Signature:** `getConnectedDevices()`

Get connected devices

**Returns:** `Promise<[{ name: string, uuid: string }]>`

---

### `bluetooth.connectDevice`

**Signature:** `connectDevice(id)`

Connect device

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Device UUID | No |

**Returns:** `Promise<boolean>`

---

### `bluetooth.disconnectDevice`

**Signature:** `disconnectDevice(id)`

Disconnect device

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Device UUID | No |

**Returns:** `Promise<boolean>`

---

### `bluetooth.startScan`

**Signature:** `startScan()`

Start scanning

**Returns:** `void`

---

### `bluetooth.stopScan`

**Signature:** `stopScan()`

Stop scanning

**Returns:** `void`

---

### `bluetooth.openSettings`

**Signature:** `openSettings()`

Open Bluetooth settings

**Returns:** `void`

---

## webview

Webview operations

### `webview.open`

**Signature:** `open(url)`

Open URL and wait for load

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Page URL | No |

**Returns:** `Promise<void>`

---

### `webview.loadHTML`

**Signature:** `loadHTML(html, baseURL?)`

Load HTML content

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `html` | `string` | HTML string | No |
| `baseURL` | `string` | Base URL | Yes |

**Returns:** `Promise<void>`

---

### `webview.evaluate`

**Signature:** `evaluate(script)`

Execute JavaScript in page

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `script` | `string` | JS Code | No |

**Returns:** `Promise<any>`

---

### `webview.getTitle`

**Signature:** `getTitle()`

Get page title

**Returns:** `Promise<string>`

---

### `webview.getURL`

**Signature:** `getURL()`

Get current URL

**Returns:** `Promise<string>`

---

### `webview.getHTML`

**Signature:** `getHTML()`

Get page HTML source

**Returns:** `Promise<string>`

---

### `webview.close`

**Signature:** `close()`

Close webview

**Returns:** `void`

---

### `webview.isOpen`

**Signature:** `isOpen()`

Check if currently open

**Returns:** `boolean`

---

### `webview.screenshot`

**Signature:** `screenshot()`

Take screenshot of page

**Returns:** `Promise<string>`

---

## memo

Memo operations (iCloud Sync)

### `memo.create`

**Signature:** `create(title, content, tags?)`

Create memo

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Memo title | No |
| `content` | `string` | Memo content | No |
| `tags` | `[string]` | List of tags | Yes |

**Returns:** `object`

---

### `memo.getAll`

**Signature:** `getAll()`

Get all memos

**Returns:** `[object]`

---

### `memo.getById`

**Signature:** `getById(id)`

Get memo by ID

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Memo ID | No |

**Returns:** `object | null`

---

### `memo.search`

**Signature:** `search(keyword)`

Search memos (title and content)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `keyword` | `string` | Search keyword | No |

**Returns:** `[object]`

---

### `memo.update`

**Signature:** `update(id, data)`

Update memo

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Memo ID | No |
| `data` | `object` | Update data { title?, content?, tags? } | No |

**Returns:** `object`

---

### `memo.delete`

**Signature:** `delete(id)`

Delete memo

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Memo ID | No |

**Returns:** `object`

---

### `memo.clear`

**Signature:** `clear()`

Clear all memos

**Returns:** `object`

---

### `memo.count`

**Signature:** `count()`

Get memo count

**Returns:** `number`

---

