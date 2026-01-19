function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Shortcuts Module ---");

    if (typeof shortcuts === 'undefined') {
        console.error("❌ Shortcuts module not found");
        return;
    }

    const available = shortcuts.isAvailable();
    console.log("Shortcuts Available:", available);

    if (available) {
        // Need a real shortcut name to test run
        /*
        try {
          const res = await shortcuts.run("Test Shortcut");
          console.log("Run Result:", res);
        } catch (e) {
          console.warn("Run failed:", e);
        }
        */

        // Just test listing or other non-invasive ops if any
        // API mostly run-based.

        // shortcuts.openApp(); // Interactive
    }

    console.log("--- Shortcuts Module Test Finished ---");
}

run();
