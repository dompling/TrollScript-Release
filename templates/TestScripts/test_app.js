function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing App Module ---");

    if (typeof app === 'undefined') {
        console.error("❌ App module not found");
        return;
    }

    // 基础功能测试
    const ver = app.version();
    console.log("App Version:", ver);
    assert(ver && ver.length > 0, "version() returns string");

    console.log("Testing vibrate...");
    app.vibrate();
    assert(true, "Vibrate command sent");

    const canOpen = app.canOpen("https://www.apple.com");
    console.log("Can Open Apple.com:", canOpen);
    assert(canOpen, "canOpen() works for http");

    /*
    console.log("Testing open...");
    await app.open("https://www.google.com");
    */

    const logs = app.getLogs(5);
    console.log("Logs (first 5):", JSON.stringify(logs));
    assert(Array.isArray(logs), "getLogs() returns array");

    // ========== TrollStore 私有 API 测试 ==========
    console.log("\n--- Testing TrollStore Private APIs ---");

    // 测试 list() - 获取已安装应用列表
    console.log("\nTesting app.list()...");
    const allApps = app.list();
    console.log("Installed apps count:", allApps.length);
    assert(Array.isArray(allApps), "list() returns array");
    if (allApps.length > 0) {
        console.log("First app:", JSON.stringify(allApps[0]));
        assert(allApps[0].bundleIdentifier, "App has bundleIdentifier");
        assert(allApps[0].name, "App has name");
    }

    // 测试 isInstalled() - 检查应用是否安装
    console.log("\nTesting app.isInstalled()...");
    const settingsInstalled = app.isInstalled("com.apple.Preferences");
    console.log("Settings app installed:", settingsInstalled);
    assert(settingsInstalled === true, "isInstalled() returns true for Settings");

    const fakeAppInstalled = app.isInstalled("com.fake.notexist.app");
    console.log("Fake app installed:", fakeAppInstalled);
    assert(fakeAppInstalled === false, "isInstalled() returns false for non-existent app");

    // 测试 getAppInfo() - 获取应用详情
    console.log("\nTesting app.getAppInfo()...");
    const settingsInfo = app.getAppInfo("com.apple.Preferences");
    if (settingsInfo) {
        console.log("Settings app info:", JSON.stringify(settingsInfo));
        assert(settingsInfo.bundleIdentifier === "com.apple.Preferences", "getAppInfo() returns correct bundleId");
        assert(settingsInfo.name, "getAppInfo() returns name");
        assert(settingsInfo.bundlePath, "getAppInfo() returns bundlePath");
    } else {
        console.log("⚠️ Could not get Settings app info (may need TrollStore permissions)");
    }

    // 测试 getDataContainer() - 获取数据容器路径
    console.log("\nTesting app.getDataContainer()...");
    // 使用动态获取的 bundleId
    const selfBundleId = app.bundleId();
    console.log("Current app bundleId:", selfBundleId);

    const dataContainer = app.getDataContainer(selfBundleId);
    if (dataContainer) {
        console.log("Data container path:", dataContainer);
        assert(dataContainer.includes("/var/"), "getDataContainer() returns valid path");
    } else {
        console.log("⚠️ Could not get data container for self, trying Settings app...");
        // 尝试获取 Settings 的数据容器作为备选测试
        const settingsContainer = app.getDataContainer("com.apple.Preferences");
        if (settingsContainer) {
            console.log("Settings container path:", settingsContainer);
            assert(settingsContainer.includes("/var/"), "getDataContainer() returns valid path for Settings");
        } else {
            console.log("⚠️ Could not get data container (may need TrollStore permissions or app has no data container)");
        }
    }

    // 测试 terminate() - 终止应用 (谨慎测试)
    console.log("\nTesting app.terminate() - SKIPPED (dangerous)");
    // const terminated = app.terminate("com.some.app");
    // console.log("Terminate result:", terminated);

    // 测试 launch() - 启动应用 (需要前台)
    console.log("Testing app.launch() - SKIPPED (needs foreground)");
    // const launched = app.launch("com.apple.Preferences");
    // console.log("Launch result:", launched);

    console.log("\n--- App Module Test Finished ---");
}

run();
