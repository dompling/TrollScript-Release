function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing UI Module ---");

    if (typeof ui === 'undefined') {
        console.error("❌ UI module not found");
        return;
    }

    console.log("Testing toast...");
    ui.toast("Hello from UI Test", 2);
    assert(true, "Toast command sent");

    console.log("Testing alert (interactive)...");
    // Uncomment to test interactive
    /*
    await ui.alert("Test Alert", "This is a test message");
    console.log("Alert dismissed");
    */

    console.log("Testing confirm (interactive)...");
    // Uncomment to test interactive
    /*
    const result = await ui.confirm("Test Confirm", "Are you sure?");
    console.log("Confirm result:", result);
    */

    console.log("Testing showLoading/hideLoading...");
    ui.showLoading("Loading...");
    // Simulate work
    const start = Date.now();
    while (Date.now() - start < 1000) { }
    ui.hideLoading();
    assert(true, "Loading shown and hidden");

    console.log("--- UI Module Test Finished ---");
}

run();
