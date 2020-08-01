import { BaseObject } from '../templates/Templates';

import * as THREE from 'three';
import vShader from '../Shaders/TerrainShaders/Terrain_vShader'
import fShader from '../Shaders/TerrainShaders/Terrain_fShader'

export class TERRAIN extends BaseObject {
    constructor(options) {
        const res_verts = options.resolution - 1
        const geometry = new THREE.PlaneBufferGeometry(20, 20, res_verts, res_verts)
        const uniforms = {
            seed: {value: 1},
            scale: {value: options.scale},
            persistance: {value: options.persistance},
            lacunarity: {value: options.lacunarity},
            octaves: {value: options.octaves},
            redistribution: {value: options.redistribution},
            zScale: {value: options.zScale},
            xOff: {value: options.xOff},
            yOff: {value: options.xOff}

            
        }
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vShader,
            fragmentShader: fShader,
            wireframe: false,
            side: THREE.DoubleSide
        });

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
                this.material.uniforms[`${key}`].value = element
            }
        }
    }
}