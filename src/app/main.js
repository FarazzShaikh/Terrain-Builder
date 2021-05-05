import * as THREE from "three";
import setup from "./setup";
import { Perlin } from "three-noise";

export default function main(mount) {
  const scene = setup(mount);

  const geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32);
  const material = new THREE.MeshNormalMaterial({
    wireframe: false,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;

  scene.add(plane);

  const perlin = new Perlin(Math.random());
  const attr_position = plane.geometry.attributes.position;
  const count = attr_position.count;
  const newPositions = [];
  for (let i = 0; i < count; i++) {
    const position = new THREE.Vector3().fromBufferAttribute(attr_position, i);
    const newPosition = position.clone();

    position.multiplyScalar(3);
    const noise = perlin.get2(position) * 0.5;

    newPosition.z = noise;
    newPositions.push(newPosition);
  }

  plane.geometry.attributes.position.copyVector3sArray(newPositions);
  plane.geometry.attributes.position.needsUpdate = true;
  plane.geometry.computeVertexNormals();
}
