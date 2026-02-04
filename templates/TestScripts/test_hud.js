/**
 * HUD Module Test Script
 *
 * 测试 HUD 浮窗系统的所有功能
 * Tests all HUD floating window system features
 */

function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    console.log("=== Testing HUD Module ===\n");

    // Check module availability
    if (typeof hud === 'undefined') {
        console.error("❌ HUD module not found");
        return;
    }
    console.log("✅ HUD module is available\n");

    // ========== Test 1: getScreenSize ==========
    console.log("--- Test 1: getScreenSize ---");
    const screen = hud.getScreenSize();
    console.log("Screen Size:", JSON.stringify(screen));
    assert(screen && screen.width > 0, "getScreenSize() returns valid width");
    assert(screen && screen.height > 0, "getScreenSize() returns valid height");
    assert(screen && screen.scale > 0, "getScreenSize() returns valid scale");
    console.log("");

    // ========== Test 2: createWindow Basic ==========
    console.log("--- Test 2: createWindow Basic ---");
    const win1 = hud.createWindow({
        width: 250,
        height: 80,
        draggable: true,
        style: {
            backgroundColor: '#000000DD',
            cornerRadius: 12,
            padding: 16
        }
    });
    assert(win1 !== null && win1 !== undefined, "createWindow() returns window object");

    // Test addText
    console.log("Testing addText...");
    const titleText = win1.addText({
        text: 'HUD Test Window',
        style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    });
    assert(titleText !== null, "addText() returns text element");

    const subtitleText = win1.addText({
        text: 'Basic functionality test',
        style: { textColor: '#8E8E93', fontSize: 12 }
    });
    assert(subtitleText !== null, "addText() works multiple times");

    // Test show
    console.log("Testing show()...");
    win1.show();
    assert(true, "show() called successfully");
    await sleep(1000);

    // Test isVisible
    console.log("Testing isVisible()...");
    const visible = win1.isVisible();
    console.log("Is Visible:", visible);
    assert(visible === true, "isVisible() returns true after show()");

    // Test getBounds
    console.log("Testing getBounds()...");
    const bounds = win1.getBounds();
    console.log("Window Bounds:", JSON.stringify(bounds));
    assert(bounds && bounds.width === 250, "getBounds() returns correct width");
    assert(bounds && bounds.height === 80, "getBounds() returns correct height");

    // Test setText
    console.log("Testing setText()...");
    titleText.setText('Updated Title');
    assert(true, "setText() called successfully");

    await sleep(1000);

    // Test hide
    console.log("Testing hide()...");
    win1.hide();
    await sleep(500);
    const hiddenVisible = win1.isVisible();
    console.log("Is Visible after hide:", hiddenVisible);
    assert(hiddenVisible === false, "isVisible() returns false after hide()");

    // Test remove
    console.log("Testing remove()...");
    win1.remove();
    assert(true, "remove() called successfully");
    console.log("");

    // ========== Test 3: Window with Buttons ==========
    console.log("--- Test 3: Window with Buttons ---");
    const win2 = hud.createWindow({
        width: 280,
        height: 140,
        draggable: true,
        style: {
            backgroundColor: '#1C1C1EF0',
            cornerRadius: 16
        }
    });
    console.log("win2 Created");
    const statusText = win2.addText({
        text: 'Confirm Action?',
        style: { textColor: '#FFFFFF', fontSize: 18 }
    });
    win2.addSpacer({ height: 16 });

    // Test addStack
    console.log("Testing addStack()...");
    const buttonStack = win2.addStack({ axis: 'horizontal', spacing: 12 });
    assert(buttonStack !== null, "addStack() returns stack object");

    // Test addButton
    console.log("Testing addButton()...");
    let cancelClicked = false;
    const cancelBtn = buttonStack.addButton({
        title: 'Cancel',
        style: { backgroundColor: '#3A3A3C', textColor: '#FFFFFF', cornerRadius: 8 },
        onClick: () => {
            console.log("Cancel button clicked");
            cancelClicked = true;
            cancelBtn.setStyle({ backgroundColor: '#FF3B30' });
            statusText.setText('❌ Cancelled!');
        }
    });
    assert(cancelBtn !== null, "addButton() returns button element");

    let confirmClicked = false;
    const confirmBtn = buttonStack.addButton({
        title: 'Confirm',
        style: { backgroundColor: '#007AFF', textColor: '#FFFFFF', cornerRadius: 8 },
        onClick: () => {
            console.log("Confirm button clicked");
            confirmClicked = true;
            confirmBtn.setStyle({ backgroundColor: '#34C759' });
            statusText.setText('✅ Confirmed!');
        }
    });
    assert(confirmBtn !== null, "addButton() works multiple times");

    win2.show();
    await sleep(2000);

    // Test button methods
    console.log("Testing button setTitle()...");
    confirmBtn.setTitle('OK');
    assert(true, "button setTitle() called successfully");

    console.log("Testing button setStyle()...");
    cancelBtn.setStyle({ backgroundColor: '#FF3B30' });
    assert(true, "button setStyle() called successfully");

    await sleep(1000);
    win2.remove();
    console.log("");

    // ========== Test 4: Window with Image ==========
    console.log("--- Test 4: Window with Image ---");
    const win3 = hud.createWindow({
        width: 200,
        height: 100,
        style: {
            backgroundColor: '#2C2C2EF0',
            cornerRadius: 14
        }
    });

    const row = win3.addStack({ axis: 'horizontal', spacing: 12, alignment: 'center' });

    // Test addImage with SF Symbol
    console.log("Testing addImage() with SF Symbol...");
    const icon = row.addImage({
        systemName: 'checkmark.circle.fill',
        width: 32,
        height: 32
    });
    assert(icon !== null, "addImage() returns image element");

    const infoStack = row.addStack({ axis: 'vertical', spacing: 4 });
    infoStack.addText({
        text: 'Success!',
        style: { textColor: '#34C759', fontSize: 16, fontWeight: 'bold' }
    });
    infoStack.addText({
        text: 'Operation completed',
        style: { textColor: '#8E8E93', fontSize: 12 }
    });

    win3.show();
    await sleep(1500);

    // Test image methods
    console.log("Testing image update()...");
    icon.update({ width: 36, height: 36 });
    assert(true, "image update() called successfully");

    console.log("Testing image setSize()...");
    icon.setSize(40, 40);
    assert(true, "image setSize() called successfully");

    await sleep(1000);
    win3.remove();
    console.log("");

    // ========== Test 5: Window Position and Size ==========
    console.log("--- Test 5: Window Position and Size ---");
    const win4 = hud.createWindow({
        width: 150,
        height: 60,
        x: 50,
        y: 100,
        style: {
            backgroundColor: '#007AFFCC',
            cornerRadius: 10
        }
    });
    win4.addText({
        text: 'Position Test',
        style: { textColor: '#FFFFFF' }
    });
    win4.show();
    await sleep(500);

    // Test setPosition
    console.log("Testing setPosition()...");
    win4.setPosition(screen.width - 200, 100);
    assert(true, "setPosition() called successfully");
    await sleep(500);

    // Test setSize
    console.log("Testing setSize()...");
    win4.setSize(180, 80);
    assert(true, "setSize() called successfully");
    await sleep(500);

    // Test setStyle
    console.log("Testing setStyle()...");
    win4.setStyle({
        backgroundColor: '#FF9500CC',
        cornerRadius: 20
    });
    assert(true, "setStyle() called successfully");
    await sleep(1000);

    win4.remove();
    console.log("");

    // ========== Test 6: AutoClear Window ==========
    console.log("--- Test 6: AutoClear Window ---");
    const win5 = hud.createWindow({
        width: 200,
        height: 60,
        autoClear: 2, // Auto remove after 2 seconds
        style: {
            backgroundColor: '#34C759DD',
            cornerRadius: 10
        }
    });
    win5.addText({
        text: 'Auto clear in 2s...',
        style: { textColor: '#FFFFFF', fontSize: 14 }
    });
    win5.show();
    assert(true, "Window with autoClear created");
    console.log("Waiting for auto clear...");
    await sleep(2500);
    console.log("AutoClear test completed");
    console.log("");

    // ========== Test 7: getAllWindows and clearAll ==========
    console.log("--- Test 7: getAllWindows and clearAll ---");

    // Create multiple windows
    const testWin1 = hud.createWindow({ width: 100, height: 50, x: 20, y: 200 });
    testWin1.addText({ text: 'Win 1' });
    testWin1.show();

    const testWin2 = hud.createWindow({ width: 100, height: 50, x: 130, y: 200 });
    testWin2.addText({ text: 'Win 2' });
    testWin2.show();

    const testWin3 = hud.createWindow({ width: 100, height: 50, x: 240, y: 200 });
    testWin3.addText({ text: 'Win 3' });
    testWin3.show();

    await sleep(500);

    // Test getAllWindows
    console.log("Testing getAllWindows()...");
    const allWindows = hud.getAllWindows();
    console.log("All Windows:", JSON.stringify(allWindows));
    assert(Array.isArray(allWindows), "getAllWindows() returns array");
    assert(allWindows.length >= 3, "getAllWindows() returns created windows");

    await sleep(1000);

    // Test clearAll
    console.log("Testing clearAll()...");
    hud.clearAll();
    assert(true, "clearAll() called successfully");

    await sleep(500);

    const remainingWindows = hud.getAllWindows();
    console.log("Remaining Windows:", remainingWindows.length);
    assert(remainingWindows.length === 0, "clearAll() removes all windows");
    console.log("");

    // ========== Test 8: Element Remove ==========
    console.log("--- Test 8: Element Remove ---");
    const win6 = hud.createWindow({
        width: 200,
        height: 100,
        style: { backgroundColor: '#000000DD', cornerRadius: 12 }
    });

    const removeText = win6.addText({
        text: 'This will be removed',
        style: { textColor: '#FFFFFF' }
    });
    win6.addText({
        text: 'This stays',
        style: { textColor: '#00FF00' }
    });
    win6.show();
    await sleep(1000);

    console.log("Testing element remove()...");
    removeText.remove();
    win6.refresh();
    assert(true, "Element remove() and window refresh() called");

    await sleep(1000);
    win6.remove();
    console.log("");

    // ========== Test 9: Spacer ==========
    console.log("--- Test 9: Spacer ---");
    const win7 = hud.createWindow({
        width: 200,
        height: 120,
        style: { backgroundColor: '#000000DD', cornerRadius: 12 }
    });

    win7.addText({ text: 'Top', style: { textColor: '#FFFFFF' } });

    console.log("Testing addSpacer()...");
    const spacer = win7.addSpacer({ height: 30 });
    assert(spacer !== null, "addSpacer() returns spacer element");

    win7.addText({ text: 'Bottom', style: { textColor: '#FFFFFF' } });
    win7.show();
    await sleep(1000);

    console.log("Testing spacer setHeight()...");
    spacer.setHeight(10);
    win7.refresh();
    assert(true, "spacer setHeight() called successfully");

    await sleep(1000);
    win7.remove();
    console.log("");

    // ========== Test 10: Loading Element ==========
    console.log("--- Test 10: Loading Element ---");
    const win8 = hud.createWindow({
        width: 200,
        height: 120,
        style: { backgroundColor: '#1C1C1EF0', cornerRadius: 14 }
    });

    const loadingText = win8.addText({
        text: 'Loading...',
        style: { textColor: '#FFFFFF', fontSize: 14 }
    });
    win8.addSpacer({ height: 12 });

    // Test addLoading
    console.log("Testing addLoading()...");
    const loading = win8.addLoading({
        style: 'large',
        color: '#007AFF'
    });
    assert(loading !== null, "addLoading() returns loading element");

    win8.show();
    await sleep(1000);

    // Test isAnimating
    console.log("Testing loading.isAnimating()...");
    const animating = loading.isAnimating();
    console.log("Is Animating:", animating);
    assert(animating === true, "isAnimating() returns true by default");

    // Test stop
    console.log("Testing loading.stop()...");
    loading.stop();
    loadingText.setText('Stopped');
    assert(true, "loading.stop() called successfully");
    await sleep(1000);

    // Test start
    console.log("Testing loading.start()...");
    loading.start();
    loadingText.setText('Started again');
    assert(true, "loading.start() called successfully");
    await sleep(1000);

    // Test setStyle
    console.log("Testing loading.setStyle()...");
    loading.setStyle('medium');
    assert(true, "loading.setStyle() called successfully");
    await sleep(500);

    // Test setColor
    console.log("Testing loading.setColor()...");
    loading.setColor('#FF9500');
    assert(true, "loading.setColor() called successfully");
    await sleep(1000);

    win8.remove();
    console.log("");

    // ========== Test 11: onClick for Text, Image, Stack ==========
    console.log("--- Test 11: onClick for Text, Image, Stack ---");
    const existingWin = hud.getWindow('win9');
    if (existingWin) {
        console.log('Window already exists!');
        return
    }

    const win9 = hud.createWindow({
        id: "win9",
        width: 280,
        height: 180,
        draggable: true,
        style: {backgroundColor: '#1C1C1EF0', cornerRadius: 16}
    });

    win9.addText({
        text: 'Click Test - Tap elements below',
        style: {textColor: '#FFFFFF', fontSize: 14}
    });
    win9.addSpacer({height: 12});

    // Test Text onClick
    console.log("Testing Text onClick...");
    let textClickCount = 0;
    const clickableText = win9.addText({
        text: 'Click me! (Text)',
        style: {textColor: '#007AFF', fontSize: 16}
    });
    clickableText.onClick(() => {
        textClickCount++;
        console.log("Text clicked! Count:", textClickCount);
        clickableText.setText(`Clicked ${textClickCount} times!`);
    });
    assert(true, "Text onClick() registered successfully");

    win9.addSpacer({height: 8});

    // Test Image onClick
    console.log("Testing Image onClick...");
    let imageClickCount = 0;
    const clickableRow = win9.addStack({axis: 'horizontal', spacing: 12, alignment: 'center'});
    const clickableIcon = clickableRow.addImage({
        systemName: 'star.fill',
        width: 32,
        height: 32
    });
    clickableIcon.onClick(() => {
        imageClickCount++;
        console.log("Image clicked! Count:", imageClickCount);
    });
    clickableRow.addText({
        text: 'Tap the star icon',
        style: {textColor: '#8E8E93', fontSize: 12}
    });
    assert(true, "Image onClick() registered successfully");

    win9.addSpacer({height: 8});

    // Test Stack onClick with event blocking
    console.log("Testing Stack onClick with event blocking...");
    let outerStackClicked = false;
    let innerTextClicked = false;

    const outerStack = win9.addStack({
        axis: 'horizontal',
        spacing: 8,
        style: {backgroundColor: '#3A3A3C', cornerRadius: 8, padding: 8}
    });
    outerStack.onClick(() => {
        outerStackClicked = true;
        console.log("Outer stack clicked!");
    });

    const innerClickText = outerStack.addText({
        text: 'Inner (priority)',
        style: {textColor: '#FF9500', fontSize: 14}
    });
    innerClickText.onClick(() => {
        innerTextClicked = true;
        console.log("Inner text clicked! (Should block outer stack)");
        innerClickText.setText('Inner clicked!');
    });

    outerStack.addText({
        text: ' | Outer area',
        style: {textColor: '#FFFFFF', fontSize: 14}
    });

    assert(true, "Stack onClick() with event blocking registered successfully");

    win9.show();
    console.log("Please tap the elements to test onClick...");
    await sleep(5000);

    win9.remove();
    console.log("");

    // ========== Test 12: ScrollView ==========
    console.log("--- Test 12: ScrollView ---");
    const win10 = hud.createWindow({
        width: 280,
        height: 220,
        draggable: true,
        style: { backgroundColor: '#1C1C1EF0', cornerRadius: 16 }
    });

    win10.addText({
        text: 'ScrollView Test',
        style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    });
    win10.addSpacer({ height: 8 });

    // Test addScrollView
    console.log("Testing addScrollView()...");
    const scroll = win10.addScrollView({
        direction: 'vertical',
        height: 150,
        spacing: 8
    });
    assert(scroll !== null, "addScrollView() returns scroll view");

    // Add content to scroll view
    for (let i = 1; i <= 10; i++) {
        scroll.addText({
            text: `Scroll Item ${i}`,
            style: { textColor: '#FFFFFF', fontSize: 14 }
        });
    }
    console.log("Added 10 items to scroll view");

    win10.show();
    await sleep(1500);

    // Test setDirection
    console.log("Testing scroll.setDirection()...");
    scroll.setDirection('vertical');
    assert(true, "scroll.setDirection() called successfully");

    // Test setSpacing
    console.log("Testing scroll.setSpacing()...");
    scroll.setSpacing(12);
    assert(true, "scroll.setSpacing() called successfully");
    await sleep(500);

    // Test getContentSize
    console.log("Testing scroll.getContentSize()...");
    const contentSize = scroll.getContentSize();
    console.log("Content Size:", JSON.stringify(contentSize));
    assert(contentSize && contentSize.height > 0, "getContentSize() returns valid size");

    // Test getOffset
    console.log("Testing scroll.getOffset()...");
    const offset = scroll.getOffset();
    console.log("Current Offset:", JSON.stringify(offset));
    assert(offset !== null, "getOffset() returns offset");

    // Test scrollTo
    console.log("Testing scroll.scrollTo()...");
    scroll.scrollTo(0, 100);
    assert(true, "scroll.scrollTo() called successfully");
    await sleep(500);

    // Test scrollToTop
    console.log("Testing scroll.scrollToTop()...");
    scroll.scrollToTop();
    assert(true, "scroll.scrollToTop() called successfully");
    await sleep(500);

    // Test scrollToBottom
    console.log("Testing scroll.scrollToBottom()...");
    scroll.scrollToBottom();
    assert(true, "scroll.scrollToBottom() called successfully");
    await sleep(500);

    // Test onScroll
    console.log("Testing scroll.onScroll()...");
    scroll.onScroll((pos) => {
        console.log("Scroll position:", pos.x, pos.y);
    });
    assert(true, "scroll.onScroll() registered successfully");

    await sleep(1500);
    win10.remove();
    console.log("");

    // ========== Test 13: List View ==========
    console.log("--- Test 13: List View ---");
    const win11 = hud.createWindow({
        width: 300,
        height: 280,
        draggable: true,
        style: { backgroundColor: '#1C1C1EF0', cornerRadius: 16 }
    });

    win11.addText({
        text: 'List View Test',
        style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    });
    win11.addSpacer({ height: 8 });

    // Test addList
    console.log("Testing addList()...");
    const list = win11.addList({
        layout: 'list',
        height: 200,
        itemHeight: 50,
        separatorStyle: 'line',
        items: [
            { id: '1', title: 'Settings', systemIcon: 'gear', accessory: 'disclosure' },
            { id: '2', title: 'Notifications', systemIcon: 'bell', subtitle: 'Enabled' },
            { id: '3', title: 'About', systemIcon: 'info.circle' }
        ]
    });
    assert(list !== null, "addList() returns list view");

    win11.show();
    await sleep(1000);

    // Test getItemCount
    console.log("Testing list.getItemCount()...");
    let itemCount = list.getItemCount();
    console.log("Initial item count:", itemCount);
    assert(itemCount === 3, "getItemCount() returns correct count");

    // Test addItem
    console.log("Testing list.addItem()...");
    list.addItem({
        id: '4',
        title: 'Privacy',
        systemIcon: 'lock.shield',
        subtitle: 'Protected'
    });
    await sleep(500);
    itemCount = list.getItemCount();
    console.log("After addItem count:", itemCount);
    assert(itemCount === 4, "addItem() increases count");

    // Test insertItem
    console.log("Testing list.insertItem()...");
    list.insertItem({
        id: '5',
        title: 'Inserted Item',
        systemIcon: 'plus.circle'
    }, 1);
    await sleep(500);
    itemCount = list.getItemCount();
    console.log("After insertItem count:", itemCount);
    assert(itemCount === 5, "insertItem() increases count");

    // Test getItem
    console.log("Testing list.getItem()...");
    const firstItem = list.getItem(0);
    console.log("First item:", JSON.stringify(firstItem));
    assert(firstItem && firstItem.id === '1', "getItem() returns correct item");

    // Test removeItem
    console.log("Testing list.removeItem()...");
    list.removeItem(1);
    await sleep(500);
    itemCount = list.getItemCount();
    console.log("After removeItem count:", itemCount);
    assert(itemCount === 4, "removeItem() decreases count");

    // Test setItemHeight
    console.log("Testing list.setItemHeight()...");
    list.setItemHeight(60);
    assert(true, "list.setItemHeight() called successfully");
    await sleep(500);

    // Test setSeparatorStyle
    console.log("Testing list.setSeparatorStyle()...");
    list.setSeparatorStyle('none');
    assert(true, "list.setSeparatorStyle() called successfully");
    await sleep(500);

    // Test scrollToItem
    console.log("Testing list.scrollToItem()...");
    list.scrollToItem(3);
    assert(true, "list.scrollToItem() called successfully");
    await sleep(500);

    // Test onSelect
    console.log("Testing list.onSelect()...");
    list.onSelect((item, index) => {
        console.log(`Selected item ${index}:`, item.title);
    });
    assert(true, "list.onSelect() registered successfully");

    await sleep(2000);

    // Test setItems (replace all)
    console.log("Testing list.setItems()...");
    list.setItems([
        { id: 'a', title: 'Apple', systemIcon: 'applelogo' },
        { id: 'b', title: 'Banana', systemIcon: 'leaf' },
        { id: 'c', title: 'Cherry', systemIcon: 'heart.fill' }
    ]);
    await sleep(500);
    itemCount = list.getItemCount();
    console.log("After setItems count:", itemCount);
    assert(itemCount === 3, "setItems() replaces all items");

    // Test removeAllItems
    console.log("Testing list.removeAllItems()...");
    list.removeAllItems();
    await sleep(500);
    itemCount = list.getItemCount();
    console.log("After removeAllItems count:", itemCount);
    assert(itemCount === 0, "removeAllItems() clears all items");

    await sleep(1000);
    win11.remove();
    console.log("");

    // ========== Test 14: List Grid Layout ==========
    console.log("--- Test 14: List Grid Layout ---");
    const win12 = hud.createWindow({
        width: 300,
        height: 250,
        draggable: true,
        style: { backgroundColor: '#1C1C1EF0', cornerRadius: 16 }
    });

    win12.addText({
        text: 'Grid Layout Test',
        style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    });
    win12.addSpacer({ height: 8 });

    // Test grid layout
    console.log("Testing grid layout...");
    const gridList = win12.addList({
        layout: 'grid',
        height: 180,
        columns: 3,
        itemHeight: 80,
        items: [
            { id: '1', title: 'Photos', systemIcon: 'photo' },
            { id: '2', title: 'Camera', systemIcon: 'camera' },
            { id: '3', title: 'Music', systemIcon: 'music.note' },
            { id: '4', title: 'Videos', systemIcon: 'video' },
            { id: '5', title: 'Files', systemIcon: 'folder' },
            { id: '6', title: 'Notes', systemIcon: 'note.text' }
        ]
    });
    assert(gridList !== null, "Grid list created successfully");

    gridList.onSelect((item, index) => {
        console.log(`Grid item ${index} selected:`, item.title);
    });

    win12.show();
    await sleep(2000);

    // Test setColumns
    console.log("Testing list.setColumns()...");
    gridList.setColumns(2);
    assert(true, "list.setColumns() called successfully");
    await sleep(1000);

    // Test setLayout (switch to list)
    console.log("Testing list.setLayout()...");
    gridList.setLayout('list');
    assert(true, "list.setLayout() called successfully");
    await sleep(1000);

    win12.remove();
    console.log("");

    // ========== Test 15: Complex Layout ==========
    console.log("--- Test 15: Complex Layout ---");
    const win13 = hud.createWindow({
        width: 300,
        height: 200,
        draggable: true,
        style: {
            backgroundColor: '#1C1C1EF0',
            cornerRadius: 16,
            shadow: true
        }
    });

    // Header
    const headerStack = win13.addStack({ axis: 'horizontal', spacing: 8, alignment: 'center' });
    headerStack.addImage({ systemName: 'cpu', width: 20, height: 20 });
    headerStack.addText({
        text: 'System Monitor',
        style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    });

    win13.addSpacer({ height: 12 });

    // Stats with loading
    const statsStack = win13.addStack({ axis: 'horizontal', spacing: 20 });

    // CPU Stats
    const cpuStack = statsStack.addStack({ axis: 'vertical', spacing: 4, alignment: 'center' });
    cpuStack.addText({ text: 'CPU', style: { textColor: '#8E8E93', fontSize: 12 } });
    const cpuLoading = cpuStack.addLoading({ style: 'small', color: '#00FF00' });
    const cpuValue = cpuStack.addText({
        text: '45%',
        style: { textColor: '#00FF00', fontSize: 18, fontWeight: 'bold' }
    });

    // Memory Stats
    const memStack = statsStack.addStack({ axis: 'vertical', spacing: 4, alignment: 'center' });
    memStack.addText({ text: 'MEM', style: { textColor: '#8E8E93', fontSize: 12 } });
    const memLoading = memStack.addLoading({ style: 'small', color: '#007AFF' });
    const memValue = memStack.addText({
        text: '2.1GB',
        style: { textColor: '#007AFF', fontSize: 18, fontWeight: 'bold' }
    });

    win13.addSpacer({ height: 12 });

    // Close button
    const closeBtn = win13.addButton({
        title: 'Close Monitor',
        style: { backgroundColor: '#3A3A3C', textColor: '#FFFFFF', cornerRadius: 8 },
        onClick: () => win13.remove()
    });

    win13.show();
    console.log("Complex layout window created");

    // Simulate updates
    await sleep(1000);
    cpuLoading.stop();
    memLoading.stop();
    cpuValue.setText('52%');
    memValue.setText('2.3GB');
    console.log("Values updated dynamically");

    await sleep(2000);
    win13.remove();
    console.log("");

    // ========== Cleanup ==========
    console.log("--- Cleanup ---");
    hud.clearAll();
    console.log("All windows cleared");

    console.log("\n=== HUD Module Test Completed ===");
}

run();
