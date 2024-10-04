import * as THREE from "three";
import * as CANNON from "cannon-es";

export default interface PhysicalObject {
    bodies: CANNON.Body[];
    visual: THREE.Object3D[];
    constraints: CANNON.Constraint[];
    update(): void;
}