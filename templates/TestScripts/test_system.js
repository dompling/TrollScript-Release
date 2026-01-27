/**
 * System Module Test Script
 * 测试系统设置控制功能 (TrollStore 权限)
 */

function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

function logResult(name, value) {
    console.log(`  ${name}: ${value}`);
}

function run() {
    console.log("=== Testing System Module ===\n");

    if (typeof system === 'undefined') {
        console.error("❌ System module not found");
        return;
    }

    // ========== WiFi 测试 ==========
    console.log("--- WiFi Control ---");
    const wifiEnabled = system.isWiFiEnabled();
    logResult("WiFi Enabled", wifiEnabled);
    assert(typeof wifiEnabled === 'boolean', "isWiFiEnabled() returns boolean");

    // 测试设置 WiFi (谨慎：会改变系统状态)
    // const wifiResult = system.setWiFi(true);
    // logResult("setWiFi(true)", wifiResult);

    // ========== 蓝牙测试 ==========
    console.log("\n--- Bluetooth Control ---");
    const btEnabled = system.isBluetoothEnabled();
    logResult("Bluetooth Enabled", btEnabled);
    assert(typeof btEnabled === 'boolean', "isBluetoothEnabled() returns boolean");

    // ========== 飞行模式测试 ==========
    console.log("\n--- Airplane Mode ---");
    const airplaneEnabled = system.isAirplaneModeEnabled();
    logResult("Airplane Mode", airplaneEnabled);
    assert(typeof airplaneEnabled === 'boolean', "isAirplaneModeEnabled() returns boolean");

    // ========== 勿扰模式测试 ==========
    console.log("\n--- Do Not Disturb ---");
    const dndEnabled = system.isDoNotDisturbEnabled();
    logResult("Do Not Disturb", dndEnabled);
    assert(typeof dndEnabled === 'boolean', "isDoNotDisturbEnabled() returns boolean");

    // ========== 音量测试 ==========
    console.log("\n--- Volume Control ---");
    const mediaVolume = system.getVolume("Media");
    logResult("Media Volume", mediaVolume);
    assert(typeof mediaVolume === 'number', "getVolume() returns number");
    assert(mediaVolume >= 0 && mediaVolume <= 1, "Volume is in range 0-1");

    const ringerVolume = system.getVolume("Ringer");
    logResult("Ringer Volume", ringerVolume);

    // 测试设置音量 (会改变系统状态)
    // const volumeResult = system.setVolume(0.5, "Media");
    // logResult("setVolume(0.5)", volumeResult);

    // ========== 闪光灯测试 ==========
    console.log("\n--- Flashlight ---");
    const hasFlash = system.hasFlashlight();
    logResult("Has Flashlight", hasFlash);
    assert(typeof hasFlash === 'boolean', "hasFlashlight() returns boolean");

    if (hasFlash) {
        const flashOn = system.isFlashlightOn();
        logResult("Flashlight On", flashOn);
        assert(typeof flashOn === 'boolean', "isFlashlightOn() returns boolean");

        // 测试开关闪光灯 (会改变系统状态)
        // console.log("Testing flashlight toggle...");
        // system.setFlashlight(true, 0.5);
        // util.sleep(1000);
        // system.setFlashlight(false);
    }

    // ========== 方向锁定测试 ==========
    console.log("\n--- Orientation Lock ---");
    const orientationLock = system.isOrientationLockEnabled();
    logResult("Orientation Lock", orientationLock);
    assert(typeof orientationLock === 'boolean', "isOrientationLockEnabled() returns boolean");

    // ========== 低电量模式测试 ==========
    console.log("\n--- Low Power Mode ---");
    const lowPower = system.isLowPowerModeEnabled();
    logResult("Low Power Mode", lowPower);
    assert(typeof lowPower === 'boolean', "isLowPowerModeEnabled() returns boolean");

    // ========== 位置服务测试 ==========
    console.log("\n--- Location Services ---");
    const locationEnabled = system.isLocationServicesEnabled();
    logResult("Location Services", locationEnabled);
    assert(typeof locationEnabled === 'boolean', "isLocationServicesEnabled() returns boolean");

    // ========== 蜂窝数据测试 ==========
    console.log("\n--- Cellular Data ---");
    const cellularEnabled = system.isCellularDataEnabled();
    logResult("Cellular Data", cellularEnabled);
    assert(typeof cellularEnabled === 'boolean', "isCellularDataEnabled() returns boolean");

    // 测试设置夜览强度 (会改变系统状态)
    // const strengthResult = system.setNightShiftStrength(0.5);
    // logResult("setNightShiftStrength(0.5)", strengthResult);

    // ========== 打开设置测试 ==========
    console.log("\n--- Open Settings (SKIPPED - needs foreground) ---");
    // 注意：openSettings 需要前台运行
    // const openResult = system.openSettings("WIFI");
    // logResult("openSettings('WIFI')", openResult);

    // ========== 汇总 ==========
    console.log("\n=== System Status Summary ===");
    console.log(`WiFi: ${wifiEnabled ? 'ON' : 'OFF'}`);
    console.log(`Bluetooth: ${btEnabled ? 'ON' : 'OFF'}`);
    console.log(`Airplane Mode: ${airplaneEnabled ? 'ON' : 'OFF'}`);
    console.log(`Do Not Disturb: ${dndEnabled ? 'ON' : 'OFF'}`);
    console.log(`Low Power Mode: ${lowPower ? 'ON' : 'OFF'}`);
    console.log(`Location Services: ${locationEnabled ? 'ON' : 'OFF'}`);
    console.log(`Cellular Data: ${cellularEnabled ? 'ON' : 'OFF'}`);
    console.log(`Orientation Lock: ${orientationLock ? 'ON' : 'OFF'}`);
    console.log(`Media Volume: ${(mediaVolume * 100).toFixed(0)}%`);

    console.log("\n=== System Module Test Finished ===");
}

run();
