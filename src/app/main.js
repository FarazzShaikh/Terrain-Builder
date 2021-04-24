import * as THREE from "three";
import setup from "./setup";

export default function main(mount) {
  const scene = setup(mount);

  const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
  const material = new THREE.MeshNormalMaterial({ wireframe: true });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;

  scene.add(plane);
}
