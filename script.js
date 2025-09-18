// shit ton of constants
const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const currTime = document.querySelector("#currTime");
const durTime = document.querySelector("#durTime");

// list the titles
const songs = ["killing-an-afternoon", "anirak", "g.o.a.t", "do-you-read-me", "philophobia", "good-looking", "telephone", "ates-edecek-misin", "super-ask-sarkisi", "melissa", "stress-relief", "origami", "from-the-gallows", "dilerim-ki", "hakkinda-her-seyi-duymak-istiyorum"];

// which song it starts with
let songIndex = 0;

//  load song details
loadSong(songs[songIndex]);

// update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.opus`;
}

// play
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

// pause
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

// go back
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// go forward
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// update
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (duration) {
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
  }
}

// progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
}

// get duration and current time 
function DurTime(e) {
  const { duration, currentTime } = e.srcElement;

  // current time
  const currMin = Math.floor(currentTime / 60) || 0;
  const currSec = Math.floor(currentTime % 60) || 0;
  currTime.innerHTML = `${currMin.toString().padStart(2, "0")}:${currSec
    .toString()
    .padStart(2, "0")}`;

  // duration
  if (duration && !isNaN(duration)) {
    const durMin = Math.floor(duration / 60);
    const durSec = Math.floor(duration % 60);
    durTime.innerHTML = `${durMin.toString().padStart(2, "0")}:${durSec
      .toString()
      .padStart(2, "0")}`;
  } else {
    durTime.innerHTML = "00:00";
  }
}

playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// change
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// update
audio.addEventListener("timeupdate", updateProgress);

// click progress
progressContainer.addEventListener("click", setProgress);

// ends
audio.addEventListener("ended", nextSong);

// time
audio.addEventListener("timeupdate", DurTime);