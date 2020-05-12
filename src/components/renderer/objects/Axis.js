const THREE = require('three')

export class AXIS {
    constructor(options) {
        this.name = options.name
        var size = options.size

        this.axesHelper = new THREE.AxesHelper(size);
        this.axesHelper.name = options.name
    }

    getMesh() {
        return this.axesHelper
    }

    getInfo() {
        return {
            verts: undefined,
            tris: undefined
        }
    }
}