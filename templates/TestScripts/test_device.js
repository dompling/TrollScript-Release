function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Device Module ---");

    if (typeof device === 'undefined') {
        console.error("❌ Device module not found");
        return;
    }

    const info = device.info();
    console.log("Device Info:", JSON.stringify(info));
    assert(info && info.name && info.systemName, "device.info() returns valid object");

    const battery = device.battery();
    console.log("Battery Info:", JSON.stringify(battery));
    assert(battery && typeof battery.level === 'number', "device.battery() returns valid object");

    const screen = device.screen();
    console.log("Screen Info:", JSON.stringify(screen));
    assert(screen && typeof screen.width === 'number', "device.screen() returns valid object");

    console.log("--- Device Module Test Finished ---");
}

run();
