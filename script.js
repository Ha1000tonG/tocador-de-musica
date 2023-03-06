/* Referencias para cada variavel */
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');


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
let isShuffled = false;
let repeatOn = false;

/* Array */
const originalPlaylist = [ImGood, DeepDown, TheBusiness];

/* ... spred - espalha a playlist */
let sortedPlaylist = [...originalPlaylist];

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
    cover.src = `imagens/${sortedPlaylist[index].file}.webp`;
    song.src = `musica/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    } else {
        index -= 1;
        /* index = index - 1 outra maneira de usar */
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    } else {
        index += 1;
        /* index = index + 1 outra maneira de usar */
    }
    initializeSong();
    playSong();
}

/* função para progressão da barra confome a musica*/
function updateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}
/* função para pular a musica clicando na barra de progressão*/
function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

/* função que embaralha o array */
function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length; /* length indica o tamanho do array */
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        /*ao gerar um numero aleatorio o floor ignora tudo que estiver depois da virgula*/
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonCLicked() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    } else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonClicket() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    } else {
        playSong();
    }
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonCLicked);
repeatButton.addEventListener('click', repeatButtonClicket);