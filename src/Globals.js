export default class GLOBALS {
    constructor() {
        this.doesSpin = false

        // Terrain   

        this.Erosion = true

        this.CustomSeed = undefined

        this.Resolution = undefined
        this.Scale = undefined
        this.Persistance = undefined
        this.Lacunarity = undefined
        this.Octaves = undefined

        this.flags = {
            reset_Displace: false,
            reset_Erode: false
        }

        this.customHeightMap = undefined
    }
}

// Best seed 0.06271837764219645