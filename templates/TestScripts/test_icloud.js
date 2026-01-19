function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing iCloud Module ---");

    if (typeof icloud === 'undefined') {
        console.error("❌ iCloud module not found");
        return;
    }

    const available = icloud.isAvailable();
    console.log("iCloud Available:", available);

    if (available) {
        const testFile = "test_icloud.txt";
        const content = "Hello iCloud";

        icloud.write(testFile, content);

        // Slight delay for sync simulation/IO
        // await new Promise(r => setTimeout(r, 500)); 

        const read = icloud.read(testFile);
        assert(read === content, "write/read works");

        const list = icloud.list();
        console.log("iCloud List:", JSON.stringify(list));
        assert(Array.isArray(list) && list.includes(testFile), "list() contains created file");

        icloud.delete(testFile);

        // Verify deletion
        try {
            const readAfterDelete = icloud.read(testFile);
            assert(!readAfterDelete, "File should be deleted");
        } catch (e) {
            assert(true, "Read after delete threw error or returned null");
        }
    } else {
        console.warn("⚠️ iCloud not available, skipping R/W tests");
    }

    console.log("--- iCloud Module Test Finished ---");
}

run();
