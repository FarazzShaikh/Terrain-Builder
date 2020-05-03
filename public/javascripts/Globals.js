export default class GLOBALS {
    constructor() {
        this.doesSpin = false

        // Terrain    
        this.resolution = undefined
        this.min_resolution = 128
        this.max_resolution = 1024
        this.def_resolution = 0

        this.scale = undefined
        this.min_scale = 1
        this.max_scale = 10
        this.def_scale = 0.8

        this.noiseScale = undefined
        this.min_noiseScale = 1
        this.max_noiseScale = 10
        this.def_noiseScale = 0.6

        this.persistance = undefined
        this.min_persistance = 1
        this.max_persistance = 10
        this.def_persistance = 0.2

        this.lacunarity = undefined
        this.min_lacunarity = 1
        this.max_lacunarity = 10
        this.def_lacunarity = 0.2

        this.octaves = undefined
        this.min_octaves = 1
        this.max_octaves = 10
        this.def_octaves = 0.8

        // World
        this.gridSize = undefined
        this.min_gridSize = 10
        this.max_gridSize = 100
        this.def_gridSize = 0.3

        this.gridDivs = undefined
        this.min_ridDivs = 10
        this.max_gridDivs = 100
        this.def_gridDivs = 0.2

        this.seed = undefined

        this.axisScale = undefined
        this.min_axisScale = 10
        this.max_axisScale = 100
        this.def_axisScale = 0.1



        this.flags = {
            resetRotation: false,
            reset_resolution: false,
            reset_scale: false,
            reset_gridSize: false,
            reset_gridDivs: false,
            reset_seed: false,
            reset_axisScale: false,
            reset_noiseScale: false,
            reset_persistance: false,
            reset_lacunarity: false,
            reset_octaves: false,

            erosion_enable: true,
            erosion_lock: false,


            customSeed_enable: false,
        }

        this.customHeightMap = undefined
    }
}

// Best seed 0.06271837764219645