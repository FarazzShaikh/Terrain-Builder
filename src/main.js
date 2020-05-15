import { RENDERER } from "./components/renderer/renderer";
import { GRID } from "./components/renderer/objects/Grid";
import { TERRAIN } from "./components/renderer/objects/Terrain";
import { AXIS } from "./components/renderer/objects/Axis";

// MOds
import { COLOR } from "./components/renderer/modifiers/Color";
import { ERODE } from "./components/renderer/modifiers/Erode";
import { DISPLACE } from "./components/renderer/modifiers/Displace";

import GLOBALS from "./Globals.js";


let timerStart = 0
let erosionInfo, geometryInfo // eslint-disable-line  no-unused-vars
let globals = new GLOBALS()

export class MAIN {
    constructor() {
        main()
        this.GLOBALS = globals
    }

}

function main() {

    // Scene Setup
    let renderer = new RENDERER({
            globals: globals
    }) // Initialize Renderer Component


    initGrid(renderer)
    initAxis(renderer)
    let currentTerrainData = initTerrain(renderer)

    setInterval(() => {
        
        if(globals.flags.reset_Displace) {
            console.log('start')
            renderer.removeObject('Terrain')
            currentTerrainData = initTerrain(renderer)

            globals.flags.reset_Displace = false
            console.log('done')
        }

        if(globals.flags.reset_Erode) {
            if(!globals.Erosion) {
                currentTerrainData.terrain.modifiers.Erode.removeErosion(currentTerrainData.terrain.getMesh(), currentTerrainData.heightData_notScaled, globals.scale || 8)
                currentTerrainData.terrain.modifiers.Erode = undefined
            } else {
                initErosion(currentTerrainData.terrain, currentTerrainData.erode_heightBuffer)
            }

            globals.flags.reset_Erode = false
        }

    }, 100);

}

function initTerrain(renderer) {

    geometryInfo = renderer.addObject(TERRAIN, {
        name: 'Terrain', // Object name
        resolution: globals.Resolution || 128 // Terrain Resolution
    })
    let terrainMesh = geometryInfo.mesh // Get mesh from Terrain Object
    geometryInfo = geometryInfo.info // Get Information about geometry for UI

    let terrain = renderer.objects.Terrain
    let seed = globals.CustomSeed || Math.random()

    terrain.addModifier(DISPLACE, {
        seed: seed,
        scale: globals.Scale || 0.06,
        persistance: globals.Persistance || 2,
        lacunarity: globals.Lacunarity || 2,
        octaves: globals.Octaves || 8
    })

    timerStart = Date.now(); // Timing Displacement Start
    terrain.modifiers.Displace.createHeightBuffer(terrainMesh) // Creates A Buffer with noise values
    terrain.modifiers.Displace.getNormalizedHeightBuffer() // Normalizes and returns Buffer
    let heightData_notScaled = terrain.modifiers.Displace.displaceMesh(terrainMesh, { // Actullay Displaces Mesh
        zScalingFactor:  8, // How much the noise effects the height
        heightField: undefined // Custom Noise Field (Optional)
    })
    terrain.modifiers.Displace.recalculateNormals(terrainMesh) // Recalculates Normals
    let time_displace = Date.now() - timerStart // Timing Displacement End

    let time_erode, erode_heightBuffer
    if(globals.Erosion) {
        let erosionData = initErosion(terrain)
        time_erode = Date.now() - erosionData.time // Timing Erosion End
        erode_heightBuffer = erosionData.erode_heightBuffer
    }
    
    


    terrain.addModifier(COLOR, { // Add COlor Modifier
        mode: 'clay' // Color Mode
    })
    terrain.modifiers.Color.color(terrainMesh) // Color Terrain

    return {
        time_erode: time_erode,
        time_displace: time_displace,
        terrain: terrain,
        heightData_notScaled: heightData_notScaled,
        erode_heightBuffer: erode_heightBuffer

    }

}

function initGrid(renderer) {
    let gridObject = renderer.addObject(GRID, {
        name: 'Grid',
        size: 30,
        divisions:20
    })

    return gridObject

}

function initErosion(terrain, buffer) {
    let terrainMesh = terrain.getMesh() // Get mesh from Terrain Object
        // Erode Modifier
    terrain.addModifier(ERODE, { // Add Erode Modifier to Terrain
        rainAmount: 0.001, // % of Verticies that recieve rain
        rainIntensity: 0.5, // 'Wetness' of the rain / amount of water in each droplet
        lifetime: 0.5, // Lifetime of each droplet
        sedimentDeposition: 3, // How much sediment is deposited by flowing water
        waterErosion: 8, // How much soil is taken out by flowing water
        steps: 300, // Number of steps in the simulation
        res_verts: terrain.res_verts // Total number of verticies in Terrain mesh
    })

    let erode_heightBuffer
    timerStart = Date.now(); // Timing Erosion Start
    if (buffer) {
        erode_heightBuffer = terrain.modifiers.Erode.setErosionBUffer(terrainMesh, buffer)
    } else {
        terrain.modifiers.Erode.init_Erosion(terrainMesh) // Initialize erosion modifier
        terrain.modifiers.Erode.calculateRain(terrainMesh) // Give rain to random verts
        erode_heightBuffer = terrain.modifiers.Erode.simWater(terrainMesh, 0) // Actual Hydraulic Erosion simulation
        erosionInfo = terrain.modifiers.Erode.getInfo() // Get Information about geometry for UI
    }

    return {
        time: timerStart,
        erode_heightBuffer: erode_heightBuffer
    }
}

function initAxis(renderer) {
    let axisObject = renderer.addObject(AXIS, {
        name: 'Axis',
        size:10,
    })

    return axisObject
}


