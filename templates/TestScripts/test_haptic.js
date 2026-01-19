function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Haptic Module ---");

    if (typeof haptic === 'undefined') {
        console.error("❌ Haptic module not found");
        return;
    }

    console.log("Testing impact...");
    haptic.impact('light');
    haptic.impact('medium');
    haptic.impact('heavy');
    assert(true, "Impact haptics triggered");

    console.log("Testing notification...");
    haptic.notification('success');
    haptic.notification('warning');
    haptic.notification('error');
    assert(true, "Notification haptics triggered");

    console.log("Testing selection...");
    haptic.selection();
    assert(true, "Selection haptic triggered");

    console.log("--- Haptic Module Test Finished ---");
}

run();
