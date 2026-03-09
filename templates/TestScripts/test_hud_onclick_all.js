/**
 * HUD onClick All Elements Test
 *
 * 覆盖所有支持 onClick 的 HUD 元素：
 * - Text (config.onClick / element.onClick)
 * - Button (config.onClick / element.onClick)
 * - Image (window.addImage / stack.addImage，均含显式尺寸)
 * - Stack (含父子事件阻断)
 * - ScrollView (scroll.onClick + 子元素 onClick)
 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    console.log("=== HUD onClick All Elements Test ===");

    if (typeof hud === "undefined") {
        console.error("❌ hud module not found");
        return;
    }

    const windowId = "onclick-all-elements-test";
    const oldWin = hud.getWindow(windowId);
    if (oldWin) {
        oldWin.remove();
        await sleep(120);
    }

    const screen = hud.getScreenSize();
    const winWidth = 360;
    const winHeight = 560;
    const x = Math.max(8, (screen.width - winWidth) / 2);
    const y = Math.max(40, (screen.height - winHeight) / 2);

    const win = hud.createWindow({
        id: windowId,
        width: winWidth,
        height: winHeight,
        x: x,
        y: y,
        draggable: true,
        style: {
            backgroundColor: "#111318EE",
            cornerRadius: 16,
            padding: 12,
            shadow: true
        }
    });

    const counters = {
        textConfig: 0,
        textMethod: 0,
        buttonConfig: 0,
        buttonMethod: 0,
        imageWindow: 0,
        imageStackConfig: 0,
        imageStackMethod: 0,
        stackOuter: 0,
        stackInner: 0,
        scroll: 0,
        scrollChild: 0
    };

    const title = win.addText({
        text: "HUD onClick 全量回归",
        style: { textColor: "#FFFFFF", fontSize: 17, fontWeight: "bold" }
    });
    title.onClick(() => bump("textMethod", "title.onClick()"));

    win.addText({
        text: "依次点击下面元素，观察计数变化",
        style: { textColor: "#A5ADBA", fontSize: 12 }
    });
    win.addSpacer({ height: 8 });

    const summaryText = win.addText({
        text: "",
        style: { textColor: "#7EE787", fontSize: 11 }
    });
    const lastEventText = win.addText({
        text: "Last: -",
        style: { textColor: "#8B949E", fontSize: 11 }
    });
    updateSummary();
    win.addSpacer({ height: 8 });

    // Text: config.onClick
    win.addText({
        text: "Text(config.onClick) 点我",
        style: { textColor: "#58A6FF", fontSize: 14 },
        onClick: () => bump("textConfig", "text config.onClick")
    });

    // Text: element.onClick
    const textByMethod = win.addText({
        text: "Text(.onClick) 点我",
        style: { textColor: "#58A6FF", fontSize: 14 }
    });
    textByMethod.onClick(() => bump("textMethod", "text .onClick()"));

    win.addSpacer({ height: 8 });

    // Button: config.onClick
    win.addButton({
        title: "Button(config.onClick)",
        style: { backgroundColor: "#1F6FEB", textColor: "#FFFFFF", cornerRadius: 8 },
        onClick: () => bump("buttonConfig", "button config.onClick")
    });

    // Button: element.onClick
    const btnMethod = win.addButton({
        title: "Button(.onClick)",
        style: { backgroundColor: "#238636", textColor: "#FFFFFF", cornerRadius: 8 }
    });
    btnMethod.onClick(() => bump("buttonMethod", "button .onClick()"));

    win.addSpacer({ height: 10 });

    // Image: window.addImage + config.onClick (explicit size => container path)
    const imageRow = win.addStack({ axis: "horizontal", spacing: 8, alignment: "center" });
    imageRow.addText({
        text: "Image(window.addImage):",
        style: { textColor: "#C9D1D9", fontSize: 12 }
    });
    win.addImage({
        systemName: "hand.tap.fill",
        width: 34,
        height: 34,
        onClick: () => bump("imageWindow", "window image config.onClick")
    });

    // Image in stack: config.onClick + method.onClick (explicit size => critical path)
    const stackImageRow = win.addStack({ axis: "horizontal", spacing: 8, alignment: "center" });
    stackImageRow.addText({
        text: "Image(stack.addImage):",
        style: { textColor: "#C9D1D9", fontSize: 12 }
    });
    stackImageRow.addImage({
        systemName: "star.fill",
        width: 28,
        height: 28,
        onClick: () => bump("imageStackConfig", "stack image config.onClick")
    });
    const stackImageMethod = stackImageRow.addImage({
        systemName: "heart.fill",
        width: 28,
        height: 28
    });
    stackImageMethod.onClick(() => bump("imageStackMethod", "stack image .onClick()"));

    win.addSpacer({ height: 10 });

    // Stack onClick + child block
    const outer = win.addStack({
        axis: "horizontal",
        spacing: 8,
        style: {
            backgroundColor: "#30363D",
            cornerRadius: 8,
            padding: 8
        },
        onClick: () => bump("stackOuter", "outer stack")
    });
    outer.addText({
        text: "Outer stack area",
        style: { textColor: "#FFFFFF", fontSize: 13 }
    });
    const inner = outer.addText({
        text: "Inner child (priority)",
        style: { textColor: "#FFB86B", fontSize: 13 }
    });
    inner.onClick(() => bump("stackInner", "inner child text"));

    win.addSpacer({ height: 10 });

    // ScrollView onClick
    const scroll = win.addScrollView({
        direction: "vertical",
        height: 120,
        spacing: 6,
        style: {
            backgroundColor: "#0D1117",
            cornerRadius: 8
        }
    });
    scroll.onClick(() => bump("scroll", "scroll view blank area"));
    scroll.addText({
        text: "ScrollView: tap blank area -> scroll.onClick",
        style: { textColor: "#8B949E", fontSize: 12 }
    });
    scroll.addButton({
        title: "Scroll Child Button",
        style: { backgroundColor: "#5A4FCF", textColor: "#FFFFFF", cornerRadius: 6 },
        onClick: () => bump("scrollChild", "scroll child button")
    });
    for (let i = 0; i < 3; i++) {
        scroll.addText({
            text: `Filler line ${i + 1}`,
            style: { textColor: "#6E7681", fontSize: 12 }
        });
    }

    win.addSpacer({ height: 10 });

    const opRow = win.addStack({ axis: "horizontal", spacing: 8 });
    opRow.addButton({
        title: "Reset Counters",
        style: { backgroundColor: "#3A3A3C", textColor: "#FFFFFF", cornerRadius: 8 },
        onClick: () => {
            Object.keys(counters).forEach(k => {
                counters[k] = 0;
            });
            updateSummary();
            lastEventText.setText("Last: reset");
            console.log("[onClick-test] counters reset");
        }
    });
    opRow.addButton({
        title: "Close",
        style: { backgroundColor: "#DA3633", textColor: "#FFFFFF", cornerRadius: 8 },
        onClick: () => {
            win.remove();
        }
    });

    win.show();
    console.log("✅ HUD onClick test window shown");
    console.log("请手动点击各元素进行回归测试。");

    while (hud.getWindow(windowId)) {
        await sleep(1000);
    }

    console.log("=== HUD onClick All Elements Test Finished ===");

    function bump(key, source) {
        counters[key] += 1;
        updateSummary();
        const line = `Last: ${source} -> ${counters[key]}`;
        lastEventText.setText(line);
        console.log(`[onClick-test] ${line}`);
    }

    function updateSummary() {
        const text =
            `text:${counters.textConfig}/${counters.textMethod} ` +
            `btn:${counters.buttonConfig}/${counters.buttonMethod} ` +
            `img:${counters.imageWindow}/${counters.imageStackConfig}/${counters.imageStackMethod} ` +
            `stack:${counters.stackOuter}/${counters.stackInner} ` +
            `scroll:${counters.scroll}/${counters.scrollChild}`;
        summaryText.setText(text);
    }
}

run();
