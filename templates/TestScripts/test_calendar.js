function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Calendar Module ---");

    if (typeof calendar === 'undefined') {
        console.error("❌ Calendar module not found");
        return;
    }

    const access = await calendar.requestAccess();
    console.log("Calendar Access:", access);

    if (access) {
        const now = Date.now() / 1000;
        const end = now + 3600;
        const title = "Test Event " + now;

        const id = await calendar.create(title, now, end);
        console.log("Created Event ID:", id);
        assert(id && id.length > 0, "create() returned ID");

        const today = await calendar.getToday();
        console.log("Today Events:", today.length);
        assert(today.some(e => e.id === id), "Event found in today");

        await calendar.delete(id);

        const todayAfter = await calendar.getToday();
        assert(!todayAfter.some(e => e.id === id), "Event deleted");
    }

    console.log("--- Calendar Module Test Finished ---");
}

run();
