import * as THREE from "three";
import BlasterScene from "./BlasterScene";

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("app") as HTMLCanvasElement,
});
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(
  60, // field of view (default is 50, unity uses 60)
  width / height, // aspect ratio
  0.1, // near
  100 // far
);

const scene = new BlasterScene();

scene.initialize();

renderer.render(scene, camera);

function tick() {
//   scene.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
