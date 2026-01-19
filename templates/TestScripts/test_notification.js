function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Notification Module ---");

    if (typeof notification === 'undefined') {
        console.error("❌ Notification module not found");
        return;
    }

    // Request permission first
    const granted = await notification.requestPermission();
    console.log("Notification Permission:", granted);

    if (granted) {
        console.log("Sending Notification...");
        const id = await notification.send("Test Notification", "This is a test notification body");
        console.log("Notification ID:", id);
        assert(id && id.length > 0, "notification.send returned ID");

        const pending = await notification.getPending();
        console.log("Pending Notifications:", JSON.stringify(pending));
        // Note: Immediate notifications might move to delivered quickly, or stay pending if scheduled? 
        // Actually `send` is usually immediate.

        const delivered = await notification.getDelivered();
        console.log("Delivered Notifications:", JSON.stringify(delivered));

        // Schedule one
        const date = Date.now() / 1000 + 10; // 10 seconds later
        const scheduledId = await notification.schedule("Scheduled Test", "In 10 seconds", date);
        console.log("Scheduled ID:", scheduledId);

        const newPending = await notification.getPending();
        assert(newPending.some(n => n.id === scheduledId), "Scheduled notification is pending");

        notification.cancel(scheduledId);
        const pendingAfterCancel = await notification.getPending();
        assert(!pendingAfterCancel.some(n => n.id === scheduledId), "Scheduled notification cancelled");
    } else {
        console.warn("Permission denied, skipping send tests");
    }

    console.log("--- Notification Module Test Finished ---");
}

run();
