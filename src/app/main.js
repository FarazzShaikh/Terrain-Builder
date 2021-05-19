import * as THREE from "three";
import setup from "./setup";
import { FBM } from "three-noise";

let plane, previousPosition;

function displace(attr_position, options) {
  const { Octaves, Persistance, Lacunarity, Scale, OffsetX, OffsetY } = options;

  const fbm = new FBM({
    seed: 15,
    scale: Scale,
    octaves: Octaves,
    persistance: Persistance,
    lacunarity: Lacunarity,
  });

  const count = attr_position.count;
  const newPositions = [];
  for (let i = 0; i < count; i++) {
    const position = new THREE.Vector3().fromBufferAttribute(attr_position, i);
    const newPosition = position.clone();

    position.x += OffsetX;
    position.y += OffsetY;

    let noise = fbm.get2(position);
    noise = (noise + 1) / 2;

    newPosition.z += noise - 0.2;
    newPositions.push(newPosition);
  }

  plane.geometry.attributes.position.copyVector3sArray(newPositions);
  plane.geometry.attributes.position.needsUpdate = true;
  plane.geometry.computeVertexNormals();
}

export function update(options) {
  displace(previousPosition, options);
}

export function main(mount, options) {
  const scene = setup(mount);

  const geometry = new THREE.PlaneBufferGeometry(1, 1, 512, 512);
  const material = new THREE.MeshPhysicalMaterial({
    wireframe: false,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  scene.add(plane);

  const aPosition = plane.geometry.attributes.position;
  previousPosition = aPosition.clone();
  displace(aPosition, options);
}
