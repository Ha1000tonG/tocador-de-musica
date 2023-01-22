const songName = document.getElementById('song-name');
const song = document.getElementById('audio')
const play = document.getElementById('play');

songName.innerText = 'Im Good';

function playsong() {
    song.play();
}

play.addEventListener('click', playsong);



