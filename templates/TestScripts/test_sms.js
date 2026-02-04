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

    const msgs = sms.read(5);
    console.log("Recent SMS:", JSON.stringify(msgs));
    assert(Array.isArray(msgs), "read() returns array");

    const stats = sms.getStatistics();
    console.log("SMS Stats:", JSON.stringify(stats));
    console.log("--- SMS Module Test Finished ---");
}

run();
