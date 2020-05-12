const THREE = require('three')

export class COLOR {
    constructor(options) {
        this.name = 'Color'
        this.mode = options.mode
    }

    color(mesh) {

        mesh.geometry.computeBoundingBox();
        let zMin = mesh.geometry.boundingBox.min.z;
        let zMax = mesh.geometry.boundingBox.max.z;
        let zRange = zMax - zMin;
        let color, point, face, numberOfSides, vertexIndex;
        // faces are indexed using characters
        let faceIndices = ['a', 'b', 'c', 'd'];

        // first, assign colors to vertices as desired
        for (let i = 0; i < mesh.geometry.vertices.length; i++) {
            point = mesh.geometry.vertices[i];

            if (this.mode === 'clay') {
                color = new THREE.Color(0xffffff);
                // let calc = (0.7 * (point.z) / zRange)
                // color.setRGB(calc, calc, calc)
            } else if (this.mode === 'heatmap') {
                color = new THREE.Color(0x0000ff);
                let calc = 0.1 * (zMax - point.z) / zRange
                color.setHSL(calc, 1, 0.5);
            }
            mesh.geometry.colors[i] = color; // use this array for convenience
        }

        mesh.geometry.colors[0] = new THREE.Color(0xff0000)

        // copy the colors as necessary to the face's vertexColors array.
        for (let i = 0; i < mesh.geometry.faces.length; i++) {
            face = mesh.geometry.faces[i];
            numberOfSides = (face instanceof THREE.Face3) ? 3 : 4;
            for (var j = 0; j < numberOfSides; j++) {
                vertexIndex = face[faceIndices[j]];
                face.vertexColors[j] = mesh.geometry.colors[vertexIndex];
            }

        }

        mesh.geometry.elementsNeedUpdate = true
    }

}