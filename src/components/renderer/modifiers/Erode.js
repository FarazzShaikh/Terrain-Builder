export class ERODE {
    constructor(options) {
        this.name = 'Erode'
        this.seed = options.seed
        this.rainAmount = options.rainAmount // % of total verts / 100
        this.rainIntensity = options.rainIntensity // Water inside each droplet
        this.lifetime = options.lifetime // % of time after which the drop evaporates
        this.sedimentDeposition = options.sedimentDeposition
        this.waterErosion = options.waterErosion
        this.steps = options.steps

        this.res_verts = options.res_verts

    }

    init_Erosion(mesh) {
        mesh.geometry.dropletData = {
            waterLevel: new Array((this.res_verts) * (this.res_verts)).fill(0),
            lifetime: new Array((this.res_verts) * (this.res_verts)).fill(0.75),
            sedimentLevel: new Array((this.res_verts) * (this.res_verts)).fill(0),
        }
        mesh.geometry.neighboursData = new Array((this.res_verts) * (this.res_verts))

        this.findNeighbours(mesh, this.res_verts)
    }

    calculateRain(mesh) {
        for (let i = 0; i < Math.floor(mesh.geometry.vertices.length * this.rainAmount); i++) {
            let randIndex = Math.floor(Math.random() * mesh.geometry.vertices.length)
            let randLifetime = Math.random() * this.lifetime

            mesh.geometry.dropletData.waterLevel[randIndex] += this.rainIntensity
            mesh.geometry.dropletData.lifetime[randIndex] = randLifetime
        }
    }

    simWater(mesh, cStep) {

        let deltaSteps = this.steps - cStep
        for (let l = 0; l < deltaSteps; l++) {


            for (let j = 0; j < mesh.geometry.vertices.length; j++) {
                let cPoint = mesh.geometry.vertices[j]
                let greaterFlag = false


                if (mesh.geometry.dropletData.waterLevel[j] > 0) {

                    if (mesh.geometry.neighboursData[j].n !== null) {
                        if (mesh.geometry.neighboursData[j].n.z < cPoint.z) {
                            mesh.geometry.dropletData.waterLevel[mesh.geometry.neighboursData[j].ni] += 0.2
                            mesh.geometry.dropletData.waterLevel[j] -= 0.2

                            mesh.geometry.vertices[j].z -= (mesh.geometry.vertices[j].z - mesh.geometry.vertices[mesh.geometry.neighboursData[j].ni].z) / this.waterErosion

                            if (mesh.geometry.dropletData.sedimentLevel[j] > 0) {
                                mesh.geometry.dropletData.sedimentLevel[j] -= 0.1
                                mesh.geometry.dropletData.sedimentLevel[mesh.geometry.neighboursData[j].ni] += 0.1

                                mesh.geometry.vertices[mesh.geometry.neighboursData[j].ni].z += (mesh.geometry.vertices[j].z - mesh.geometry.vertices[mesh.geometry.neighboursData[j].ni].z) / this.sedimentDeposition
                               
                            }

                            greaterFlag = false
                        } else {
                            greaterFlag = true
                        }
                    }
                    if (mesh.geometry.neighboursData[j].e !== null) {
                        if (mesh.geometry.neighboursData[j].e.z < cPoint.z) {
                            mesh.geometry.dropletData.waterLevel[mesh.geometry.neighboursData[j].ei] += 0.2
                            mesh.geometry.dropletData.waterLevel[j] -= 0.2

                            mesh.geometry.vertices[j].z -= (mesh.geometry.vertices[j].z - mesh.geometry.vertices[mesh.geometry.neighboursData[j].ei].z) / this.waterErosion

                            if (mesh.geometry.dropletData.sedimentLevel[j] > 0) {
                                mesh.geometry.dropletData.sedimentLevel[j] -= 0.1
                                mesh.geometry.dropletData.sedimentLevel[mesh.geometry.neighboursData[j].ei] += 0.1

                                mesh.geometry.vertices[mesh.geometry.neighboursData[j].ei].z += (mesh.geometry.vertices[j].z - mesh.geometry.vertices[mesh.geometry.neighboursData[j].ei].z) / this.sedimentDeposition
                                
                            }

                            greaterFlag = false
                        } else {
                            greaterFlag = true
                        }
                    }
                    if (mesh.geometry.neighboursData[j].s !== null) {
                        if (mesh.geometry.neighboursData[j].s.z < cPoint.z) {
                            mesh.geometry.dropletData.waterLevel[mesh.geometry.neighboursData[j].si] += 0.2
                            mesh.geometry.dropletData.waterLevel[j] -= 0.2

                            mesh.geometry.vertices[j].z -= (mesh.geometry.vertices[j].z - mesh.geometry.vertices[mesh.geometry.neighboursData[j].si].z) / this.waterErosion

                            if (mesh.geometry.dropletData.sedimentLevel[j] > 0) {
                                mesh.geometry.dropletData.sedimentLevel[j] -= 0.1
                                mesh.geometry.dropletData.sedimentLevel[mesh.geometry.neighboursData[j].si] += 0.1

                                mesh.geometry.vertices[mesh.geometry.neighboursData[j].si].z += (mesh.geometry.vertices[j].z - mesh.geometry.vertices[mesh.geometry.neighboursData[j].si].z) / this.sedimentDeposition
                                
                            }

                            greaterFlag = false
                        } else {
                            greaterFlag = true
                        }
                    }
                    if (mesh.geometry.neighboursData[j].w !== null) {
                        if (mesh.geometry.neighboursData[j].w.z < cPoint.z) {
                            mesh.geometry.dropletData.waterLevel[mesh.geometry.neighboursData[j].wi] += 0.2
                            mesh.geometry.dropletData.waterLevel[j] -= 0.2

                            mesh.geometry.vertices[j].z -= (mesh.geometry.vertices[j].z - mesh.geometry.vertices[mesh.geometry.neighboursData[j].wi].z) / this.waterErosion

                            if (mesh.geometry.dropletData.sedimentLevel[j] > 0) {
                                mesh.geometry.dropletData.sedimentLevel[j] -= 0.1
                                mesh.geometry.dropletData.sedimentLevel[mesh.geometry.neighboursData[j].wi] += 0.1

                                mesh.geometry.vertices[mesh.geometry.neighboursData[j].wi].z += (mesh.geometry.vertices[j].z - mesh.geometry.vertices[mesh.geometry.neighboursData[j].wi].z) / this.sedimentDeposition
                                
                            }

                            greaterFlag = false
                        } else {
                            greaterFlag = true
                        }
                    }

                    if (greaterFlag) {
                        let randNeighbourI = Math.floor(Math.random() * 4)
                        if (randNeighbourI === 0) {
                            mesh.geometry.dropletData.waterLevel[mesh.geometry.neighboursData[j].ni] += 0.2
                            mesh.geometry.dropletData.waterLevel[j] -= 0.2

                            mesh.geometry.dropletData.sedimentLevel[mesh.geometry.neighboursData[j].ni] += 0.1
                        } else if (randNeighbourI === 1) {
                            mesh.geometry.dropletData.waterLevel[mesh.geometry.neighboursData[j].ei] += 0.2
                            mesh.geometry.dropletData.waterLevel[j] -= 0.2

                            mesh.geometry.dropletData.sedimentLevel[mesh.geometry.neighboursData[j].ei] += 0.1
                        } else if (randNeighbourI === 1) {
                            mesh.geometry.dropletData.waterLevel[mesh.geometry.neighboursData[j].si] += 0.2
                            mesh.geometry.dropletData.waterLevel[j] -= 0.2

                            mesh.geometry.dropletData.sedimentLevel[mesh.geometry.neighboursData[j].si] += 0.1
                        } else if (randNeighbourI === 1) {
                            mesh.geometry.dropletData.waterLevel[mesh.geometry.neighboursData[j].wi] += 0.2
                            mesh.geometry.dropletData.waterLevel[j] -= 0.2

                            mesh.geometry.dropletData.sedimentLevel[mesh.geometry.neighboursData[j].wi] += 0.1
                        }
                    }

                    if (mesh.geometry.dropletData.waterLevel[j] < -1) {
                        mesh.geometry.dropletData.waterLevel[j] = -1

                    }

                    if (mesh.geometry.dropletData.sedimentLevel[j] < -1) {
                        mesh.geometry.dropletData.sedimentLevel[j] = -1

                    }




                }

            }
        }
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.computeVertexNormals();

        let erode_heightBuffer = []
        for (let j = 0; j < mesh.geometry.vertices.length; j++) {
            erode_heightBuffer.push(mesh.geometry.vertices[j].z)
        }

        return erode_heightBuffer
    }

    // Private
    findNeighbours(mesh, res_verts) {
        let verts = this.convertArr(mesh.geometry.vertices, res_verts)
        for (let x = 0; x < verts.length; x++) {
            for (let y = 0; y < verts[x].length; y++) {

                let index = (x * (res_verts)) + y

                let neighbours = {
                    n: (y + 1 > verts[x].length - 1) ? null : verts[x][y + 1],
                    s: (x + 1 > verts.length - 1) ? null : verts[x + 1][y],
                    e: (y - 1 < 0) ? null : verts[x][y - 1],
                    w: (x - 1 < 0) ? null : verts[x - 1][y],
                    //--------------------------------------------
                    // ne: (y + 1 > verts[x].length - 1 || x + 1 > verts.length - 1) ? null : verts[x + 1][y + 1],
                    // nw: (y + 1 > verts[x].length - 1 || x - 1 < 0) ? null : verts[x - 1][y + 1],
                    // se: (y - 1 < 0 || x + 1 > verts.length - 1) ? null : verts[x + 1][y - 1],
                    // sw: (y - 1 < 0 || x - 1 < 0) ? null : verts[x - 1][y - 1],
                    //--------------------------------------------
                    ni: (x * (res_verts)) + (y + 1),
                    si: ((x + 1) * (res_verts)) + y,
                    ei: (x * (res_verts)) + (y - 1),
                    wi: ((x - 1) * (res_verts)) + y,
                    //--------------------------------------------
                    // nei: ((x + 1) * (res_verts)) + (y + 1),
                    // nwi: ((x - 1) * (res_verts)) + (y + 1),
                    // sei: ((x + 1) * (res_verts)) + (y - 1),
                    // swi: ((x - 1) * (res_verts)) + (y - 1),
                    //--------------------------------------------
                    waterLevelIndex: index
                }

                mesh.geometry.neighboursData[index] = neighbours


            }
        }
    }

    convertArr(array, part) {
        var tmp = [];
        for (var i = 0; i < array.length; i += part) {
            tmp.push(array.slice(i, i + part));
        }
        return tmp;
    }

    getInfo() {
        return {
            iterations: this.steps,
            droplets: Math.floor((this.res_verts * this.res_verts) * this.rainAmount)
        }
    }

    removeErosion(mesh, heightField, heightScale) {
        for (let j = 0; j < mesh.geometry.vertices.length; j++) {
            mesh.geometry.vertices[j].z = heightField[j] * heightScale
        }
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.computeVertexNormals();
    }

    setErosionBUffer(mesh, buffer) {
        for (let j = 0; j < mesh.geometry.vertices.length; j++) {
            mesh.geometry.vertices[j].z = buffer[j]
        }
        mesh.geometry.verticesNeedUpdate = true;
        mesh.geometry.computeVertexNormals();
        return buffer
    }
}