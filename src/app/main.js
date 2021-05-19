import * as THREE from "three";
import setup from "./setup";
import { FBM } from "three-noise";

let plane, pPos;

export function update(octaves) {
  const perlin = new FBM({
    seed: 15,
    scale: 2,
    octaves: octaves,
    persistance: 0.4,
  });

  const attr_position = pPos;
  const count = attr_position.count;
  const newPositions = [];
  for (let i = 0; i < count; i++) {
    const position = new THREE.Vector3().fromBufferAttribute(attr_position, i);
    const newPosition = position.clone();

    let noise = perlin.get2(position);
    noise = (noise + 1) / 2;

    newPosition.z += noise - 0.2;
    newPositions.push(newPosition);
  }

  plane.geometry.attributes.position.copyVector3sArray(newPositions);
  plane.geometry.attributes.position.needsUpdate = true;
  plane.geometry.computeVertexNormals();
}

export default function main(mount, octaves) {
  const scene = setup(mount);

  const geometry = new THREE.PlaneBufferGeometry(1, 1, 256, 256);
  const material = new THREE.MeshPhysicalMaterial({
    wireframe: false,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  const perlin = new FBM({
    seed: 15,
    scale: 2,
    octaves: octaves,
    persistance: 0.4,
  });

  const attr_position = plane.geometry.attributes.position;
  pPos = attr_position.clone();
  const count = attr_position.count;
  const newPositions = [];
  for (let i = 0; i < count; i++) {
    const position = new THREE.Vector3().fromBufferAttribute(attr_position, i);
    const newPosition = position.clone();

    let noise = perlin.get2(position);
    noise = (noise + 1) / 2;

    newPosition.z += noise - 0.2;
    newPositions.push(newPosition);
  }

  plane.geometry.attributes.position.copyVector3sArray(newPositions);
  plane.geometry.attributes.position.needsUpdate = true;
  plane.geometry.computeVertexNormals();
}
