function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Alarm Module ---");

    if (typeof alarm === 'undefined') {
        console.error("❌ Alarm module not found");
        return;
    }

    const access = await alarm.requestAccess();
    console.log("Alarm Access:", access);

    if (access) {
        const ts = Date.now() / 1000 + 60; // 1 minute later
        const id = await alarm.createOnce(ts, "Test Once Alarm");
        console.log("Created Once Alarm ID:", id);
        assert(id && id.length > 0, "createOnce returned ID");

        const dailyId = await alarm.createDaily(8, 0, "Wake Up");
        console.log("Created Daily Alarm ID:", dailyId);

        const pending = await alarm.getPending();
        console.log("Pending Alarms:", JSON.stringify(pending));
        assert(pending.length >= 2, "Pending alarms found");

        alarm.cancel(id);
        alarm.cancel(dailyId);

        const pendingAfter = await alarm.getPending();
        assert(pendingAfter.length < pending.length, "Alarms cancelled");
    }

    console.log("--- Alarm Module Test Finished ---");
}

run();
