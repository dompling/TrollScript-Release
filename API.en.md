# TrollScript API Reference (v1.0.0)

TrollScript provides a powerful JavaScript environment with access to various system features. Below is the comprehensive API reference for all available modules.

## Trigger Compatibility Legend

The following icons indicate API compatibility when running in background trigger mode:

| Icon | Status | Description |
|:----:|--------|-------------|
| ✅ | **Full** | Fully supported in trigger mode |
| ⚠️ | **Limited** | Partial support, some features may not work |
| ❌ | **None** | Not supported in trigger mode, requires foreground |

---

## Table of Contents

- [console](#console) ✅ - Console output
- [device](#device) ✅ - Device information
- [clipboard](#clipboard) ✅ - Clipboard operations
- [storage](#storage) ✅ - Local storage
- [icloud](#icloud) ✅ - iCloud file operations
- [file](#file) ✅ - File operations
- [http](#http) ✅ - Network requests
- [network](#network) ✅ - Network operations
- [app](#app) ✅ - App operations
- [haptic](#haptic) ✅ - Haptic feedback
- [display](#display) ✅ - Display control
- [util](#util) ✅ - Utility functions
- [location](#location) ✅ - Location services
- [calendar](#calendar) ✅ - System calendar
- [reminder](#reminder) ✅ - Reminders
- [contacts](#contacts) ✅ - Contacts operations
- [notification](#notification) ✅ - Local notifications
- [alarm](#alarm) ✅ - Alarms and Timers
- [media](#media) ✅ - Music & Media control
- [mail](#mail) ✅ - Mail operations
- [sms](#sms) ✅ - SMS operations
- [sql](#sql) ✅ - SQL Database Query
- [shortcuts](#shortcuts) ✅ - Shortcuts operations
- [bluetooth](#bluetooth) ✅ - Bluetooth operations
- [memo](#memo) ✅ - Memo operations (iCloud Sync)

---

## console

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

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

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Device information

### `device.info`

**Signature:** `info()`

Get device information

**Returns:** `{ name: string, model: string, systemName: string, systemVersion: string, identifier: string }`

*Object containing device name, model, system version, etc.*

---

### `device.battery`

**Signature:** `battery()`

Get battery information

**Returns:** `{ level: number, state: string, lowPowerMode: boolean }`

*Object containing battery level (0-1), charging state, low power mode, etc.*

---

### `device.screen`

**Signature:** `screen()`

Get screen information

**Returns:** `{ width: number, height: number, scale: number, brightness: number }`

*Object containing screen dimensions, scale factor, brightness, etc.*

---

## clipboard

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Clipboard operations

### `clipboard.getText`

**Signature:** `getText()`

Get clipboard text

**Returns:** `string`

*Text content from clipboard*

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

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Local storage

### `storage.get`

**Signature:** `get(key)`

Get stored value

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | Key name | No |

**Returns:** `any`

*Stored value, or undefined if not exists*

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

*Whether the key exists*

---

## icloud

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

iCloud file operations

### `icloud.isAvailable`

**Signature:** `isAvailable()`

Check if iCloud is available

**Returns:** `boolean`

*Availability status*

---

### `icloud.containerPath`

**Signature:** `containerPath()`

Get iCloud container path

**Returns:** `string \| null`

*Local path of iCloud container, null if unavailable*

---

### `icloud.read`

**Signature:** `read(path)`

Read iCloud file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path (relative to iCloud container) | No |

**Returns:** `string`

*File content*

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

*Whether write was successful*

---

### `icloud.delete`

**Signature:** `delete(path)`

Delete iCloud file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `boolean`

*Whether deletion was successful*

---

### `icloud.list`

**Signature:** `list(path?)`

List iCloud directory

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Directory path, defaults to root | Yes |

**Returns:** `[string]`

*Array of filenames*

---

## file

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

File operations

### `file.read`

**Signature:** `read(path)`

Read file content

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `string`

*File content*

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

*Whether write was successful*

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

*Whether append was successful*

---

### `file.exists`

**Signature:** `exists(path)`

Check if file exists

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `boolean`

*Existence status*

---

### `file.delete`

**Signature:** `delete(path)`

Delete file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `boolean`

*Whether deletion was successful*

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

*Whether move was successful*

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

*Whether copy was successful*

---

### `file.list`

**Signature:** `list(path)`

List directory contents

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Directory path | No |

**Returns:** `[string]`

*Array of filenames*

---

### `file.mkdir`

**Signature:** `mkdir(path)`

Create directory

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Directory path | No |

**Returns:** `boolean`

*Whether creation was successful*

---

### `file.stat`

**Signature:** `stat(path)`

Get file statistics

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `{ size: number, modificationDate: number, creationDate: number, type: string }`

*Object containing size (bytes), modification timestamp, creation timestamp, type (file/directory)*

---

### `file.isDirectory`

**Signature:** `isDirectory(path)`

Check if path is a directory

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `boolean`

*Whether it is a directory*

---

### `file.documentsPath`

**Signature:** `documentsPath()`

Get Documents path

**Returns:** `string`

*Absolute path to Documents directory*

---

### `file.cachePath`

**Signature:** `cachePath()`

Get Caches path

**Returns:** `string`

*Absolute path to Caches directory*

---

### `file.tempPath`

**Signature:** `tempPath()`

Get Temporary path

**Returns:** `string`

*Absolute path to Temporary directory*

---

### `file.debug`

**Signature:** `debug(path)`

Debug path access permissions

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `string`

*Debug information string*

---

### `file.rootRead`

**Signature:** `rootRead(path)`

Read protected file using Root (Requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `string \| null`

*File content, or null on failure*

---

### `file.rootList`

**Signature:** `rootList(path)`

List protected directory using Root (Requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute directory path | No |

**Returns:** `[string] \| null`

*List of filenames, or null on failure*

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

*Whether copy was successful*

---

### `file.rootCheck`

**Signature:** `rootCheck(path)`

Check path info using Root (Requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File or directory path | No |

**Returns:** `{ readable: boolean, writable: boolean, exists: boolean, isDirectory: boolean }`

*Object containing R/W permissions, existence, and debugging info*

---

### `file.rootExists`

**Signature:** `rootExists(path)`

Check file existence using Root (Requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `boolean`

*Existence status*

---

### `file.rootAvailable`

**Signature:** `rootAvailable()`

Check if Root Helper is available

**Returns:** `boolean`

*Availability status*

---

## http

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

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

*Object containing status code, response data, headers*

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

*Object containing local file path*

---

## network

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Network operations

### `network.isReachable`

**Signature:** `isReachable()`

Check if network is reachable

**Returns:** `boolean`

*Reachability status*

---

### `network.getConnectionType`

**Signature:** `getConnectionType()`

Get connection type

**Returns:** `'wifi' \| 'cellular' \| 'none'`

*Connection type (wifi/cellular/none)*

---

### `network.getIPAddress`

**Signature:** `getIPAddress()`

Get device IP address

**Returns:** `string \| null`

*IP Address*

---

### `network.getWiFiInfo`

**Signature:** `getWiFiInfo()`

Get WiFi information

**Returns:** `{ ssid: string, bssid: string } \| null`

*Object containing SSID and BSSID*

---

### `network.encodeURL`

**Signature:** `encodeURL(string)`

URL encode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | String to encode | No |

**Returns:** `string`

*Encoded URL string*

---

### `network.decodeURL`

**Signature:** `decodeURL(string)`

URL decode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | String to decode | No |

**Returns:** `string`

*Decoded URL string*

---

### `network.parseURL`

**Signature:** `parseURL(url)`

Parse URL components

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | URL to parse | No |

**Returns:** `{ scheme: string, host: string, path: string, query: string, params: object }`

*Object containing URL components*

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

*Built URL string*

---

### `network.ping`

**Signature:** `ping(host)`

Ping host

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `host` | `string` | Hostname or IP | No |

**Returns:** `Promise<{ latency: number, success: boolean }>`

*Object containing latency and success status*

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

*Object containing local file path*

---

### `network.getAirplaneMode`

**Signature:** `getAirplaneMode()`

Get Airplane Mode status

**Returns:** `boolean`

*Whether enabled*

---

### `network.setAirplaneMode`

**Signature:** `setAirplaneMode(enabled)`

Set Airplane Mode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

*Whether setting was successful*

---

### `network.listVPNs`

**Signature:** `listVPNs()`

List VPN configurations

**Returns:** `[{ name: string, active: boolean }]`

*List of VPN configurations*

---

### `network.connectVPN`

**Signature:** `connectVPN(name?)`

Connect VPN

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | VPN name, defaults to first one | Yes |

**Returns:** `boolean`

*Whether connection initiation was successful*

---

### `network.disconnectVPN`

**Signature:** `disconnectVPN()`

Disconnect VPN

**Returns:** `boolean`

*Whether disconnection initiation was successful*

---

### `network.getVPNStatus`

**Signature:** `getVPNStatus()`

Get VPN status

**Returns:** `{ connected: boolean, name?: string }`

*Object containing connection status and VPN name*

---

### `network.getWiFiEnabled`

**Signature:** `getWiFiEnabled()`

Get WiFi switch status

**Returns:** `boolean`

*Whether enabled*

---

### `network.setWiFi`

**Signature:** `setWiFi(enabled)`

Set WiFi switch

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

*Whether setting was successful*

---

### `network.openSettings`

**Signature:** `openSettings(section?)`

Open system settings

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `section` | `string` | Settings page (e.g., 'WIFI') | Yes |

**Returns:** `boolean`

*Whether opened successfully*

---

## app

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

App operations

### `app.version`

**Signature:** `version()`

Get app version

**Returns:** `string`

*App version number*

---

### `app.open`

**Signature:** `open(url)`

Open URL/Scheme

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | URL to open | No |

**Returns:** `Promise<boolean>`

*Whether opened successfully*

---

### `app.canOpen`

**Signature:** `canOpen(url)`

Check if URL can be opened

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | URL to check | No |

**Returns:** `boolean`

*Whether it can be opened*

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

*Array of log objects*

---

### `app.exportLogs`

**Signature:** `exportLogs()`

Export logs as string

**Returns:** `string`

*Exported log content*

---

### `app.getCrashReports`

**Signature:** `getCrashReports()`

Get all crash reports

**Returns:** `[CrashReport]`

*Array of crash reports*

---

### `app.getLastCrash`

**Signature:** `getLastCrash()`

Get last crash report

**Returns:** `CrashReport \| null`

*Last crash report*

---

### `app.clearLogs`

**Signature:** `clearLogs()`

Clear all logs

**Returns:** `void`

---

## haptic

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

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

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Display control

### `display.getBrightness`

**Signature:** `getBrightness()`

Get screen brightness

**Returns:** `number`

*Current brightness (0.0-1.0)*

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

*Object containing width, height, and scale*

---

### `display.getOrientation`

**Signature:** `getOrientation()`

Get screen orientation

**Returns:** `'portrait' \| 'landscape'`

*Screen orientation*

---

### `display.isLowPowerModeEnabled`

**Signature:** `isLowPowerModeEnabled()`

Is Low Power Mode enabled

**Returns:** `boolean`

*Whether enabled*

---

### `display.setLowPowerMode`

**Signature:** `setLowPowerMode(enabled)`

Set Low Power Mode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

*Whether setting was successful*

---

### `display.getNightShiftStatus`

**Signature:** `getNightShiftStatus()`

Get Night Shift status

**Returns:** `boolean`

*Whether enabled*

---

### `display.setNightShift`

**Signature:** `setNightShift(enabled)`

Set Night Shift

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

*Whether setting was successful*

---

### `display.getTrueToneStatus`

**Signature:** `getTrueToneStatus()`

Get True Tone status

**Returns:** `boolean`

*Whether enabled*

---

### `display.setTrueTone`

**Signature:** `setTrueTone(enabled)`

Set True Tone

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

*Whether setting was successful*

---

### `display.isAutoBrightnessEnabled`

**Signature:** `isAutoBrightnessEnabled()`

Is Auto Brightness enabled

**Returns:** `boolean`

*Whether enabled*

---

### `display.setAutoBrightness`

**Signature:** `setAutoBrightness(enabled)`

Set Auto Brightness

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable | No |

**Returns:** `boolean`

*Whether setting was successful*

---

### `display.openSettings`

**Signature:** `openSettings()`

Open display settings

**Returns:** `boolean`

*Whether opened successfully*

---

### `display.getAutoLockTime`

**Signature:** `getAutoLockTime()`

Get auto-lock time

**Returns:** `number`

*Auto-lock time in seconds, 0 means never*

---

### `display.setAutoLock`

**Signature:** `setAutoLock(seconds)`

Set auto-lock time

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `seconds` | `number` | Lock time in seconds, 0 means never | No |

**Returns:** `boolean`

*Whether setting was successful*

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

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Utility functions

### `util.uuid`

**Signature:** `uuid()`

Generate UUID

**Returns:** `string`

*Generated UUID*

---

### `util.md5`

**Signature:** `md5(string)`

Calculate MD5

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | String to calculate | No |

**Returns:** `string`

*MD5 hash value*

---

### `util.base64Encode`

**Signature:** `base64Encode(string)`

Base64 encode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | String to encode | No |

**Returns:** `string`

*Base64 encoded string*

---

### `util.base64Decode`

**Signature:** `base64Decode(string)`

Base64 decode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | String to decode | No |

**Returns:** `string`

*Decoded original string*

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

*Formatted date string*

---

## location

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Location services

### `location.requestAccess`

**Signature:** `requestAccess()`

Request location access

**Returns:** `void`

---

### `location.getAccessStatus`

**Signature:** `getAccessStatus()`

Get access status

**Returns:** `'authorized' \| 'denied' \| 'restricted' \| 'notDetermined' \| 'unknown'`

*Permission status*

---

### `location.isAuthorized`

**Signature:** `isAuthorized()`

Check if authorized

**Returns:** `boolean`

*Whether authorized*

---

### `location.getCurrent`

**Signature:** `getCurrent()`

Get current location

**Returns:** `Promise<{ lat: number, lng: number, alt: number, course: number, speed: number, timestamp: number }>`

*Location object (including latitude, longitude, etc.)*

---

### `location.current`

**Signature:** `current()`

Get current location (alias)

**Returns:** `Promise<{ lat: number, lng: number, alt: number, course: number, speed: number, timestamp: number }>`

*Location object*

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

*Distance (meters)*

---

### `location.geocode`

**Signature:** `geocode(address)`

Address to coordinates

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | Address string | No |

**Returns:** `Promise<[{ lat: number, lng: number, name: string }]>`

*Array of geographic location objects*

---

### `location.reverseGeocode`

**Signature:** `reverseGeocode(lat, lng, locale?)`

Coordinates to address

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `lat` | `number` | Latitude | No |
| `lng` | `number` | Longitude | No |
| `locale` | `string` | Locale identifier (optional, e.g. 'zh_CN', 'en_US', defaults to system language) | Yes |

**Returns:** `Promise<[{ name: string, country: string, locality: string, administrativeArea: string }]>`

*Array of address information objects*

---

### `location.isLocationServicesEnabled`

**Signature:** `isLocationServicesEnabled()`

Is location services enabled

**Returns:** `boolean`

*Whether enabled*

---

### `location.hasTrollStorePermission`

**Signature:** `hasTrollStorePermission()`

Check if TrollStore permission is available

**Returns:** `boolean`

*Whether has permission*

---

### `location.setLocationServicesEnabled`

**Signature:** `setLocationServicesEnabled(enabled)`

Enable or disable system location services (requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | true to enable, false to disable | No |

**Returns:** `{ success: boolean, enabled?: boolean, message?: string }`

*Result object (success indicates if operation succeeded, enabled is current state)*

---

### `location.toggleLocationServices`

**Signature:** `toggleLocationServices()`

Toggle location services state (requires TrollStore)

**Returns:** `{ success: boolean, enabled?: boolean, message?: string }`

*Result object (success indicates if operation succeeded, enabled is state after toggle)*

---

## calendar

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

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

*Whether authorization was successful*

---

### `calendar.getCalendars`

**Signature:** `getCalendars()`

Get all calendars

**Returns:** `Promise<[{ id: string, title: string, color: string }]>`

*List of calendars*

---

### `calendar.getToday`

**Signature:** `getToday()`

Get events for today

**Returns:** `Promise<[{ id: string, title: string, startDate: number, endDate: number, calendar: string }]>`

*Array of events for today*

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

*Array of events*

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

*Created event ID*

---

### `calendar.delete`

**Signature:** `delete(id)`

Delete calendar event

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Event ID | No |

**Returns:** `Promise<boolean>`

*Whether deletion was successful*

---

## reminder

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Reminders

### `reminder.isAuthorized`

**Signature:** `isAuthorized()`

Check authorization status

**Returns:** `boolean`

*Whether authorized*

---

### `reminder.requestAccess`

**Signature:** `requestAccess()`

Request reminder access

**Returns:** `Promise<boolean>`

*Whether authorization was successful*

---

### `reminder.getLists`

**Signature:** `getLists()`

Get all reminder lists

**Returns:** `Promise<[{ id: string, title: string, color: string }]>`

*Array of reminder lists*

---

### `reminder.getAll`

**Signature:** `getAll(listId?)`

Get all reminders

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `listId` | `string` | List ID | Yes |

**Returns:** `Promise<[{ id: string, title: string, isCompleted: boolean, listId: string, dueDate?: number }]>`

*Array of reminders*

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

*Created reminder ID*

---

### `reminder.complete`

**Signature:** `complete(id)`

Mark as completed

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Reminder ID | No |

**Returns:** `Promise<boolean>`

*Whether successful*

---

### `reminder.delete`

**Signature:** `delete(id)`

Delete reminder

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Reminder ID | No |

**Returns:** `Promise<boolean>`

*Whether successful*

---

### `reminder.getSorted`

**Signature:** `getSorted(options)`

Get sorted reminders

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `options` | `object` | { sortBy: 'createdAt'\|'dueDate'\|'priority'\|'title', ascending: boolean, completed: boolean } | Yes |

**Returns:** `Promise<[Reminder]>`

*Sorted list of reminders*

---

### `reminder.getUpcoming`

**Signature:** `getUpcoming(days)`

Get upcoming reminders

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `days` | `number` | Upcoming days (default 7) | Yes |

**Returns:** `Promise<[Reminder]>`

*List of upcoming reminders*

---

### `reminder.getOverdue`

**Signature:** `getOverdue()`

Get overdue reminders

**Returns:** `Promise<[Reminder]>`

*List of overdue reminders*

---

### `reminder.reorder`

**Signature:** `reorder(ids)`

Batch reorder

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `ids` | `string[]` | Array of IDs in order | No |

**Returns:** `Promise<object>`

*{ success: boolean, count: number }*

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

*{ success: boolean, id: string, title: string, isSystemReminder: true }*

---

### `reminder.getSystemLists`

**Signature:** `getSystemLists()`

Get system reminder lists

**Returns:** `Promise<[{ id: string, title: string, isSystem: true }]>`

*Array of system reminder lists*

---

## contacts

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Contacts operations

### `contacts.requestAccess`

**Signature:** `requestAccess()`

Request contacts access

**Returns:** `{ granted: boolean, error?: string }`

*Object containing authorization result*

---

### `contacts.getAccessStatus`

**Signature:** `getAccessStatus()`

Get access status

**Returns:** `'authorized' \| 'denied' \| 'restricted' \| 'notDetermined'`

*Permission status*

---

### `contacts.isAuthorized`

**Signature:** `isAuthorized()`

Check if authorized

**Returns:** `boolean`

*Whether authorized*

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

*Array of contact objects*

---

### `contacts.getCount`

**Signature:** `getCount()`

Get total contact count

**Returns:** `number`

*Total contacts*

---

### `contacts.search`

**Signature:** `search(query)`

Search contacts by name

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `query` | `string` | Search keyword (matches name) | No |

**Returns:** `[Contact]`

*Array of contact objects*

---

### `contacts.searchByPhone`

**Signature:** `searchByPhone(phone)`

Search contacts by phone

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `phone` | `string` | Phone number (supports fuzzy match) | No |

**Returns:** `[Contact]`

*Array of contact objects*

---

### `contacts.searchByEmail`

**Signature:** `searchByEmail(email)`

Search contacts by email

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `email` | `string` | Email address (supports fuzzy match) | No |

**Returns:** `[Contact]`

*Array of contact objects*

---

### `contacts.getById`

**Signature:** `getById(id)`

Get contact by ID

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Contact unique identifier | No |

**Returns:** `Contact \| null`

*Contact object*

---

### `contacts.create`

**Signature:** `create(data)`

Create contact

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `data` | `object` | Contact data { givenName, familyName, phoneNumbers?, emailAddresses?, ... } | No |

**Returns:** `{ success: boolean, id?: string, error?: string }`

*Object containing success status and ID*

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

*Object containing success status*

---

### `contacts.delete`

**Signature:** `delete(id)`

Delete contact

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Contact unique identifier | No |

**Returns:** `{ success: boolean, error?: string }`

*Object containing success status*

---

### `contacts.getGroups`

**Signature:** `getGroups()`

Get all groups

**Returns:** `[{ id: string, name: string }]`

*Array of groups*

---

### `contacts.getContactsInGroup`

**Signature:** `getContactsInGroup(groupId)`

Get contacts in group

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `groupId` | `string` | Group unique identifier | No |

**Returns:** `[Contact]`

*Array of contact objects*

---

## notification

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

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

*ID of sent notification*

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

*List of pending notifications*

---

### `notification.getDelivered`

**Signature:** `getDelivered()`

Get delivered notifications

**Returns:** `Promise<[{ id: string, title: string, body: string, date: number }]>`

*List of delivered notifications*

---

### `notification.requestPermission`

**Signature:** `requestPermission()`

Request notification permission

**Returns:** `Promise<boolean>`

*Whether authorized*

---

### `notification.getPermissionStatus`

**Signature:** `getPermissionStatus()`

Get permission status

**Returns:** `Promise<'authorized' \| 'denied' \| 'notDetermined' \| 'provisional' \| 'ephemeral' \| 'unknown'>`

*Permission status*

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

*Badge number*

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

*ID of scheduled notification*

---

## alarm

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Alarms and Timers

### `alarm.requestAccess`

**Signature:** `requestAccess()`

Request notification access

**Returns:** `Promise<boolean>`

*Whether authorized*

---

### `alarm.getAccessStatus`

**Signature:** `getAccessStatus()`

Get access status

**Returns:** `Promise<'authorized' \| 'denied' \| 'notDetermined'>`

*Permission status*

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

*Created alarm ID*

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

*Created alarm ID*

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

*Created alarm ID*

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

*Created alarm ID*

---

### `alarm.getPending`

**Signature:** `getPending()`

Get pending alarms

**Returns:** `Promise<[{ id: string, title: string, date: number, repeat?: string }]>`

*List of pending alarms*

---

### `alarm.getCount`

**Signature:** `getCount()`

Get alarm count

**Returns:** `Promise<number>`

*Number of alarms*

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

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

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

**Returns:** `'playing' \| 'paused' \| 'stopped'`

*Playback state*

---

### `media.isPlaying`

**Signature:** `isPlaying()`

Is currently playing

**Returns:** `boolean`

*Whether playing*

---

### `media.getNowPlaying`

**Signature:** `getNowPlaying()`

Get current playing info

**Returns:** `{ title: string, artist: string, album: string, duration: number, artwork?: string }`

*Current playback info object*

---

### `media.getVolume`

**Signature:** `getVolume()`

Get volume

**Returns:** `number`

*Current volume (0.0-1.0)*

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

**Returns:** `'none' \| 'one' \| 'all'`

*Repeat mode*

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

**Returns:** `'off' \| 'songs' \| 'albums'`

*Shuffle mode*

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

*Current time (seconds)*

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

*Whether authorized*

---

### `media.getAccessStatus`

**Signature:** `getAccessStatus()`

Get access status

**Returns:** `Promise<'authorized' \| 'denied' \| 'notDetermined' \| 'restricted'>`

*Permission status*

---

### `media.searchSongs`

**Signature:** `searchSongs(query)`

Search music library

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `query` | `string` | Search keyword | No |

**Returns:** `Promise<[{ id: string, title: string, artist: string, album: string }]>`

*Array of songs*

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

*Array of songs*

---

### `media.getAlbums`

**Signature:** `getAlbums()`

Get all albums

**Returns:** `Promise<[{ id: string, title: string, artist: string }]>`

*Array of albums*

---

### `media.getArtists`

**Signature:** `getArtists()`

Get all artists

**Returns:** `Promise<[{ id: string, name: string }]>`

*Array of artists*

---

### `media.getPlaylists`

**Signature:** `getPlaylists()`

Get playlists

**Returns:** `Promise<[{ id: string, name: string }]>`

*Array of playlists*

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

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Mail operations

### `mail.canSendMail`

**Signature:** `canSendMail()`

Check if can send mail

**Returns:** `boolean`

*Whether capable*

---

### `mail.getStatus`

**Signature:** `getStatus()`

Get mail service status

**Returns:** `'available' \| 'unavailable'`

*Mail service status*

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

*Whether sent successfully*

---

### `mail.sendAdvanced`

**Signature:** `sendAdvanced(options)`

Send email (advanced options)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `options` | `object` | Options { to, cc, bcc, subject, body, isHtml, attachments } | No |

**Returns:** `Promise<boolean>`

*Whether sent successfully*

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

*Whether valid*

---

### `mail.getInstalledMailApps`

**Signature:** `getInstalledMailApps()`

Detect installed mail apps

**Returns:** `string[]`

*Array of installed mail app names*

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

*Generated email content*

---

### `mail.getTemplates`

**Signature:** `getTemplates()`

Get available templates

**Returns:** `string[]`

*Array of template names*

---

## sms

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

SMS operations

### `sms.checkAccess`

**Signature:** `checkAccess()`

Check SMS access

**Returns:** `boolean`

*Whether has permission*

---

### `sms.tryAccess`

**Signature:** `tryAccess()`

Try direct SMS database access (Debug)

**Returns:** `boolean`

*Whether access successful*

---

### `sms.read`

**Signature:** `read(limit?)`

Read recent SMS

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | Limit count (default 10) | Yes |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

*Array of SMS objects*

---

### `sms.getVerificationCode`

**Signature:** `getVerificationCode(minutes?)`

Get verification code

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `minutes` | `number` | Look back minutes (default 5) | Yes |

**Returns:** `string \| null`

*Verification code or null*

---

### `sms.search`

**Signature:** `search(keyword)`

Search SMS

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `keyword` | `string` | Keyword | No |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

*Array of SMS objects*

---

### `sms.getByAddress`

**Signature:** `getByAddress(address)`

Get SMS by number

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | Sender number | No |

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

*Array of SMS objects*

---

### `sms.getChats`

**Signature:** `getChats()`

Get conversation list

**Returns:** `[{ id: string, name: string, lastMessage: string, date: number }]`

*Array of conversation objects*

---

### `sms.getStatistics`

**Signature:** `getStatistics()`

Get SMS statistics

**Returns:** `{ total: number, unread: number, senders: number }`

*Statistics object*

---

### `sms.getLatest`

**Signature:** `getLatest()`

Get latest SMS

**Returns:** `{ id: string, content: string, sender: string, date: number } \| null`

*Latest SMS object or null*

---

### `sms.getUnread`

**Signature:** `getUnread()`

Get unread SMS

**Returns:** `[{ id: string, content: string, sender: string, date: number }]`

*Array of unread SMS objects*

---

## sql

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

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

*Query result array*

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

*Execution result object*

---

### `sql.tables`

**Signature:** `tables(dbPath)`

List all tables in database

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `dbPath` | `string` | Database path | No |

**Returns:** `string[]`

*Array of table names*

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

*Table schema SQL*

---

## shortcuts

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Shortcuts operations

### `shortcuts.run`

**Signature:** `run(name)`

Run shortcut

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Shortcut name | No |

**Returns:** `Promise<string>`

*Execution result*

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

*Execution result*

---

### `shortcuts.runWithClipboard`

**Signature:** `runWithClipboard(name)`

Run shortcut (clipboard input)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Shortcut name | No |

**Returns:** `Promise<string>`

*Execution result*

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

*Execution result*

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

*Availability status*

---

### `shortcuts.getCommonShortcuts`

**Signature:** `getCommonShortcuts()`

Get common shortcut templates

**Returns:** `string[]`

*List of templates*

---

## bluetooth

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Bluetooth operations

### `bluetooth.isEnabled`

**Signature:** `isEnabled()`

Is Bluetooth enabled

**Returns:** `boolean`

*Whether enabled*

---

### `bluetooth.getStatus`

**Signature:** `getStatus()`

Get Bluetooth status

**Returns:** `'poweredOn' \| 'poweredOff' \| 'unauthorized' \| 'unknown'`

*Bluetooth status*

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

*List of paired devices*

---

### `bluetooth.getConnectedDevices`

**Signature:** `getConnectedDevices()`

Get connected devices

**Returns:** `Promise<[{ name: string, uuid: string }]>`

*List of connected devices*

---

### `bluetooth.connectDevice`

**Signature:** `connectDevice(id)`

Connect device

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Device UUID | No |

**Returns:** `Promise<boolean>`

*Whether connection successful*

---

### `bluetooth.disconnectDevice`

**Signature:** `disconnectDevice(id)`

Disconnect device

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Device UUID | No |

**Returns:** `Promise<boolean>`

*Whether disconnection successful*

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

## memo

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

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

*{ success: boolean, id: string, memo: object }*

---

### `memo.getAll`

**Signature:** `getAll()`

Get all memos

**Returns:** `[object]`

*Memo array [{ id, title, content, createdAt, updatedAt, tags }]*

---

### `memo.getById`

**Signature:** `getById(id)`

Get memo by ID

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Memo ID | No |

**Returns:** `object \| null`

*Memo object or null*

---

### `memo.search`

**Signature:** `search(keyword)`

Search memos (title and content)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `keyword` | `string` | Search keyword | No |

**Returns:** `[object]`

*Array of matching memos*

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

*{ success: boolean, id: string }*

---

### `memo.delete`

**Signature:** `delete(id)`

Delete memo

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Memo ID | No |

**Returns:** `object`

*{ success: boolean, id: string }*

---

### `memo.clear`

**Signature:** `clear()`

Clear all memos

**Returns:** `object`

*{ success: boolean }*

---

### `memo.count`

**Signature:** `count()`

Get memo count

**Returns:** `number`

*Total count of memos*

---

