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

    console.log("--- App Module Test Finished ---");
}

run();
