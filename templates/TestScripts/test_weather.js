function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Weather Module ---");

    if (typeof weather === 'undefined') {
        console.error("❌ Weather module not found");
        return;
    }

    // Note: Weather might need location permission or valid city
    try {
        const current = await weather.current("San Francisco");
        console.log("Current Weather (SF):", JSON.stringify(current));
        assert(current && typeof current.temp === 'number', "Current weather returned");
    } catch (e) {
        console.warn("Weather fetch failed:", e);
    }

    console.log("--- Weather Module Test Finished ---");
}

run();
