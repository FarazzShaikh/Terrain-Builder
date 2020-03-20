

export default class ui {
    refreshButton = document.querySelector("header .img-container .seed-txt .head img")
    seedInput = document.querySelector("header .img-container .seed-txt .val input")
    
    trisLabel = document.querySelector("footer ul .tris div")
    vertsLabel = document.querySelector("footer ul .verts div")
    timeLabel = document.querySelector("footer ul .time div")
    
    switches = {
        style: document.querySelector(".switches ul .style .switch-container .switch input"),
        grey: document.querySelector(".switches ul .grey .switch-container .switch input"),
        wire: document.querySelector(".switches ul .wire .switch-container .switch input"),
        slider: document.querySelector(".switches ul .slider input"),
    }
}
