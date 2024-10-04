import * as THREE from "three";

export default class WorldScene extends THREE.Scene {
    initialize() {
        // Create a cube
        const geometry = new THREE.BoxGeometry(1, 2, 0.5);
        const material = new THREE.MeshPhongMaterial({ color: 0xffad00 });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, -3, -10);

        // const human = new Human();
        // human.position.set(0, 0, 0);

        // this.add(human);
    }

    update() {
        // const human = this.children[0] as Human;
        // human.swingLeftArm();
        // human.swingRightArm();
    }
}
