import { BaseObject } from '../templates/Templates';

// import * as THREE from 'three';
const THREE = require('three')

export class GRID extends BaseObject {
    constructor(options) {
        var size = options.size
        var divisions = options.divisions

        super(null, null, {
            name: options.name,
            customMeshClass: [
                THREE.GridHelper,
                [size, divisions]
            ],
        })
    }
}