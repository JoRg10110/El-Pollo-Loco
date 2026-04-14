let canvas;
let world;
let keyboard = new Keyboard();
let debugMode = false;
let intervalIds = [];
let i = 1;

coin_sound = new Audio('./audio/mixkit-winning-a-coin-video-game-2069.wav');
// hurt_sound = new Audio('./audio/Brrr-sound-effect.mp3');
endboss_warn = new Audio('./audio/Endboss_warn.mp3');
chicken_sound = new Audio('./audio/chicken_sound.mp3');



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
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('all-btn').classList.remove('d-none');
    
    checkHudVisibility();
    initLevel();
    init();
}

function restartGame() {
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('start_btn').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('all-btn').classList.remove('d-none');
    
    checkHudVisibility();
    initLevel();
    init();
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
    // Wir prüfen, ob der Start-Screen weg ist (also ob das Spiel läuft)
    let isGameRunning = document.getElementById('start-screen').classList.contains('d-none');
    
    if (isGameRunning) {
        checkHudVisibility();
    }
});