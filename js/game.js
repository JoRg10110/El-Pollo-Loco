let canvas;
let world;
let keyboard = new Keyboard();
let debugMode = false;
let intervalIds = [];
let i = 1;


function goFullScreen() {
    let canvas = document.getElementById("canvas");
    if (canvas.requestFullscreen)
        canvas.requestFullscreen();
    else if (canvas.webkitRequestFullScreen)
        canvas.webkitRequestFullScreen();
    else if (canvas.mozRequestFullScreen)
        canvas.mozRequestFullScreen();
}

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

function restartGame() {
    stopGame();

    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('all-btn').classList.remove('d-none');
    document.getElementById('top-buttons').classList.remove('d-none');

    checkHudVisibility();
    initLevel();
    init();
}

function goHome(){
    stopGame();

    // Screens umschalten
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('game-over-screen').classList.add('d-none');
    
    // HUD und In-Game-Buttons verstecken
    document.getElementById('hud').classList.add('d-none');
    document.getElementById('top-buttons').classList.add('d-none');
    document.getElementById('all-btn').classList.add('d-none');
    
    // Musik stoppen oder zurücksetzen, falls gewünscht
    background_music.pause();
    background_music.currentTime = 0;
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); 
}

function setStopGameInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopGame(){
    intervalIds.forEach(clearInterval);
    intervalIds = [];
}

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

window.addEventListener('resize', () => {
    let isGameRunning = document.getElementById('start-screen').classList.contains('d-none');
    
    if (isGameRunning) {
        checkHudVisibility();
    }
});