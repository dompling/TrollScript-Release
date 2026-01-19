function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Location Module ---");

    if (typeof location === 'undefined') {
        console.error("❌ Location module not found");
        return;
    }

    location.requestAccess();
    const auth = location.isAuthorized();
    console.log("Location Authorized:", auth);

    if (auth) {
        try {
            const loc = await location.getCurrent();
            console.log("Current Location:", JSON.stringify(loc));
            assert(loc && typeof loc.lat === 'number', "getCurrent() returns valid location");

            const dist = location.distance(0, 0, 1, 1);
            assert(typeof dist === 'number' && dist > 0, "distance() calc works");
        } catch (e) {
            console.warn("Location fetch failed:", e);
        }
    }

    console.log("--- Location Module Test Finished ---");
}

run();
