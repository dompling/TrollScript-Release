/**
 * Input Recording & Playback Test Script
 *
 * 手势录制与回放测试 — 带 HUD 交互控制面板
 * 功能：
 *   1. 浮窗控制面板（可拖拽）
 *   2. 开始 / 停止录制
 *   3. 录制状态实时反馈（计时 + 动画）
 *   4. 录制结果预览（事件数 + 手势识别）
 *   5. 一键回放录制的手势
 *   6. 查看生成的回放脚本
 */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    console.log("=== Input Recording & Playback Test ===\n");

    // ── 屏幕尺寸 ──
    const screen = input.getScreenSize();
    console.log("Screen:", JSON.stringify(screen));

    // ── 状态 ──
    let recordingResult = null;   // stopRecording() 返回值
    let timerInterval = null;     // 计时器
    let recordStartTime = 0;      // 录制开始时间

    // ── 创建控制面板 ──
    const panelWidth = 280;
    const panelHeight = 260;
    const win = hud.createWindow({
        id: 'recorder-panel',
        width: panelWidth,
        height: panelHeight,
        x: (screen.width - panelWidth) / 2,
        y: screen.height - panelHeight - 80,
        draggable: true,
        style: {
            backgroundColor: '#1A1A1EF2',
            cornerRadius: 20,
            padding: 16,
            shadow: true
        }
    });

    // ── 标题栏 ──
    const headerStack = win.addStack({axis: 'horizontal', spacing: 8, alignment: 'center'});
    headerStack.addImage({systemName: 'record.circle', width: 18, height: 18});
    headerStack.addText({
        text: 'Gesture Recorder',
        style: {textColor: '#FFFFFF', fontSize: 17, fontWeight: 'bold'}
    });

    win.addSpacer({height: 10});

    // ── 状态显示区 ──
    const statusText = win.addText({
        text: 'Ready — tap Record to start',
        style: {textColor: '#8E8E93', fontSize: 13}
    });

    win.addSpacer({height: 4});

    const timerText = win.addText({
        text: '00:00',
        style: {textColor: '#FFFFFF44', fontSize: 28, fontWeight: 'bold'}
    });

    win.addSpacer({height: 4});

    const resultText = win.addText({
        text: '',
        style: {textColor: '#8E8E93', fontSize: 12}
    });

    win.addSpacer({height: 12});

    // ── 录制指示器（红色 loading） ──
    const indicator = win.addLoading({
        style: 'small',
        color: '#FF3B30',
        hidesWhenStopped: true,
        isAnimating: false
    });

    win.addSpacer({height: 12});

    // ── 按钮行 1: Record / Stop ──
    const row1 = win.addStack({axis: 'horizontal', spacing: 12});

    const recordBtn = row1.addButton({
        title: 'Record',
        style: {
            backgroundColor: '#FF3B30',
            textColor: '#FFFFFF',
            fontSize: 15,
            cornerRadius: 10,
            padding: 10
        },
        onClick: () => {
            startRecording();
        }
    });

    const stopBtn = row1.addButton({
        title: 'Stop',
        style: {
            backgroundColor: '#3A3A3C',
            textColor: '#FFFFFF88',
            fontSize: 15,
            cornerRadius: 10,
            padding: 10
        },
        onClick: () => {
            stopRecording();
        }
    });

    win.addSpacer({height: 8});

    // ── 按钮行 2: Replay / Script / Close ──
    const row2 = win.addStack({axis: 'horizontal', spacing: 10});

    const replayBtn = row2.addButton({
        title: 'Replay',
        style: {
            backgroundColor: '#2C2C2E',
            textColor: '#FFFFFF66',
            fontSize: 14,
            cornerRadius: 10,
            padding: 8
        },
        onClick: () => {
            replayGestures();
        }
    });

    const scriptBtn = row2.addButton({
        title: 'Script',
        style: {
            backgroundColor: '#2C2C2E',
            textColor: '#FFFFFF66',
            fontSize: 14,
            cornerRadius: 10,
            padding: 8
        },
        onClick: () => {
            showScript();
        }
    });

    row2.addButton({
        title: 'Close',
        style: {
            backgroundColor: '#2C2C2E',
            textColor: '#FF453A',
            fontSize: 14,
            cornerRadius: 10,
            padding: 8
        },
        onClick: () => {
            cleanup();
        }
    });

    win.show();
    console.log("Control panel displayed\n");

    // ══════════════════════════════════
    // 功能函数
    // ══════════════════════════════════

    function formatTime(ms) {
        const totalSec = Math.floor(ms / 1000);
        const min = String(Math.floor(totalSec / 60)).padStart(2, '0');
        const sec = String(totalSec % 60).padStart(2, '0');
        return min + ':' + sec;
    }

    function startRecording() {
        if (input.isRecording()) {
            console.warn("Already recording");
            return;
        }

        // 清除上次结果
        recordingResult = null;

        // 开始录制
        input.startRecording();
        recordStartTime = Date.now();
        console.log("Recording started...");

        // UI 反馈
        statusText.setText('Recording... perform gestures now');
        statusText.setStyle({textColor: '#FF3B30'});
        timerText.setStyle({textColor: '#FF3B30'});
        resultText.setText('');
        indicator.start();

        // 按钮状态
        recordBtn.setStyle({backgroundColor: '#3A3A3C', textColor: '#FFFFFF44'});
        stopBtn.setStyle({backgroundColor: '#FF3B30', textColor: '#FFFFFF'});
        replayBtn.setStyle({backgroundColor: '#2C2C2E', textColor: '#FFFFFF66'});
        scriptBtn.setStyle({backgroundColor: '#2C2C2E', textColor: '#FFFFFF66'});

        // 启动计时器
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            const elapsed = Date.now() - recordStartTime;
            timerText.setText(formatTime(elapsed));
        }, 500);
    }

    function stopRecording() {
        if (!input.isRecording()) {
            console.warn("Not recording");
            return;
        }

        // 停止计时器
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }

        // 停止录制
        recordingResult = input.stopRecording();
        const elapsed = Date.now() - recordStartTime;
        console.log("Recording stopped");
        console.log("Events:", recordingResult.events.length);
        console.log("Duration:", formatTime(elapsed));

        // UI 反馈
        indicator.stop();
        statusText.setText('Recording complete');
        statusText.setStyle({textColor: '#34C759'});
        timerText.setText(formatTime(elapsed));
        timerText.setStyle({textColor: '#FFFFFF'});

        // 分析结果
        const eventCount = recordingResult.events.length;
        const scriptLines = recordingResult.script.split('\n').filter(l => !l.startsWith('//') && l.trim());
        const gestureCount = scriptLines.length;

        resultText.setText(
            eventCount + ' events | ' + gestureCount + ' gestures recognized'
        );
        resultText.setStyle({textColor: '#FFFFFFAA'});

        // 按钮状态
        recordBtn.setStyle({backgroundColor: '#FF3B30', textColor: '#FFFFFF'});
        stopBtn.setStyle({backgroundColor: '#3A3A3C', textColor: '#FFFFFF88'});

        if (eventCount > 0) {
            replayBtn.setStyle({backgroundColor: '#007AFF', textColor: '#FFFFFF'});
            scriptBtn.setStyle({backgroundColor: '#5856D6', textColor: '#FFFFFF'});
        }

        // 打印生成的脚本到控制台
        console.log("\n--- Generated Script ---");
        console.log(recordingResult.script);
        console.log("--- End Script ---\n");
    }

    function replayGestures() {
        if (!recordingResult || !recordingResult.script) {
            statusText.setText('No recording to replay');
            statusText.setStyle({textColor: '#FF9500'});
            return;
        }

        const script = recordingResult.script;
        const lines = script.split('\n').filter(l => !l.startsWith('//') && l.trim());

        if (lines.length === 0) {
            statusText.setText('No gestures to replay');
            statusText.setStyle({textColor: '#FF9500'});
            return;
        }

        statusText.setText('Replaying ' + lines.length + ' gestures...');
        statusText.setStyle({textColor: '#007AFF'});
        replayBtn.setStyle({backgroundColor: '#3A3A3C', textColor: '#FFFFFF44'});

        console.log("Replaying gestures...");

        try {
            // Reason: 逐行执行生成的回放脚本
            // 每行都是独立的 input.xxx() 或 util.sleep() 调用
            for (const line of lines) {
                const trimmed = line.trim().replace(/;$/, '');
                if (!trimmed) continue;

                console.log("  > " + trimmed);

                // 解析并执行每条命令
                if (trimmed.startsWith('input.tap(')) {
                    const args = parseArgs(trimmed);
                    if (args.length >= 2) input.tap(args[0], args[1]);
                } else if (trimmed.startsWith('input.longPress(')) {
                    const args = parseArgs(trimmed);
                    if (args.length >= 3) input.longPress(args[0], args[1], args[2]);
                } else if (trimmed.startsWith('input.swipe(')) {
                    const args = parseArgs(trimmed);
                    if (args.length >= 5) input.swipe(args[0], args[1], args[2], args[3], args[4]);
                    else if (args.length >= 4) input.swipe(args[0], args[1], args[2], args[3]);
                } else if (trimmed.startsWith('input.drag(')) {
                    const args = parseArgs(trimmed);
                    if (args.length >= 5) input.drag(args[0], args[1], args[2], args[3], args[4]);
                    else if (args.length >= 4) input.drag(args[0], args[1], args[2], args[3]);
                } else if (trimmed.startsWith('util.sleep(')) {
                    const args = parseArgs(trimmed);
                    if (args.length >= 1) util.sleep(args[0]);
                }
            }

            statusText.setText('Replay complete');
            statusText.setStyle({textColor: '#34C759'});
            console.log("Replay finished");
        } catch (e) {
            statusText.setText('Replay error: ' + e.message);
            statusText.setStyle({textColor: '#FF3B30'});
            console.error("Replay error:", e);
        }

        replayBtn.setStyle({backgroundColor: '#007AFF', textColor: '#FFFFFF'});
    }

    /**
     * 从函数调用字符串中提取数字参数
     * 例: "input.tap(100, 200)" → [100, 200]
     */
    function parseArgs(callStr) {
        const match = callStr.match(/\(([^)]*)\)/);
        if (!match) return [];
        return match[1].split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    }

    function showScript() {
        if (!recordingResult || !recordingResult.script) {
            statusText.setText('No recording available');
            statusText.setStyle({textColor: '#FF9500'});
            return;
        }

        // 创建脚本预览浮窗
        const scriptWin = hud.createWindow({
            id: 'script-preview',
            width: 320,
            height: 360,
            x: (screen.width - 320) / 2,
            y: 80,
            draggable: true,
            style: {
                backgroundColor: '#1A1A1EF5',
                cornerRadius: 16,
                padding: 14,
                shadow: true
            }
        });

        // 标题
        const titleRow = scriptWin.addStack({axis: 'horizontal', spacing: 8, alignment: 'center'});
        titleRow.addImage({systemName: 'doc.text', width: 14, height: 14});
        titleRow.addText({
            text: 'Generated Replay Script',
            style: {textColor: '#FFFFFF', fontSize: 14, fontWeight: 'bold'}
        });

        scriptWin.addSpacer({height: 8});

        // 脚本内容（滚动区域）
        const scroll = scriptWin.addScrollView({
            direction: 'vertical',
            height: 260,
            spacing: 2
        });

        const scriptLines = recordingResult.script.split('\n');
        for (const line of scriptLines) {
            const isComment = line.trim().startsWith('//');
            scroll.addText({
                text: line || ' ',
                style: {
                    textColor: isComment ? '#6A9955' : '#D4D4D4',
                    fontSize: 11
                }
            });
        }

        scriptWin.addSpacer({height: 8});

        // 关闭按钮
        scriptWin.addButton({
            title: 'Close Preview',
            style: {
                backgroundColor: '#3A3A3C',
                textColor: '#FFFFFF',
                fontSize: 13,
                cornerRadius: 8,
                padding: 6
            },
            onClick: () => {
                scriptWin.remove();
            }
        });

        scriptWin.show();
        console.log("Script preview opened");
    }

    function cleanup() {
        // 确保停止录制
        if (input.isRecording()) {
            input.stopRecording();
        }
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        hud.clearAll();
        console.log("Cleanup done, all windows closed");
    }

    // ── 保持脚本运行（等待用户交互） ──
    // Reason: HUD 按钮的 onClick 回调依赖脚本上下文存活
    // 使用 sleep 循环让脚本保持活跃，直到面板被关闭
    console.log("Waiting for user interaction...");
    console.log("Tip: drag the panel to move it out of the way before recording\n");

    while (hud.getWindow('recorder-panel')) {
        await sleep(1000);
    }

    console.log("\n=== Test Finished ===");
}

run();
