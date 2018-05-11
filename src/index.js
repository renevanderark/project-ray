import Controls from "./Controls";
import GameLoop from "./GameLoop";
import Player from "./Player";
import Map from "./Map";
import Camera from "./Camera";
import noiseTexture from "./noise-texture";

const display = document.getElementById('test-canvas');
const player = new Player(1500.2, 1500.2, Math.PI * 0.3);
const map = new Map(3200, noiseTexture("texture", "#ddaa00"));
const camera = new Camera(display, 320, 0.8);
const controls = new Controls();
const loop = new GameLoop();

map.randomize();

let seconds = 0;

loop.start((seconds) => {
  display.getContext('2d').clearRect(0,0,display.width, display.height);
  map.update(seconds);
  player.update(controls.states, map, seconds);
  camera.render(player, map);
//  document.getElementById("app").innerHTML = JSON.stringify(controls.states);
});
