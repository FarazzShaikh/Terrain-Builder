import * as THREE from '../lib/three.js';
import Perlin from '../lib/perlin.js'

export default class Plane {

    constructor(stylized, greyscale, wireframe, subdivs) {
        this.max = 0;
        this.stylized = stylized
        this.greyscale = greyscale
        this.vertColorData = []
        this.wSeg = this.hSeg = subdivs
        this.geometry = new THREE.PlaneGeometry(20, 20, this.wSeg, this.hSeg);
        // this.geometry = new THREE.BoxGeometry( 5, 5, 5, this.wSeg, this.hSeg)
        this.isWire = wireframe
        this.material = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            flatShading: false,
            wireframe: this.isWire,
            side: THREE.DoubleSide,
            vertexColors: THREE.VertexColors,

            roughness: 1,
            metalness: 0,

        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = Math.PI / 2 + Math.PI
        this.mesh.name = 'main'

        this.tris = this.mesh.geometry.faces.length
        this.verts = this.mesh.geometry.vertices.length
    }

    displace(preserveSeed, seed) {

        this.resetNormals();
        let timerStart = Date.now();
        if (preserveSeed) {
            this.seed = seed
        } else {
            this.seed = (sessionStorage.getItem('seed') === null || sessionStorage.getItem('seed') === '') ? Math.random() : sessionStorage.getItem('seed')
        }

        let pn = new Perlin(this.seed);

        let seedText = document.querySelector('header .seed-txt .val input')
        seedText.placeholder = this.seed


        let octaves = 7
        let scale = 0.09
        let persistance = 2
        let lacunarity = 2


        for (var i = 0; i < this.mesh.geometry.vertices.length; i++) {
            let total = 0;
            let frequency = 1;
            let amplitude = 1;

            let x = this.mesh.geometry.vertices[i].x
            let y = this.mesh.geometry.vertices[i].y

            for (var j = 0; j < octaves; j++) {

                let noise = pn.noise(x / (scale * frequency), y / (scale * frequency), 0);
                total += (noise * amplitude);
                amplitude *= persistance;
                frequency *= lacunarity;
            }
            this.mesh.geometry.vertices[i].z = total / 10 - 5
            this.max = (total > this.max) ? total : this.max

            this.vertColorData.push(total)

        }

        if (!this.stylized) {
            this.geometry.computeVertexNormals();
        }

        this.geometry.verticesNeedUpdate = true;
        this.tris = this.mesh.geometry.faces.length
        this.verts = this.mesh.geometry.vertices.length
        this.timeToDisplace = Date.now() - timerStart
    }

    color() {
        this.geometry.computeBoundingBox();
        let zMin = this.geometry.boundingBox.min.z;
        let zMax = this.geometry.boundingBox.max.z;
        let zRange = zMax - zMin;
        let color, point, face, numberOfSides, vertexIndex;

        // faces are indexed using characters
        let faceIndices = ['a', 'b', 'c', 'd'];

        // first, assign colors to vertices as desired
        for (let i = 0; i < this.geometry.vertices.length; i++) {
            point = this.geometry.vertices[i];

            if (this.greyscale) {
                color = new THREE.Color(0x000000);
                let calc = 0.7 * (zMax - point.z) / zRange
                color.setRGB(calc, calc, calc)
            } else {
                color = new THREE.Color(0x0000ff);
                color.setHSL(0.7 * (zMax - point.z) / zRange, 1, 0.5);
            }
            this.geometry.colors[i] = color; // use this array for convenience
        }

        // copy the colors as necessary to the face's vertexColors array.
        for (let i = 0; i < this.geometry.faces.length; i++) {
            face = this.geometry.faces[i];
            numberOfSides = (face instanceof THREE.Face3) ? 3 : 4;
            for (var j = 0; j < numberOfSides; j++) {
                vertexIndex = face[faceIndices[j]];
                face.vertexColors[j] = this.geometry.colors[vertexIndex];
            }

        }

        this.geometry.elementsNeedUpdate = true
    }

    generateMap() {

        var c = document.querySelector(".myCanvas canvas");

        c.width = c.height * (c.clientWidth / c.clientHeight);
        var ctx = c.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, c.width, c.height);
        var imgData = ctx.createImageData(this.wSeg + 1, this.hSeg + 1);

        let mapData = new Uint8ClampedArray(imgData.data.length)
        let dataind = 0;
        for (var i = 0; i < this.geometry.colors.length; i += 1) {
            mapData[dataind + 0] = this.geometry.colors[i].r * 255;
            mapData[dataind + 1] = this.geometry.colors[i].g * 255;
            mapData[dataind + 2] = this.geometry.colors[i].b * 255;
            mapData[dataind + 3] = 255;
            dataind += 4
        }
        for (let i = 0; i < imgData.data.length; i++) {
            imgData.data[i] = mapData[i]
        }

        // create a temporary canvas
        var tempCanvas = document.createElement("canvas");
        var tempCtx = tempCanvas.getContext("2d");

        // set the temp canvas size == the canvas size
        tempCanvas.width = c.width;
        tempCanvas.height = c.height;

        // put the modified pixels on the temp canvas
        tempCtx.putImageData(imgData, 0, 0);

        // use the tempCanvas.toDataURL to create an img object
        var img = new Image();


        img.onload = function() {
            // drawImage the img on the canvas
            ctx.drawImage(img, 0, 0)
        }
        img.src = tempCanvas.toDataURL();

        let scalingFactor = 256 / this.hSeg
        console.log(scalingFactor)

        ctx.scale(scalingFactor, scalingFactor)


    }

    resetNormals() {
        for (var i = 0; i < this.mesh.geometry.vertices.length; i++) {
            this.mesh.geometry.vertices[i].z = 0;
        }
        this.geometry.computeVertexNormals();
    }
}