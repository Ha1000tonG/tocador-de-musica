const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');

const Im_Good = {
    songName: 'Im Good',
    artista: 'David Guetta',
    file: 'Im good'
};

const Deep_Down = {
    songName: 'Deep Down',
    artista: 'Alok',
    file: 'Deep Down'
};

const The_Business = {
    songName: 'The Business',
    artista: 'Tiesto',
    file: 'The Business'
};

let isPlaying = false;

/* Array */
const playlist = [Im_Good, Deep_Down, The_Business];
let index = 0;

/* Essa função faz tocar a musica mostrando o botão pause*/
function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

/* Essa função faz pausar a musica, mostrando o botão play */
function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

/* Essa função engloba as 2 funções acima para fazer a função de tocar e pausar a musica" */
function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function initializeSong() {
    cover.src = 'imagens/${playlist[index].file}.BMP';
    song.src = 'Musica/${playlist[index].file}.mp3';
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artista;
}

initializeSong();

play.addEventListener('click', playPauseDecider);