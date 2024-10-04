import * as THREE from "three";
import * as CANNON from "cannon-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import HumanScene from "./HumanScene";
import Menu from "./Menu";
import CannonDebugger from "cannon-es-debugger";

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
camera.position.set(0, 0, 15);
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
scene.add(new THREE.AxesHelper(8));

// Add physics. See: https://www.youtube.com/watch?v=Ht1JzJ6kB7g
const physicsWorld = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0),
});

const groundBody = new CANNON.Body({
  type: CANNON.Body.STATIC,
  shape: new CANNON.Plane(),
});

groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // rotate around x axis by 90 degrees, so it's flat
physicsWorld.addBody(groundBody);

const radius = 1;
const sphereBody = new CANNON.Body({
  mass: 5,
  shape: new CANNON.Sphere(radius),
});
sphereBody.position.set(0, 7, 0);
physicsWorld.addBody(sphereBody);

const geometry = new THREE.SphereGeometry(radius);
const material = new THREE.MeshNormalMaterial();
const sphereMesh = new THREE.Mesh(geometry, material);
scene.add(sphereMesh);

const boxBody = new CANNON.Body({
  mass: 5,
  shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1)),
});
boxBody.position.set(1, 10, 0);
physicsWorld.addBody(boxBody);

const boxGeometry = new THREE.BoxGeometry(2,2,2);
const boxMaterial = new THREE.MeshNormalMaterial();
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);

const cannonDebugger = new CannonDebugger(scene, physicsWorld, {});

function animate() {
  controls.update();
  scene.update();
  physicsWorld.fixedStep();
  cannonDebugger.update();

  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion);

  boxMesh.position.copy(boxBody.position);
  boxMesh.quaternion.copy(boxBody.quaternion);

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();
