const refreshButton = document.querySelector("header .img-container .seed-txt .head img")
const seedInput = document.querySelector("header .img-container .seed-txt .val input")
import mainPlane from './main.js'

refreshButton.addEventListener('click', () => {
    let userSeed = seedInput.value
    sessionStorage.setItem('seed', userSeed)
    mainPlane.displace()
})