import { MusicList } from "./data.js";
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const audio = document.querySelector(".audio-play");
const musicInform = document.querySelector(".music-inform");
const maxDuration = document.querySelector(".maxDuration");
const rangeInput = document.querySelector(".time");
const startDuration = document.querySelector(".startDuration");
let index = 0;
const pauseAudio = () => {
  play.classList.remove("active");
  pause.classList.add("active");
  audio.pause();
};

function playAudio() {
  play.classList.add("active");
  pause.classList.remove("active");
  audio.play();
}
function forwardMusic() {
  if (index == MusicList.length - 1) {
    index = 0;
  } else {
    index++;
  }
  Music(index);
  playAudio(index);
}
function Music(index) {
  audio.src = `./audio/${MusicList[index].musicPath}`;

  musicInform.innerHTML = `
  <img src="./images/${MusicList[index].imagePath}" alt="singer" class="singer-image">
  <div>
    <p class="artist-name">${MusicList[index].artistName}</p>
    <marquee direction="left" class="song-name">${MusicList[index].musicName}</marquee>
  </div>
`;
  maxDuration.innerHTML = MusicList[index].maxDuration;
  rangeInput.max = MusicList[index].duration;
}
window.addEventListener("DOMContentLoaded", () => {
  Music(index);
});
function backwardMusic() {
  if (index == 0) {
    index = MusicList.length - 1;
  } else {
    index--;
  }
  Music(index);
  playAudio(index);
}

play.addEventListener("click", playAudio);
pause.addEventListener("click", pauseAudio);
forward.addEventListener("click", forwardMusic);
backward.addEventListener("click", backwardMusic);
audio.addEventListener("timeupdate", () => {
  let mn = Math.trunc(audio.currentTime / 60);
  let sn = Math.trunc(audio.currentTime % 60);
  startDuration.innerHTML = `${mn >= 10 ? mn : "0" + mn}:${
    sn >= 10 ? sn : "0" + sn
  }`;
  rangeInput.value = audio.currentTime;
});
rangeInput.addEventListener("input", () => {
  audio.currentTime = rangeInput.value;
});
audio.addEventListener("ended",()=>{
  forwardMusic()
})
