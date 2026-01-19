function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Contacts Module ---");

    if (typeof contacts === 'undefined') {
        console.error("❌ Contacts module not found");
        return;
    }

    const accessRes = contacts.requestAccess();
    console.log("Contacts Access:", JSON.stringify(accessRes));

    if (accessRes.granted) {
        const count = contacts.getCount();
        console.log("Contacts Count:", count);
        assert(typeof count === 'number', "getCount() returns number");

        const name = "Test Contact " + Date.now();
        const createRes = contacts.create({
            givenName: name,
            phoneNumbers: [{ label: "home", value: "1234567890" }]
        });
        console.log("Create Result:", JSON.stringify(createRes));
        assert(createRes.success && createRes.id, "create() success");

        const searchRes = contacts.search(name);
        assert(searchRes.length > 0 && searchRes[0].givenName === name, "search() found contact");

        const deleteRes = contacts.delete(createRes.id);
        assert(deleteRes.success, "delete() success");
    }

    console.log("--- Contacts Module Test Finished ---");
}

run();
