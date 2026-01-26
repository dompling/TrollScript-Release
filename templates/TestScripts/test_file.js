function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing File Module ---");

    if (typeof file === 'undefined') {
        console.error("❌ File module not found");
        return;
    }

    const docsPath = file.documentsPath();
    console.log("Documents Path:", docsPath);
    assert(docsPath && docsPath.length > 0, "documentsPath() returns string");

    const testFilePath = docsPath + "/test_file_module.txt";
    const content = "Hello File Module";

    if (file.exists(testFilePath)) {
        file.delete(testFilePath);
    }

    file.write(testFilePath, content);
    assert(file.exists(testFilePath), "write() creates file");

    const readContent = file.read(testFilePath);
    assert(readContent === content, "read() returns correct content");

    const appendContent = " Appended";
    file.append(testFilePath, appendContent);
    const appendedRead = file.read(testFilePath);
    assert(appendedRead === content + appendContent, "append() works");

    const stat = file.stat(testFilePath);
    console.log("File Stat:", JSON.stringify(stat));
    assert(stat && stat.size > 0, "stat() returns valid info");

    file.delete(testFilePath);
    assert(!file.exists(testFilePath), "delete() removes file");

    // Root Helper Check
    const rootAvailable = file.rootAvailable();
    console.log("Root Available:", rootAvailable);

    console.log("--- File Module Test Finished ---");

    // ========================================
    // 沙盒外访问测试 (需要 Root 权限)
    // ========================================
    console.log("\n--- Testing Outside Sandbox Access ---");

    if (!rootAvailable) {
        console.warn("⚠️ Root helper not available, skipping sandbox-external tests");
        console.log("--- Outside Sandbox Test Skipped ---");
        return;
    }

    // 系统数据库路径
    const systemPaths = {
        sms: "/var/mobile/Library/SMS/sms.db",
        smsWal: "/var/mobile/Library/SMS/sms.db-wal",
        addressBook: "/var/mobile/Library/AddressBook/AddressBook.sqlitedb",
        calendar: "/var/mobile/Library/Calendar/Calendar.sqlitedb",
        notes: "/var/mobile/Library/Notes/notes.sqlite",
        safari: "/var/mobile/Library/Safari/History.db",
        preferences: "/var/mobile/Library/Preferences"
    };

    // 测试 SMS 数据库访问
    console.log("\n📱 Testing SMS Database Access:");
    const smsExists = file.rootExists(systemPaths.sms);
    console.log("  SMS DB Path:", systemPaths.sms);
    assert(smsExists, "SMS database exists at system path");

    if (smsExists) {
        const smsStat = file.stat(systemPaths.sms);
        console.log("  SMS DB Size:", smsStat ? `${(smsStat.size / 1024).toFixed(2)} KB` : "Unknown");
        console.log("  SMS DB Modified:", smsStat ? new Date(smsStat.modificationDate).toLocaleString() : "Unknown");
        assert(smsStat && smsStat.size > 0, "SMS database has valid size");
    }

    // 测试通讯录数据库访问
    console.log("\n📇 Testing AddressBook Database Access:");
    const abExists = file.rootExists(systemPaths.addressBook);
    console.log("  AddressBook Path:", systemPaths.addressBook);
    assert(abExists, "AddressBook database exists");

    // 测试日历数据库访问
    console.log("\n📅 Testing Calendar Database Access:");
    const calExists = file.rootExists(systemPaths.calendar);
    console.log("  Calendar Path:", systemPaths.calendar);
    assert(calExists, "Calendar database exists");

    // 测试备忘录数据库访问
    console.log("\n📝 Testing Notes Database Access:");
    const notesExists = file.rootExists(systemPaths.notes);
    console.log("  Notes Path:", systemPaths.notes);
    // Notes 可能不存在，取决于用户是否使用过备忘录
    if (notesExists) {
        console.log("  ✅ Notes database found");
    } else {
        console.log("  ⚠️ Notes database not found (user may not have notes)");
    }

    // 测试系统偏好设置目录
    console.log("\n⚙️ Testing System Preferences Access:");
    const prefsExists = file.rootExists(systemPaths.preferences);
    assert(prefsExists, "Preferences directory exists");

    if (prefsExists) {
        const prefsList = file.rootList(systemPaths.preferences);
        console.log("  Preferences files count:", prefsList ? prefsList.length : 0);
        if (prefsList && prefsList.length > 0) {
            console.log("  Sample files:", prefsList.slice(0, 5).join(", "));
        }
    }

    // 测试目录列表功能 (SMS 目录)
    console.log("\n📂 Testing SMS Directory Listing:");
    const smsDir = "/var/mobile/Library/SMS";
    const smsDirExists = file.rootExists(smsDir);
    if (smsDirExists) {
        const smsDirList = file.rootList(smsDir);
        console.log("  SMS directory contents:", smsDirList ? smsDirList.length : 0, "items");
        if (smsDirList) {
            smsDirList.forEach(item => console.log("    -", item));
        }
    }

    console.log("\n--- Outside Sandbox Test Finished ---");
}

run();
