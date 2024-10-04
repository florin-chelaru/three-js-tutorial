import * as CANNON from "cannon-es";
import * as THREE from "three";
import PhysicalObject from "./PhysicalObject";
import { bodyToMesh } from "./three-conversion-utils";

export class Human implements PhysicalObject {
    // public head: THREE.Mesh;
    // public torso: THREE.Mesh;
    // public leftArmPivot: THREE.Object3D; // Pivot for the left arm
    // public rightArmPivot: THREE.Object3D; // Pivot for the left arm
    // public leftArm: THREE.Mesh;
    // public rightArm: THREE.Mesh;
    // public leftLeg: THREE.Mesh;
    // public rightLeg: THREE.Mesh;

    // private step: number = 0.01;
    // private initialRotation = 0;
    // private rotationAngle = degrees(20);

    bodies: CANNON.Body[] = [];
    visual: THREE.Object3D[] = [];
    constraints: CANNON.Constraint[] = [];

    constructor() {
        // super(); // Call the parent constructor (THREE.Group)

        const humanMaterial = new THREE.MeshPhongMaterial({ color: 0xddddff });

        const body = new CANNON.Body({ mass: 10 });

        // head
        // body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)), new CANNON.Vec3(0, 3.5, 0));

        // torso
        body.addShape(new CANNON.Box(new CANNON.Vec3(1, 2, 1)));
        body.position.set(0, 6, 0);

        //   // Create legs
        const legShape = new CANNON.Box(new CANNON.Vec3(0.25, 1, 1));
        const leftLegBody = new CANNON.Body({ mass: 3 });
        leftLegBody.addShape(legShape);
        leftLegBody.position.set(-1.25, 3, 0);

        // const leftLegConstraint = new CANNON.PointToPointConstraint(body, new CANNON.Vec3(-1, -2, 0), leftLegBody, new CANNON.Vec3(0.25, 1, 0), 10);
        const leftLegConstraint = new CANNON.HingeConstraint(body, leftLegBody, {
            pivotA: new CANNON.Vec3(-1, -2, 0),
            pivotB: new CANNON.Vec3(0.25, 1, 0),
            axisA: new CANNON.Vec3(0, 0, 1),
            axisB: new CANNON.Vec3(0, 0, 1),
        });
        this.constraints.push(leftLegConstraint);

        const rightLegBody = new CANNON.Body({ mass: 3 });
        rightLegBody.addShape(legShape);
        rightLegBody.position.set(1.25, 3, 0);

        const rightLegConstraint = new CANNON.HingeConstraint(body, rightLegBody, {
            pivotA: new CANNON.Vec3(1, -2, 0),
            pivotB: new CANNON.Vec3(-0.25, 1, 0),
            axisA: new CANNON.Vec3(0, 0, 1),
            axisB: new CANNON.Vec3(0, 0, 1),
        });
        this.constraints.push(rightLegConstraint);
        // const rightLegConstraint = new CANNON.PointToPointConstraint(body, new CANNON.Vec3(1, -2, 0), rightLegBody, new CANNON.Vec3(-0.25, 1, 0), 10);
        // this.constraints.push(rightLegConstraint);

        //   const legGeometry = new THREE.BoxGeometry(0.25, 1, 0.5);
        //   this.leftLeg = new THREE.Mesh(legGeometry, humanMaterial);
        //   this.leftLeg.position.set(-0.25, -1.75, 0);

        //   this.rightLeg = new THREE.Mesh(legGeometry, humanMaterial);
        //   this.rightLeg.position.set(0.25, -1.75, 0);

        this.bodies.push(body);
        this.bodies.push(leftLegBody);
        this.bodies.push(rightLegBody);

        // this.visual = new THREE.Group();
        this.visual.push(bodyToMesh(body, humanMaterial));
        this.visual.push(bodyToMesh(leftLegBody, humanMaterial));
        this.visual.push(bodyToMesh(rightLegBody, humanMaterial));
        // this.add(this.visual);

        //   // Create head
        //   const headGeometry = new THREE.BoxGeometry(1, 1, 1);
        //   this.head = new THREE.Mesh(headGeometry, humanMaterial);
        //   this.head.position.y = 1.75;

        //   // Create torso
        //   const torsoGeometry = new THREE.BoxGeometry(1, 2, 1);
        //   this.torso = new THREE.Mesh(torsoGeometry, humanMaterial);

        //   // Create pivot for arms
        //   this.leftArmPivot = new THREE.Object3D();
        //   this.leftArmPivot.position.set(-0.625, 1, 0); // Set pivot position

        //   this.rightArmPivot = new THREE.Object3D();
        //   this.rightArmPivot.position.set(0.625, 1, 0);

        //   // Create left arm and add it to the pivot
        //   const armGeometry = new THREE.BoxGeometry(0.25, 1, 0.5);
        //   this.leftArm = new THREE.Mesh(armGeometry, humanMaterial);
        //   this.leftArm.position.set(-0.125, -0.5, 0); // Position relative to the pivot
        //   this.leftArmPivot.add(this.leftArm); // Add left arm to the pivot
        //   this.leftArmPivot.rotation.x = this.initialRotation;

        //   // Create right arm
        //   this.rightArm = new THREE.Mesh(armGeometry, humanMaterial);
        //   this.rightArm.position.set(0.125, -0.5, 0); // Position right arm
        //   this.rightArmPivot.add(this.rightArm);
        //   this.rightArmPivot.rotation.x = -this.initialRotation;

        //   // Create legs
        //   const legGeometry = new THREE.BoxGeometry(0.25, 1, 0.5);
        //   this.leftLeg = new THREE.Mesh(legGeometry, humanMaterial);
        //   this.leftLeg.position.set(-0.25, -1.75, 0);

        //   this.rightLeg = new THREE.Mesh(legGeometry, humanMaterial);
        //   this.rightLeg.position.set(0.25, -1.75, 0);

        //   // Assemble the human
        //   this.add(this.head);
        //   this.add(this.torso);
        //   this.add(this.leftArmPivot); // Add pivot to the human
        //   this.add(this.rightArmPivot);
        //   this.add(this.leftLeg);
        //   this.add(this.rightLeg);
    }

    // Optional: Add methods to update parts or animate
    // public swingLeftArm() {
    //   // Rotate the pivot around its local Y-axis to create a waving motion
    //   const x = this.leftArmPivot.rotation.x;
    //   const c = this.initialRotation;
    //   const relativeAngle = x - c;
    //   if (Math.abs(relativeAngle) > this.rotationAngle) {
    //     this.step *= -1;
    //   }

    //   this.leftArmPivot.rotation.x += this.step;
    // }

    // public swingRightArm() {
    //   this.rightArmPivot.rotation.x -= this.step;
    // }

    public update() {
        for (let i = 0; i < this.bodies.length; ++i) {
            this.visual[i].position.copy(this.bodies[i].position);
            this.visual[i].quaternion.copy(this.bodies[i].quaternion);
        }
    }
}
