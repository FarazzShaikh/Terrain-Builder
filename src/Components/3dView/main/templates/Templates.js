import * as THREE from 'three';

export class BaseObject {
    constructor(geometry, material, options) {
        this.geometry = geometry
        this.material = material

        if(options.customMeshClass) {
            this.mesh = new options.customMeshClass[0](...options.customMeshClass[1]);
        } else {
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            
        }

        this.mesh.name = options.name || 'Unnamed_Object'

        if(options.initRotation) {
            this.mesh.rotateX(options.initRotation.x)
            this.mesh.rotateY(options.initRotation.y)
            this.mesh.rotateZ(options.initRotation.z)
        }
        if(options.initTranslate) {
            this.mesh.translateX(options.initTranslate.x)
            this.mesh.translateY(options.initTranslate.y)
            this.mesh.translateZ(options.initTranslate.z)
        }

        this.modifiers = {}

    }

    getMesh() {
        return this.mesh
    }

    getName() {
        return this.mesh.name
    }

    getVerts() {
        return this.mesh.geometry.vertices
    }

    setVerts(verts) {
        if(typeof verts === Array) {
            if(typeof verts[0] !== THREE.Vector3) {
                throw new Error(`Verts must be of type THREE.Vector3`)
            }
        }

        if(verts.length === this.mesh.geometry.vertices.length) {
            this.mesh.geometry.vertices = verts
        } else {
            throw new Error(`Number of verticies does not match orignal number.`)
        }

    }

    setName(name) {
        if(typeof name !== String) {
            throw new Error(`Name must be of type String.`)
        }
        this.mesh.name = name
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
                    this.modifiers[key] = undefined
                }
            }
        }
    }
    
}