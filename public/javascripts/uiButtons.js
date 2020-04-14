export default class ui {
    constructor() {
        this.div_info = this.$('.info')

        this.info = {
            verts: this.$('.info .item ul li .verts h1'),
            tris: this.$('.info .item ul li .tris h1'),
            geometryTime: this.$('.info .item ul li .geometry-time h1'),

            iterations: this.$('.info .item ul li .iterations h1'),
            droplets: this.$('.info .item ul li .droplets h1'),
            erosionTime: this.$('.info .item ul li .erosion-time h1'),

            size: this.$('.info .item ul li .size h1'),
            normalized: this.$('.info .item ul li .normalized h1'),
            mapTime: this.$('.info .item ul li .map-time h1'),
        }
    }
    $(sel) {
        return document.querySelector(sel)
    }
    $all(sel) {
        return document.querySelector(sel)
    }

    setInfoDivPos(x, y) {
        let offset = 20
        x += offset
        y += offset
        this.div_info.style.left = `${x}px`
        this.div_info.style.top = `${y}px`
    }

    setInfoDivContent(options) {
        this.info.verts.innerHTML = options.verts
        this.info.tris.innerHTML = options.tris
        this.info.geometryTime.innerHTML = options.geometryTime

        this.info.iterations.innerHTML = options.iterations
        this.info.droplets.innerHTML = options.droplets
        this.info.erosionTime.innerHTML = options.erosionTime

        this.info.size.innerHTML = options.size
        this.info.normalized.innerHTML = options.normalized
        this.info.mapTime.innerHTML = options.mapTime
    }

    show_info() {
        this.div_info.style.opacity = '100%'
        this.div_info.style.pointerEvents = 'all'
    }

    hide_info() {
        this.div_info.style.opacity = '0'
        this.div_info.style.pointerEvents = 'none'
    }
}