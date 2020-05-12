import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class RENDERER {
    constructor(options) {
        this.scene = undefined 
        this.camera = undefined 
        this.renderer = undefined 
        this.planeMesh = undefined 
        this.controls = undefined 

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
        
        document.getElementById('root').appendChild(this.renderer.domElement)
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