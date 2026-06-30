let isMuted = localStorage.getItem('gameMuted') === 'true';

const background_music = new Audio('audio/646873__audiomirage__willardz-saloon.wav');
background_music.loop = true;
background_music.volume = 0.5;

const game_over_sound = new Audio('audio/797743__sergequadrado__western-loop.wav');
game_over_sound.loop = true;
game_over_sound.volume = 0.5;

const coin_sound = new Audio('audio/mixkit-winning-a-coin-video-game-2069.wav');
coin_sound.volume = 0.5;

const bottle_sound = new Audio('audio/844511__sinny__item_equip_short.wav');
bottle_sound.volume = 0.5;
const bottle_splash_sound = new Audio('audio/universfield-glass-bottle-breaking-351297.mov');
bottle_splash_sound.volume = 0.5;

const hurt_sound = new Audio('audio/Brrr-sound-effect.mp3');
hurt_sound.volume = 0.5;

const pepe_walk_sound = new Audio("audio/107623__stintx__running01.wav");
pepe_walk_sound.volume = 0.5;

let allSounds = [
    background_music,
    game_over_sound,
    coin_sound,
    bottle_sound,
    bottle_splash_sound,
    hurt_sound,
    pepe_walk_sound,
]

function initAudioState() {
    applyMuteState();

    let savedVolume = localStorage.getItem('gameVolume')  || 0.5;
    changeVolume(savedVolume);
}

function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('gameMuted', isMuted);
    applyMuteState();
}

function applyMuteState() {
    let muteIcon = document.getElementById('mute-icon');

    allSounds.forEach(sound => {
        if (sound) sound.muted = isMuted;
    });

    if (muteIcon) {
        muteIcon.src = isMuted ? "./img/btn/Mute.png" : "./img/btn/Volume.png";
    }
}

function changeVolume(volumeValue) {
    localStorage.setItem('gameVolume', volumeValue);
    allSounds.forEach(sound => {
        if (sound) sound.volume = volumeValue;
    });
}

function toggleSettingsOverlay() {
    let overlay = document.getElementById('settings-overlay');
    overlay.classList.toggle('d-none');
    
    if (!overlay.classList.contains('d-none')) {
        let savedVolume = localStorage.getItem('gameVolume') || 0.5;
        document.getElementById('volume-slider').value = savedVolume;
    }
}

function changeVolume(volumeValue) {
    localStorage.setItem('gameVolume', volumeValue);
    allSounds.forEach(sound => {
        if (sound) sound.volume = volumeValue;
    });
}