import * as THREE from "three";

const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.AudioLoader();
sound.load("sounds/someSound.mp3", function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});
