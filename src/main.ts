// import * as THREE from "three";
// import * as CANNON from "cannon-es";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import WorldScene from "./WorldScene";
// import Menu from "./Menu";
// import CannonDebugger from "cannon-es-debugger";
import { Human } from "./Human";
import World from "./World";


const world = new World(true);

const human = new Human();
// human.body.position.set(0, 4, 0);
// human.bodies[0].position.set(10, 10,0);
// human.position.setY(5);
world.add(human);

world.start();
