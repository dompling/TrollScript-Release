function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing SMS Module ---");

    if (typeof sms === 'undefined') {
        console.error("❌ SMS module not found");
        return;
    }

    // Note: SMS reading often requires root/special entitlements/TrollStore
    const access = sms.checkAccess();
    console.log("SMS Access:", access);

    if (access || sms.tryAccess()) {
        const msgs = sms.read(5);
        console.log("Recent SMS:", JSON.stringify(msgs));
        assert(Array.isArray(msgs), "read() returns array");

        const stats = sms.getStatistics();
        console.log("SMS Stats:", JSON.stringify(stats));
    } else {
        console.warn("SMS Access unavailable");
    }

    console.log("--- SMS Module Test Finished ---");
}

run();
