import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

export default class MyScene extends THREE.Scene {
  private readonly mtlLoader = new MTLLoader();
  private readonly objLoader = new OBJLoader();

  async initialize() {
    const targetMtl = await this.mtlLoader.loadAsync("assets/targetA.mtl");
    targetMtl.preload();

    const target = await this.createTarget(targetMtl);
    target.position.set(0, 1, -3);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 4, 2);

    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshPhongMaterial({ color: 0xffad00 });

    // const cube = new THREE.Mesh(geometry, material);
    // cube.position.set(0, 1, -5);

    this.add(target, light);
  }

  private async createTarget(mtl: MTLLoader.MaterialCreator) {
    this.objLoader.setMaterials(mtl);
    const modelRoot = await this.objLoader.loadAsync("assets/targetA.obj");
    modelRoot.rotateY(Math.PI * 0.5);

    return modelRoot;
  }

  update() {
    // Rotate the cube
    // const target = this.children[0] as THREE.Mesh;
    // target.rotation.x += 0.01;
    // target.rotation.y += 0.01;
  }
}
