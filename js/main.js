import * as THREE from '../lib/three.js';
import { OrbitControls } from '../lib/OrbitControls.js'
import Plane from './Plane.js'

let scene, camera, renderer, planeMesh, controls
let stylized = false

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement)
  camera.position.set(15, 15, 15)

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.enableZoom = false
  controls.enablePan = true
  controls.enableZoom = true

  controls.minPolarAngle = 0;
  controls.maxPolarAngle = Math.PI / 2;
}

function initLight() {
  const light = new THREE.PointLight(0x404040, 3)
  light.position.set(3, 3, 3)
  light.rotation.set(1, 1, 1)
  light.castShadow = true;
  light.shadow.radius = 30;
  scene.add(light)

  const ambLight = new THREE.AmbientLight( 0x404040, 0.9 )
  scene.add(ambLight)
}

function initGeometry() {
  const plane = new Plane(32, 32)
  planeMesh = plane.mesh
  planeMesh.rotation.x = Math.PI / 2 + Math.PI
  plane.displace(stylized);
  plane.color()
  scene.add(planeMesh);
}

function render() {
  window.requestAnimationFrame(render);

  if(planeMesh) {
   // planeMesh.rotation.z += 0.005;
  }
  
  controls.update()
  renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

initScene()
initLight()
initGeometry()
render();
window.addEventListener('resize', onWindowResize, false);
