import PERLIN from '../../../../lib/perlin.js'

export default class DISPLACE {
    constructor(options) {
        this.name = 'Displace'
        this.perlin = new PERLIN(options.seed)
        this.buffer_rawNoise = []
        this.buffer_normalized = []

        this.scale = options.scale
        this.persistance = options.persistance
        this.lacunarity = options.lacunarity
        this.octaves = options.octaves

        this.max_heightValue = -1
        this.min_heightValue = Infinity
    }

    createHeightBuffer(mesh) {
        for (var i = 0; i < mesh.geometry.vertices.length; i++) {
            let total = 0;
            let frequency = 1;
            let amplitude = 1;

            let x = mesh.geometry.vertices[i].x
            let y = mesh.geometry.vertices[i].y

            for (var j = 0; j < this.octaves; j++) {

                let noise = this.perlin.noise(x / (this.scale * frequency), y / (this.scale * frequency), 0);
                total += (noise * amplitude);
                amplitude *= this.persistance;
                frequency *= this.lacunarity;
            }

            this.max_heightValue = (total > this.max_heightValue) ? total : this.max_heightValue
            this.min_heightValue = (total < this.min_heightValue) ? total : this.min_heightValue
            this.buffer_rawNoise.push(total)
        }
    }

    getNormalizedHeightBuffer() {
        for (let i = 0; i < this.buffer_rawNoise.length; i++) {
            this.buffer_normalized.push(this.normalize(this.buffer_rawNoise[i], this.max_heightValue, this.min_heightValue))
            
        }
        return this.buffer_normalized
    }

    displaceMesh(mesh, options) {
        let heightData = options.heightField || this.buffer_normalized

        for (let i = 0; i < mesh.geometry.vertices.length; i++) {
            const vertex = mesh.geometry.vertices[i];
            vertex.z = heightData[i] * options.zScalingFactor
        }
        mesh.geometry.verticesNeedUpdate = true;
    }

    recalculateNormals(mesh) {
        mesh.geometry.computeVertexNormals();
    }

    normalize(val, max, min) { 
        return (val - min) / (max - min); 
    }

}