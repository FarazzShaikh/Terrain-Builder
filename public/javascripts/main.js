import RENDERER from "./components/renderer/renderer.js";
import TERRAIN from "./components/renderer/objects/Terrain.js";
import DISPLACE from "./components/renderer/modifiers/Displace.js";
import ERODE from "./components/renderer/modifiers/Erode.js";
import UI from "./components/ui/UI.js";
import INFO from "./components/ui/objects/Info.js";
import COLOR from "./components/renderer/modifiers/Color.js";
import PIMENU from "./components/ui/objects/PiMenu.js";
import WORLD from "./components/ui/objects/PiMenuItems/World.js";
import GRID from "./components/renderer/objects/Grid.js";
import GLOBALS from "./Globals.js";
import LOADING from "./components/ui/objects/LoadingScreens.js";
import TERRAIN_Settings from "./components/ui/objects/PiMenuItems/Terrain.js";
import AXIS from "./components/renderer/objects/Axis.js";

let timerStart = 0 // For Timing Functions
let erosionInfo, geometryInfo // Data for UI
let globals = new GLOBALS()


function main() {

    // Scene Setup
    let renderer = new RENDERER({
            globals: globals
        }) // Initialize Renderer Component



    let grid = initGrid(renderer)
    let axis = initAxis(renderer)

    let time = initTerrain(renderer)
    let time_erode = time.time_erode
    let time_displace = time.time_displace
    let terrain = time.terrain
    let heightData_notScaled = time.heightData_notScaled

    let ui = new UI() // Instantiate New UI Component
    ui.addObject(INFO, { // Add Info Object to UI
        verts: geometryInfo.verts, // Number of Verts in the Mesh
        tris: geometryInfo.tris, // Number of Tris in the Mesh
        geometryTime: time_displace, // Time Taken to Displace terrain

        iterations: erosionInfo.iterations, // Number of Iterations in Erosion simulation
        droplets: erosionInfo.droplets, // Number of Droplets Simulated
        erosionTime: time_erode, // TIme taken to perform Erosion Simulation

        size: 0, // Size of generated map in pixels
        normalized: true, // If height data is Normalized between 0 and 1
        mapTime: 0, // Time taken to generate Map
    })
    ui.objects.Info.setContent() // Set data
    ui.objects.Info.setBehaviour({ // Add behaviour to UI Object
        followMouse: true, // If UI object follows Mouse
        hideOnClick: true, // If UI object hides on click
        autoClose: true
    })

    ui.addObject(PIMENU, {
        // Options
    })
    ui.objects.PieMenu.setBehaviour({
        followMouse: true,
        hideOnClick: true,
        autoClose: true
    })


    ui.objects.PieMenu.addChild(WORLD, {
        globals: globals
    })
    ui.objects.PieMenu.children.World.setBehaviour({
        // Options
    })

    ui.objects.PieMenu.addChild(TERRAIN_Settings, {
        globals: globals
    })
    ui.objects.PieMenu.children.Terrain.setBehaviour({
        // Options
    })

    ui.addObject(LOADING, {

    })
    ui.objects.Loading.hide()


    setInterval(() => {
        if (globals.flags.reset_resolution || globals.flags.reset_scale || globals.flags.reset_seed ||
            globals.flags.reset_noiseScale || globals.flags.reset_persistance || globals.flags.reset_lacunarity || globals.flags.reset_octaves) {
            ui.objects.Loading.show()

            setTimeout(() => {

                renderer.removeObject('Terrain')

                time = initTerrain(renderer, ui.objects.Loading)

                ui.objects.Info.resetContent({
                    verts: geometryInfo.verts, // Number of Verts in the Mesh
                    tris: geometryInfo.tris, // Number of Tris in the Mesh
                    geometryTime: time.time_displace, // Time Taken to Displace terrain

                    iterations: erosionInfo.iterations, // Number of Iterations in Erosion simulation
                    droplets: erosionInfo.droplets, // Number of Droplets Simulated
                    erosionTime: time.time_erode, // TIme taken to perform Erosion Simulation

                    size: 0, // Size of generated map in pixels
                    normalized: true, // If height data is Normalized between 0 and 1
                    mapTime: 0, // Time taken to generate Map
                })
                ui.objects.Info.setContent()
                globals.flags.reset_resolution = false
                globals.flags.reset_scale = false
                globals.flags.reset_seed = false
                globals.flags.reset_noiseScale = false
                globals.flags.reset_persistance = false
                globals.flags.reset_lacunarity = false
                globals.flags.reset_octaves = false

                setTimeout(() => {
                    ui.objects.Loading.hide()

                }, 50);

            }, 50);

        }

        if (globals.flags.reset_gridSize || globals.flags.reset_gridDivs) {
            renderer.removeObject('Grid')
            initGrid(renderer)

            globals.flags.reset_gridDivs = false
            globals.flags.reset_gridSize = false
        }

        if (!globals.flags.erosion_enable) {
            if (globals.flags.erosion_lock) {

                time.terrain.modifiers.Erode.removeErosion(time.terrain.getMesh(), time.heightData_notScaled, globals.scale || 8)
                time.terrain.modifiers.Erode = undefined
                globals.flags.erosion_lock = false
            }
        } else {
            if (globals.flags.erosion_lock) {
                initErosion(time.terrain, time.erode_heightBuffer)
                globals.flags.erosion_lock = false
            }
        }

        if (globals.flags.reset_axisScale) {
            renderer.removeObject('Axis')
            initAxis(renderer)
            globals.flags.reset_axisScale = false
        }



    }, 500);
}



function initTerrain(renderer) {

    geometryInfo = renderer.addObject(TERRAIN, {
        name: 'Terrain', // Object name
        resolution: globals.resolution || 128 // Terrain Resolution
    })
    let terrainMesh = geometryInfo.mesh // Get mesh from Terrain Object
    geometryInfo = geometryInfo.info // Get Information about geometry for UI

    let terrain = renderer.objects.Terrain
    let seed = globals.flags.customSeed_enable ? globals.seed : Math.random()

    terrain.addModifier(DISPLACE, {
        seed: seed,
        scale: globals.noiseScale / 100 || 0.06,
        persistance: globals.persistance || 2,
        lacunarity: globals.lacunarity || 2,
        octaves: globals.octaves || 8
    })

    timerStart = Date.now(); // Timing Displacement Start
    terrain.modifiers.Displace.createHeightBuffer(terrainMesh, globals.xOff) // Creates A Buffer with noise values
    terrain.modifiers.Displace.getNormalizedHeightBuffer() // Normalizes and returns Buffer
    let heightData_notScaled = terrain.modifiers.Displace.displaceMesh(terrainMesh, { // Actullay Displaces Mesh
        zScalingFactor: globals.scale || 8, // How much the noise effects the height
        heightField: undefined // Custom Noise Field (Optional)
    })
    terrain.modifiers.Displace.recalculateNormals(terrainMesh) // Recalculates Normals
    let time_displace = Date.now() - timerStart // Timing Displacement End


    let time_erode, erode_heightBuffer
    if (globals.flags.erosion_enable) {
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
        size: globals.gridSize || 30,
        divisions: globals.gridDivs || 20
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
        size: globals.axisScale || 10,
    })

    return axisObject
}


main()