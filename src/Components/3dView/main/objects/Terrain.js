import { BaseObject } from '../templates/Templates';

import * as THREE from 'three';
import { CustomShaderMaterial, TYPES } from  'three-custom-shader-material';


import { main, global } from '../Shaders/TerrainShaders/TerrainShders';


export class TERRAIN extends BaseObject {
    constructor(options) {
        const res_verts = options.resolution - 1
        const geometry = new THREE.PlaneBufferGeometry(1, 1, res_verts, res_verts)

        var customUniforms = [
            THREE.ShaderLib.lambert.uniforms,
            {seed: {value: options.GEN_Seed}},
            {scale: {value: options.GEN_Scale}},
            {persistance: {value: options.GEN_Persistance}},
            {lacunarity: {value: options.GEN_Lacunarity}},
            {octaves: {value: options.GEN_Octaves}},
            {redistribution: {value: options.GEN_Redistribution}},
            {zscale: {value: options.GEN_zScale}},
            {xoff: {value: options.GEN_xOff}},
            {yoff: {value: options.GEN_yOff}},

            {island:{value: false}},

            {diffuse: { value: new THREE.Vector3(1.0, 1.0, 1.0) }},
            {emissive: {value: new THREE.Vector3(0.0, 0.0, 0.0)}},
            {opacity: {value: 1.0}}
        ];

        const material = new CustomShaderMaterial({
            baseMaterial: TYPES.PHYSICAL,
            vShader: [main, global],
            uniforms: customUniforms,
            options: {
                wireframe: false,
                side: THREE.DoubleSide,
                flatShading: true,
                lights: true,
                shadowSide: true,
            }
        }).getMaterial()


        super(geometry, material, {
            name: options.name,
            initRotation: new THREE.Vector3(-(Math.PI / 2), 0, 0),
        })

        this.material = material
    }

    updateUniforms(options) {
        for (const key in options) {
            if (options.hasOwnProperty(key)) {
                const element = options[key];
                const KEY = key.toLowerCase().split('_')[1]
                if(this.material.uniforms[`${KEY}`]) {
                    this.material.uniforms[`${KEY}`].value = element
                }
            }
        }
    }
}