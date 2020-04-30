export default class GLOBALS {
    constructor() {
        this.doesSpin = false

        this.resolution = undefined
        this.minRes = 128
        this.maxRes = 1024
        this.defRes = 0

        this.scale = undefined
        this.minScale = 1
        this.maxScale = 10
        this.defScale = 0.8

        this.gridSize = undefined
        this.minGridSize = 10
        this.maxGridSize = 100
        this.defGridSize = 0.3

        this.gridDivs = undefined
        this.minGridDivs= 10
        this.maxGridDivs = 100
        this.defGridDivs = 0.2

        this.flags = {
            resetRotation: false,
            reset_resolution: false,
            reset_scale: false,
            reset_gridSize: false,
            reset_gridDivs: false
        }

        this.customHeightMap = undefined
    }
}