import * as THREE from '../lib/three.js';
import { OrbitControls } from '../lib/OrbitControls.js'
import Plane from './Plane.js'
import UI from './uiButtons.js'
import Info from './info.js';

let ui = new UI()
let scene, camera, renderer, planeMesh, controls, plane

let stylized = false
let greyscale = true
let subdivs = 128
let wireframe = false

sessionStorage.setItem('isStylized', stylized)
sessionStorage.setItem('isGreyscale', greyscale)
sessionStorage.setItem('subdivs', subdivs)
sessionStorage.setItem('isWireframe', wireframe)

let time = {
    displace: 0,
    erode: 0,
    map: 0
}

let mouse = {
    x: 0,
    y: 0
}
let isConfigVisible = false
let isInfoVisible = false


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
    plane = new Plane(stylized, greyscale, wireframe, subdivs)
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
render();
window.addEventListener('resize', onWindowResize, false);



window.onmousemove = (e) => {
    e = e || window.event;
    mouse.x = e.clientX
    mouse.y = e.clientY
}



document.body.onkeydown = (key) => {
    console.log(key)
    if (key.ctrlKey) {
        toggle_config()
    } else if (key.shiftKey) {
        toggle_info()
    }

}






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

var toggle_info = function() {
    var on = false;
    return function() {
        if (!on) {
            on = true;
            ui.show_info()
            ui.setInfoDivPos(mouse.x, mouse.y)
            return;
        }
        ui.hide_info()
        on = false;
    }
}();

var toggle_config = function() {
    var on = false;
    return function() {
        if (!on) {
            on = true;
            ui.show_config()
            ui.setConfigDivPos(mouse.x, mouse.y)
            return;
        }
        ui.hide_config()
        on = false;
    }
}();