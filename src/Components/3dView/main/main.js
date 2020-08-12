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
        size: 2,
        divisions: 20
    })

    return gridObject

}

function initAxis(renderer) {
    let axisObject = renderer.addObject(AXIS, {
        name: 'Axis',
        size: 0.75,
    })

    return axisObject
}

function initTerrain(renderer) {

    renderer.addObject(TERRAIN, {
        name: 'Terrain',
        resolution: options.GEN_Resolution,

        ...options
    })
}

export function refreshTerrain(args) {
    const terrain = renderer.objects.Terrain
    terrain.updateUniforms({...args})

}

export function rebuildTerrain(args) {
    renderer.removeObject('Terrain')
    renderer.addObject(TERRAIN, {
        name: 'Terrain',
        resolution: args.GEN_Resolution,

        ...args
    })

}
