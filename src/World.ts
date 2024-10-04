import * as CANNON from "cannon-es";
import CannonDebugger from "cannon-es-debugger";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import PhysicalObject from "./PhysicalObject";

export default class World {
    // General
    readonly width: number;
    readonly height: number;

    readonly renderer: THREE.WebGLRenderer;
    readonly camera: THREE.PerspectiveCamera;

    readonly scene: THREE.Scene;

    // Physics
    readonly physicsWorld: CANNON.World;
    readonly groundBody: CANNON.Body; // the ground

    // Debugging
    private readonly debug: boolean;
    private orbitControls?: OrbitControls;

    // @ts-ignore
    private cannonDebugger?: CannonDebugger;

    // Children
    private readonly children: PhysicalObject[] = [];

    constructor(debug: boolean = false) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById("app") as HTMLCanvasElement,
        });

        this.renderer.setSize(this.width, this.height);

        this.camera = new THREE.PerspectiveCamera(
            60, // field of view (default is 50, unity uses 60)
            this.width / this.height, // aspect ratio
            0.1, // near
            100, // far
        );
        this.camera.position.set(15, 15, 15);

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 5, 5);
        // add light to camera so we can always see what's in front; like a headlamp
        this.camera.add(light);

        this.scene = new THREE.Scene();
        this.scene.add(this.camera);

        this.physicsWorld = new CANNON.World({
            gravity: new CANNON.Vec3(0, -9.82, 0),
        });
        this.groundBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Plane(),
        });
        this.groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // rotate around x axis by 90 degrees, so it's flat
        this.physicsWorld.addBody(this.groundBody);

        this.debug = debug;
        if (debug) {
            this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
            this.orbitControls.update();
            this.scene.add(new THREE.AxesHelper(8));

            // @ts-ignore
            this.cannonDebugger = new CannonDebugger(this.scene, this.physicsWorld, {});
        }
    }

    start() {
        this.animate();
    }

    add(obj: PhysicalObject) {
        this.children.push(obj);
        obj.visual.forEach((obj3d) => this.scene.add(obj3d));
        obj.bodies.forEach((body) => this.physicsWorld.addBody(body));
        obj.constraints.forEach((c) => this.physicsWorld.addConstraint(c));
    }

    private animate() {
        this.orbitControls?.update();
        this.cannonDebugger?.update();
        for (const child of this.children) {
            child.update();
        }
        this.renderer.render(this.scene, this.camera);
        this.physicsWorld.fixedStep();
        requestAnimationFrame(() => this.animate());
    }
}
