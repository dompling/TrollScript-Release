function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Display Module ---");

    if (typeof display === 'undefined') {
        console.error("❌ Display module not found");
        return;
    }

    const brightness = display.getBrightness();
    console.log("Current Brightness:", brightness);
    assert(typeof brightness === 'number', "getBrightness returns number");

    const screenInfo = display.getScreenInfo();
    console.log("Screen Info:", JSON.stringify(screenInfo));
    assert(screenInfo && screenInfo.width > 0, "getScreenInfo returns valid info");

    // Test setters (careful with these as they change device state)
    // display.setBrightness(0.5);

    const orientation = display.getOrientation();
    console.log("Orientation:", orientation);
    assert(orientation === 'portrait' || orientation === 'landscape', "getOrientation returns valid string");

    console.log("--- Display Module Test Finished ---");
}

run();
