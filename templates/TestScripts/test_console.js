function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Console Module ---");

    console.log("Testing log...");
    console.log("This is a log message");

    console.error("Testing error...");
    console.error("This is an error message");

    console.warn("Testing warn...");
    console.warn("This is a warning message");

    console.info("Testing info...");
    console.info("This is an info message");

    console.debug("Testing debug...");
    console.debug("This is a debug message");

    console.log("Testing table...");
    console.table([{ id: 1, name: "Item 1" }, { id: 2, name: "Item 2" }]);

    // console.clear() // Uncomment to test clear, but it might wipe output

    console.log("--- Console Module Test Finished ---");
}

run();
