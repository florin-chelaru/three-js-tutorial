import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import HumanScene from "./HumanScene";

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

class Menu extends THREE.Group {
  width: number;
  height: number;

  constructor(width: number = 1, height: number = 1) {
    super();
    this.width = width;
    this.height = height;

    this.initialize();
  }

  private async initialize() {
    const textureLoader = new THREE.TextureLoader();
    const texture = await textureLoader.loadAsync("assets/tilemap_packed.png");
    texture.colorSpace = THREE.SRGBColorSpace;

    const tileRow = 4;
    const tileCol = 0;

    const bottomLeft = await this.createTileMesh(texture, tileRow*2, tileCol*2, 13*2, 7*2);
    bottomLeft.position.set(-this.width/2, -this.height/2, 0);

    const bottomRight = await this.createTileMesh(texture, tileRow*2, tileCol*2+1, 13*2, 7*2);
    bottomRight.position.set(this.width/2, -this.height/2, 0);

    const bottomMiddle = await this.createTileMesh(texture, tileRow*2, tileCol*32+16, 13*32, 7*2);
    bottomMiddle.position.set(0, -this.height/2, 0);
    bottomMiddle.scale.set(this.width-1, 1, 1);

    const topLeft = await this.createTileMesh(texture, tileRow*2+1, tileCol*2, 13*2, 7*2);
    topLeft.position.set(-this.width/2, this.height/2, 0);

    const topRight = await this.createTileMesh(texture, tileRow*2+1, tileCol*2+1, 13*2, 7*2);
    topRight.position.set(this.width/2, this.height/2, 0);

    const topMiddle = await this.createTileMesh(texture, tileRow*2+1, tileCol*32+16, 13*32, 7*2);
    topMiddle.position.set(0, this.height/2, 0);
    topMiddle.scale.set(this.width-1, 1, 1);

    const middleLeft = await this.createTileMesh(texture, tileRow*32+16, tileCol*2, 13*2, 7*32);
    middleLeft.position.set(-this.width/2, 0, 0);
    middleLeft.scale.set(1, this.height-1, 1);

    const middleRight = await this.createTileMesh(texture, tileRow*32+16, tileCol*2+1, 13*2, 7*32);
    middleRight.position.set(this.width/2, 0, 0);
    middleRight.scale.set(1, this.height-1, 1);

    const middleMiddle = await this.createTileMesh(texture, tileRow*32+16, tileCol*32+16, 13*32, 7*32);
    middleMiddle.position.set(0, 0, 0);
    middleMiddle.scale.set(this.width-1, this.height-1, 1);
    
    this.add(bottomLeft);
    this.add(bottomRight);
    this.add(bottomMiddle);
    this.add(topLeft);
    this.add(topRight);
    this.add(topMiddle);
    this.add(middleLeft);
    this.add(middleRight);
    this.add(middleMiddle);
  }

  private async createTileMesh(texture: THREE.Texture, row: number, col: number, tilesPerRow: number, tilesPerCol: number) {
    
    const geometry = new THREE.PlaneGeometry(1, 1);
  
    // Update the UV mapping for the geometry
    const uv = geometry.attributes.uv;
  
    const uvWidth = 1 / tilesPerRow;
    const uvHeight = 1 / tilesPerCol;
  
    const uIndex = col;
    const vIndex = row;
  
    // // bottom left
    // uv.array[0] = uvWidth * (uIndex); 
    // uv.array[1] = uvHeight * (vIndex);
  
    // // bottom right
    // uv.array[2] = uvWidth * (uIndex+1); 
    // uv.array[3] = uvHeight * (vIndex);
  
    // // top left
    // uv.array[4] = uvWidth * (uIndex); 
    // uv.array[5] = uvHeight * (vIndex+1);
  
    // // top right
    // uv.array[6] = uvWidth * (uIndex+1); 
    // uv.array[7] = uvHeight * (vIndex+1);

    // top left
    uv.array[0] = uvWidth * (uIndex); 
    uv.array[1] = uvHeight * (vIndex+1);
  
    // top right
    uv.array[2] = uvWidth * (uIndex+1); 
    uv.array[3] = uvHeight * (vIndex+1);
  
    // bottom left
    uv.array[4] = uvWidth * (uIndex); 
    uv.array[5] = uvHeight * (vIndex);
  
    // bottom right
    uv.array[6] = uvWidth * (uIndex+1); 
    uv.array[7] = uvHeight * (vIndex);
  
    uv.needsUpdate = true;
  
    // Step 4: Create material with the texture
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      // transparent: true,
      toneMapped: false,
    });
  
    // Create the mesh using the geometry and material
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
}



// const menuMesh = await createTileMesh();

scene.add(new Menu(4, 3));

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  scene.update();

  renderer.render(scene, camera);
}

animate();
