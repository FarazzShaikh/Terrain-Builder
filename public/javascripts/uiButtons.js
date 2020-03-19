import mainPlane from './main.js'

const refreshButton = document.querySelector("header .img-container .seed-txt .head img")
const seedInput = document.querySelector("header .img-container .seed-txt .val input")

const trisLabel = document.querySelector("footer ul .tris div")
const vertsLabel = document.querySelector("footer ul .verts div")
const timeLabel = document.querySelector("footer ul .time div")

const switches = {
    style: document.querySelector(".switches ul .style .switch-container .switch input"),
    grey: document.querySelector(".switches ul .grey .switch-container .switch input"),
    wire: document.querySelector(".switches ul .wire .switch-container .switch input")
}

function setDataLabels() {
    trisLabel.innerHTML = kFormatter(mainPlane.tris)
    vertsLabel.innerHTML = kFormatter(mainPlane.verts)
    timeLabel.innerHTML = mainPlane.timeToDisplace + 'ms'
}

function setSwitchesFromCookie() {
    
    switches.style.checked = stringToBoolean(sessionStorage.getItem('isStylized'))
    switches.grey.checked = stringToBoolean(sessionStorage.getItem('isGreyscale'))
    switches.wire.checked = stringToBoolean(sessionStorage.getItem('isWireframe'))

    console.log(sessionStorage.getItem('isStylized'), sessionStorage.getItem('isGreyscale'), sessionStorage.getItem('isWireframe'))
}

refreshButton.addEventListener('click', () => {
    let userSeed = seedInput.value
    sessionStorage.setItem('seed', userSeed)

    mainPlane.stylized = switches.style.checked 
    mainPlane.greyscale = switches.grey.checked

    mainPlane.displace()
    setDataLabels()
})

switches.style.addEventListener('change', () => {
    mainPlane.stylized = switches.style.checked 
    mainPlane.displace()
})

switches.grey.addEventListener('change', () => {
    mainPlane.greyscale = switches.grey.checked 
    mainPlane.color()
})

switches.wire.addEventListener('change', () => {
    mainPlane.material.wireframe = switches.wire.checked
})

setDataLabels()
setSwitchesFromCookie()

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

function stringToBoolean(string){
    switch(string.toLowerCase().trim()){
        case "true": case "yes": case "1": return true;
        case "false": case "no": case "0": case null: return false;
        return Boolean(string);
    }
}