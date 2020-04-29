import * as THREE from '../../../../lib/three.js';

export default class GRID {
    constructor(options) {
        this.name = options.name
        var size = options.size
        var divisions = options.divisions

        this.gridHelper = new THREE.GridHelper(size, divisions);
    }

    getMesh() {
        return this.gridHelper
    }

    getInfo() {
        return {
            verts: 0,
            tris: 0
        }
    }
}