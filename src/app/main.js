import * as THREE from "three";
import setup from "./setup";
import { FBM } from "three-noise";

import { CustomShaderMaterial, TYPES } from "three-custom-shader-material";

import _defines from "./shaders/defines.glsl";
import _header from "./shaders/header.glsl";
import _main from "./shaders/main.glsl";

import { loadShadersCSM, Perlin } from "gl-noise";

let plane;

export function update(options) {
  if (plane) {
    const uniforms = plane.material.uniforms;
    Object.keys(options).map((k) => {
      uniforms[`u${k}`] = {
        value: options[k],
      };
    });
  }
}

export function main(mount, options) {
  const paths = {
    defines: _defines,
    header: _header,
    main: _main,
  };
  const chunks = [Perlin];
  const _mount = { current: mount.current };

  loadShadersCSM(paths, chunks).then(({ defines, header, main }) => {
    const scene = setup(_mount);
    const geometry = new THREE.PlaneBufferGeometry(1, 1, 1028, 1028);

    const uniforms = {};
    Object.keys(options).map((k) => {
      uniforms[`u${k}`] = {
        value: options[k],
      };
    });

    const material = new CustomShaderMaterial({
      baseMaterial: TYPES.NORMAL,
      vShader: {
        defines: defines,
        header: header,
        main: main,
      },
      uniforms: uniforms,
      passthrough: {
        side: THREE.DoubleSide,
        lights: true,
      },
    });
    plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
  });
}
