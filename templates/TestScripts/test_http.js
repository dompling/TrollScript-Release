function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing HTTP Module ---");

    if (typeof http === 'undefined') {
        console.error("❌ HTTP module not found");
        return;
    }

    console.log("Testing GET...");
    try {
        const res = await http.get("https://httpbin.org/get");
        console.log("GET Status:", res.status);
        assert(res.status === 200, "GET returns 200");
        const data = JSON.parse(res.data);
        assert(data.url.includes("httpbin.org/get"), "Response data valid");
    } catch (e) {
        console.error("GET Error:", e);
        assert(false, "GET request failed");
    }

    console.log("Testing POST...");
    try {
        const body = { test: "data" };
        const res = await http.post("https://httpbin.org/post", {
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" }
        });
        console.log("POST Status:", res.status);
        assert(res.status === 200, "POST returns 200");
        const data = JSON.parse(res.data);
        assert(data.json.test === "data", "POST data reflected");
    } catch (e) {
        console.error("POST Error:", e);
        assert(false, "POST request failed");
    }

    console.log("--- HTTP Module Test Finished ---");
}

run();
