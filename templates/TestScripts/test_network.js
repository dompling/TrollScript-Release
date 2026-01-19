function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Network Module ---");

    if (typeof network === 'undefined') {
        console.error("❌ Network module not found");
        return;
    }

    assert(typeof network.isReachable() === 'boolean', "isReachable returns boolean");
    console.log("Is Reachable:", network.isReachable());

    const ip = network.getIPAddress();
    console.log("IP Address:", ip);
    // IP might be null if no connection, but usually not

    const type = network.getConnectionType();
    console.log("Connection Type:", type);
    assert(['wifi', 'cellular', 'none'].includes(type), "getConnectionType returns valid type");

    // Ping test
    /*
    try {
        const pingRes = await network.ping("8.8.8.8");
        console.log("Ping Result:", JSON.stringify(pingRes));
        assert(pingRes.success, "Ping success");
    } catch(e) {
        console.warn("Ping failed (might be network issue):", e);
    }
    */

    console.log("--- Network Module Test Finished ---");
}

run();
