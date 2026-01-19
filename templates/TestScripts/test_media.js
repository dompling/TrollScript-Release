function assert(condition, message) {
    if (condition) {
        console.log(`✅ ${message}`);
    } else {
        console.error(`❌ ${message}`);
    }
}

async function run() {
    console.log("--- Testing Media Module ---");

    if (typeof media === 'undefined') {
        console.error("❌ Media module not found");
        return;
    }

    const isPlaying = media.isPlaying();
    console.log("Is Playing:", isPlaying);
    assert(typeof isPlaying === 'boolean', "isPlaying returns boolean");

    const state = media.getPlaybackState();
    console.log("Playback State:", state);

    const nowPlaying = media.getNowPlaying();
    console.log("Now Playing:", JSON.stringify(nowPlaying));

    const volume = media.getVolume();
    console.log("Volume:", volume);
    assert(typeof volume === 'number', "getVolume returns number");

    // media.togglePlayPause(); // Interactive

    console.log("--- Media Module Test Finished ---");
}

run();
