import { RENDERER } from "./renderer";

// OBjects
import { GRID } from "./objects/Grid";
import { TERRAIN } from "./objects/Terrain";
import { AXIS } from "./objects/Axis";

let options = undefined
let renderer = undefined

export function main(args) {
    options = args
    renderer = new RENDERER()

    initGrid(renderer)
    initAxis(renderer)
    initTerrain(renderer)

}

function initGrid(renderer) {
    let gridObject = renderer.addObject(GRID, {
        name: 'Grid',
        size: 30,
        divisions: 20
    })

    return gridObject

}

function initAxis(renderer) {
    let axisObject = renderer.addObject(AXIS, {
        name: 'Axis',
        size: 10,
    })

    return axisObject
}

function initTerrain(renderer) {

    renderer.addObject(TERRAIN, {
        name: 'Terrain',
        resolution: options.terrainResolution,

        seed: '1',
        scale: options.GEN_Scale,
        persistance: options.GEN_Persistance,
        lacunarity: options.GEN_Lacunarity,
        octaves: options.GEN_Octaves,
        redistribution: options.GEN_Redistribution,
        zScale: options.GEN_zScaling,
        xOff: options.GEN_xOff,
        yOff: options.GEN_yOff
    })
}

export function refreshTerrain(args) {
    const terrain = renderer.objects.Terrain
    terrain.updateUniforms({
        seed: '1',
        scale: args.GEN_Scale,
        persistance: args.GEN_Persistance,
        lacunarity: args.GEN_Lacunarity,
        octaves: args.GEN_Octaves,
        redistribution: args.GEN_Redistribution,
        zScale: args.GEN_zScaling,
        xOff: args.GEN_xOff,
        yOff: args.GEN_yOff
    })
}
