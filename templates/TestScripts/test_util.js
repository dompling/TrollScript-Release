function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Util Module ---");

    if (typeof util === 'undefined') {
        console.error("❌ Util module not found");
        return;
    }

    const uuid = util.uuid();
    console.log("UUID:", uuid);
    assert(uuid && uuid.length > 0, "uuid() returns string");

    const md5Input = "hello";
    const md5Expected = "5d41402abc4b2a76b9719d911017c592";
    const md5Result = util.md5(md5Input);
    console.log(`MD5('${md5Input}'):`, md5Result);
    assert(md5Result === md5Expected, "md5() calculation is correct");

    const base64Input = "Hello World";
    const base64Encoded = util.base64Encode(base64Input);
    console.log(`Base64 Encode('${base64Input}'):`, base64Encoded);
    const base64Decoded = util.base64Decode(base64Encoded);
    console.log(`Base64 Decode('${base64Encoded}'):`, base64Decoded);
    assert(base64Decoded === base64Input, "base64Encode/Decode works");

    const date = new Date();
    const formatted = util.formatDate(date, "yyyy-MM-dd");
    console.log("Formatted Date:", formatted);
    assert(formatted.length === 10, "formatDate returns correctly formatted string");

    console.log("--- Util Module Test Finished ---");
}

run();
