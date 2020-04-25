import RENDERER from "./components/renderer/renderer.js";
import TERRAIN from "./components/renderer/objects/Terrain.js";
import DISPLACE from "./components/renderer/modifiers/Displace.js";
import ERODE from "./components/renderer/modifiers/Erode.js";
import UI from "./components/ui/UI.js";
import INFO from "./components/ui/objects/info.js";
import COLOR from "./components/renderer/modifiers/Color.js";
import PIMENU from "./components/ui/objects/PiMenu.js";

function main() {
    let timerStart = 0                  // For Timing Functions
    let erosionInfo, geometryInfo       // Data for UI
    // Scene Setup
    let renderer = new RENDERER()       // Initialize Renderer Component
    let terrain = new TERRAIN({         // Instantiate a Terrain Object
        name: 'mainTerrain',            // Object name
        resolution: 128                 // Terrain Resolution
    })
    let terrainMesh = terrain.getMesh() // Get mesh from Terrain Object
    geometryInfo = terrain.getInfo()    // Get Information about geometry for UI
    renderer.addObject(terrainMesh)     // Add Terrain to the Scene

    // Displace Modifier
    terrain.addModifier(DISPLACE, {     // Add Displace Modifier to Terrain
        seed: Math.random(),            // Seed for Perlin Noise
        scale: 0.06,                    // 'Zoom' Level
        persistance: 2,                 // Amplitude fall factor
        lacunarity: 2,                  // Frequency rise factor
        octaves: 8                      // Number of layers of Perlin Noise
    })

    timerStart = Date.now();                                                        // Timing Displacement Start
    terrain.modifiers.Displace.createHeightBuffer(terrainMesh)                      // Creates A Buffer with noise values
    terrain.modifiers.Displace.getNormalizedHeightBuffer()                          // Normalizes and returns Buffer
    terrain.modifiers.Displace.displaceMesh(terrainMesh, {                          // Actullay Displaces Mesh
        zScalingFactor: 8,                                                          // How much the noise effects the height
        heightField: undefined                                                      // Custom Noise Field (Optional)
    })
    terrain.modifiers.Displace.recalculateNormals(terrainMesh)                      // Recalculates Normals
    let time_displace = Date.now() - timerStart                                     // Timing Displacement End


    // Erode Modifier
    terrain.addModifier(ERODE, {        // Add Erode Modifier to Terrain
        rainAmount: 0.001,              // % of Verticies that recieve rain
        rainIntensity: 0.5,             // 'Wetness' of the rain / amount of water in each droplet
        lifetime: 0.5,                  // Lifetime of each droplet
        sedimentDeposition: 3,          // How much sediment is deposited by flowing water
        waterErosion: 8,                // How much soil is taken out by flowing water
        steps: 300,                     // Number of steps in the simulation
        res_verts: terrain.res_verts    // Total number of verticies in Terrain mesh
    })

    timerStart = Date.now();                                                        // Timing Erosion Start
    terrain.modifiers.Erode.init_Erosion(terrainMesh)                               // Initialize erosion modifier
    terrain.modifiers.Erode.calculateRain(terrainMesh)                              // Give rain to random verts
    terrain.modifiers.Erode.simWater(terrainMesh, 0)                                // Actual Hydraulic Erosion simulation
    erosionInfo = terrain.modifiers.Erode.getInfo()                                 // Get Information about geometry for UI
    let time_erode = Date.now() - timerStart                                        // Timing Erosion End

    terrain.addModifier(COLOR, {                                                    // Add COlor Modifier
        mode: 'clay'                                                                // Color Mode
    })
    terrain.modifiers.Color.color(terrainMesh)                                      // Color Terrain

    let ui = new UI()                               // Instantiate New UI Component
    ui.addObject(INFO, {                            // Add Info Object to UI
        verts: geometryInfo.verts,                  // Number of Verts in the Mesh
        tris: geometryInfo.tris,                    // Number of Tris in the Mesh
        geometryTime: time_displace,                // Time Taken to Displace terrain

        iterations: erosionInfo.iterations,         // Number of Iterations in Erosion simulation
        droplets: erosionInfo.droplets,             // Number of Droplets Simulated
        erosionTime: time_erode,                    // TIme taken to perform Erosion Simulation

        size: 0,                                    // Size of generated map in pixels
        normalized: true,                           // If height data is Normalized between 0 and 1
        mapTime: 0,                                 // Time taken to generate Map
    })
    ui.objects.Info.setContent()                    // Set data
    ui.objects.Info.setBehaviour({                  // Add behaviour to UI Object
        followMouse: true,                          // If UI object follows Mouse
        hideOnClick: true,                          // If UI object hides on click
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
}

main()