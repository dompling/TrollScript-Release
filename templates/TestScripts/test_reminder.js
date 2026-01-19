
const reminder = require('reminder');

// Test getSorted
try {
    const sorted = reminder.getSorted("title", true);
    console.log("getSorted success: " + (Array.isArray(sorted) ? "yes" : "no"));
} catch (e) {
    console.log("getSorted failed: " + e.message);
}

// Test getUpcoming
try {
    const upcoming = reminder.getUpcoming(5);
    console.log("getUpcoming success: " + (Array.isArray(upcoming) ? "yes" : "no"));
} catch (e) {
    console.log("getUpcoming failed: " + e.message);
}

// Test getOverdue
try {
    const overdue = reminder.getOverdue();
    console.log("getOverdue success: " + (Array.isArray(overdue) ? "yes" : "no"));
} catch (e) {
    console.log("getOverdue failed: " + e.message);
}

// Create a reminder to test pin and reorder
var newId = null;
try {
    const res = reminder.create("Test Reminder", { notes: "Testing pin and sort" });
    if (res.success) {
        newId = res.id;
        console.log("Created reminder: " + newId);
    }
} catch (e) {
    console.log("Create failed: " + e.message);
}

if (newId) {
    // Test pin
    try {
        const pinned = reminder.pin(newId, true);
        console.log("pin success: " + (pinned ? "yes" : "no"));
    } catch (e) {
        console.log("pin failed: " + e.message);
    }

    // Test setSortOrder
    try {
        const ordered = reminder.setSortOrder(newId, 100);
        console.log("setSortOrder success: " + (ordered ? "yes" : "no"));
    } catch (e) {
        console.log("setSortOrder failed: " + e.message);
    }

    // Test reorder alias
    try {
        const reordered = reminder.reorder(newId, 200);
        console.log("reorder success: " + (reordered ? "yes" : "no"));
    } catch (e) {
        console.log("reorder failed: " + e.message);
    }

    // Clean up
    reminder.delete(newId);
}

// Test global auth methods
try {
    const authorized = reminder.isAuthorized();
    console.log("isAuthorized: " + authorized);
} catch (e) {
    console.log("isAuthorized failed: " + e.message);
}

// requestAccess logic might block or require UI, skipping in automated test or checking existence
try {
    if (typeof reminder.requestAccess === 'function') {
        console.log("requestAccess exists");
    }
} catch (e) {
    console.log("requestAccess check failed: " + e.message);
}
