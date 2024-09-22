How I created this project:

Followed tutorial at https://www.youtube.com/watch?v=p4BHphMBlFA

1. Create .nvmrc and add the latest version of node in there. See https://nodejs.org/en/about/previous-releases
2. `nvm use`
3. `npm init vite@latest`
   * `Vanilla`
   * `TypeScript`
4. `npm install`
5. `npm install three`
6. `npm install @types/three --save-dev`
7. Delete everything in `main.ts`
8. Add the following:

```ts
import * as THREE from 'three'

const width = window.innerWidth
const height = window.innerHeight

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('app') as HTMLCanvasElement,
})
renderer.setSize(width, height)

const camera = new THREE.PerspectiveCamera(
  60,  // field of view (default is 50, unity uses 60)
  width / height,  // aspect ratio 
  0.1,  // near
  100  // far
)

const scene = new THREE.Scene()

renderer.render(scene, camera)
```

9. `npm run dev`
