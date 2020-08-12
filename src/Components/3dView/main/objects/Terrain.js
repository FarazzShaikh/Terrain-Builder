import { BaseObject } from '../templates/Templates';

import * as THREE from 'three';
import vShader from '../Shaders/TerrainShaders/Terrain_vShader'
import fShader from '../Shaders/TerrainShaders/Terrain_fShader'


export class TERRAIN extends BaseObject {
    constructor(options) {
        const res_verts = options.resolution - 1
        const geometry = new THREE.PlaneBufferGeometry(1, 1, res_verts, res_verts)
        const uniforms = {
            seed: {value: options.GEN_Seed},
            scale: {value: options.GEN_Scale},
            persistance: {value: options.GEN_Persistance},
            lacunarity: {value: options.GEN_Lacunarity},
            octaves: {value: options.GEN_Octaves},
            redistribution: {value: options.GEN_Redistribution},
            zscale: {value: options.GEN_zScale},
            xoff: {value: options.GEN_xOff},
            yoff: {value: options.GEN_yOff}  
        }

        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vShader,
            fragmentShader: fShader,
            wireframe: false,
            side: THREE.DoubleSide,
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
                const KEY = key.toLowerCase().split('_')[1]
                if(this.material.uniforms[`${KEY}`]) {
                    this.material.uniforms[`${KEY}`].value = element
                }
            }
        }
    }
}