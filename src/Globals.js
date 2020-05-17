export default class GLOBALS {
    constructor() {
        this.doesSpin = false

        // Terrain   

        this.Erosion = true
        this.CustomSeed = Math.random()

        this.Resolution = 128
        this.Scale = 0.06
        this.Height = 8
        this.Persistance = 2
        this.Lacunarity = 2
        this.Octaves = 8

        this.Steps = 300
        this.Rain_Amount = 0.001
        this.Sediment_Deposited = 3
        this.Sediment_Eroded = 8

        this.flags = {
            reset_Displace: false,
            reset_Erode: false
        }

        this.customHeightMap = undefined

        this.none = undefined
    }
}

// Best seed 0.06271837764219645