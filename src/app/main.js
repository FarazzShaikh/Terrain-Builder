import * as THREE from "three";
import setup from "./setup";

export default function main(mount) {
  const scene = setup(mount);

  const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
  const material = new THREE.MeshNormalMaterial({ wireframe: true });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;

  scene.add(plane);

  const len = plane.geometry.attributes.position.array.length;
  for (let i = 0; i < len; i += 3) {
    plane.geometry.attributes.position.array[i + 2] = Math.random() * 0.1;
  }
  plane.geometry.attributes.position.needsUpdate = true;
  plane.geometry.computeVertexNormals();
}
