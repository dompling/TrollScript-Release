
const mail = require('mail');

// Test getInstalledMailApps
try {
    const apps = mail.getInstalledMailApps();
    console.log("getInstalledMailApps success: " + (Array.isArray(apps) ? "yes" : "no"));
    console.log("Installed apps: " + JSON.stringify(apps));
} catch (e) {
    console.log("getInstalledMailApps failed: " + e.message);
}
