import { BaseObject } from '../templates/Templates';

const THREE = require('three')

export class AXIS extends BaseObject {
    constructor(options) {
        var size = options.size

        super(null, null, {
            name: options.name,
            customMeshClass: [
                THREE.AxesHelper,
                [size]
            ],
        })
    }
}