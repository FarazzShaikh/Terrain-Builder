import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function main(mount) {
  console.clear();
  console.log(mount);

  const fov = 45;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const nearPlane = 0.1;
  const farPlane = 1000;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    fov,
    aspectRatio,
    nearPlane,
    farPlane
  );

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: mount.current,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const controls = new OrbitControls(camera, renderer.domElement);

  controls.enableDamping = true; // Enables inertia on the camera making it come to a more gradual stop.
  controls.dampingFactor = 0.25; // Inertia factor
  controls.maxPolarAngle = Math.PI / 2; // Prevents camra from going under our object

  const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
  const material = new THREE.MeshNormalMaterial({ wireframe: false });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  plane.rotation.x = -Math.PI / 2;
  camera.position.set(1, 1, 1);

  const size = 2; // Size of the Grid
  const divisions = 20; // Number of divisions in the Grid
  const centerLineColor = "#121212"; // Darken center line to make axis more visible

  const axesHelper = new THREE.AxesHelper(1.5); // Takes in the size of the Axis
  const gridHelper = new THREE.GridHelper(size, divisions, centerLineColor); // Also
  scene.add(gridHelper);
  scene.add(axesHelper);

  const animate = function () {
    controls.update();
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  };

  animate();
}
