/* Referencias para cada variavel */
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');


const ImGood = {
    songName: 'Im Good',
    artist: 'David Guetta',
    file: 'Imgood',
    liked: false
};

const DeepDown = {
    songName: 'Deep Down',
    artist: 'Alok',
    file: 'DeepDown',
    liked: false
};

const TheBusiness = {
    songName: 'The Business',
    artist: 'Tiesto',
    file: 'TheBusiness',
    liked: false
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

/* Array */
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [ImGood, DeepDown, TheBusiness];
/* JSON.parse = parametros para deixar armazenado as informações das musicas mesmo depois de fechar o navegador */
/* [ImGood, DeepDown, TheBusiness] comando substiuidos por JSON.parse */
/* ?? essa condição serve paa caso não houver o armazenamento dos dados no navegador ele consiga ter uma outra função para chamar os dados que nesse caso seria as musicas da playlist */

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

function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    } else {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function initializeSong() {
    cover.src = `imagens/${sortedPlaylist[index].file}.webp`;
    song.src = `musica/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender(); /*linha para chamar a função*/
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
function updateProgress() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
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

function toHHMMSS(originalNumber) {
    /* A função Math.floor retorna o menor número inteiro após a virgula. */
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);
    /*alert((esse parametro mostra um popup na tela)*/
    return `${hours.toString().padStart(2, '0')}:${min
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    /* ); */
}

function updateTotalTime() {
    toHHMMSS(song.duration);
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
    if (sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
    /* localStorage = armazenamento local do navegador / setItem = registra um item*/
    /* JSON.stringify = comando que transforma em string*/
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonCLicked);
repeatButton.addEventListener('click', repeatButtonClicket);
likeButton.addEventListener('click', likeButtonClicked);