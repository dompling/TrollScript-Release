function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Webview Module ---");

    if (typeof webview === 'undefined') {
        console.error("❌ Webview module not found");
        return;
    }

    /*
    console.log("Opening Webview...");
    // Note: This blocks or opens a UI, might not be suitable for headless test without interaction
    await webview.open("https://www.google.com");
    
    const title = await webview.getTitle();
    console.log("Page Title:", title);
    
    await webview.close();
    */

    console.log("Webview test skipped (interactive)");

    console.log("--- Webview Module Test Finished ---");
}

run();
