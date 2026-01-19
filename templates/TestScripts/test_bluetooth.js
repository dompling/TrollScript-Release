function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Bluetooth Module ---");

    if (typeof bluetooth === 'undefined') {
        console.error("❌ Bluetooth module not found");
        return;
    }

    const status = bluetooth.getStatus();
    console.log("Bluetooth Status:", status);

    const enabled = bluetooth.isEnabled();
    console.log("Bluetooth Enabled:", enabled);

    // bluetooth.startScan();
    // setTimeout(() => bluetooth.stopScan(), 5000);

    console.log("--- Bluetooth Module Test Finished ---");
}

run();
