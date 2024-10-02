import * as THREE from "three";
import { degrees } from "./utils";

export class Human extends THREE.Group {
  public head: THREE.Mesh;
  public torso: THREE.Mesh;
  public leftArmPivot: THREE.Object3D; // Pivot for the left arm
  public rightArmPivot: THREE.Object3D; // Pivot for the left arm
  public leftArm: THREE.Mesh;
  public rightArm: THREE.Mesh;
  public leftLeg: THREE.Mesh;
  public rightLeg: THREE.Mesh;

  private step: number = 0.01;
  private initialRotation = 0;
  private rotationAngle = degrees(20);

  constructor() {
    super(); // Call the parent constructor (THREE.Group)

    const humanMaterial = new THREE.MeshPhongMaterial({ color: 0xddddff });

    // Create head
    const headGeometry = new THREE.BoxGeometry(1, 1, 1);
    this.head = new THREE.Mesh(headGeometry, humanMaterial);
    this.head.position.y = 1.75;

    // Create torso
    const torsoGeometry = new THREE.BoxGeometry(1, 2, 1);
    this.torso = new THREE.Mesh(torsoGeometry, humanMaterial);

    // Create pivot for arms
    this.leftArmPivot = new THREE.Object3D();
    this.leftArmPivot.position.set(-0.625, 1, 0); // Set pivot position

    this.rightArmPivot = new THREE.Object3D();
    this.rightArmPivot.position.set(0.625, 1, 0);

    // Create left arm and add it to the pivot
    const armGeometry = new THREE.BoxGeometry(0.25, 1, 0.5);
    this.leftArm = new THREE.Mesh(armGeometry, humanMaterial);
    this.leftArm.position.set(-0.125, -0.5, 0); // Position relative to the pivot
    this.leftArmPivot.add(this.leftArm); // Add left arm to the pivot
    this.leftArmPivot.rotation.x = this.initialRotation;

    // Create right arm
    this.rightArm = new THREE.Mesh(armGeometry, humanMaterial);
    this.rightArm.position.set(0.125, -0.5, 0); // Position right arm
    this.rightArmPivot.add(this.rightArm);
    this.rightArmPivot.rotation.x = -this.initialRotation;

    // Create legs
    const legGeometry = new THREE.BoxGeometry(0.25, 1, 0.5);
    this.leftLeg = new THREE.Mesh(legGeometry, humanMaterial);
    this.leftLeg.position.set(-0.25, -1.75, 0);

    this.rightLeg = new THREE.Mesh(legGeometry, humanMaterial);
    this.rightLeg.position.set(0.25, -1.75, 0);

    // Assemble the human
    this.add(this.head);
    this.add(this.torso);
    this.add(this.leftArmPivot); // Add pivot to the human
    this.add(this.rightArmPivot);
    this.add(this.leftLeg);
    this.add(this.rightLeg);
  }

  // Optional: Add methods to update parts or animate
  public swingLeftArm() {
    // Rotate the pivot around its local Y-axis to create a waving motion
    const x = this.leftArmPivot.rotation.x;
    const c = this.initialRotation;
    const relativeAngle = x - c;
    if (Math.abs(relativeAngle) > this.rotationAngle) {
      this.step *= -1;
    }

    this.leftArmPivot.rotation.x += this.step;
  }

  public swingRightArm() {
    this.rightArmPivot.rotation.x -= this.step;
  }

  public update() {
    // Update or animate body parts here
  }
}

export default class HumanScene extends THREE.Scene {
  initialize() {
    // Create a cube
    const geometry = new THREE.BoxGeometry(1, 2, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: 0xffad00 });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, -3, -10);

    const human = new Human();
    human.position.set(0, 0, 0);

    this.add(human);
  }

  update() {
    const human = this.children[0] as Human;
    human.swingLeftArm();
    human.swingRightArm();
  }
}
