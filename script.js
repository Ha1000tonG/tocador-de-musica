const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

const ImGood = {
    songName: 'Im Good',
    artist: 'David Guetta',
    file: 'Imgood'
};

const DeepDown = {
    songName: 'Deep Down',
    artist: 'Alok',
    file: 'DeepDown'
};

const TheBusiness = {
    songName: 'The Business',
    artist: 'Tiesto',
    file: 'TheBusiness'
};

let isPlaying = false;

/* Array */
const playlist = [ImGood, DeepDown, TheBusiness];
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

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `imagens/${playlist[index].file}.webp`;
    song.src = `musica/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

function previousSong() {
    if (index === 0) {
        index = playlist.length - 1;
    } else {
        index -= 1;
        /* index = index - 1 outra maneira de usar */
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === playlist.length - 1) {
        index = 0;
    } else {
        index += 1;
        /* index = index + 1 outra maneira de usar */
    }
    initializeSong();
    playSong();
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);