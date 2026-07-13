/** @type {HTMLCanvasElement|undefined} Global reference link directly targeting the primary canvas drawing node. */
let canvas;

/** @type {World|undefined} Global instance manager driving the complete active gameplay environment. */
let world;

/** @type {Keyboard} Global instance mapping active system key inputs and hardware registers. */
let keyboard = new Keyboard();

/** @type {boolean} Global toggle controller turning wireframe boundary bounding wrappers on or off. */
let debugMode = false;

/** @type {number[]} Matrix storage collecting all active procedural loop interval reference markers. */
let intervalIds = [];

/** @type {number} Unused general purpose tracking iterator. */
let i = 1;


/**
 * Requests the domestic browser engine to elevate the canvas viewport element into standard native fullscreen layout mode.
 */
function goFullScreen() {
    let canvas = document.getElementById("canvas");
    if (canvas.requestFullscreen)
        canvas.requestFullscreen();
    else if (canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if (canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
}

/**
 * Sweeps main menu states, triggers initial level factory loads, binds core engine components, and launches game audio.
 */
function startGame() {
    initAudioState();

    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('all-btn').classList.remove('d-none');
    document.getElementById('top-buttons').classList.remove('d-none');

    
    background_music.play();
    checkHudVisibility();
    initLevel();
    init();
}

/**
 * Terminates all running game loop executions, resets scene models from factories, and triggers clean container reboots.
 */
function restartGame() {
    stopGame();
    
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('all-btn').classList.remove('d-none');
    document.getElementById('top-buttons').classList.remove('d-none');

    game_over_sound.pause();
    background_music.play();
    checkHudVisibility();
    initLevel();
    init();
}

/**
 * Directs viewport navigation flows back toward the master start screens, stopping physics tracks and freezing sounds.
 */
function goHome(){
    stopGame();

    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('hud').classList.add('d-none');
    document.getElementById('top-buttons').classList.add('d-none');
    document.getElementById('all-btn').classList.add('d-none');
    
    background_music.pause();
    background_music.currentTime = 0;
}

/**
 * Selects the domestic graphic viewport canvas context node and instantiates the main World supervisor thread.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); 
}

/**
 * Registers an execution script loop to global tracking systems, allowing safely managed bulk termination runs later.
 * @param {Function} fn - The callback script sequence function designed to execute iteratively.
 * @param {number} time - Interval timeout cycle frequency rate measured in milliseconds.
 */
function setStopGameInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
 * Loops across the complete registry list of active interval reference IDs, forcing clean engine cycle stops.
 */
function stopGame(){
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

/**
 * Evaluates active browser viewport display width limits to dynamically display mobile or desktop touch button layouts.
 */
function checkHudVisibility () {
    let hud = document.getElementById('hud');
    let allBtn = document.getElementById('all-btn');

    if (window.innerWidth <= 768) {
        hud.classList.remove('d-none');
        allBtn.classList.add('d-none');
    } else {
        hud.classList.add('d-none');
        allBtn.classList.remove('d-none');
    }
}

/**
 * Toggles the visibility of the game instructions overlay screen.
 */
function toggleInstructions() {
    let overlay = document.getElementById('instruction-overlay');
    if (overlay) {
        overlay.classList.toggle('d-none');
    }
}

/**
 * Toggles the visibility of the legal notice (Impressum) overlay screen.
 */
function toggleLegal() {
    let overlay = document.getElementById('legal-overlay');
    if (overlay) {
        overlay.classList.toggle('d-none');
    }
}

/**
 * Toggles the visibility of the privacy policy (Datenschutz) overlay screen.
 */
function togglePrivacy() {
    let overlay = document.getElementById('privacy-overlay');
    if (overlay) {
        overlay.classList.toggle('d-none');
    }
}

/**
 * Listens directly to domestic window mutation actions to automatically reflow overlay elements if a match context is active.
 */
window.addEventListener('resize', () => {
    let isGameRunning = document.getElementById('start-screen').classList.contains('d-none');
    let isGameOver = !document.getElementById('game-over-screen').classList.contains('d-none');
    
    // Läuft nur weiter, wenn das Spiel läuft UND nicht im Game Over State festsitzt
    if (isGameRunning && !isGameOver) {
        checkHudVisibility();
    }
});