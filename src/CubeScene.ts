import * as THREE from "three";

export default class MyScene extends THREE.Scene {
  initialize() {
    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color: 0xffad00 });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 1, -5);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 4, 2);

    this.add(cube, light);
  }

  update() {
    // Rotate the cube
    const cube = this.children[0] as THREE.Mesh;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }
}
