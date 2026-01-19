function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Clipboard Module ---");

    if (typeof clipboard === 'undefined') {
        console.error("❌ Clipboard module not found");
        return;
    }

    const testText = "Hello QuickJS Clipboard " + Date.now();
    console.log("Setting text:", testText);

    clipboard.setText(testText);
    const readText = clipboard.getText();
    console.log("Read text:", readText);

    assert(readText === testText, "setText and getText work matches");

    clipboard.clear();
    const clearedText = clipboard.getText();
    assert(!clearedText || clearedText === "", "clear() regex works");

    console.log("--- Clipboard Module Test Finished ---");
}

run();
