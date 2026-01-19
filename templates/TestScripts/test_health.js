
const health = require('health');

// Test getTodaySummary
try {
    const summary = health.getTodaySummary();
    console.log("getTodaySummary success: " + (summary && summary.success ? "yes" : "no"));
    if (summary) {
        console.log("Summary: " + JSON.stringify(summary));
    }
} catch (e) {
    console.log("getTodaySummary failed: " + e.message);
}
