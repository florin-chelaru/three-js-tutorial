import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import HumanScene from "./HumanScene";
import Menu from "./Menu";

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
camera.position.set(0, 0, 5);
// camera.lookAt(0,0,0);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 5, 5);
// light.target.position.set(0, 0, 0);
camera.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const scene = new HumanScene();
scene.initialize();
scene.add(camera);

scene.add(new Menu(4, 3));

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  scene.update();

  renderer.render(scene, camera);
}

animate();
