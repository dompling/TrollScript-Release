# TrollScript API Reference (v1.2.0)

TrollScript provides a powerful JavaScript environment with access to various system features. Below is the comprehensive API reference for all available modules.

## Trigger Compatibility Legend

The following icons indicate API compatibility when running in background trigger mode:

| Icon | Status | Description |
|:----:|--------|-------------|
| ✅ | **Full** | Full Support - Functions correctly under triggers |
| ⚠️ | **Limited** | Limited Support - Some features may be restricted or ineffective |
| ❌ | **None** | No Support - Requires foreground execution; unavailable under triggers |

---

## Table of Contents

- [console](#console) ✅ - Console output
- [device](#device) ✅ - Device information
- [clipboard](#clipboard) ⚠️ - Clipboard operations
- [storage](#storage) ✅ - Local key-value storage
- [icloud](#icloud) ✅ - iCloud file operations
- [file](#file) ✅ - File system operations
- [http](#http) ✅ - Network requests (Async Promise-based)
- [network](#network) ⚠️ - Network operations
- [app](#app) ⚠️ - App operations and management
- [haptic](#haptic) ⚠️ - Haptic feedback
- [display](#display) ⚠️ - Display and screen control
- [hud](#hud) ✅ - HUD System - Create floating windows and UI elements
- [util](#util) ✅ - Utility functions
- [location](#location) ⚠️ - Location services
- [calendar](#calendar) ⚠️ - System calendar
- [reminder](#reminder) ⚠️ - Reminders and checklists
- [contacts](#contacts) ⚠️ - Contact management operations
- [notification](#notification) ⚠️ - Local notifications
- [sms](#sms) ✅ - SMS and messaging operations
- [sql](#sql) ✅ - SQLite database operations
- [shortcuts](#shortcuts) ❌ - Shortcuts operations
- [system](#system) ✅ - System settings control

---

## console

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Console output

### `console.log`

**Signature:** `log(...args)`

Output log messages

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | Content to be logged | No |

**Returns:** `void`

---

### `console.error`

**Signature:** `error(...args)`

Output error messages

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | Content to be logged as an error | No |

**Returns:** `void`

---

### `console.warn`

**Signature:** `warn(...args)`

Output warning messages

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | Content to be logged as a warning | No |

**Returns:** `void`

---

### `console.info`

**Signature:** `info(...args)`

Output informational messages

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | Content to be logged as info | No |

**Returns:** `void`

---

### `console.debug`

**Signature:** `debug(...args)`

Output debug messages

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `...args` | `any[]` | Content to be logged for debugging | No |

**Returns:** `void`

---

### `console.clear`

**Signature:** `clear()`

Clear the console

**Returns:** `void`

---

## device

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Device information

### `device.info`

**Signature:** `info()`

Retrieve general device information

**Returns:** `{ name: string, model: string, systemName: string, systemVersion: string, identifier: string }`

*An object containing device name, model, OS name, OS version, and identifier*

---

### `device.battery`

**Signature:** `battery()`

Get battery and power status

**Returns:** `{ level: number, state: string, lowPowerMode: boolean }`

*An object containing battery level (0-1), charging state, and Low Power Mode status*

---

### `device.screen`

**Signature:** `screen()`

Retrieve screen and display metrics

**Returns:** `{ width: number, height: number, scale: number, brightness: number }`

*An object containing screen dimensions, display scale (PPI factor), and brightness level*

---

## clipboard

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

Clipboard operations

### `clipboard.getText`

**Signature:** `getText()`

Get text from the clipboard

**Returns:** `string`

*The text content currently in the clipboard*

---

### `clipboard.setText`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `setText(text)`

Set text to the clipboard

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `text` | `string` | The text content to be set | No |

**Returns:** `void`

---

### `clipboard.clear`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `clear()`

Clear the clipboard

**Returns:** `void`

---

### `clipboard.hasText`

**Signature:** `hasText()`

Check if the clipboard contains text

**Returns:** `boolean`

*Whether the clipboard has text content*

---

## storage

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Local key-value storage

### `storage.get`

**Signature:** `get(key)`

Retrieve a stored value

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | The unique key for the stored data | No |

**Returns:** `any`

*The stored value, or undefined if the key does not exist*

---

### `storage.set`

**Signature:** `set(key, value)`

Store a value associated with a key

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | The key under which to store the value | No |
| `value` | `any` | The data to be persisted | No |

**Returns:** `void`

---

### `storage.remove`

**Signature:** `remove(key)`

Delete a specific key and its associated value

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | The key to be removed | No |

**Returns:** `void`

---

### `storage.clear`

**Signature:** `clear()`

Remove all stored keys and values

**Returns:** `void`

---

### `storage.has`

**Signature:** `has(key)`

Check if a specific key exists in storage

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `key` | `string` | The key to check | No |

**Returns:** `boolean`

*Whether the key exists*

---

### `storage.keys`

**Signature:** `keys()`

Get all stored keys

**Returns:** `string[]`

*An array of all keys in storage*

---

## icloud

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

iCloud file operations

### `icloud.containerPath`

**Signature:** `containerPath()`

Get the iCloud container path

**Returns:** `string \| null`

*Local path of the iCloud container, or null if unavailable*

---

### `icloud.read`

**Signature:** `read(path)`

Read a file from iCloud

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path (relative to the iCloud container) | No |

**Returns:** `string`

*The content of the file*

---

### `icloud.write`

**Signature:** `write(path, content)`

Write content to an iCloud file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |
| `content` | `string` | The content to be written | No |

**Returns:** `boolean`

*Whether the write operation was successful*

---

### `icloud.delete`

**Signature:** `delete(path)`

Delete a file from iCloud

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `boolean`

*Whether the deletion was successful*

---

### `icloud.list`

**Signature:** `list(path?)`

List contents of an iCloud directory

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Directory path, defaults to the root directory | Yes |

**Returns:** `[string]`

*An array of file names*

---

## file

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

File system operations

### `file.read`

**Signature:** `read(path)`

Read file content

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `string`

*The content of the file*

---

### `file.write`

**Signature:** `write(path, content)`

Write content to a file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |
| `content` | `string` | The content to be written | No |

**Returns:** `boolean`

*Whether the write operation was successful*

---

### `file.append`

**Signature:** `append(path, content)`

Append content to a file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |
| `content` | `string` | The content to be appended | No |

**Returns:** `boolean`

*Whether the append operation was successful*

---

### `file.exists`

**Signature:** `exists(path)`

Check if a file exists

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `boolean`

*Whether the file exists*

---

### `file.delete`

**Signature:** `delete(path)`

Delete a file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `boolean`

*Whether the deletion was successful*

---

### `file.move`

**Signature:** `move(from, to)`

Move a file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `from` | `string` | Source path | No |
| `to` | `string` | Destination path | No |

**Returns:** `boolean`

*Whether the move operation was successful*

---

### `file.copy`

**Signature:** `copy(from, to)`

Copy a file

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `from` | `string` | Source path | No |
| `to` | `string` | Destination path | No |

**Returns:** `boolean`

*Whether the copy operation was successful*

---

### `file.list`

**Signature:** `list(path)`

List directory contents

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Directory path | No |

**Returns:** `[string]`

*An array of file names*

---

### `file.mkdir`

**Signature:** `mkdir(path)`

Create a new directory

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Directory path | No |

**Returns:** `boolean`

*Whether the directory was successfully created*

---

### `file.stat`

**Signature:** `stat(path)`

Retrieve file information

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `{ size: number, modificationDate: number, creationDate: number, type: string }`

*Object containing size (bytes), modification timestamp, creation timestamp, and type (file/directory)*

---

### `file.isDirectory`

**Signature:** `isDirectory(path)`

Check if the path is a directory

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `boolean`

*Whether the path is a directory*

---

### `file.documentsPath`

**Signature:** `documentsPath()`

Get the Documents directory path

**Returns:** `string`

*The absolute path of the Documents directory*

---

### `file.cachePath`

**Signature:** `cachePath()`

Get the Caches directory path

**Returns:** `string`

*The absolute path of the Caches directory*

---

### `file.tempPath`

**Signature:** `tempPath()`

Get the Temporary directory path

**Returns:** `string`

*The absolute path of the Temporary directory*

---

### `file.debug`

**Signature:** `debug(path)`

Debug access permission details for a path

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `string`

*Debug information string*

---

### `file.rootRead`

**Signature:** `rootRead(path)`

Read protected files with Root privileges (requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute file path | No |

**Returns:** `string \| null`

*File content, or null if reading failed*

---

### `file.rootList`

**Signature:** `rootList(path)`

List protected directory contents with Root privileges (requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Absolute directory path | No |

**Returns:** `[string] \| null`

*An array of file names, or null if it failed*

---

### `file.rootCopy`

**Signature:** `rootCopy(src, dest)`

Copy protected files with Root privileges (requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `src` | `string` | Source file path | No |
| `dest` | `string` | Destination file path | No |

**Returns:** `boolean`

*Whether the copy was successful*

---

### `file.rootCheck`

**Signature:** `rootCheck(path)`

Inspect path details with Root privileges (requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File or directory path | No |

**Returns:** `{ readable: boolean, writable: boolean, exists: boolean, isDirectory: boolean }`

*Object containing read/write permissions, existence, and other debug info*

---

### `file.rootExists`

**Signature:** `rootExists(path)`

Check file existence with Root privileges (requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | File path | No |

**Returns:** `boolean`

*Whether it exists*

---

### `file.rootAvailable`

**Signature:** `rootAvailable()`

Check if the Root Helper is available

**Returns:** `boolean`

*Whether the helper is available*

---

## http

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Network requests (Async Promise-based)

### `http.get`

**Signature:** `get(url, options?)`

Send a GET request (async, returns Promise)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Target URL | No |
| `options` | `object` | Request options { headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*Returns a Promise that resolves with success status, status code, response data, and headers. Set sync: true for synchronous mode*

---

### `http.post`

**Signature:** `post(url, options?)`

Send a POST request (async, returns Promise)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Target URL | No |
| `options` | `object` | Request options { body, headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*Returns a Promise that resolves with the response. Set sync: true for synchronous mode*

---

### `http.put`

**Signature:** `put(url, options?)`

Send a PUT request (async, returns Promise)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Target URL | No |
| `options` | `object` | Request options { body, headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*Returns a Promise that resolves with the response*

---

### `http.delete`

**Signature:** `delete(url, options?)`

Send a DELETE request (async, returns Promise)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Target URL | No |
| `options` | `object` | Request options { headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*Returns a Promise that resolves with the response*

---

### `http.patch`

**Signature:** `patch(url, options?)`

Send a PATCH request (async, returns Promise)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Target URL | No |
| `options` | `object` | Request options { body, headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*Returns a Promise that resolves with the response*

---

### `http.head`

**Signature:** `head(url, options?)`

Send a HEAD request (async, returns Promise)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Target URL | No |
| `options` | `object` | Request options { headers, timeout, insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*Returns a Promise that resolves with the response (data is typically empty for HEAD requests)*

---

### `http.request`

**Signature:** `request(url, options)`

Send a custom HTTP request (async, returns Promise)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Target URL | No |
| `options` | `object` | Request options { method, body, headers, timeout, insecure, sync } | No |

**Returns:** `Promise<{ success: boolean, status?: number, data?: string, headers?: object, error?: string }>`

*Returns a Promise that resolves with the response*

---

### `http.download`

**Signature:** `download(url, path, options?)`

Download a file (async, returns Promise)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Download source URL | No |
| `path` | `string` | Local destination path to save the file | No |
| `options` | `object` | Request options { insecure, sync } | Yes |

**Returns:** `Promise<{ success: boolean, path?: string, error?: string }>`

*Returns a Promise that resolves with success status and local file path*

---

## network

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

Network operations

> **Trigger Note:** The 'openSettings' method requires UI interaction and is unavailable in Daemon mode.

### `network.isReachable`

**Signature:** `isReachable()`

Check if the network is reachable

**Returns:** `boolean`

*Whether the network is available*

---

### `network.getConnectionType`

**Signature:** `getConnectionType()`

Get current connection type

**Returns:** `'wifi' \| 'cellular' \| 'none'`

*Connection type (wifi/cellular/none)*

---

### `network.getIPAddress`

**Signature:** `getIPAddress()`

Get the device's IP address

**Returns:** `string \| null`

*IP address string*

---

### `network.encodeURL`

**Signature:** `encodeURL(string)`

Percent-encode a URL string

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | The string to encode | No |

**Returns:** `string`

*Encoded URL string*

---

### `network.decodeURL`

**Signature:** `decodeURL(string)`

Decode a percent-encoded URL string

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | The string to decode | No |

**Returns:** `string`

*Decoded URL string*

---

### `network.parseURL`

**Signature:** `parseURL(url)`

Parse a URL into its components

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | The URL to parse | No |

**Returns:** `{ scheme: string, host: string, path: string, query: string, params: object }`

*Object containing URL components*

---

### `network.buildURL`

**Signature:** `buildURL(baseURL, params?)`

Construct a URL with query parameters

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `baseURL` | `string` | The base URL | No |
| `params` | `object` | Query parameters | Yes |

**Returns:** `string`

*The constructed URL string*

---

### `network.ping`

**Signature:** `ping(host)`

Ping a remote host

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `host` | `string` | Hostname or IP address | No |

**Returns:** `{ success: boolean, latency: number }`

*Object containing success status and latency (ms)*

---

### `network.download`

**Signature:** `download(url, filename?)`

Download a file from a URL

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Download source URL | No |
| `filename` | `string` | Local filename to save as | Yes |

**Returns:** `{ success: boolean, path?: string, error?: string }`

*Object containing success status and the local file path*

---

### `network.listVPNs`

**Signature:** `listVPNs()`

List all VPN configurations

**Returns:** `[{ name: string, active: boolean }]`

*A list of VPN configuration objects*

---

### `network.connectVPN`

**Signature:** `connectVPN(name?)`

Establish a VPN connection

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | VPN configuration name (defaults to the first one) | Yes |

**Returns:** `boolean`

*Whether the connection request was successful*

---

### `network.disconnectVPN`

**Signature:** `disconnectVPN()`

Terminate the VPN connection

**Returns:** `boolean`

*Whether the disconnection request was successful*

---

### `network.getVPNStatus`

**Signature:** `getVPNStatus()`

Get current VPN connection status

**Returns:** `{ connected: boolean, name?: string }`

*Object containing connection state and VPN name*

---

### `network.openSettings`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openSettings(section?)`

Open system network settings

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `section` | `string` | Specific setting section (e.g., 'WIFI') | Yes |

**Returns:** `boolean`

*Whether the settings page was opened*

---

## app

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

App operations and management

> **Trigger Note:** The 'open/launch' methods require the app to be in the foreground; 'vibrate' may not work in the background.

### `app.version`

**Signature:** `version()`

Get app version

**Returns:** `string`

*App version number*

---

### `app.build`

**Signature:** `build()`

Get app build number

**Returns:** `string`

*App build number (CFBundleVersion)*

---

### `app.bundleId`

**Signature:** `bundleId()`

Get app Bundle ID

**Returns:** `string`

*App's Bundle Identifier*

---

### `app.info`

**Signature:** `info()`

Get full app information

**Returns:** `AppInfo`

*App info object containing name, version, build, bundleId, language*

---

### `app.open`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `open(url)`

Open a URL or URI Scheme

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | The URL to open | No |

**Returns:** `boolean`

*Whether the URL was opened successfully*

---

### `app.canOpen`

**Signature:** `canOpen(url)`

Check if a URL can be opened

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | The URL to check | No |

**Returns:** `boolean`

*Whether the URL can be opened*

---

### `app.vibrate`

**Signature:** `vibrate()`

Trigger haptic feedback

**Returns:** `void`

---

### `app.getLogs`

**Signature:** `getLogs(limit?)`

Get app logs

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | Maximum number of log entries to return | Yes |

**Returns:** `[LogMessage]`

*Array of log message objects*

---

### `app.exportLogs`

**Signature:** `exportLogs()`

Export logs as a string

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

Get the most recent crash report

**Returns:** `CrashReport \| null`

*The most recent crash report*

---

### `app.clearLogs`

**Signature:** `clearLogs()`

Clear all logs

**Returns:** `void`

---

### `app.exit`

**Signature:** `exit(code?)`

Exit the app (for debugging only)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `code` | `number` | Exit code, defaults to 0 | Yes |

**Returns:** `void`

---

### `app.openSettings`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openSettings()`

Open app settings page

**Returns:** `boolean`

*Whether settings was opened successfully*

---

### `app.list`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `list()`

Get all installed apps (TrollStore privilege)

**Returns:** `[AppInfo]`

*Array of app info objects containing bundleIdentifier, name, version, type, etc.*

---

### `app.getAppInfo`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `getAppInfo(bundleId)`

Get detailed info for a specific app (TrollStore privilege)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `bundleId` | `string` | The app's Bundle Identifier | No |

**Returns:** `AppInfo \| null`

*App info object containing bundleIdentifier, name, version, build, type, teamID, bundlePath, dataContainerPath, urlSchemes, etc.*

---

### `app.launch`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `launch(bundleId)`

Launch a specific app (TrollStore privilege)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `bundleId` | `string` | The app's Bundle Identifier | No |

**Returns:** `boolean`

*Whether the app was launched successfully*

---

### `app.terminate`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `terminate(bundleId)`

Terminate a specific app (TrollStore privilege, requires background permission)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `bundleId` | `string` | The app's Bundle Identifier | No |

**Returns:** `boolean`

*Whether the app was terminated successfully*

---

### `app.isInstalled`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `isInstalled(bundleId)`

Check if an app is installed

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `bundleId` | `string` | The app's Bundle Identifier | No |

**Returns:** `boolean`

*Whether the app is installed*

---

### `app.getDataContainer`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `getDataContainer(bundleId)`

Get the data container path for an app (TrollStore privilege)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `bundleId` | `string` | The app's Bundle Identifier | No |

**Returns:** `string \| null`

*Data container path, or null if not found*

---

### `app.cpuUsage`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `cpuUsage()`

Get CPU usage (process-level + system-level)

**Returns:** `CPUUsage`

*Object containing process (process CPU %) and system (system CPU object with total/user/system/idle/nice/cores)*

---

### `app.memoryUsage`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `memoryUsage()`

Get memory usage information

**Returns:** `MemoryUsage`

*Object containing usage (current MB), peak (peak MB), unit (unit string)*

---

### `app.fps`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `fps()`

Get current frame rate

**Returns:** `FPSInfo`

*Object containing fps (frame rate), isWarning (warning state), isCritical (critical state)*

---

### `app.performanceSnapshot`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `performanceSnapshot()`

Get complete performance metrics snapshot

**Returns:** `PerformanceSnapshot`

*Complete performance snapshot containing cpu, memory, fps, isMonitoring, timestamp*

---

### `app.startMonitoring`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `startMonitoring()`

Start performance monitoring (FPS sampling, metrics recording)

**Returns:** `boolean`

*Whether monitoring started successfully*

---

### `app.stopMonitoring`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `stopMonitoring()`

Stop performance monitoring

**Returns:** `boolean`

*Whether monitoring stopped successfully*

---

### `app.performanceRecords`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `performanceRecords(limit?)`

Get historical performance records

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | Number of records to return, defaults to 50 | Yes |

**Returns:** `[PerformanceRecord]`

*Array of performance records containing id, scriptName, executionTime, peakMemory, averageCPU, timestamp, success*

---

### `app.clearPerformanceRecords`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `clearPerformanceRecords()`

Clear all performance records

**Returns:** `void`

---

### `app.notifyPost`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `notifyPost(name)`

Send a Darwin Notification

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Notification name | No |

**Returns:** `boolean`

*Whether the notification was sent successfully*

---

### `app.notifyRegister`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `notifyRegister(name)`

Register to listen for a Darwin Notification

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Notification name | No |

**Returns:** `number`

*Listener token*

---

### `app.notifyCancel`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `notifyCancel(token)`

Cancel listening for a Darwin Notification

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `token` | `number` | Listener token | No |

**Returns:** `boolean`

*Whether the listener was cancelled successfully*

---

## haptic

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

Haptic feedback

> **Trigger Note:** Haptic feedback may not function in background mode and requires hardware support.

### `haptic.impact`

**Signature:** `impact(style?)`

Trigger impact feedback

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `style` | `string` | The intensity style: 'light' \| 'medium' \| 'heavy' \| 'soft' \| 'rigid' | Yes |

**Returns:** `void`

---

### `haptic.notification`

**Signature:** `notification(type)`

Trigger notification feedback

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `type` | `string` | The notification type: 'success' \| 'warning' \| 'error' | No |

**Returns:** `void`

---

### `haptic.selection`

**Signature:** `selection()`

Trigger selection feedback (for picker changes, etc.)

**Returns:** `void`

---

### `haptic.vibrate`

**Signature:** `vibrate()`

Standard device vibration

**Returns:** `void`

---

### `haptic.light`

**Signature:** `light()`

Light impact feedback

**Returns:** `void`

---

### `haptic.medium`

**Signature:** `medium()`

Medium impact feedback

**Returns:** `void`

---

### `haptic.heavy`

**Signature:** `heavy()`

Heavy impact feedback

**Returns:** `void`

---

### `haptic.success`

**Signature:** `success()`

Success notification feedback

**Returns:** `void`

---

### `haptic.warning`

**Signature:** `warning()`

Warning notification feedback

**Returns:** `void`

---

### `haptic.error`

**Signature:** `error()`

Error notification feedback

**Returns:** `void`

---

## display

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

Display and screen control

> **Trigger Note:** Brightness settings and 'keepAwake' may not function in the background; 'openSettings' requires UI interaction.

### `display.getBrightness`

**Signature:** `getBrightness()`

Get current screen brightness

**Returns:** `number`

*Current brightness level (0.0 to 1.0)*

---

### `display.setBrightness`

**Signature:** `setBrightness(value)`

Set screen brightness

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `value` | `number` | Brightness value (0.0 to 1.0) | No |

**Returns:** `boolean`

*Whether the operation was successful*

---

### `display.increaseBrightness`

**Signature:** `increaseBrightness(amount?)`

Increase screen brightness

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `amount` | `number` | Amount to increase (defaults to 0.1) | Yes |

**Returns:** `boolean`

*Whether the operation was successful*

---

### `display.decreaseBrightness`

**Signature:** `decreaseBrightness(amount?)`

Decrease screen brightness

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `amount` | `number` | Amount to decrease (defaults to 0.1) | Yes |

**Returns:** `boolean`

*Whether the operation was successful*

---

### `display.getScreenInfo`

**Signature:** `getScreenInfo()`

Get screen dimensions and scale

**Returns:** `{ width: number, height: number, scale: number, nativeWidth: number, nativeHeight: number }`

*Object containing width, height, display scale, and native dimensions*

---

### `display.getOrientation`

**Signature:** `getOrientation()`

Get current screen orientation

**Returns:** `'portrait' \| 'landscape'`

*Screen orientation mode*

---

### `display.isLowPowerModeEnabled`

**Signature:** `isLowPowerModeEnabled()`

Check if Low Power Mode is enabled

**Returns:** `boolean`

*Whether the mode is active*

---

### `display.setLowPowerMode`

**Signature:** `setLowPowerMode(enabled)`

Toggle Low Power Mode

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable Low Power Mode | No |

**Returns:** `boolean`

*Whether the state was successfully updated*

---

### `display.isAutoBrightnessEnabled`

**Signature:** `isAutoBrightnessEnabled()`

Check if Auto-Brightness is enabled

**Returns:** `boolean`

*Whether Auto-Brightness is on*

---

### `display.setAutoBrightness`

**Signature:** `setAutoBrightness(enabled)`

Toggle Auto-Brightness

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable Auto-Brightness | No |

**Returns:** `boolean`

*Whether the update was successful*

---

### `display.openSettings`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openSettings()`

Open system display settings

**Returns:** `boolean`

*Whether the settings page was opened*

---

### `display.keepAwake`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `keepAwake(enabled)`

Keep screen awake and prevent dimming

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to keep the screen on | No |

**Returns:** `boolean`

*Whether the operation was successful*

---

## hud

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

HUD System - Create floating windows and UI elements

> **Trigger Note:** Fully supported in trigger mode, can create system-level floating windows

### `hud.createWindow`

**Signature:** `createWindow(config)`

Create a HUD window

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `config` | `object` | Window config { id?, width?, height?, x?, y?, draggable?, dismissible?, autoClear?, style? }, style is { backgroundColor?, textColor?, fontSize?, fontWeight?, cornerRadius?, padding?, opacity?, shadow? } | No |

**Returns:** `Window`

*Window object for adding elements and controlling the window*

---

### `hud.getWindow`

**Signature:** `getWindow(id)`

Get an existing window by ID

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Window ID | No |

**Returns:** `Window \| null`

*Window object if found, null otherwise*

---

### `hud.getScreenSize`

**Signature:** `getScreenSize()`

Get screen size information

**Returns:** `{ width: number, height: number, scale: number }`

*Screen info object containing width, height, scale*

---

### `hud.clearAll`

**Signature:** `clearAll()`

Clear all HUD windows

**Returns:** `void`

---

### `hud.getAllWindows`

**Signature:** `getAllWindows()`

Get all window IDs

**Returns:** `[string]`

*Array of window IDs*

---

## util

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

Utility functions

### `util.uuid`

**Signature:** `uuid()`

Generate a unique UUID

**Returns:** `string`

*The generated UUID string*

---

### `util.md5`

**Signature:** `md5(string)`

Calculate the MD5 hash of a string

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | The input string to hash | No |

**Returns:** `string`

*The resulting MD5 hash value*

---

### `util.base64Encode`

**Signature:** `base64Encode(string)`

Encode a string to Base64 format

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | The string to encode | No |

**Returns:** `string`

*The Base64 encoded string*

---

### `util.base64Decode`

**Signature:** `base64Decode(string)`

Decode a Base64 encoded string

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | The Base64 string to decode | No |

**Returns:** `string`

*The decoded original string*

---

### `util.sha256`

**Signature:** `sha256(string)`

Calculate the SHA256 hash of a string

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `string` | `string` | The input string to hash | No |

**Returns:** `string`

*The resulting SHA256 hash value*

---

### `util.formatDate`

**Signature:** `formatDate(timestamp, format?)`

Format a timestamp into a string

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `timestamp` | `number` | The timestamp in milliseconds | No |
| `format` | `string` | The format pattern (e.g., 'yyyy-MM-dd'), defaults to 'yyyy-MM-dd HH:mm:ss' | Yes |

**Returns:** `string`

*The formatted date string*

---

### `util.now`

**Signature:** `now()`

Get the current timestamp in milliseconds

**Returns:** `number`

*The current timestamp*

---

### `util.sleep`

**Signature:** `sleep(ms)`

Sleep for a specified duration

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `ms` | `number` | Duration in milliseconds | No |

**Returns:** `void`

---

## location

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

Location services

> **Trigger Note:** The 'requestAccess' method requires UI interaction; 'getCurrent' requires prior authorization.

### `location.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

Request location access permissions

**Returns:** `void`

---

### `location.getAccessStatus`

**Signature:** `getAccessStatus()`

Get current authorization status

**Returns:** `'authorized' \| 'denied' \| 'restricted' \| 'notDetermined' \| 'unknown'`

*Current permission status*

---

### `location.isAuthorized`

**Signature:** `isAuthorized()`

Check if location access is granted

**Returns:** `boolean`

*Whether access is authorized*

---

### `location.getCurrent`

**Signature:** `getCurrent()`

Retrieve current geographic location

**Returns:** `{ lat: number, lng: number, alt: number, course: number, speed: number, accuracy: number, timestamp: number } \| null`

*Location data object containing coordinates, altitude, etc., or null if failed*

---

### `location.current`

**Signature:** `current()`

Get current location (Alias for getCurrent)

**Returns:** `{ lat: number, lng: number, alt: number, course: number, speed: number, accuracy: number, timestamp: number } \| null`

*Location data object, or null if failed*

---

### `location.distance`

**Signature:** `distance(lat1, lng1, lat2, lng2)`

Calculate the distance between two points

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `lat1` | `number` | Latitude of point 1 | No |
| `lng1` | `number` | Longitude of point 1 | No |
| `lat2` | `number` | Latitude of point 2 | No |
| `lng2` | `number` | Longitude of point 2 | No |

**Returns:** `number`

*Distance in meters*

---

### `location.geocode`

**Signature:** `geocode(address)`

Geocoding: Address to coordinates

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | Target address string | No |

**Returns:** `[{ lat: number, lng: number, name: string }]`

*An array of geographic location objects*

---

### `location.reverseGeocode`

**Signature:** `reverseGeocode(lat, lng, locale?)`

Reverse Geocoding: Coordinates to address

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `lat` | `number` | Latitude | No |
| `lng` | `number` | Longitude | No |
| `locale` | `string` | Locale identifier (optional, e.g., 'en_US', defaults to system language) | Yes |

**Returns:** `[{ name: string, country: string, locality: string, administrativeArea: string, subLocality: string, thoroughfare: string, postalCode: string }]`

*An array of address information objects*

---

### `location.isLocationServicesEnabled`

**Signature:** `isLocationServicesEnabled()`

Check if system-wide location services are enabled

**Returns:** `boolean`

*Whether services are enabled*

---

### `location.hasTrollStorePermission`

**Signature:** `hasTrollStorePermission()`

Check for TrollStore-specific permissions

**Returns:** `boolean`

*Whether permission is present*

---

### `location.setLocationServicesEnabled`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `setLocationServicesEnabled(enabled)`

Toggle system location services (Requires TrollStore)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | True to enable, false to disable | No |

**Returns:** `{ success: boolean, enabled?: boolean, message?: string }`

*Operation result (success status and current state)*

---

### `location.toggleLocationServices`

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

**Signature:** `toggleLocationServices()`

Switch location services state (Requires TrollStore)

**Returns:** `{ success: boolean, enabled?: boolean, message?: string }`

*Operation result (success status and new state)*

---

## calendar

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

System calendar

> **Trigger Note:** The 'requestAccess' method requires UI interaction; other operations require prior authorization.

### `calendar.isAuthorized`

**Signature:** `isAuthorized()`

Check current authorization status

**Returns:** `boolean`

---

### `calendar.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

Request calendar access permissions

**Returns:** `boolean`

*Whether authorization was granted*

---

### `calendar.getCalendars`

**Signature:** `getCalendars()`

Retrieve all available calendars

**Returns:** `[{ id: string, title: string, color: string, type: number, allowsModify: boolean }]`

*An array of calendar objects*

---

### `calendar.getToday`

**Signature:** `getToday()`

Fetch today's events

**Returns:** `[{ id: string, title: string, startDate: number, endDate: number, calendar: string, calendarId: string, isAllDay: boolean, location: string, notes: string }]`

*An array of events for today*

---

### `calendar.getEvents`

**Signature:** `getEvents(start, end, calendarId?)`

Retrieve events within a specific time range

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `start` | `number` | Start timestamp | No |
| `end` | `number` | End timestamp | No |
| `calendarId` | `string` | Specific calendar ID to filter by | Yes |

**Returns:** `[{ id: string, title: string, startDate: number, endDate: number, calendar: string, calendarId: string, isAllDay: boolean, location: string, notes: string }]`

*An array of event objects*

---

### `calendar.create`

**Signature:** `create(title, start, end, options?)`

Create a new calendar event

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Event title | No |
| `start` | `number` | Start timestamp | No |
| `end` | `number` | End timestamp | No |
| `options` | `object` | Options { calendarId, notes, location, url, allDay } | Yes |

**Returns:** `string \| null`

*ID of the newly created event, or null if failed*

---

### `calendar.delete`

**Signature:** `delete(id)`

Delete a specific calendar event

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Event ID | No |

**Returns:** `boolean`

*Whether the deletion was successful*

---

## reminder

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

Reminders and checklists

> **Trigger Note:** The 'requestAccess' method requires UI interaction; other operations require prior authorization.

### `reminder.isAuthorized`

**Signature:** `isAuthorized()`

Check current authorization status

**Returns:** `boolean`

*Whether access is granted*

---

### `reminder.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

Request reminder access permissions

**Returns:** `boolean`

*Whether authorization was granted*

---

### `reminder.getLists`

**Signature:** `getLists()`

Retrieve all reminder lists

**Returns:** `[{ id: string, title: string, color: string, isSystem: boolean }]`

*An array of reminder list objects*

---

### `reminder.getAll`

**Signature:** `getAll(listId?)`

Retrieve all reminder items

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `listId` | `string` | Specific list ID to filter by | Yes |

**Returns:** `[{ id: string, title: string, isCompleted: boolean, listId: string, listTitle: string, notes: string, priority: number, creationDate: number, dueDate?: number, isOverdue?: boolean }]`

*An array of reminder items*

---

### `reminder.create`

**Signature:** `create(title, options?)`

Create a new reminder

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Reminder title | No |
| `options` | `object` | Options: { listId, notes, dueDate, priority, location: { latitude, longitude, radius, onArrive, name } } | Yes |

**Returns:** `string \| { success: boolean, id?: string, title?: string, isSystemReminder?: boolean }`

*The unique ID of the created reminder, or object with details if location-based*

---

### `reminder.complete`

**Signature:** `complete(id)`

Mark a reminder as completed

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Reminder ID | No |

**Returns:** `boolean`

*Whether the operation was successful*

---

### `reminder.delete`

**Signature:** `delete(id)`

Delete a specific reminder

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Reminder ID | No |

**Returns:** `boolean`

*Whether the deletion was successful*

---

### `reminder.getSorted`

**Signature:** `getSorted(options?)`

Retrieve sorted reminders

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `options` | `object` | { sortBy: 'createdAt'\|'dueDate'\|'priority'\|'title', ascending: boolean, completed: boolean } | Yes |

**Returns:** `[Reminder]`

*A list of sorted reminder items*

---

### `reminder.getUpcoming`

**Signature:** `getUpcoming(days?)`

Retrieve reminders due soon

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `days` | `number` | Number of days in the future, defaults to 7 | Yes |

**Returns:** `[Reminder]`

*A list of upcoming reminders*

---

### `reminder.getOverdue`

**Signature:** `getOverdue()`

Retrieve all overdue reminders

**Returns:** `[Reminder]`

*A list of reminders past their due date*

---

### `reminder.reorder`

**Signature:** `reorder(ids)`

Batch reorder reminders

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `ids` | `string[]` | An ordered array of reminder IDs | No |

**Returns:** `{ success: boolean, error?: string }`

*Result object (note: system reminders do not support reordering)*

---

### `reminder.createSystemReminder`

**Signature:** `createSystemReminder(title, options?)`

Create a system reminder with advanced features (e.g., location-based triggers)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Reminder title | No |
| `options` | `object` | { listId, notes, dueDate, priority, location: { latitude, longitude, radius, onArrive, name } } | Yes |

**Returns:** `string \| { success: boolean, id?: string, title?: string, isSystemReminder?: boolean }`

*Object containing success status and system reminder details*

---

### `reminder.getSystemLists`

**Signature:** `getSystemLists()`

Retrieve system-managed reminder lists

**Returns:** `[{ id: string, title: string, color: string, isSystem: boolean }]`

*An array of system reminder lists*

---

## contacts

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

Contact management operations

> **Trigger Note:** The 'requestAccess' method requires UI interaction; other operations require prior authorization.

### `contacts.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

Request access permissions for contacts

**Returns:** `{ granted: boolean, error?: string }`

*An object containing the authorization result*

---

### `contacts.getAccessStatus`

**Signature:** `getAccessStatus()`

Get current permission status

**Returns:** `'authorized' \| 'denied' \| 'restricted' \| 'notDetermined'`

*The permission status string*

---

### `contacts.isAuthorized`

**Signature:** `isAuthorized()`

Check if the app is already authorized

**Returns:** `boolean`

*Whether access is granted*

---

### `contacts.getAll`

**Signature:** `getAll(offset?, limit?)`

Retrieve all contacts with pagination

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `offset` | `number` | Number of records to skip, defaults to 0 | Yes |
| `limit` | `number` | Maximum number of records to return, defaults to all | Yes |

**Returns:** `[Contact]`

*An array of contact objects*

---

### `contacts.getCount`

**Signature:** `getCount()`

Get the total number of contacts

**Returns:** `number`

*Total count of contacts*

---

### `contacts.search`

**Signature:** `search(query)`

Search contacts by name

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `query` | `string` | Search keyword (matches name fields) | No |

**Returns:** `[Contact]`

*An array of matching contact objects*

---

### `contacts.searchByPhone`

**Signature:** `searchByPhone(phone)`

Search contacts by phone number

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `phone` | `string` | Phone number (supports fuzzy matching) | No |

**Returns:** `[Contact]`

*An array of matching contact objects*

---

### `contacts.getById`

**Signature:** `getById(id)`

Get a contact by its unique identifier

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Unique identifier of the contact | No |

**Returns:** `Contact \| null`

*The contact object or null if not found*

---

### `contacts.create`

**Signature:** `create(data)`

Create a new contact

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `data` | `object` | Contact data including givenName, familyName, phoneNumbers, emailAddresses, etc. | No |

**Returns:** `{ success: boolean, id?: string, error?: string }`

*An object containing success status and the new contact ID*

---

### `contacts.delete`

**Signature:** `delete(id)`

Delete a specific contact

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Unique identifier of the contact | No |

**Returns:** `{ success: boolean, error?: string }`

*An object containing the success status*

---

### `contacts.getGroups`

**Signature:** `getGroups()`

Retrieve all contact groups

**Returns:** `[{ id: string, name: string }]`

*An array of group objects*

---

## notification

![Limited Support](https://img.shields.io/badge/Trigger-Limited-orange)

Local notifications

> **Trigger Note:** The 'requestAccess' method requires UI interaction; other operations require prior authorization.

### `notification.send`

**Signature:** `send(title, body, options?)`

Send an immediate notification

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Notification title | No |
| `body` | `string` | Notification body content | No |
| `options` | `object` | Options: { id, subtitle, badge, userInfo, copyOnTap, delay, date } | Yes |

**Returns:** `string \| { success: boolean, error: string }`

*The unique ID of the sent notification, or error object if failed*

---

### `notification.cancel`

**Signature:** `cancel(id)`

Cancel a specific notification

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `id` | `string` | Notification ID | No |

**Returns:** `boolean`

*Whether the cancellation was successful*

---

### `notification.cancelAll`

**Signature:** `cancelAll()`

Cancel all scheduled notifications

**Returns:** `boolean`

*Whether the operation was successful*

---

### `notification.getPending`

**Signature:** `getPending()`

Retrieve all pending (scheduled) notifications

**Returns:** `[{ id: string, title: string, body: string, subtitle: string, delay?: number, date?: number }]`

*A list of notifications waiting to be triggered*

---

### `notification.getDelivered`

**Signature:** `getDelivered()`

Retrieve all delivered notifications

**Returns:** `[{ id: string, title: string, body: string, subtitle: string, date: number }]`

*A list of notifications currently displayed in the notification center*

---

### `notification.requestAccess`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `requestAccess()`

Request user permission for notifications

**Returns:** `{ granted: boolean, error?: string }`

*Authorization result object*

---

### `notification.getAccessStatus`

**Signature:** `getAccessStatus()`

Get current authorization status

**Returns:** `'authorized' \| 'denied' \| 'notDetermined' \| 'provisional' \| 'ephemeral' \| 'unknown'`

*Current permission status string*

---

### `notification.isAuthorized`

**Signature:** `isAuthorized()`

Check if notification permission is authorized

**Returns:** `boolean`

*Whether notifications are authorized*

---

### `notification.setBadge`

**Signature:** `setBadge(count)`

Set the application badge number

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `count` | `number` | The number to display on the badge | No |

**Returns:** `boolean`

*Whether the operation was successful*

---

### `notification.clearBadge`

**Signature:** `clearBadge()`

Clear the application badge

**Returns:** `boolean`

*Whether the operation was successful*

---

### `notification.schedule`

**Signature:** `schedule(title, body, options)`

Schedule a notification

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Notification title | No |
| `body` | `string` | Notification body content | No |
| `options` | `object` | Options: { id, subtitle, badge, userInfo, copyOnTap, delay, date } | No |

**Returns:** `string \| { success: boolean, error: string }`

*The unique ID of the scheduled notification, or error object if failed*

---

## sms

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

SMS and messaging operations

> **Trigger Note:** TrollStore Root privileges are required to access the system SMS database.

### `sms.isRealDataAvailable`

**Signature:** `isRealDataAvailable()`

Check if real SMS data is accessible

**Returns:** `boolean`

*Whether the app has access to the SMS database*

---

### `sms.read`

**Signature:** `read(limit?, offset?)`

Read recent SMS messages

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | Maximum number of messages to retrieve (defaults to 50) | Yes |
| `offset` | `number` | Number of messages to skip (defaults to 0) | Yes |

**Returns:** `[{ id: number, guid: string, address: string, text: string, date: string, isFromMe: boolean, isRead: boolean, service: string, hasAttachments: boolean }]`

*An array of message objects*

---

### `sms.search`

**Signature:** `search(keyword, limit?)`

Search messages by keyword

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `keyword` | `string` | Search keyword | No |
| `limit` | `number` | Maximum number of results (defaults to 50) | Yes |

**Returns:** `[{ id: number, guid: string, address: string, text: string, date: string, isFromMe: boolean, isRead: boolean }]`

*An array of matching message objects*

---

### `sms.getByAddress`

**Signature:** `getByAddress(address, limit?)`

Retrieve messages from a specific phone number

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `address` | `string` | Sender's phone number or address | No |
| `limit` | `number` | Maximum number of messages (defaults to 50) | Yes |

**Returns:** `[{ id: number, guid: string, address: string, text: string, date: string, isFromMe: boolean, isRead: boolean }]`

*An array of message objects*

---

### `sms.getChats`

**Signature:** `getChats(limit?)`

Retrieve a list of conversation threads

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | Maximum number of chats (defaults to 50) | Yes |

**Returns:** `[{ id: number, identifier: string, displayName: string, unreadCount: number, participants: [string], lastMessageDate: string }]`

*An array of chat session objects*

---

### `sms.getStatistics`

**Signature:** `getStatistics()`

Get SMS usage statistics

**Returns:** `{ totalMessages: number, unreadCount: number, chatCount: number, contactCount: number, attachmentCount: number }`

*An object containing summary statistics*

---

### `sms.getLatest`

**Signature:** `getLatest()`

Retrieve the most recent message

**Returns:** `{ id: number, guid: string, address: string, text: string, date: string, isFromMe: boolean, isRead: boolean } \| null`

*The latest message object or null*

---

### `sms.getUnread`

**Signature:** `getUnread(limit?)`

Retrieve all unread messages

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `limit` | `number` | Maximum number of messages (defaults to 50) | Yes |

**Returns:** `[{ id: number, guid: string, address: string, text: string, date: string, isFromMe: boolean, isRead: boolean }]`

*An array of unread message objects*

---

### `sms.helperCheck`

**Signature:** `helperCheck()`

Check SMS database access via Root Helper

**Returns:** `object`

*Access status information*

---

### `sms.helperCopy`

**Signature:** `helperCopy()`

Copy SMS database to temporary directory via Root Helper

**Returns:** `{ success: boolean, path: string, error: string }`

*Copy operation result*

---

### `sms.helperList`

**Signature:** `helperList(path)`

List directory contents via Root Helper

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `path` | `string` | Directory path to list | No |

**Returns:** `object`

*Directory listing result*

---

### `sms.helperAvailable`

**Signature:** `helperAvailable()`

Check if Root Helper is available

**Returns:** `boolean`

*Whether Root Helper is accessible*

---

## sql

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

SQLite database operations

### `sql.open`

**Signature:** `open(name?)`

Open or create a SQLite database

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default'). File will be created as {name}.sqlite in Documents directory | Yes |

**Returns:** `boolean`

*Whether the database was successfully opened*

---

### `sql.close`

**Signature:** `close(name?)`

Close a database connection

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |

**Returns:** `boolean`

*Always returns true*

---

### `sql.execute`

**Signature:** `execute(name?, sql, params?)`

Execute INSERT, UPDATE, DELETE, or DDL statements

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |
| `sql` | `string` | SQL statement to execute | No |
| `params` | `any[]` | Parameters for prepared statement (use ? placeholders) | Yes |

**Returns:** `{ success: boolean, changes?: number, lastInsertId?: number, error?: string }`

*Result object containing success status, affected rows count, and last inserted row ID*

---

### `sql.exec`

**Signature:** `exec(name?, sql, params?)`

Alias for execute()

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |
| `sql` | `string` | SQL statement to execute | No |
| `params` | `any[]` | Parameters for prepared statement | Yes |

**Returns:** `{ success: boolean, changes?: number, lastInsertId?: number, error?: string }`

*Result object*

---

### `sql.query`

**Signature:** `query(name?, sql, params?)`

Execute a SELECT query and return all matching rows

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |
| `sql` | `string` | SELECT query to execute | No |
| `params` | `any[]` | Parameters for prepared statement | Yes |

**Returns:** `[object]`

*An array of row objects (column name -> value)*

---

### `sql.queryOne`

**Signature:** `queryOne(name?, sql, params?)`

Execute a SELECT query and return the first row

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |
| `sql` | `string` | SELECT query to execute | No |
| `params` | `any[]` | Parameters for prepared statement | Yes |

**Returns:** `object \| null`

*The first row object, or null if no results*

---

### `sql.tableExists`

**Signature:** `tableExists(name?, tableName)`

Check if a table exists in the database

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |
| `tableName` | `string` | Name of the table to check | No |

**Returns:** `boolean`

*Whether the table exists*

---

### `sql.getTables`

**Signature:** `getTables(name?)`

List all tables in the database

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |

**Returns:** `[string]`

*An array of table names*

---

### `sql.getTableInfo`

**Signature:** `getTableInfo(name?, tableName)`

Get column information for a table

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |
| `tableName` | `string` | Name of the table | No |

**Returns:** `[{ cid: number, name: string, type: string, notnull: boolean, pk: boolean }]`

*An array of column information objects*

---

### `sql.beginTransaction`

**Signature:** `beginTransaction(name?)`

Begin a database transaction

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |

**Returns:** `boolean`

*Whether the transaction was started successfully*

---

### `sql.commit`

**Signature:** `commit(name?)`

Commit the current transaction

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |

**Returns:** `boolean`

*Whether the commit was successful*

---

### `sql.rollback`

**Signature:** `rollback(name?)`

Roll back the current transaction

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |

**Returns:** `boolean`

*Whether the rollback was successful*

---

### `sql.vacuum`

**Signature:** `vacuum(name?)`

Optimize the database by reclaiming unused space

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Database name (defaults to 'default') | Yes |

**Returns:** `boolean`

*Whether the vacuum operation was successful*

---

## shortcuts

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

Shortcuts operations

> **Trigger Note:** Running shortcuts and opening apps require foreground UI interaction; completely unavailable in Daemon mode

### `shortcuts.run`

**Signature:** `run(name, input?)`

Run a shortcut

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Shortcut name | No |
| `input` | `string` | Input text (optional) | Yes |

**Returns:** `boolean`

*Whether the shortcut was successfully opened*

---

### `shortcuts.runWithCallback`

**Signature:** `runWithCallback(name, input?)`

Run a shortcut with x-callback-url support

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Shortcut name | No |
| `input` | `string` | Input text (optional) | Yes |

**Returns:** `boolean`

*Whether the shortcut was successfully opened*

---

### `shortcuts.open`

**Signature:** `open()`

Open the Shortcuts app

**Returns:** `boolean`

*Whether the app was successfully opened*

---

### `shortcuts.openGallery`

**Signature:** `openGallery()`

Open the Shortcuts gallery

**Returns:** `boolean`

*Whether the gallery was successfully opened*

---

### `shortcuts.create`

**Signature:** `create(name)`

Create a new shortcut

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Shortcut name | No |

**Returns:** `boolean`

*Whether the creation interface was successfully opened*

---

### `shortcuts.import`

**Signature:** `import(url)`

Import a shortcut from URL

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `url` | `string` | Shortcut URL | No |

**Returns:** `boolean`

*Whether the import interface was successfully opened*

---

### `shortcuts.isAvailable`

**Signature:** `isAvailable()`

Check if Shortcuts app is installed

**Returns:** `boolean`

*Whether Shortcuts is available*

---

### `shortcuts.donateInteraction`

**Signature:** `donateInteraction(title, identifier)`

Donate a Siri suggestion

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `title` | `string` | Suggestion title/invocation phrase | No |
| `identifier` | `string` | Interaction identifier | No |

**Returns:** `boolean`

*Whether the donation was successful*

---

### `shortcuts.deleteInteraction`

**Signature:** `deleteInteraction(identifier)`

Delete a specific Siri suggestion

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `identifier` | `string` | Interaction identifier | No |

**Returns:** `boolean`

*Whether the deletion was successful*

---

### `shortcuts.deleteAllInteractions`

**Signature:** `deleteAllInteractions()`

Delete all Siri suggestions

**Returns:** `boolean`

*Whether the deletion was successful*

---

## system

![Full Support](https://img.shields.io/badge/Trigger-Full-brightgreen)

System settings control

> **Trigger Note:** Most methods require TrollStore privileges to work properly

### `system.isWiFiEnabled`

**Signature:** `isWiFiEnabled()`

Check if WiFi is enabled

**Returns:** `boolean`

*Whether WiFi is enabled*

---

### `system.setWiFi`

**Signature:** `setWiFi(enabled)`

Set WiFi enabled state (TrollStore privilege)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable WiFi | No |

**Returns:** `boolean`

*Whether the operation succeeded*

---

### `system.isBluetoothEnabled`

**Signature:** `isBluetoothEnabled()`

Check if Bluetooth is enabled

**Returns:** `boolean`

*Whether Bluetooth is enabled*

---

### `system.setBluetooth`

**Signature:** `setBluetooth(enabled)`

Set Bluetooth enabled state (TrollStore privilege)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable Bluetooth | No |

**Returns:** `boolean`

*Whether the operation succeeded*

---

### `system.isAirplaneModeEnabled`

**Signature:** `isAirplaneModeEnabled()`

Check if Airplane Mode is enabled

**Returns:** `boolean`

*Whether Airplane Mode is enabled*

---

### `system.setAirplaneMode`

**Signature:** `setAirplaneMode(enabled)`

Set Airplane Mode state (TrollStore privilege)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable Airplane Mode | No |

**Returns:** `boolean`

*Whether the operation succeeded*

---

### `system.isDoNotDisturbEnabled`

**Signature:** `isDoNotDisturbEnabled()`

Check if Do Not Disturb is enabled

**Returns:** `boolean`

*Whether Do Not Disturb is enabled*

---

### `system.setDoNotDisturb`

**Signature:** `setDoNotDisturb(enabled)`

Set Do Not Disturb state

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable Do Not Disturb | No |

**Returns:** `boolean`

*Whether the operation succeeded*

---

### `system.getVolume`

**Signature:** `getVolume(category?)`

Get system volume

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `category` | `string` | Volume category: 'System', 'Ringer', 'Media', defaults to 'Media' | Yes |

**Returns:** `number`

*Current volume level (0.0 - 1.0)*

---

### `system.setVolume`

**Signature:** `setVolume(level, category?)`

Set system volume

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `level` | `number` | Volume level (0.0 - 1.0) | No |
| `category` | `string` | Volume category: 'System', 'Ringer', 'Media', defaults to 'Media' | Yes |

**Returns:** `boolean`

*Whether the operation succeeded*

---

### `system.hasFlashlight`

**Signature:** `hasFlashlight()`

Check if device has flashlight

**Returns:** `boolean`

*Whether device has flashlight*

---

### `system.isFlashlightOn`

**Signature:** `isFlashlightOn()`

Check if flashlight is on

**Returns:** `boolean`

*Whether flashlight is on*

---

### `system.setFlashlight`

**Signature:** `setFlashlight(enabled, level?)`

Set flashlight state

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to turn on flashlight | No |
| `level` | `number` | Brightness level (0.0 - 1.0), defaults to 1.0 | Yes |

**Returns:** `boolean`

*Whether the operation succeeded*

---

### `system.isOrientationLockEnabled`

**Signature:** `isOrientationLockEnabled()`

Check if orientation lock is enabled

**Returns:** `boolean`

*Whether orientation lock is enabled*

---

### `system.setOrientationLock`

**Signature:** `setOrientationLock(enabled)`

Set orientation lock state

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable orientation lock | No |

**Returns:** `boolean`

*Whether the operation succeeded*

---

### `system.isLowPowerModeEnabled`

**Signature:** `isLowPowerModeEnabled()`

Check if Low Power Mode is enabled

**Returns:** `boolean`

*Whether Low Power Mode is enabled*

---

### `system.setLowPowerMode`

**Signature:** `setLowPowerMode(enabled)`

Set Low Power Mode state (TrollStore privilege)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable Low Power Mode | No |

**Returns:** `boolean`

*Whether the operation succeeded*

---

### `system.isLocationServicesEnabled`

**Signature:** `isLocationServicesEnabled()`

Check if Location Services are enabled

**Returns:** `boolean`

*Whether Location Services are enabled*

---

### `system.setLocationServices`

**Signature:** `setLocationServices(enabled)`

Set Location Services state (TrollStore privilege)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable Location Services | No |

**Returns:** `boolean`

*Whether the operation succeeded*

---

### `system.isCellularDataEnabled`

**Signature:** `isCellularDataEnabled()`

Check if Cellular Data is enabled

**Returns:** `boolean`

*Whether Cellular Data is enabled*

---

### `system.setCellularData`

**Signature:** `setCellularData(enabled)`

Set Cellular Data state (TrollStore privilege)

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `enabled` | `boolean` | Whether to enable Cellular Data | No |

**Returns:** `boolean`

*Whether the operation succeeded*

---

### `system.openSettings`

![Not Supported](https://img.shields.io/badge/Trigger-None-red)

**Signature:** `openSettings(section?)`

Open system settings

**Parameters:**

| Name | Type | Description | Optional |
|------|------|-------------|----------|
| `section` | `string` | Settings section: 'WIFI', 'BLUETOOTH', 'CELLULAR', 'VPN', 'GENERAL', 'DISPLAY', 'SOUND', 'NOTIFICATION', 'PRIVACY', 'BATTERY', 'STORAGE', 'WALLPAPER', 'SIRI', 'ACCESSIBILITY', 'DND', 'SCREEN_TIME', 'PASSWORDS' | Yes |

**Returns:** `boolean`

*Whether settings was opened successfully*

---

