// fetch the audio element, so I can control it
// this tag also has the path to the audio file
const audio = document.getElementById("backgroundAudio");
// this fetches the audio button
// the play atmosphere button
const audioToggle = document.getElementById("audioToggle");

audio.volume = 0.3;

async function checkAudio() {
  if (audio.paused) {
    await audio.play();
    audioToggle.classList.add("is-playing");
    audioToggle.lastChild.textContent = " Pause atmosphere";
  } else {
    audio.pause();
    audioToggle.classList.remove("is-playing");
    audioToggle.lastChild.textContent = " Play atmosphere";
  }
}

audioToggle.addEventListener("click", checkAudio);
