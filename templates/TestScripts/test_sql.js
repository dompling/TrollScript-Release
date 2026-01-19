function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing SQL Module ---");

    if (typeof sql === 'undefined') {
        console.error("❌ SQL module not found");
        return;
    }

    // Use a temporary DB file
    const dbPath = file.documentsPath() + "/test.db";

    // Clean up previous run
    if (file.exists(dbPath)) {
        file.delete(dbPath);
    }

    // Create Table
    const createTableSQL = "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)";
    const createRes = sql.execute(dbPath, createTableSQL);
    console.log("Create Table Result:", JSON.stringify(createRes));

    // Insert
    const insertSQL = "INSERT INTO users (name, age) VALUES (?, ?)";
    const insertRes = sql.execute(dbPath, insertSQL, ["Alice", 30]);
    console.log("Insert Result:", JSON.stringify(insertRes));
    assert(insertRes.changes === 1, "Insert affected 1 row");

    // Query
    const selectSQL = "SELECT * FROM users";
    const selectRes = sql.query(dbPath, selectSQL);
    console.log("Query Result:", JSON.stringify(selectRes));
    assert(selectRes.length > 0 && selectRes[0].name === "Alice", "Query returned correct data");

    // Cleanup
    if (file.exists(dbPath)) {
        file.delete(dbPath);
    }

    console.log("--- SQL Module Test Finished ---");
}

run();
