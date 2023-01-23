const songName = document.getElementById('song-name');
const BandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');

const Im_Good = {
    songName: 'Im Good',
    artist: 'David Guetta',
    file: 'im good'
};

const Deep_Down = {
    songName: 'Deep Down',
    artist: 'Alok',
    file: 'Deep Down'
};

const The_Business = {
    songName: 'The Business',
    artist: 'Tiesto',
    file: 'The Business'
};

let isPlaying = false;

/* Array */
const playlist = [Im_Good, Deep_Down, The_Business];
let index = 0;

/* Essa função faz tocar a musica mostrando o botão pause*/
function playsong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

/* Essa função faz pausar a musica, mostrando o botão play */
function pausesong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

/* Essa função engloba as 2 funções acima para fazer a função de tocar e pausar a musica" */
function playPauseDecider() {
    if (isPlaying === true) {
        pausesong();
    } else {
        playsong();
    }
}

function initializeSong() {
    cover.src = 'imagens/${playlist[index].file}.pmg';
    song.src = 'Musica/${playlist[index].file}.mp3';
    songName.innerText = playlist[index].songName;
    BandName.innerText = playlist[index].artist;
}

initializeSong();

play.addEventListener('click', playPauseDecider);