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
}

run();
