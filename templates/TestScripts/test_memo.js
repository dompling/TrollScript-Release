function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Memo Module ---");

    if (typeof memo === 'undefined') {
        console.error("❌ Memo module not found");
        return;
    }

    const title = "Test Memo " + Date.now();
    const content = "This is a test memo content";
    const tags = ["test", "script"];

    const createRes = memo.create(title, content, tags);
    console.log("Create Result:", JSON.stringify(createRes));
    assert(createRes.success && createRes.id, "create() success");

    const id = createRes.id;
    const fetched = memo.getById(id);
    console.log("Fetched Memo:", JSON.stringify(fetched));
    assert(fetched && fetched.title === title, "getById() returns correct memo");

    const all = memo.getAll();
    assert(Array.isArray(all) && all.length > 0, "getAll() returns array");

    const searchRes = memo.search("Test Memo");
    assert(searchRes.length > 0, "search() finds memo");

    const updateRes = memo.update(id, { content: "Updated content" });
    assert(updateRes.success, "update() success");

    const updatedFetched = memo.getById(id);
    assert(updatedFetched.content === "Updated content", "Content updated");

    const deleteRes = memo.delete(id);
    assert(deleteRes.success, "delete() success");

    assert(!memo.getById(id), "Memo should be gone");

    console.log("--- Memo Module Test Finished ---");
}

run();
