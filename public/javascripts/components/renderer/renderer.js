import * as THREE from '../../../lib/three.js';
import { OrbitControls } from '../../../lib/OrbitControls.js'

export default class RENDERER {
    constructor(options) {
        this.scene, this.camera, this.renderer, this.planeMesh, this.controls

        this.globals = options.globals

        this.objects = {}

        this.initScene()
        this.costomizeRenderer()
        this.initLight()
        this.render()

        window.addEventListener('resize', () => {

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize(window.innerWidth, window.innerHeight);

        }, false);
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75, window.innerWidth / window.innerHeight, 0.1, 1000
        );

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement)
        this.camera.position.set(15, 15, 15)

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.25
        this.controls.enableZoom = false
        this.controls.enablePan = true
        this.controls.enableZoom = true

        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = Math.PI / 2;


    }

    initLight() {
        const light = new THREE.PointLight(0x404040, 3)
        light.position.set(3, 10, 3)
        light.rotation.set(1, 1, 1)
        light.castShadow = true;
        light.shadow.radius = 30;
        this.scene.add(light)

        const ambLight = new THREE.AmbientLight(0x404040, 0.9)
        this.scene.add(ambLight)
    }

    render = () => {
        window.requestAnimationFrame(this.render);

        if (this.globals.doesSpin) {
            const terrain = this.scene.getObjectByProperty('name', 'Terrain')
            if (terrain) {
                terrain.rotation.z += 0.01

                if (this.globals.flags.resetRotation) {
                    terrain.rotation.z = 0
                    this.globals.flags.resetRotation = false
                    this.globals.doesSpin = false
                }
            }

        }



        this.controls.update()
        this.renderer.render(this.scene, this.camera);
    }


    costomizeRenderer() {
        let ele = this.renderer.domElement
        ele.className = "mainRenderer"
        ele.style.cursor = 'grab'
    }

    addObject(Obj, options) {
        let obj = new Obj(options)
        let name = obj.name
        this.objects[name] = obj
        this.scene.add(obj.getMesh())
        return {
            info: obj.getInfo(),
            mesh: obj.getMesh()
        }
    }

    removeObject(name) {
        const toDispose = this.scene.getObjectByProperty('name', name);
        if (toDispose) {

            this.objects[toDispose.name] = undefined

            toDispose.geometry.dispose();
            toDispose.material.dispose();
            this.scene.remove(toDispose);
            return
        }




    }

}