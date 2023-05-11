let quranContainer = document.querySelector('.quran-container');
let playBtn = document.querySelector('#play');
let prevBtn = document.querySelector('#prev');
let nextBtn = document.querySelector('#next');
let audio = document.querySelector('#audio');
let progressContainer = document.querySelector('.progress-container');
let progress = document.querySelector('.progress');
let title = document.querySelector('#title');
let cover = document.querySelector('#cover');

// Song Title
const songs = ['سورة الأخلاص', 'سورة الفلق'];

// Kepp track of songs
let songIndex = 0;

// Initially load song into DOM
loadsong(songs[songIndex]);

function loadsong(song) {
    title.innerHTML = song;
    audio.src = `quran/${song}.mp4`;
    cover.src = `img/${song}.jpg`;
}

// Play Song
function playSong() {
    quranContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove("fa-play");
    playBtn.querySelector('i.fas').classList.add("fa-pause");
    audio.play();
}

// PauseSong
function pauseSong() {
    quranContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add("fa-play");
    playBtn.querySelector('i.fas').classList.remove("fa-pause");
    audio.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadsong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadsong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setprogress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listener
playBtn.addEventListener('click', () => {
    const isPlaying = quranContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});


// Change events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setprogress);

audio.addEventListener('ended', nextSong);