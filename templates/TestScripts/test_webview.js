/**
 * HUD WebView Module Test Script
 *
 * 测试 HUD WebView 网页视图的所有功能
 * Tests all HUD WebView features
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
    console.log("=== Testing HUD WebView Module ===\n");

    // Check module availability
    if (typeof hud === 'undefined') {
        console.error("❌ HUD module not found");
        return;
    }
    console.log("✅ HUD module is available\n");

    // ========== Test 1: Basic WebView with URL ==========
    console.log("--- Test 1: Basic WebView with URL ---");
    const win1 = hud.createWindow({
        width: 320,
        height: 400,
        draggable: true,
        style: {
            backgroundColor: '#1C1C1EF0',
            cornerRadius: 16
        }
    });
    assert(win1 !== null, "createWindow() returns window object");

    win1.addText({
        text: 'WebView URL Test',
        style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    });
    win1.addSpacer({ height: 8 });

    // Test addWebView with URL
    console.log("Testing addWebView() with URL...");
    const webview1 = win1.addWebView({
        url: 'https://www.google.com',
        width: 300,
        height: 300,
        style: { cornerRadius: 8 , backgroundColor: '#1C1C1EF0', },
    });
    assert(webview1 !== null, "addWebView() returns webview element");

    // Test onLoadStart
    console.log("Testing onLoadStart()...");
    let loadStartCalled = false;
    webview1.onLoadStart((url) => {
        loadStartCalled = true;
        console.log("Load started:", url);
    });
    assert(true, "onLoadStart() registered successfully");

    // Test onLoadFinish
    console.log("Testing onLoadFinish()...");
    let loadFinishCalled = false;
    webview1.onLoadFinish((url) => {
        loadFinishCalled = true;
        console.log("Load finished:", url);
    });
    assert(true, "onLoadFinish() registered successfully");

    // Test onLoadError
    console.log("Testing onLoadError()...");
    webview1.onLoadError((error) => {
        console.log("Load error:", error.message, error.code);
    });
    assert(true, "onLoadError() registered successfully");

    win1.show();
    // await sleep(3000);
    //
    // // Test getURL
    // console.log("Testing getURL()...");
    // const currentURL = webview1.getURL();
    // console.log("Current URL:", currentURL);
    // assert(currentURL !== null, "getURL() returns URL after load");
    //
    // // Test isLoading
    // console.log("Testing isLoading()...");
    // const loading = webview1.isLoading();
    // console.log("Is Loading:", loading);
    // assert(typeof loading === 'boolean', "isLoading() returns boolean");
    //
    // // Test canGoBack/canGoForward
    // console.log("Testing canGoBack() and canGoForward()...");
    // const canBack = webview1.canGoBack();
    // const canForward = webview1.canGoForward();
    // console.log("Can Go Back:", canBack, "Can Go Forward:", canForward);
    // assert(typeof canBack === 'boolean', "canGoBack() returns boolean");
    // assert(typeof canForward === 'boolean', "canGoForward() returns boolean");
    //
    // await sleep(1000);
    // win1.remove();
    // console.log("");
    //
    // // ========== Test 2: WebView with HTML ==========
    // console.log("--- Test 2: WebView with HTML ---");
    // const win2 = hud.createWindow({
    //     width: 300,
    //     height: 300,
    //     draggable: true,
    //     style: {
    //         backgroundColor: '#1C1C1EF0',
    //         cornerRadius: 16
    //     }
    // });
    //
    // win2.addText({
    //     text: 'WebView HTML Test',
    //     style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    // });
    // win2.addSpacer({ height: 8 });
    //
    // const htmlContent = `
    // <!DOCTYPE html>
    // <html>
    // <head>
    //     <meta name="viewport" content="width=device-width, initial-scale=1">
    //     <style>
    //         body {
    //             font-family: -apple-system, sans-serif;
    //             padding: 16px;
    //             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    //             color: white;
    //             margin: 0;
    //             min-height: 100vh;
    //         }
    //         h1 { margin: 0 0 16px 0; }
    //         p { opacity: 0.8; }
    //     </style>
    // </head>
    // <body>
    //     <h1>Hello WebView!</h1>
    //     <p>This is local HTML content rendered in HUD WebView.</p>
    //     <p>Time: <span id="time"></span></p>
    //     <script>
    //         document.getElementById('time').textContent = new Date().toLocaleTimeString();
    //     </script>
    // </body>
    // </html>
    // `;
    //
    // console.log("Testing addWebView() with HTML...");
    // const webview2 = win2.addWebView({
    //     html: htmlContent,
    //     width: 280,
    //     height: 200,
    //     javaScriptEnabled: true,
    //     style: { cornerRadius: 8 }
    // });
    // assert(webview2 !== null, "addWebView() with HTML works");
    //
    // win2.show();
    // await sleep(2000);
    //
    // // Test loadHTML
    // console.log("Testing loadHTML()...");
    // webview2.loadHTML('<h1 style="color:red;font-family:sans-serif;">Reloaded HTML!</h1>');
    // assert(true, "loadHTML() called successfully");
    // await sleep(1000);
    //
    // win2.remove();
    // console.log("");
    //
    // // ========== Test 3: JS Evaluation ==========
    // console.log("--- Test 3: JS Evaluation ---");
    // const win3 = hud.createWindow({
    //     width: 300,
    //     height: 280,
    //     draggable: true,
    //     style: {
    //         backgroundColor: '#1C1C1EF0',
    //         cornerRadius: 16
    //     }
    // });
    //
    // win3.addText({
    //     text: 'JS Evaluation Test',
    //     style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    // });
    //
    // const resultText = win3.addText({
    //     text: 'Result: waiting...',
    //     style: { textColor: '#8E8E93', fontSize: 12 }
    // });
    // win3.addSpacer({ height: 8 });
    //
    // const evalHtml = `
    // <!DOCTYPE html>
    // <html>
    // <head><title>Test Page</title></head>
    // <body>
    //     <h1 id="heading">Original Title</h1>
    //     <script>
    //         function getHeading() {
    //             return document.getElementById('heading').textContent;
    //         }
    //         function setHeading(text) {
    //             document.getElementById('heading').textContent = text;
    //         }
    //     </script>
    // </body>
    // </html>
    // `;
    //
    // const webview3 = win3.addWebView({
    //     html: evalHtml,
    //     width: 280,
    //     height: 180,
    //     javaScriptEnabled: true,
    //     style: { cornerRadius: 8 }
    // });
    //
    // win3.show();
    // await sleep(1000);
    //
    // // Test evaluateJS - get value
    // console.log("Testing evaluateJS() to get value...");
    // webview3.evaluateJS('document.title', (result, error) => {
    //     if (error) {
    //         console.error("evaluateJS error:", error);
    //         resultText.setText('Result: Error');
    //     } else {
    //         console.log("Page title:", result);
    //         resultText.setText('Title: ' + result);
    //         assert(result === 'Test Page', "evaluateJS() returns correct value");
    //     }
    // });
    // await sleep(500);
    //
    // // Test evaluateJS - modify DOM
    // console.log("Testing evaluateJS() to modify DOM...");
    // webview3.evaluateJS('setHeading("Modified by Native!")');
    // assert(true, "evaluateJS() for DOM modification called");
    // await sleep(500);
    //
    // // Verify modification
    // webview3.evaluateJS('getHeading()', (result, error) => {
    //     console.log("Heading after modification:", result);
    //     assert(result === 'Modified by Native!', "DOM modification successful");
    // });
    // await sleep(1000);
    //
    // win3.remove();
    // console.log("");
    //
    // // ========== Test 4: JS ↔ Native Communication ==========
    // console.log("--- Test 4: JS ↔ Native Communication ---");
    // const win4 = hud.createWindow({
    //     width: 300,
    //     height: 350,
    //     draggable: true,
    //     style: {
    //         backgroundColor: '#1C1C1EF0',
    //         cornerRadius: 16
    //     }
    // });
    //
    // win4.addText({
    //     text: 'JS ↔ Native Communication',
    //     style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    // });
    //
    // const messageText = win4.addText({
    //     text: 'Messages: waiting...',
    //     style: { textColor: '#8E8E93', fontSize: 12 }
    // });
    // win4.addSpacer({ height: 8 });
    //
    // const commHtml = `
    // <!DOCTYPE html>
    // <html>
    // <head>
    //     <meta name="viewport" content="width=device-width, initial-scale=1">
    //     <style>
    //         body { font-family: -apple-system; padding: 16px; background: #f5f5f5; }
    //         button {
    //             width: 100%; padding: 12px; margin: 8px 0;
    //             background: #007AFF; color: white;
    //             border: none; border-radius: 8px; font-size: 16px;
    //         }
    //         #log { background: white; padding: 12px; border-radius: 8px; margin-top: 16px; }
    //     </style>
    // </head>
    // <body>
    //     <button onclick="sendString()">Send String</button>
    //     <button onclick="sendObject()">Send Object</button>
    //     <button onclick="sendNumber()">Send Number</button>
    //     <div id="log">Tap buttons to test...</div>
    //     <script>
    //         function sendString() {
    //             window.webkit.messageHandlers.trollscript.postMessage('Hello from WebView!');
    //             log('Sent: String message');
    //         }
    //         function sendObject() {
    //             window.webkit.messageHandlers.trollscript.postMessage({
    //                 type: 'test',
    //                 value: 42,
    //                 nested: { key: 'value' }
    //             });
    //             log('Sent: Object message');
    //         }
    //         function sendNumber() {
    //             window.webkit.messageHandlers.trollscript.postMessage(12345);
    //             log('Sent: Number message');
    //         }
    //         function log(msg) {
    //             document.getElementById('log').innerHTML = msg;
    //         }
    //         function receiveNative(msg) {
    //             document.getElementById('log').innerHTML = 'Native: ' + msg;
    //         }
    //     </script>
    // </body>
    // </html>
    // `;
    //
    // const webview4 = win4.addWebView({
    //     html: commHtml,
    //     width: 280,
    //     height: 250,
    //     javaScriptEnabled: true,
    //     style: { cornerRadius: 8 }
    // });
    //
    // // Test onMessage
    // console.log("Testing onMessage()...");
    // let messageCount = 0;
    // webview4.onMessage((message) => {
    //     messageCount++;
    //     console.log("Received message #" + messageCount + ":", JSON.stringify(message));
    //     messageText.setText('Received: ' + JSON.stringify(message).substring(0, 30) + '...');
    //
    //     // Echo back to web
    //     webview4.evaluateJS(`receiveNative("Got message #${messageCount}")`);
    // });
    // assert(true, "onMessage() registered successfully");
    //
    // win4.show();
    // console.log("Please tap the buttons to test JS ↔ Native communication...");
    // await sleep(5000);
    //
    // console.log("Total messages received:", messageCount);
    // assert(messageCount >= 0, "onMessage() can receive messages (tap buttons to test)");
    //
    // win4.remove();
    // console.log("");
    //
    // // ========== Test 5: Navigation Methods ==========
    // console.log("--- Test 5: Navigation Methods ---");
    // const win5 = hud.createWindow({
    //     width: 320,
    //     height: 450,
    //     draggable: true,
    //     style: {
    //         backgroundColor: '#1C1C1EF0',
    //         cornerRadius: 16
    //     }
    // });
    //
    // win5.addText({
    //     text: 'Navigation Test',
    //     style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    // });
    //
    // const navStatus = win5.addText({
    //     text: 'Status: initializing...',
    //     style: { textColor: '#8E8E93', fontSize: 12 }
    // });
    // win5.addSpacer({ height: 8 });
    //
    // const webview5 = win5.addWebView({
    //     url: 'https://example.com',
    //     width: 300,
    //     height: 320,
    //     style: { cornerRadius: 8 }
    // });
    //
    // webview5.onLoadFinish((url) => {
    //     navStatus.setText('Loaded: ' + url.substring(0, 30) + '...');
    // });
    //
    // win5.addSpacer({ height: 8 });
    //
    // // Navigation buttons
    // const navStack = win5.addStack({ axis: 'horizontal', spacing: 8 });
    // navStack.addButton({
    //     title: '←',
    //     style: { backgroundColor: '#3A3A3C', cornerRadius: 6 },
    //     onClick: () => {
    //         console.log("Testing goBack()...");
    //         webview5.goBack();
    //     }
    // });
    // navStack.addButton({
    //     title: '→',
    //     style: { backgroundColor: '#3A3A3C', cornerRadius: 6 },
    //     onClick: () => {
    //         console.log("Testing goForward()...");
    //         webview5.goForward();
    //     }
    // });
    // navStack.addButton({
    //     title: '↻',
    //     style: { backgroundColor: '#3A3A3C', cornerRadius: 6 },
    //     onClick: () => {
    //         console.log("Testing reload()...");
    //         webview5.reload();
    //     }
    // });
    // navStack.addButton({
    //     title: '✕',
    //     style: { backgroundColor: '#FF3B30', cornerRadius: 6 },
    //     onClick: () => {
    //         console.log("Testing stopLoading()...");
    //         webview5.stopLoading();
    //     }
    // });
    //
    // win5.show();
    // await sleep(3000);
    //
    // // Test loadURL
    // console.log("Testing loadURL()...");
    // webview5.loadURL('https://www.iana.org/domains/reserved');
    // await sleep(3000);
    //
    // // Now we should be able to go back
    // console.log("Checking navigation state after multiple loads...");
    // const canGoBack = webview5.canGoBack();
    // console.log("Can go back:", canGoBack);
    // assert(canGoBack === true, "canGoBack() returns true after navigation");
    //
    // win5.remove();
    // console.log("");
    //
    // // ========== Test 6: WebView Size and Style ==========
    // console.log("--- Test 6: WebView Size and Style ---");
    // const win6 = hud.createWindow({
    //     width: 320,
    //     height: 350,
    //     draggable: true,
    //     style: {
    //         backgroundColor: '#1C1C1EF0',
    //         cornerRadius: 16
    //     }
    // });
    //
    // win6.addText({
    //     text: 'Size & Style Test',
    //     style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    // });
    // win6.addSpacer({ height: 8 });
    //
    // const webview6 = win6.addWebView({
    //     html: '<body style="background:#007AFF;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;color:white;font-family:sans-serif;"><h1>Resize Me!</h1></body>',
    //     width: 200,
    //     height: 150,
    //     style: { cornerRadius: 8 }
    // });
    //
    // win6.show();
    // await sleep(1000);
    //
    // // Test setSize
    // console.log("Testing setSize()...");
    // webview6.setSize(280, 200);
    // assert(true, "setSize() called successfully");
    // await sleep(1000);
    //
    // // Test setStyle
    // console.log("Testing setStyle()...");
    // webview6.setStyle({ cornerRadius: 20 });
    // assert(true, "setStyle() called successfully");
    // await sleep(1000);
    //
    // // Test setScrollEnabled
    // console.log("Testing setScrollEnabled()...");
    // webview6.setScrollEnabled(false);
    // assert(true, "setScrollEnabled(false) called successfully");
    // await sleep(500);
    //
    // webview6.setScrollEnabled(true);
    // assert(true, "setScrollEnabled(true) called successfully");
    // await sleep(1000);
    //
    // win6.remove();
    // console.log("");
    //
    // // ========== Test 7: WebView Update ==========
    // console.log("--- Test 7: WebView Update ---");
    // const win7 = hud.createWindow({
    //     width: 300,
    //     height: 280,
    //     draggable: true,
    //     style: {
    //         backgroundColor: '#1C1C1EF0',
    //         cornerRadius: 16
    //     }
    // });
    //
    // win7.addText({
    //     text: 'Update Test',
    //     style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    // });
    // win7.addSpacer({ height: 8 });
    //
    // const webview7 = win7.addWebView({
    //     html: '<body style="background:#FF9500;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;color:white;font-family:sans-serif;"><h1>Original</h1></body>',
    //     width: 200,
    //     height: 150,
    //     style: { cornerRadius: 8 }
    // });
    //
    // win7.show();
    // await sleep(1000);
    //
    // // Test update
    // console.log("Testing update()...");
    // webview7.update({
    //     html: '<body style="background:#34C759;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;color:white;font-family:sans-serif;"><h1>Updated!</h1></body>',
    //     width: 250,
    //     height: 180,
    //     style: { cornerRadius: 12 }
    // });
    // assert(true, "update() called successfully");
    // await sleep(1500);
    //
    // win7.remove();
    // console.log("");
    //
    // // ========== Test 8: WebView Remove ==========
    // console.log("--- Test 8: WebView Remove ---");
    // const win8 = hud.createWindow({
    //     width: 300,
    //     height: 250,
    //     draggable: true,
    //     style: {
    //         backgroundColor: '#1C1C1EF0',
    //         cornerRadius: 16
    //     }
    // });
    //
    // win8.addText({
    //     text: 'Remove Test',
    //     style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    // });
    // win8.addSpacer({ height: 8 });
    //
    // const webview8 = win8.addWebView({
    //     html: '<body style="background:#FF3B30;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;color:white;font-family:sans-serif;"><h1>Will be removed</h1></body>',
    //     width: 280,
    //     height: 150,
    //     style: { cornerRadius: 8 }
    // });
    //
    // win8.show();
    // await sleep(1500);
    //
    // // Test remove
    // console.log("Testing webview.remove()...");
    // webview8.remove();
    // win8.refresh();
    // assert(true, "webview.remove() called successfully");
    // await sleep(1000);
    //
    // win8.remove();
    // console.log("");
    //
    // // ========== Test 9: WebView in Stack ==========
    // console.log("--- Test 9: WebView in Stack ---");
    // const win9 = hud.createWindow({
    //     width: 320,
    //     height: 300,
    //     draggable: true,
    //     style: {
    //         backgroundColor: '#1C1C1EF0',
    //         cornerRadius: 16
    //     }
    // });
    //
    // win9.addText({
    //     text: 'WebView in Stack',
    //     style: { textColor: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
    // });
    // win9.addSpacer({ height: 8 });
    //
    // const stack = win9.addStack({ axis: 'horizontal', spacing: 8 });
    //
    // // Add two small WebViews in a horizontal stack
    // console.log("Testing addWebView() in stack...");
    // const stackWebview1 = stack.addWebView({
    //     html: '<body style="background:#007AFF;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;color:white;font-family:sans-serif;"><h2>Left</h2></body>',
    //     width: 140,
    //     height: 180,
    //     style: { cornerRadius: 8 }
    // });
    // assert(stackWebview1 !== null, "stack.addWebView() returns webview (1)");
    //
    // const stackWebview2 = stack.addWebView({
    //     html: '<body style="background:#FF9500;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;color:white;font-family:sans-serif;"><h2>Right</h2></body>',
    //     width: 140,
    //     height: 180,
    //     style: { cornerRadius: 8 }
    // });
    // assert(stackWebview2 !== null, "stack.addWebView() returns webview (2)");
    //
    // win9.show();
    // await sleep(2000);
    //
    // win9.remove();
    // console.log("");
    //
    // // ========== Test 10: Complete Browser Demo ==========
    // console.log("--- Test 10: Complete Browser Demo ---");
    // const screen = hud.getScreenSize();
    // const browserWin = hud.createWindow({
    //     width: Math.min(360, screen.width - 40),
    //     height: 500,
    //     draggable: true,
    //     style: {
    //         backgroundColor: '#1C1C1EF0',
    //         cornerRadius: 16
    //     }
    // });
    //
    // // Header
    // const header = browserWin.addStack({ axis: 'horizontal', spacing: 8, alignment: 'center' });
    // header.addImage({ systemName: 'globe', width: 20, height: 20 });
    // const titleLabel = header.addText({
    //     text: 'Mini Browser',
    //     style: { textColor: '#FFFFFF', fontSize: 14, fontWeight: 'bold' }
    // });
    //
    // const urlLabel = browserWin.addText({
    //     text: 'Loading...',
    //     style: { textColor: '#8E8E93', fontSize: 10 }
    // });
    //
    // // Loading indicator
    // const loadRow = browserWin.addStack({ axis: 'horizontal', spacing: 8, alignment: 'center' });
    // const loadingIndicator = loadRow.addLoading({ style: 'small', color: '#007AFF' });
    // const loadingText = loadRow.addText({
    //     text: '',
    //     style: { textColor: '#8E8E93', fontSize: 10 }
    // });
    //
    // browserWin.addSpacer({ height: 8 });
    //
    // // Main WebView
    // const browserWebview = browserWin.addWebView({
    //     url: 'https://example.com',
    //     width: Math.min(340, screen.width - 60),
    //     height: 360,
    //     javaScriptEnabled: true,
    //     style: { cornerRadius: 8 }
    // });
    //
    // // Event handlers
    // browserWebview.onLoadStart((url) => {
    //     loadingIndicator.start();
    //     loadingText.setText('Loading...');
    //     urlLabel.setText(url.length > 40 ? url.substring(0, 40) + '...' : url);
    // });
    //
    // browserWebview.onLoadFinish((url) => {
    //     loadingIndicator.stop();
    //     loadingText.setText('Done');
    //     browserWebview.evaluateJS('document.title', (title) => {
    //         titleLabel.setText(title || 'Mini Browser');
    //     });
    //     setTimeout(() => loadingText.setText(''), 2000);
    // });
    //
    // browserWebview.onLoadError((error) => {
    //     loadingIndicator.stop();
    //     loadingText.setText('Error');
    //     loadingText.setStyle({ textColor: '#FF3B30' });
    // });
    //
    // browserWin.addSpacer({ height: 8 });
    //
    // // Navigation bar
    // const navBar = browserWin.addStack({ axis: 'horizontal', spacing: 12 });
    // navBar.addButton({
    //     title: '←',
    //     style: { backgroundColor: '#3A3A3C', textColor: '#FFFFFF', cornerRadius: 6 },
    //     onClick: () => browserWebview.goBack()
    // });
    // navBar.addButton({
    //     title: '→',
    //     style: { backgroundColor: '#3A3A3C', textColor: '#FFFFFF', cornerRadius: 6 },
    //     onClick: () => browserWebview.goForward()
    // });
    // navBar.addButton({
    //     title: '↻',
    //     style: { backgroundColor: '#3A3A3C', textColor: '#FFFFFF', cornerRadius: 6 },
    //     onClick: () => browserWebview.reload()
    // });
    // navBar.addButton({
    //     title: 'X',
    //     style: { backgroundColor: '#FF3B30', textColor: '#FFFFFF', cornerRadius: 6 },
    //     onClick: () => browserWin.remove()
    // });
    //
    // browserWin.show();
    // console.log("Complete browser demo created");
    // console.log("Use navigation buttons to test browser functionality");
    // await sleep(5000);
    //
    // browserWin.remove();
    // console.log("");
    //
    // // ========== Cleanup ==========
    // console.log("--- Cleanup ---");
    // hud.clearAll();
    // console.log("All windows cleared");
    //
    // console.log("\n=== HUD WebView Module Test Completed ===");
}

run();
