export default class GLOBALS {
    constructor() {
        this.doesSpin = false

        this.resolution = undefined
        this.minRes = 128
        this.maxRes = 1024
        this.defRes = 0

        this.flags = {
            resetRotation: false,
            reset_resolution: false
        }

        this.customHeightMap = undefined
    }
}