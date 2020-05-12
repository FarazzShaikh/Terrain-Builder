const THREE = require('three')

export class TERRAIN {
    constructor(options) {
        this.name = options.name
        this.res_verts = options.resolution
        this.res_faces = options.resolution - 1

        this.geometry = new THREE.PlaneGeometry(20, 20, this.res_faces, this.res_faces);
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
        this.mesh.name = options.name

        this.noOf_faces = this.mesh.geometry.faces.length
        this.noOf_verts = this.mesh.geometry.vertices.length


        this.modifiers = {} 
    }

    getMesh() {
        return this.mesh
    }

    addModifier(modifier, options) {
        let instance = new modifier(options)
        let name = String(instance.name)
        this.modifiers[name] = instance
    }

    removeModifier(mod) {
        for (const key in this.modifiers) {
            if (this.modifiers.hasOwnProperty(key)) {
                

                if (key === mod) {
                    mod = undefined
                }
            }
        }
    }

    getInfo() {
        return {
            verts: this.noOf_verts,
            tris: this.noOf_faces
        }
    }




}