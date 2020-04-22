import * as THREE from '../lib/three.js';
import { OrbitControls } from '../lib/OrbitControls.js'
import Plane from './Plane.js'
import UI from './uiButtons.js'
import Info from './info.js';
import Defaults from './Defaults.js';


let scene, camera, renderer, planeMesh, controls, plane

let defaults = new Defaults()
sessionStorage.setItem('shading', defaults.shading)
sessionStorage.setItem('color', defaults.color)
sessionStorage.setItem('seed', defaults.seed)
sessionStorage.setItem('resolution', defaults.resolution)


let wireframe = false
sessionStorage.setItem('isWireframe', wireframe)

let time = {
    displace: 0,
    erode: 0,
    map: 0
}
let ui = new UI(plane, defaults, refreshTerrain)

let ctrlPressed = false
let configOpen = false
let mouse = {
    x: 0,
    y: 0
}

let subdivs = Number(sessionStorage.getItem('resolution'))

function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000
    );

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement)
    camera.position.set(15, 15, 15)

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = false
    controls.enablePan = true
    controls.enableZoom = true

    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;

    // let gridSize = 30;
    // let gridDivisions = 100;
    // let gridHelper = new THREE.GridHelper(gridSize, gridDivisions, true);
    // scene.add(gridHelper);

    let axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);
}

function initLight() {
    const light = new THREE.PointLight(0x404040, 3)
    light.position.set(3, 10, 3)
    light.rotation.set(1, 1, 1)
    light.castShadow = true;
    light.shadow.radius = 30;
    scene.add(light)

    const ambLight = new THREE.AmbientLight(0x404040, 0.9)
    scene.add(ambLight)
}

function initGeometry(preserveSeed, seed) {
    let res = Number(sessionStorage.getItem('resolution'))
    plane = new Plane(wireframe, res)
    planeMesh = plane.mesh
    time.displace = plane.displace(preserveSeed, seed);
    time.erode = plane.modifier.erode()
    plane.color()
        // plane.generateMap()
    scene.add(planeMesh);

}



function render() {
    window.requestAnimationFrame(render);

    if (planeMesh) {
        planeMesh.rotation.z += 0.005;

    }

    controls.update()
    renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}


function costomizeRenderer() {
    let ele = renderer.domElement
    ele.className = "mainRenderer"
    ele.style.cursor = 'grab'
}

// let a = 0;
// setInterval(() => {


//     if (a < 500) {
//         plane.modifier.simWater(a)
//         plane.color()
//         a++
//     }

// }, 100);


initScene()
costomizeRenderer()
initLight()
initGeometry(false, 0)
render()
setConfigPane()
setInfoPane()

window.addEventListener('resize', onWindowResize, false);



window.onmousemove = (e) => {
    e = e || window.event;
    mouse.x = e.clientX
    mouse.y = e.clientY

    if (ctrlPressed === true) {
        ui.show_info()
        ui.setInfoDivPos(e.clientX, e.clientY)
    } else {
        ui.setInfoDivPos(e.clientX, e.clientY)
        ui.hide_info()
    }
}

document.addEventListener('keydown', (key) => {
    if (key.key === 'Control') {
        ctrlPressed = true

    }
});

document.addEventListener('keyup', (key) => {
    if (key.key === 'Control') {
        ctrlPressed = false
    }
});



function setConfigPane(params) {
    if (document.addEventListener) {
        document.addEventListener('contextmenu', function(e) {
            if (configOpen) {
                ui.hide_config()
                configOpen = false
            } else {
                ui.setConfigDivPos(mouse.x, mouse.y)
                ui.show_config()
                configOpen = true
            }

            e.preventDefault();
        }, false);
    } else {
        document.attachEvent('oncontextmenu', function() {
            alert("You've tried to open context menu");
            window.event.returnValue = false;
        });
    }
}

function setInfoPane() {
    let info = new Info(
        planeMesh.geometry.vertices.length,
        planeMesh.geometry.faces.length,
        time.displace,
        plane.modifier.steps,
        Math.floor(plane.modifier.rainAmount * planeMesh.geometry.vertices.length),
        time.erode,
        subdivs,
        false,
        0
    )
    ui.setInfoDivContent(info)
}

function refreshTerrain() {
    let planeToDispose = scene.getObjectByProperty('name', 'main')
    planeToDispose.geometry.dispose();
    planeToDispose.material.dispose();
    scene.remove(planeToDispose);

    let seed = sessionStorage.getItem('seed')
    initGeometry(true, seed)

    setInfoPane()

    return plane
}