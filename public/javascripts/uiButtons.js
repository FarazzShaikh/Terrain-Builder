import mainPlane from './main.js'

const refreshButton = document.querySelector("header .img-container .seed-txt .head img")
const seedInput = document.querySelector("header .img-container .seed-txt .val input")

const trisLabel = document.querySelector("footer ul .tris div")
const vertsLabel = document.querySelector("footer ul .verts div")
const timeLabel = document.querySelector("footer ul .time div")

function setDataLabels() {
    trisLabel.innerHTML = kFormatter(mainPlane.tris)
    vertsLabel.innerHTML = kFormatter(mainPlane.verts)
    timeLabel.innerHTML = mainPlane.timeToDisplace + 'ms'
}

refreshButton.addEventListener('click', () => {
    let userSeed = seedInput.value
    sessionStorage.setItem('seed', userSeed)
    mainPlane.displace()
    setDataLabels()
})

setDataLabels()

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}