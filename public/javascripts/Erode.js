export default class Erode {
    constructor(geometry, wSeg, stylized) {
        this.geometry = geometry
        this.wSeg = wSeg
        this.stylized = stylized

        this.rainAmount = 0.001 //% of total verts / 100
        this.rainIntensity = 0.4 //Water inside each droplet

        this.lifetime = 0.5 //% of time after which the drop evaporates

        this.sedimentDeposition = 7
        this.waterErosion = 7

        this.steps = 300
    }

    erode() {
        this.geometry.dropletData = {
            waterLevel: new Array((this.wSeg + 1) * (this.wSeg + 1)).fill(0),
            lifetime: new Array((this.wSeg + 1) * (this.wSeg + 1)).fill(0.75),
            sedimentLevel: new Array((this.wSeg + 1) * (this.wSeg + 1)).fill(0),
        }
        this.geometry.neighboursData = new Array((this.wSeg + 1) * (this.wSeg + 1))


        this.findNeighbours()
        this.rain()

        for (let i = 0; i < this.steps; i++) {

            this.simWater()
        }

        this.geometry.verticesNeedUpdate = true;
        if (!this.stylized) {
            this.geometry.computeVertexNormals();
        }


    }

    rain() {


        for (let i = 0; i < Math.floor(this.geometry.vertices.length * this.rainAmount); i++) {
            let randIndex = Math.floor(Math.random() * this.geometry.vertices.length)
            let randLifetime = Math.random() * this.lifetime

            this.geometry.dropletData.waterLevel[randIndex] += this.rainIntensity
            this.geometry.dropletData.lifetime[randIndex] = randLifetime
        }
    }

    simWater(time) {
        console.log('simulation iteration')
        for (let j = 0; j < this.geometry.vertices.length; j++) {
            let cPoint = this.geometry.vertices[j]
            let greaterFlag = false
            let calcLifetime = 500 * this.geometry.dropletData.lifetime[j]

            if (this.geometry.dropletData.waterLevel[j] > 0) {
                if (this.geometry.neighboursData[j].n !== null) {
                    if (this.geometry.neighboursData[j].n.z < cPoint.z) {
                        this.geometry.dropletData.waterLevel[this.geometry.neighboursData[j].ni] += 0.2
                        this.geometry.dropletData.waterLevel[j] -= 0.2

                        this.geometry.vertices[j].z += (this.geometry.vertices[j].z - this.geometry.vertices[this.geometry.neighboursData[j].ni].z) / this.waterErosion

                        if (this.geometry.dropletData.sedimentLevel[j] > 0) {
                            this.geometry.dropletData.sedimentLevel[j] -= 0.1
                            this.geometry.dropletData.sedimentLevel[this.geometry.neighboursData[j].ni] += 0.1

                            this.geometry.vertices[this.geometry.neighboursData[j].ni].z += (this.geometry.vertices[j].z - this.geometry.vertices[this.geometry.neighboursData[j].ni].z) / this.sedimentDeposition

                        }

                        greaterFlag = false
                    } else {
                        greaterFlag = true
                    }
                }
                if (this.geometry.neighboursData[j].e !== null) {
                    if (this.geometry.neighboursData[j].e.z < cPoint.z) {
                        this.geometry.dropletData.waterLevel[this.geometry.neighboursData[j].ei] += 0.2
                        this.geometry.dropletData.waterLevel[j] -= 0.2

                        this.geometry.vertices[j].z -= (this.geometry.vertices[j].z - this.geometry.vertices[this.geometry.neighboursData[j].ei].z) / this.waterErosion

                        if (this.geometry.dropletData.sedimentLevel[j] > 0) {
                            this.geometry.dropletData.sedimentLevel[j] -= 0.1
                            this.geometry.dropletData.sedimentLevel[this.geometry.neighboursData[j].ei] += 0.1

                            this.geometry.vertices[this.geometry.neighboursData[j].ei].z += (this.geometry.vertices[j].z - this.geometry.vertices[this.geometry.neighboursData[j].ei].z) / this.sedimentDeposition
                        }

                        greaterFlag = false
                    } else {
                        greaterFlag = true
                    }
                }
                if (this.geometry.neighboursData[j].s !== null) {
                    if (this.geometry.neighboursData[j].s.z < cPoint.z) {
                        this.geometry.dropletData.waterLevel[this.geometry.neighboursData[j].si] += 0.2
                        this.geometry.dropletData.waterLevel[j] -= 0.2

                        this.geometry.vertices[j].z += (this.geometry.vertices[j].z - this.geometry.vertices[this.geometry.neighboursData[j].si].z) / this.waterErosion

                        if (this.geometry.dropletData.sedimentLevel[j] > 0) {
                            this.geometry.dropletData.sedimentLevel[j] -= 0.1
                            this.geometry.dropletData.sedimentLevel[this.geometry.neighboursData[j].si] += 0.1

                            this.geometry.vertices[this.geometry.neighboursData[j].si].z += (this.geometry.vertices[j].z - this.geometry.vertices[this.geometry.neighboursData[j].si].z) / this.sedimentDeposition
                        }

                        greaterFlag = false
                    } else {
                        greaterFlag = true
                    }
                }
                if (this.geometry.neighboursData[j].w !== null) {
                    if (this.geometry.neighboursData[j].w.z < cPoint.z) {
                        this.geometry.dropletData.waterLevel[this.geometry.neighboursData[j].wi] += 0.2
                        this.geometry.dropletData.waterLevel[j] -= 0.2

                        this.geometry.vertices[j].z += (this.geometry.vertices[j].z - this.geometry.vertices[this.geometry.neighboursData[j].wi].z) / this.waterErosion

                        if (this.geometry.dropletData.sedimentLevel[j] > 0) {
                            this.geometry.dropletData.sedimentLevel[j] -= 0.1
                            this.geometry.dropletData.sedimentLevel[this.geometry.neighboursData[j].wi] += 0.1

                            this.geometry.vertices[this.geometry.neighboursData[j].wi].z += (this.geometry.vertices[j].z - this.geometry.vertices[this.geometry.neighboursData[j].wi].z) / this.sedimentDeposition
                        }

                        greaterFlag = false
                    } else {
                        greaterFlag = true
                    }
                }

                if (greaterFlag) {
                    let randNeighbourI = Math.floor(Math.random() * 4)
                    if (randNeighbourI === 0) {
                        this.geometry.dropletData.waterLevel[this.geometry.neighboursData[j].ni] += 0.2
                        this.geometry.dropletData.waterLevel[j] -= 0.2

                        this.geometry.dropletData.sedimentLevel[this.geometry.neighboursData[j].ni] += 0.1
                    } else if (randNeighbourI === 1) {
                        this.geometry.dropletData.waterLevel[this.geometry.neighboursData[j].ei] += 0.2
                        this.geometry.dropletData.waterLevel[j] -= 0.2

                        this.geometry.dropletData.sedimentLevel[this.geometry.neighboursData[j].ei] += 0.1
                    } else if (randNeighbourI === 1) {
                        this.geometry.dropletData.waterLevel[this.geometry.neighboursData[j].si] += 0.2
                        this.geometry.dropletData.waterLevel[j] -= 0.2

                        this.geometry.dropletData.sedimentLevel[this.geometry.neighboursData[j].si] += 0.1
                    } else if (randNeighbourI === 1) {
                        this.geometry.dropletData.waterLevel[this.geometry.neighboursData[j].wi] += 0.2
                        this.geometry.dropletData.waterLevel[j] -= 0.2

                        this.geometry.dropletData.sedimentLevel[this.geometry.neighboursData[j].wi] += 0.1
                    }
                }

                if (this.geometry.dropletData.waterLevel[j] < -1) {
                    this.geometry.dropletData.waterLevel[j] = -1

                }

                if (this.geometry.dropletData.sedimentLevel[j] < -1) {
                    this.geometry.dropletData.sedimentLevel[j] = -1

                }

                if (calcLifetime < time) {
                    this.geometry.dropletData.waterLevel[j] = -1
                    this.geometry.dropletData.sedimentLevel[j] += 0.1
                }


            }





        }


    }

    findNeighbours() {
        let verts = this.convertArr(this.geometry.vertices, this.wSeg + 1)
        for (let x = 0; x < verts.length; x++) {
            for (let y = 0; y < verts[x].length; y++) {

                let index = (x * (this.wSeg + 1)) + y

                let neighbours = {
                    n: (y + 1 > verts[x].length - 1) ? null : verts[x][y + 1],
                    s: (x + 1 > verts.length - 1) ? null : verts[x + 1][y],
                    e: (y - 1 < 0) ? null : verts[x][y - 1],
                    w: (x - 1 < 0) ? null : verts[x - 1][y],
                    //--------------------------------------------
                    ne: (y + 1 > verts[x].length - 1 || x + 1 > verts.length - 1) ? null : verts[x + 1][y + 1],
                    nw: (y + 1 > verts[x].length - 1 || x - 1 < 0) ? null : verts[x - 1][y + 1],
                    se: (y - 1 < 0 || x + 1 > verts.length - 1) ? null : verts[x + 1][y - 1],
                    sw: (y - 1 < 0 || x - 1 < 0) ? null : verts[x - 1][y - 1],
                    //--------------------------------------------
                    ni: (x * (this.wSeg + 1)) + (y + 1),
                    si: ((x + 1) * (this.wSeg + 1)) + y,
                    ei: (x * (this.wSeg + 1)) + (y - 1),
                    wi: ((x - 1) * (this.wSeg + 1)) + y,
                    //--------------------------------------------
                    nei: ((x + 1) * (this.wSeg + 1)) + (y + 1),
                    nwi: ((x - 1) * (this.wSeg + 1)) + (y + 1),
                    sei: ((x + 1) * (this.wSeg + 1)) + (y - 1),
                    swi: ((x - 1) * (this.wSeg + 1)) + (y - 1),
                    //--------------------------------------------
                    waterLevelIndex: index
                }

                this.geometry.neighboursData[index] = neighbours


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
}