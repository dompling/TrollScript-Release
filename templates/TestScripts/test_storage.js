function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Storage Module ---");

    if (typeof storage === 'undefined') {
        console.error("❌ Storage module not found");
        return;
    }

    const key = "test_key_" + Date.now();
    const value = "test_value_" + Date.now();

    assert(!storage.has(key), "New key should not exist");

    storage.set(key, value);
    assert(storage.has(key), "Key should exist after set");
    assert(storage.get(key) === value, "Value should match set value");

    storage.remove(key);
    assert(!storage.has(key), "Key should not exist after remove");

    console.log("--- Storage Module Test Finished ---");
}

run();
