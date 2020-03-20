import * as THREE from '../lib/three.js';
import { OrbitControls } from '../lib/OrbitControls.js'
import Plane from './Plane.js'
import UI from './uiButtons.js'

let scene, camera, renderer, planeMesh, controls, plane

let stylized = true
let greyscale = true
let subdivs = 256
let wireframe = false

sessionStorage.setItem('isStylized', stylized)
sessionStorage.setItem('isGreyscale', greyscale)
sessionStorage.setItem('subdivs', subdivs)
sessionStorage.setItem('isWireframe', wireframe)


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
    light.position.set(3, 3, 3)
    light.rotation.set(1, 1, 1)
    light.castShadow = true;
    light.shadow.radius = 30;
    scene.add(light)

    const ambLight = new THREE.AmbientLight(0x404040, 0.9)
    scene.add(ambLight)
}

function initGeometry() {
    plane = new Plane(stylized, greyscale, wireframe, subdivs)
    planeMesh = plane.mesh
    plane.displace();
    plane.color()
    plane.generateMap()
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

document.querySelector('.myCanvas').addEventListener("click", () => {
    download()
});

function download() {
    let canvas = document.querySelector('.myCanvas canvas')
    let link = document.getElementById('link');
    link.setAttribute('download', 'heightMap.png');
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
}

function costomizeRenderer() {
    let ele = renderer.domElement
    ele.className = "mainRenderer"
}



initScene()
costomizeRenderer()
initLight()
initGeometry()
render();
window.addEventListener('resize', onWindowResize, false);

//--------------------------------------------------------------------------

let ui = new UI()

ui.switches.slider.addEventListener("change", () => {
    let val;
    switch (document.querySelector(".switches ul .slider input").value) {
        case '0':
            val = '32';
            break;
        case '0.25':
            val = '128';
            break;
        case '0.5':
            val = '256';
            break;
        case '0.75':
            val = '1024';
            break;
        case '1':
            val = '2048';
            break;
    }

    const object = scene.getObjectByProperty('name', 'main')
    object.geometry.dispose();
    object.material.dispose();
    scene.remove(object);
    plane = null;
    subdivs = Number(val)
    initGeometry();
    setDataLabels()
})

ui.switches.slider.addEventListener("input", () => {
    let val;
    switch (ui.switches.slider.value) {
        case '0':
            val = '32';
            break;
        case '0.25':
            val = '128';
            break;
        case '0.5':
            val = '256';
            break;
        case '0.75':
            val = '1024';
            break;
        case '1':
            val = '2048';
            break;
    }
    document.querySelector('.switches ul .slider .switch-txt').innerHTML = val
})


function setDataLabels() {
    ui.trisLabel.innerHTML = kFormatter(plane.tris)
    ui.vertsLabel.innerHTML = kFormatter(plane.verts)
    ui.timeLabel.innerHTML = plane.timeToDisplace + 'ms'
}

function setSwitchesFromCookie() {

    ui.switches.style.checked = stylized
    ui.switches.grey.checked = greyscale
    ui.switches.wire.checked = wireframe
}

ui.refreshButton.addEventListener('click', () => {
    let userSeed = ui.seedInput.value
    sessionStorage.setItem('seed', userSeed)



    plane.displace()
    setDataLabels()
})

ui.switches.style.addEventListener('change', () => {
    plane.stylized = ui.switches.style.checked
    stylized = ui.switches.style.checked

    plane.displace(true)

})

ui.switches.grey.addEventListener('change', () => {
    plane.greyscale = ui.switches.grey.checked
    greyscale = ui.switches.grey.checked
    plane.color()
})

ui.switches.wire.addEventListener('change', () => {
    plane.material.wireframe = ui.switches.wire.checked
    wireframe = ui.switches.wire.checked
})

setDataLabels()
setSwitchesFromCookie()

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}

function stringToBoolean(string) {
    switch (string.toLowerCase().trim()) {
        case "true":
        case "yes":
        case "1":
            return true;
        case "false":
        case "no":
        case "0":
        case null:
            return false;
            return Boolean(string);
    }
}