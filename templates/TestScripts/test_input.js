function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Input Module ---");

    // 1. 模块存在性检查
    if (typeof input === 'undefined') {
        console.error("❌ Input module not found");
        return;
    }
    assert(true, "input module exists");

    // 2. isAvailable
    const available = input.isAvailable();
    console.log("HID Available:", available);
    assert(typeof available === 'boolean', "isAvailable() returns boolean");

    if (!available) {
        console.warn("⚠️ HID input not available on this device, skipping touch/key tests");
        console.log("--- Input Module Test Finished (partial) ---");
        return;
    }
    assert(available, "HID input is available");

    // 3. getScreenSize
    const screen = input.getScreenSize();
    console.log("Screen:", JSON.stringify(screen));
    assert(screen && screen.width > 0, "getScreenSize() has valid width: " + screen.width);
    assert(screen && screen.height > 0, "getScreenSize() has valid height: " + screen.height);
    assert(screen && screen.scale > 0, "getScreenSize() has valid scale: " + screen.scale);

    // 4. tap - 点击屏幕中心
    const cx = screen.width / 2;
    const cy = screen.height / 2;

    console.log(`Tapping center (${cx}, ${cy})...`);
    const tapResult = input.tap(cx, cy);
    assert(tapResult === true, "tap() returns true");

    util.sleep(500);

    // 5. doubleTap
    console.log("Double tapping...");
    const dtResult = input.doubleTap(cx, cy);
    assert(dtResult === true, "doubleTap() returns true");

    util.sleep(500);

    // 6. longPress (0.3s short press for test)
    console.log("Long pressing (0.3s)...");
    const lpResult = input.longPress(cx, cy, 0.3);
    assert(lpResult === true, "longPress() returns true");

    util.sleep(500);

    // 7. swipe - 从屏幕中部向上滑
    const fromY = screen.height * 0.7;
    const toY = screen.height * 0.3;
    console.log(`Swiping from (${cx}, ${fromY}) to (${cx}, ${toY})...`);
    const swipeResult = input.swipe(cx, fromY, cx, toY, 0.3);
    assert(swipeResult === true, "swipe() returns true");

    util.sleep(500);

    // 8. drag
    console.log("Dragging...");
    const dragResult = input.drag(100, 400, 300, 400, 0.5);
    assert(dragResult === true, "drag() returns true");

    util.sleep(500);

    // 9. pressKey
    console.log("Pressing 'space' key...");
    const keyResult = input.pressKey("space");
    assert(keyResult === true, "pressKey('space') returns true");

    // 10. pressKey - unknown key should return error
    const badKey = input.pressKey("nonexistent_key");
    assert(badKey && badKey.error, "pressKey() with unknown key returns error");

    // 11. typeText
    console.log("Typing 'hello'...");
    const typeResult = input.typeText("hello", 0.05);
    assert(typeResult === true, "typeText() returns true");

    util.sleep(300);

    // 12. pasteText - 中文/Unicode 支持
    console.log("Pasting Chinese text...");
    const pasteResult = input.pasteText("你好世界");
    assert(pasteResult === true, "pasteText() returns true for Chinese");

    util.sleep(500);

    // 13. pasteText - Emoji 支持
    console.log("Pasting Emoji...");
    const emojiResult = input.pasteText("Hello 🌍🎉");
    assert(emojiResult === true, "pasteText() returns true for Emoji");

    util.sleep(300);

    // 14. pressButton
    console.log("Pressing volumeUp...");
    const btnResult = input.pressButton("volumeUp");
    assert(btnResult === true, "pressButton('volumeUp') returns true");

    // 15. pressButton - unknown
    const badBtn = input.pressButton("nonexistent_button");
    assert(badBtn && badBtn.error, "pressButton() with unknown button returns error");

    // 16. pressButtons - 模拟截屏 (power + volumeUp 同时按下)
    console.log("Simulating screenshot (power + volumeUp)...");
    const screenshotResult = input.pressButtons(["power", "volumeUp"]);
    assert(screenshotResult === true, "pressButtons(['power', 'volumeUp']) returns true");

    util.sleep(1000);

    // 17. pressButtons - 参数校验
    const badButtons = input.pressButtons(["power", "nonexistent"]);
    assert(badButtons && badButtons.error, "pressButtons() with unknown button returns error");

    console.log("--- Input Module Test Finished ---");
}

run();
