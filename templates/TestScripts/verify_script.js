const console = {
    log: function(...args) { __console__.log(args.join(' ')); },
    error: function(...args) { __console__.error(args.join(' ')); }
};

// Test Utils
function assert(condition, message) {
    if (!condition) {
        console.error("❌ " + message);
    } else {
        console.log("✅ " + message);
    }
}

// 1. Storage
if (typeof storage !== 'undefined') {
    console.log("\n--- Testing Storage ---");
    storage.set("test_key", "test_value");
    assert(storage.get("test_key") === "test_value", "Storage set/get");
    assert(storage.has("test_key"), "Storage has");
    storage.remove("test_key");
    assert(!storage.has("test_key"), "Storage remove");
}

// 2. File
if (typeof file !== 'undefined') {
    console.log("\n--- Testing File ---");
    var testPath = file.documentsPath() + "/test_quickjs.txt";
    file.write(testPath, "Hello QuickJS");
    assert(file.exists(testPath), "File exists");
    assert(file.read(testPath) === "Hello QuickJS", "File read/write");
    file.delete(testPath);
    assert(!file.exists(testPath), "File delete");
    
    // Test Root Helper (if available) - just check availability
    if (file.rootAvailable()) {
        console.log("Root Helper Available: Yes");
        var res = file.rootCheck("/var/mobile");
        assert(res.accessible || !res.accessible, "Root check ran");
    } else {
        console.log("Root Helper Available: No");
    }
}

// 3. Network
if (typeof network !== 'undefined') {
    console.log("\n--- Testing Network ---");
    assert(typeof network.isReachable() === 'boolean', "Network isReachable returns bool");
    assert(typeof network.getIPAddress() === 'object', "Network getIPAddress returns object");
    
    // Test HTTP
    if (typeof http !== 'undefined') {
        console.log("Testing HTTP...");
        http.get("https://www.apple.com").then(res => {
            assert(res.ok, "HTTP GET Apple.com");
        }).catch(err => {
            console.error("HTTP GET failed: " + err);
        });
    }
}

// 4. Util
if (typeof util !== 'undefined') {
    console.log("\n--- Testing Util ---");
    assert(util.uuid().length > 0, "UUID generation");
    assert(util.md5("hello") === "5d41402abc4b2a76b9719d911017c592", "MD5 hash");
}

console.log("\n--- Test Script Finished ---");
