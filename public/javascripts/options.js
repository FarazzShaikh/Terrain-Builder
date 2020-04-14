export default class Options {
    constructor(verts, tris, geometryTime, iterations, droplets, erosionTime, size, normalized, mapTime) {
        this.verts = this.kFormatter(verts)
        this.tris = this.kFormatter(tris)
        this.geometryTime = this.sFormatter(geometryTime)

        this.iterations = iterations
        this.droplets = this.kFormatter(droplets)
        this.erosionTime = this.sFormatter(erosionTime)

        this.size = size + 'px'
        this.normalized = normalized
        this.mapTime = this.sFormatter(mapTime)
    }

    kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(2)) + 'k' : Math.sign(num)*Math.abs(num)
    }

    sFormatter(num) {
        return (num/1000).toFixed(2) + 's'
    }
}