// Type definitions for TrollScript
// Project: https://github.com/dompling/TrollScript-Release
// Definitions by: TrollScript Auto Generator

interface Console {
    /**
     * 输出日志信息
     * @param args 要输出的内容
     */
    log(...args: any[]): void;

    /**
     * 输出错误信息
     * @param args 要输出的内容
     */
    error(...args: any[]): void;

    /**
     * 输出警告信息
     * @param args 要输出的内容
     */
    warn(...args: any[]): void;

    /**
     * 输出提示信息
     * @param args 要输出的内容
     */
    info(...args: any[]): void;

    /**
     * 输出调试信息
     * @param args 要输出的内容
     */
    debug(...args: any[]): void;

    /**
     * 以表格形式输出
     * @param data 要显示的表格数据
     */
    table(data: any): void;

    /**
     * 清空控制台
     */
    clear(): void;

}

declare const console: Console;

interface Device {
    /**
     * 获取设备信息
     * @returns 包含设备名称、型号、系统版本等信息的对象
     */
    info(): any;

    /**
     * 获取电池信息
     * @returns 包含电量(0-1)、充电状态、低电量模式等信息的对象
     */
    battery(): any;

    /**
     * 获取屏幕信息
     * @returns 包含屏幕尺寸、缩放比例、亮度等信息的对象
     */
    screen(): any;

}

declare const device: Device;

interface Clipboard {
    /**
     * 获取剪贴板文本
     * @returns 剪贴板中的文本内容
     */
    getText(): string;

    /**
     * 设置剪贴板文本
     * @param text 要设置的文本内容
     */
    setText(text: string): void;

    /**
     * 清空剪贴板
     */
    clear(): void;

}

declare const clipboard: Clipboard;

interface Storage {
    /**
     * 获取存储值
     * @param key 键名
     * @returns 存储的值，如果不存在返回 undefined
     */
    get(key: string): any;

    /**
     * 设置存储值
     * @param key 键名
     * @param value 要存储的值
     */
    set(key: string, value: any): void;

    /**
     * 删除存储值
     * @param key 键名
     */
    remove(key: string): void;

    /**
     * 清空所有存储
     */
    clear(): void;

    /**
     * 检查键是否存在
     * @param key 键名
     * @returns 是否存在
     */
    has(key: string): boolean;

}

declare const storage: Storage;

interface Icloud {
    /**
     * 获取 iCloud 容器路径
     * @returns iCloud 容器的本地路径，不可用时返回 null
     */
    containerPath(): any;

    /**
     * 读取 iCloud 文件
     * @param path 文件路径（相对于 iCloud 容器）
     * @returns 文件内容
     */
    read(path: string): string;

    /**
     * 写入 iCloud 文件
     * @param path 文件路径
     * @param content 要写入的内容
     * @returns 是否写入成功
     */
    write(path: string, content: string): boolean;

    /**
     * 删除 iCloud 文件
     * @param path 文件路径
     * @returns 是否删除成功
     */
    delete(path: string): boolean;

    /**
     * 列出 iCloud 目录
     * @param path 目录路径，默认为根目录
     * @returns 文件名列表数组
     */
    list(path?: string): any;

}

declare const icloud: Icloud;

interface File {
    /**
     * 读取文件内容
     * @param path 文件绝对路径
     * @returns 文件内容
     */
    read(path: string): string;

    /**
     * 写入文件内容
     * @param path 文件绝对路径
     * @param content 要写入的内容
     * @returns 是否写入成功
     */
    write(path: string, content: string): boolean;

    /**
     * 追加文件内容
     * @param path 文件绝对路径
     * @param content 要追加的内容
     * @returns 是否追加成功
     */
    append(path: string, content: string): boolean;

    /**
     * 检查文件是否存在
     * @param path 文件绝对路径
     * @returns 文件是否存在
     */
    exists(path: string): boolean;

    /**
     * 删除文件
     * @param path 文件绝对路径
     * @returns 是否删除成功
     */
    delete(path: string): boolean;

    /**
     * 移动文件
     * @param from 源路径
     * @param to 目标路径
     * @returns 是否移动成功
     */
    move(from: string, to: string): boolean;

    /**
     * 复制文件
     * @param from 源路径
     * @param to 目标路径
     * @returns 是否复制成功
     */
    copy(from: string, to: string): boolean;

    /**
     * 列出目录内容
     * @param path 目录路径
     * @returns 文件名列表数组
     */
    list(path: string): any;

    /**
     * 创建目录
     * @param path 目录路径
     * @returns 是否创建成功
     */
    mkdir(path: string): boolean;

    /**
     * 获取文件信息
     * @param path 文件路径
     * @returns 包含大小(字节)、修改时间(时间戳)、创建时间(时间戳)、类型(file/directory)的对象
     */
    stat(path: string): any;

    /**
     * 判断是否是目录
     * @param path 文件路径
     * @returns 是否是目录
     */
    isDirectory(path: string): boolean;

    /**
     * 获取文档目录路径
     * @returns Documents 目录的绝对路径
     */
    documentsPath(): string;

    /**
     * 获取缓存目录路径
     * @returns Caches 目录的绝对路径
     */
    cachePath(): string;

    /**
     * 获取临时目录路径
     * @returns Temporary 目录的绝对路径
     */
    tempPath(): string;

    /**
     * 调试路径访问权限详情
     * @param path 文件路径
     * @returns 调试信息字符串
     */
    debug(path: string): string;

    /**
     * 使用 Root 权限读取受保护文件（需要 TrollStore）
     * @param path 文件绝对路径
     * @returns 文件内容，读取失败返回 null
     */
    rootRead(path: string): any;

    /**
     * 使用 Root 权限列出受保护目录（需要 TrollStore）
     * @param path 目录绝对路径
     * @returns 文件名列表，失败返回 null
     */
    rootList(path: string): any;

    /**
     * 使用 Root 权限复制受保护文件（需要 TrollStore）
     * @param src 源文件路径
     * @param dest 目标文件路径
     * @returns 是否复制成功
     */
    rootCopy(src: string, dest: string): boolean;

    /**
     * 使用 Root 权限检查路径信息（需要 TrollStore）
     * @param path 文件或目录路径
     * @returns 包含读写权限、存在状态等调试信息的对象
     */
    rootCheck(path: string): any;

    /**
     * 使用 Root 权限检查文件是否存在（需要 TrollStore）
     * @param path 文件路径
     * @returns 是否存在
     */
    rootExists(path: string): boolean;

    /**
     * 检查 Root Helper 是否可用
     * @returns 是否可用
     */
    rootAvailable(): boolean;

}

declare const file: File;

interface Http {
    /**
     * 发送 GET 请求
     * @param url 请求地址
     * @param options 请求选项 { headers, timeout }
     * @returns 包含状态码、响应数据、响应头的对象
     */
    get(url: string, options?: Record<string, any>): any;

    /**
     * 发送 POST 请求
     * @param url 请求地址
     * @param options 请求选项 { body, headers, timeout }
     */
    post(url: string, options?: Record<string, any>): any;

    /**
     * 发送 PUT 请求
     * @param url 请求地址
     * @param options 请求选项 { body, headers, timeout }
     */
    put(url: string, options?: Record<string, any>): any;

    /**
     * 发送 DELETE 请求
     * @param url 请求地址
     * @param options 请求选项 { headers, timeout }
     */
    delete(url: string, options?: Record<string, any>): any;

    /**
     * 发送 PATCH 请求
     * @param url 请求地址
     * @param options 请求选项 { body, headers, timeout }
     */
    patch(url: string, options?: Record<string, any>): any;

    /**
     * 发送 HEAD 请求
     * @param url 请求地址
     * @param options 请求选项 { headers, timeout }
     */
    head(url: string, options?: Record<string, any>): any;

    /**
     * 发送自定义请求
     * @param url 请求地址
     * @param options 请求选项 { method, body, headers, timeout }
     */
    request(url: string, options: Record<string, any>): any;

    /**
     * 下载文件
     * @param url 下载地址
     * @param path 保存路径
     * @returns 包含本地文件路径的对象
     */
    download(url: string, path: string): any;

}

declare const http: Http;

interface Network {
    /**
     * 检查网络是否可用
     * @returns 网络是否可用
     */
    isReachable(): boolean;

    /**
     * 获取连接类型
     * @returns 连接类型(wifi/cellular/none)
     */
    getConnectionType(): any;

    /**
     * 获取设备 IP 地址
     * @returns IP 地址
     */
    getIPAddress(): any;

    /**
     * URL 编码
     * @param string 要编码的字符串
     * @returns 编码后的 URL 字符串
     */
    encodeURL(string: string): string;

    /**
     * URL 解码
     * @param string 要解码的字符串
     * @returns 解码后的 URL 字符串
     */
    decodeURL(string: string): string;

    /**
     * 解析 URL 组件
     * @param url 要解析的 URL
     * @returns 包含 URL 组件的对象
     */
    parseURL(url: string): any;

    /**
     * 构建带参数的 URL
     * @param baseURL 基础 URL
     * @param params 查询参数
     * @returns 构建的 URL 字符串
     */
    buildURL(baseURL: string, params?: Record<string, any>): string;

    /**
     * Ping 主机
     * @param host 主机名或 IP
     * @returns 包含延迟和成功状态的对象
     */
    ping(host: string): any;

    /**
     * 下载文件
     * @param url 下载地址
     * @param filename 保存文件名
     * @returns 包含本地文件路径的对象
     */
    download(url: string, filename?: string): any;

    /**
     * 列出 VPN 配置
     * @returns VPN 配置列表
     */
    listVPNs(): any;

    /**
     * 连接 VPN
     * @param name VPN 名称，默认第一个
     * @returns 是否发起连接成功
     */
    connectVPN(name?: string): boolean;

    /**
     * 断开 VPN
     * @returns 是否发起断开成功
     */
    disconnectVPN(): boolean;

    /**
     * 获取 VPN 状态
     * @returns 包含连接状态和 VPN 名称的对象
     */
    getVPNStatus(): any;

    /**
     * 打开系统设置
     * @param section 设置页面（如 'WIFI'）
     * @returns 是否成功打开
     */
    openSettings(section?: string): boolean;

}

declare const network: Network;

interface App {
    /**
     * 获取应用版本
     * @returns 应用版本号
     */
    version(): string;

    /**
     * 获取应用构建号
     * @returns 应用构建号 (CFBundleVersion)
     */
    build(): string;

    /**
     * 获取应用 Bundle ID
     * @returns 应用的 Bundle Identifier
     */
    bundleId(): string;

    /**
     * 获取应用完整信息
     * @returns 包含 name, version, build, bundleId, language 的应用信息对象
     */
    info(): any;

    /**
     * 打开 URL/Scheme
     * @param url 要打开的 URL
     * @returns 是否成功打开
     */
    open(url: string): any;

    /**
     * 检查是否能打开
     * @param url 要检查的 URL
     * @returns 是否能打开
     */
    canOpen(url: string): boolean;

    /**
     * 震动反馈
     */
    vibrate(): void;

    /**
     * 获取应用日志
     * @param limit 返回的日志条数
     * @returns 日志对象数组
     */
    getLogs(limit?: number): any;

    /**
     * 导出日志为字符串
     * @returns 导出的日志内容
     */
    exportLogs(): string;

    /**
     * 获取所有崩溃报告
     * @returns 崩溃报告数组
     */
    getCrashReports(): any;

    /**
     * 获取最近一次崩溃报告
     * @returns 最近一次崩溃报告
     */
    getLastCrash(): any;

    /**
     * 清除所有日志
     */
    clearLogs(): void;

    /**
     * 退出应用（仅用于调试）
     * @param code 退出码，默认为 0
     */
    exit(code?: number): void;

    /**
     * 打开应用设置页面
     * @returns 是否成功打开设置
     */
    openSettings(): boolean;

    /**
     * 获取所有已安装应用列表 (TrollStore 权限)
     * @returns 应用信息数组，包含 bundleIdentifier, name, version, type 等字段
     */
    list(): any;

    /**
     * 获取指定应用的详细信息 (TrollStore 权限)
     * @param bundleId 应用的 Bundle Identifier
     * @returns 应用信息对象，包含 bundleIdentifier, name, version, build, type, teamID, bundlePath, dataContainerPath, urlSchemes 等
     */
    getAppInfo(bundleId: string): any;

    /**
     * 启动指定应用 (TrollStore 权限)
     * @param bundleId 应用的 Bundle Identifier
     * @returns 是否成功启动
     */
    launch(bundleId: string): boolean;

    /**
     * 终止指定应用 (TrollStore 权限，需要后台权限)
     * @param bundleId 应用的 Bundle Identifier
     * @returns 是否成功终止
     */
    terminate(bundleId: string): boolean;

    /**
     * 检查应用是否已安装
     * @param bundleId 应用的 Bundle Identifier
     * @returns 是否已安装
     */
    isInstalled(bundleId: string): boolean;

    /**
     * 获取应用数据容器路径 (TrollStore 权限)
     * @param bundleId 应用的 Bundle Identifier
     * @returns 数据容器路径，未找到返回 null
     */
    getDataContainer(bundleId: string): any;

}

declare const app: App;

interface Haptic {
    /**
     * 触觉冲击反馈
     * @param style 'light' | 'medium' | 'heavy' | 'soft' | 'rigid'
     */
    impact(style?: string): void;

    /**
     * 通知触觉反馈
     * @param type 'success' | 'warning' | 'error'
     */
    notification(type: string): void;

    /**
     * 选择触觉反馈
     */
    selection(): void;

    /**
     * 设备振动
     */
    vibrate(): void;

    /**
     * 轻度冲击
     */
    light(): void;

    /**
     * 中度冲击
     */
    medium(): void;

    /**
     * 重度冲击
     */
    heavy(): void;

    /**
     * 成功反馈
     */
    success(): void;

    /**
     * 警告反馈
     */
    warning(): void;

    /**
     * 错误反馈
     */
    error(): void;

}

declare const haptic: Haptic;

interface Display {
    /**
     * 获取屏幕亮度
     * @returns 当前亮度(0.0-1.0)
     */
    getBrightness(): number;

    /**
     * 设置屏幕亮度
     * @param value 亮度值 (0.0 - 1.0)
     */
    setBrightness(value: number): void;

    /**
     * 增加亮度
     * @param amount 增加量 (默认 0.1)
     */
    increaseBrightness(amount?: number): void;

    /**
     * 降低亮度
     * @param amount 减少量 (默认 0.1)
     */
    decreaseBrightness(amount?: number): void;

    /**
     * 获取屏幕信息
     * @returns 包含宽度、高度、缩放比例的对象
     */
    getScreenInfo(): any;

    /**
     * 获取屏幕方向
     * @returns 屏幕方向
     */
    getOrientation(): any;

    /**
     * 低电量模式是否开启
     * @returns 是否开启
     */
    isLowPowerModeEnabled(): boolean;

    /**
     * 设置低电量模式
     * @param enabled 是否开启
     * @returns 是否设置成功
     */
    setLowPowerMode(enabled: boolean): boolean;

    /**
     * 自动亮度是否开启
     * @returns 是否开启
     */
    isAutoBrightnessEnabled(): boolean;

    /**
     * 设置自动亮度
     * @param enabled 是否开启
     * @returns 是否设置成功
     */
    setAutoBrightness(enabled: boolean): boolean;

    /**
     * 打开显示设置
     * @returns 是否成功打开
     */
    openSettings(): boolean;

    /**
     * 保持屏幕常亮
     * @param enabled 是否保持常亮
     */
    keepAwake(enabled: boolean): void;

}

declare const display: Display;

interface Util {
    /**
     * 生成 UUID
     * @returns 生成的 UUID
     */
    uuid(): string;

    /**
     * 计算 MD5
     * @param string 要计算的字符串
     * @returns MD5 哈希值
     */
    md5(string: string): string;

    /**
     * Base64 编码
     * @param string 要编码的字符串
     * @returns Base64 编码字符串
     */
    base64Encode(string: string): string;

    /**
     * Base64 解码
     * @param string 要解码的字符串
     * @returns 解码后的原始字符串
     */
    base64Decode(string: string): string;

    /**
     * 格式化日期
     * @param date 日期对象
     * @param format 格式字符串 (如 'yyyy-MM-dd')
     * @returns 格式化后的日期字符串
     */
    formatDate(date: any, format: string): string;

}

declare const util: Util;

interface Location {
    /**
     * 请求定位权限
     */
    requestAccess(): void;

    /**
     * 获取权限状态
     * @returns 权限状态
     */
    getAccessStatus(): any;

    /**
     * 检查是否已授权
     * @returns 是否已授权
     */
    isAuthorized(): boolean;

    /**
     * 获取当前位置
     * @returns 位置信息对象(包含经纬度、海拔等)
     */
    getCurrent(): any;

    /**
     * 获取当前位置(别名)
     * @returns 位置信息对象
     */
    current(): any;

    /**
     * 计算两点距离
     * @param lat1 点1纬度
     * @param lng1 点1经度
     * @param lat2 点2纬度
     * @param lng2 点2经度
     * @returns 距离(米)
     */
    distance(lat1: number, lng1: number, lat2: number, lng2: number): number;

    /**
     * 地址转坐标
     * @param address 地址字符串
     * @returns 地理位置对象数组
     */
    geocode(address: string): any;

    /**
     * 坐标转地址
     * @param lat 纬度
     * @param lng 经度
     * @param locale 语言区域标识(可选，如 'zh_CN'、'en_US'，默认使用系统语言)
     * @returns 地址信息对象数组
     */
    reverseGeocode(lat: number, lng: number, locale?: string): any;

    /**
     * 定位服务是否开启
     * @returns 是否开启
     */
    isLocationServicesEnabled(): boolean;

    /**
     * 检查是否有 TrollStore 权限
     * @returns 是否有权限
     */
    hasTrollStorePermission(): boolean;

    /**
     * 开关系统定位服务(需要 TrollStore 权限)
     * @param enabled true 开启，false 关闭
     * @returns 操作结果(success 表示是否成功，enabled 为当前状态)
     */
    setLocationServicesEnabled(enabled: boolean): any;

    /**
     * 切换定位服务状态(需要 TrollStore 权限)
     * @returns 操作结果(success 表示是否成功，enabled 为切换后状态)
     */
    toggleLocationServices(): any;

}

declare const location: Location;

interface Calendar {
    /**
     * 检查权限状态
     */
    isAuthorized(): boolean;

    /**
     * 请求日历权限
     * @returns 是否授权成功
     */
    requestAccess(): any;

    /**
     * 获取所有日历
     * @returns 日历列表数组
     */
    getCalendars(): any;

    /**
     * 获取今日事件
     * @returns 今日事件数组
     */
    getToday(): any;

    /**
     * 获取日历事件
     * @param start 开始时间戳
     * @param end 结束时间戳
     * @param calendarId 日历 ID
     * @returns 事件数组
     */
    getEvents(start: number, end: number, calendarId?: string): any;

    /**
     * 创建日历事件
     * @param title 标题
     * @param start 开始时间戳
     * @param end 结束时间戳
     * @param options 选项 { calendarId, notes, location, url, allDay }
     * @returns 创建的事件 ID
     */
    create(title: string, start: number, end: number, options?: Record<string, any>): any;

    /**
     * 删除日历事件
     * @param id 事件 ID
     * @returns 是否删除成功
     */
    delete(id: string): any;

}

declare const calendar: Calendar;

interface Reminder {
    /**
     * 检查权限状态
     * @returns 是否已授权
     */
    isAuthorized(): boolean;

    /**
     * 请求提醒事项权限
     * @returns 是否授权成功
     */
    requestAccess(): any;

    /**
     * 获取所有提醒列表
     * @returns 提醒列表数组
     */
    getLists(): any;

    /**
     * 获取所有提醒事项
     * @param listId 列表 ID
     * @returns 提醒事项数组
     */
    getAll(listId?: string): any;

    /**
     * 创建提醒事项
     * @param title 标题
     * @param options 选项 { listId, notes, dueDate, priority, sortOrder, isPinned }
     * @returns 创建的提醒 ID
     */
    create(title: string, options?: Record<string, any>): any;

    /**
     * 标记为已完成
     * @param id 提醒事项 ID
     * @returns 是否成功
     */
    complete(id: string): any;

    /**
     * 删除提醒事项
     * @param id 提醒事项 ID
     * @returns 是否成功
     */
    delete(id: string): any;

    /**
     * 获取排序后的提醒
     * @param options { sortBy: 'createdAt'|'dueDate'|'priority'|'title', ascending: boolean, completed: boolean }
     * @returns 排序后的提醒列表
     */
    getSorted(options?: Record<string, any>): any;

    /**
     * 获取即将到期的提醒
     * @param days 未来几天，默认 7 天
     * @returns 即将到期的提醒列表
     */
    getUpcoming(days?: number): any;

    /**
     * 获取已过期的提醒
     * @returns 已过期的提醒列表
     */
    getOverdue(): any;

    /**
     * 批量重排序
     * @param ids 按顺序排列的 ID 数组
     * @returns { success: boolean, count: number }
     */
    reorder(ids: any): any;

    /**
     * 创建系统提醒（支持位置触发）
     * @param title 标题
     * @param options { listId, notes, dueDate, priority, location: { latitude, longitude, radius, onArrive, name } }
     * @returns { success: boolean, id: string, title: string, isSystemReminder: true }
     */
    createSystemReminder(title: string, options?: Record<string, any>): any;

    /**
     * 获取系统提醒列表
     * @returns 系统提醒列表数组
     */
    getSystemLists(): any;

}

declare const reminder: Reminder;

interface Contacts {
    /**
     * 请求通讯录权限
     * @returns 包含授权结果的对象
     */
    requestAccess(): any;

    /**
     * 获取权限状态
     * @returns 权限状态
     */
    getAccessStatus(): any;

    /**
     * 检查是否已授权
     * @returns 是否已授权
     */
    isAuthorized(): boolean;

    /**
     * 获取所有联系人
     * @param offset 跳过的记录数，默认 0
     * @param limit 返回的最大数量，默认全部
     * @returns 联系人对象数组
     */
    getAll(offset?: number, limit?: number): any;

    /**
     * 获取联系人总数
     * @returns 联系人总数
     */
    getCount(): number;

    /**
     * 按名字搜索联系人
     * @param query 搜索关键词（匹配姓名）
     * @returns 联系人对象数组
     */
    search(query: string): any;

    /**
     * 按电话搜索联系人
     * @param phone 电话号码（支持模糊匹配）
     * @returns 联系人对象数组
     */
    searchByPhone(phone: string): any;

    /**
     * 按邮箱搜索联系人
     * @param email 邮箱地址（支持模糊匹配）
     * @returns 联系人对象数组
     */
    searchByEmail(email: string): any;

    /**
     * 根据 ID 获取联系人
     * @param id 联系人唯一标识符
     * @returns 联系人对象
     */
    getById(id: string): any;

    /**
     * 创建联系人
     * @param data 联系人数据 { givenName, familyName, phoneNumbers?, emailAddresses?, ... }
     * @returns 包含成功状态和 ID 的对象
     */
    create(data: Record<string, any>): any;

    /**
     * 更新联系人
     * @param id 联系人唯一标识符
     * @param data 要更新的字段
     * @returns 包含成功状态的对象
     */
    update(id: string, data: Record<string, any>): any;

    /**
     * 删除联系人
     * @param id 联系人唯一标识符
     * @returns 包含成功状态的对象
     */
    delete(id: string): any;

    /**
     * 获取所有分组
     * @returns 分组数组
     */
    getGroups(): any;

    /**
     * 获取分组内联系人
     * @param groupId 分组唯一标识符
     * @returns 联系人对象数组
     */
    getContactsInGroup(groupId: string): any;

}

declare const contacts: Contacts;

interface Notification {
    /**
     * 发送通知
     * @param title 通知标题
     * @param body 通知内容
     * @param options 选项 { url, userInfo, sound, badge }
     * @returns 发送的通知 ID
     */
    send(title: string, body: string, options?: Record<string, any>): any;

    /**
     * 取消通知
     * @param id 通知 ID
     */
    cancel(id: string): void;

    /**
     * 取消所有通知
     */
    cancelAll(): void;

    /**
     * 获取待发送通知
     * @returns 待发送通知列表
     */
    getPending(): any;

    /**
     * 获取已发送通知
     * @returns 已发送通知列表
     */
    getDelivered(): any;

    /**
     * 请求通知权限
     * @returns 授权结果对象
     */
    requestAccess(): any;

    /**
     * 获取权限状态
     * @returns 权限状态字符串
     */
    getAccessStatus(): any;

    /**
     * 检查是否已授权通知权限
     * @returns 是否已授权
     */
    isAuthorized(): boolean;

    /**
     * 设置角标数字
     * @param count 角标数
     * @returns 是否成功
     */
    setBadge(count: number): boolean;

    /**
     * 清除角标
     * @returns 是否成功
     */
    clearBadge(): boolean;

    /**
     * 定时通知
     * @param title 通知标题
     * @param body 通知内容
     * @param date 触发时间戳
     * @param options 选项 { url, userInfo, sound, badge, repeat: 'daily'|'weekly'|'monthly' }
     * @returns 发送的通知 ID
     */
    schedule(title: string, body: string, date: number, options?: Record<string, any>): any;

}

declare const notification: Notification;

interface Sms {
    /**
     * 检查短信权限
     * @returns 是否有权限
     */
    checkAccess(): boolean;

    /**
     * 尝试直接访问短信数据库(调试用)
     * @returns 是否访问成功
     */
    tryAccess(): boolean;

    /**
     * 读取最近的短信
     * @param limit 限制条数 (默认 10)
     * @returns 短信对象数组
     */
    read(limit?: number): any;

    /**
     * 获取验证码
     * @param minutes 查找最近几分钟内的验证码 (默认 5)
     * @returns 验证码或 null
     */
    getVerificationCode(minutes?: number): any;

    /**
     * 搜索短信
     * @param keyword 关键词
     * @returns 短信对象数组
     */
    search(keyword: string): any;

    /**
     * 按号码获取短信
     * @param address 发送者号码
     * @returns 短信对象数组
     */
    getByAddress(address: string): any;

    /**
     * 获取会话列表
     * @returns 会话列表数组
     */
    getChats(): any;

    /**
     * 获取短信统计
     * @returns 统计信息对象
     */
    getStatistics(): any;

    /**
     * 获取最新短信
     * @returns 最新短信对象或 null
     */
    getLatest(): any;

    /**
     * 获取未读短信
     * @returns 未读短信对象数组
     */
    getUnread(): any;

}

declare const sms: Sms;

interface Sql {
    /**
     * 执行 SELECT 查询并返回结果
     * @param dbPath 数据库路径
     * @param sql SQL 语句
     * @param params 参数列表
     * @returns 查询结果数组
     */
    query(dbPath: string, sql: string, params?: any[]): any[];

    /**
     * 执行 INSERT/UPDATE/DELETE
     * @param dbPath 数据库路径
     * @param sql SQL 语句
     * @param params 参数列表
     * @returns 执行结果对象
     */
    execute(dbPath: string, sql: string, params?: any[]): any;

    /**
     * 列出数据库中的所有表
     * @param dbPath 数据库路径
     * @returns 表名数组
     */
    tables(dbPath: string): any;

    /**
     * 获取表结构
     * @param dbPath 数据库路径
     * @param tableName 表名
     * @returns 表结构 SQL
     */
    schema(dbPath: string, tableName: string): string;

}

declare const sql: Sql;

interface Shortcuts {
    /**
     * 运行快捷指令
     * @param name 快捷指令名称
     * @param input 输入文本（可选）
     * @returns 是否成功打开快捷指令
     */
    run(name: string, input?: string): boolean;

    /**
     * 运行快捷指令（带 x-callback-url 回调）
     * @param name 快捷指令名称
     * @param input 输入文本（可选）
     * @returns 是否成功打开快捷指令
     */
    runWithCallback(name: string, input?: string): boolean;

    /**
     * 打开快捷指令 App
     * @returns 是否成功打开
     */
    open(): boolean;

    /**
     * 打开快捷指令中心/库
     * @returns 是否成功打开
     */
    openGallery(): boolean;

    /**
     * 创建新快捷指令
     * @param name 快捷指令名称
     * @returns 是否成功打开创建界面
     */
    create(name: string): boolean;

    /**
     * 通过链接导入快捷指令
     * @param url 快捷指令 URL
     * @returns 是否成功打开导入界面
     */
    import(url: string): boolean;

    /**
     * 检查是否安装快捷指令 App
     * @returns 是否可用
     */
    isAvailable(): boolean;

    /**
     * 捐赠 Siri 建议
     * @param title 建议标题/调用短语
     * @param identifier 交互标识符
     * @returns 是否成功捐赠
     */
    donateInteraction(title: string, identifier: string): boolean;

    /**
     * 删除指定的 Siri 建议
     * @param identifier 交互标识符
     * @returns 是否成功删除
     */
    deleteInteraction(identifier: string): boolean;

    /**
     * 删除所有 Siri 建议
     * @returns 是否成功删除
     */
    deleteAllInteractions(): boolean;

}

declare const shortcuts: Shortcuts;

interface System {
    /**
     * 检查 WiFi 是否开启
     * @returns WiFi 是否开启
     */
    isWiFiEnabled(): boolean;

    /**
     * 设置 WiFi 开关 (TrollStore 权限)
     * @param enabled 是否开启 WiFi
     * @returns 是否设置成功
     */
    setWiFi(enabled: boolean): boolean;

    /**
     * 检查蓝牙是否开启
     * @returns 蓝牙是否开启
     */
    isBluetoothEnabled(): boolean;

    /**
     * 设置蓝牙开关 (TrollStore 权限)
     * @param enabled 是否开启蓝牙
     * @returns 是否设置成功
     */
    setBluetooth(enabled: boolean): boolean;

    /**
     * 检查飞行模式是否开启
     * @returns 飞行模式是否开启
     */
    isAirplaneModeEnabled(): boolean;

    /**
     * 设置飞行模式 (TrollStore 权限)
     * @param enabled 是否开启飞行模式
     * @returns 是否设置成功
     */
    setAirplaneMode(enabled: boolean): boolean;

    /**
     * 检查勿扰模式是否开启
     * @returns 勿扰模式是否开启
     */
    isDoNotDisturbEnabled(): boolean;

    /**
     * 设置勿扰模式
     * @param enabled 是否开启勿扰模式
     * @returns 是否设置成功
     */
    setDoNotDisturb(enabled: boolean): boolean;

    /**
     * 获取系统音量
     * @param category 音量类别: 'System', 'Ringer', 'Media'，默认 'Media'
     * @returns 当前音量 (0.0 - 1.0)
     */
    getVolume(category?: string): number;

    /**
     * 设置系统音量
     * @param level 音量级别 (0.0 - 1.0)
     * @param category 音量类别: 'System', 'Ringer', 'Media'，默认 'Media'
     * @returns 是否设置成功
     */
    setVolume(level: number, category?: string): boolean;

    /**
     * 检查设备是否有闪光灯
     * @returns 是否有闪光灯
     */
    hasFlashlight(): boolean;

    /**
     * 检查闪光灯是否开启
     * @returns 闪光灯是否开启
     */
    isFlashlightOn(): boolean;

    /**
     * 设置闪光灯
     * @param enabled 是否开启闪光灯
     * @param level 亮度级别 (0.0 - 1.0)，默认 1.0
     * @returns 是否设置成功
     */
    setFlashlight(enabled: boolean, level?: number): boolean;

    /**
     * 检查方向锁定是否开启
     * @returns 方向锁定是否开启
     */
    isOrientationLockEnabled(): boolean;

    /**
     * 设置方向锁定
     * @param enabled 是否开启方向锁定
     * @returns 是否设置成功
     */
    setOrientationLock(enabled: boolean): boolean;

    /**
     * 检查低电量模式是否开启
     * @returns 低电量模式是否开启
     */
    isLowPowerModeEnabled(): boolean;

    /**
     * 设置低电量模式 (TrollStore 权限)
     * @param enabled 是否开启低电量模式
     * @returns 是否设置成功
     */
    setLowPowerMode(enabled: boolean): boolean;

    /**
     * 检查位置服务是否开启
     * @returns 位置服务是否开启
     */
    isLocationServicesEnabled(): boolean;

    /**
     * 设置位置服务 (TrollStore 权限)
     * @param enabled 是否开启位置服务
     * @returns 是否设置成功
     */
    setLocationServices(enabled: boolean): boolean;

    /**
     * 检查蜂窝数据是否开启
     * @returns 蜂窝数据是否开启
     */
    isCellularDataEnabled(): boolean;

    /**
     * 设置蜂窝数据 (TrollStore 权限)
     * @param enabled 是否开启蜂窝数据
     * @returns 是否设置成功
     */
    setCellularData(enabled: boolean): boolean;

    /**
     * 打开系统设置
     * @param section 设置页面: 'WIFI', 'BLUETOOTH', 'CELLULAR', 'VPN', 'GENERAL', 'DISPLAY', 'SOUND', 'NOTIFICATION', 'PRIVACY', 'BATTERY', 'STORAGE', 'WALLPAPER', 'SIRI', 'ACCESSIBILITY', 'DND', 'SCREEN_TIME', 'PASSWORDS'
     * @returns 是否成功打开
     */
    openSettings(section?: string): boolean;

}

declare const system: System;
