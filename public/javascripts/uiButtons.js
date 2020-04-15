export default class ui {
    constructor() {
        this.div_info = this.$('.info')
        this.div_info.removeAttribute("tabIndex")


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

        this.div_config = this.$('.configure')
        this.div_config.removeAttribute("tabIndex")
        this.config = {
            input_seed: this.$('.configure ul .seed span .input input'),
            input_resolution: this.$('.configure ul .resolution span .input input'),

            buttons: {
                shading_smooth: this.$all('.configure ul .shading section .buttons button')[0],
                shading_flat: this.$all('.configure ul .shading section .buttons button')[1],

                color_heatmap: this.$all('.configure ul .color section .buttons button')[0],
                color_clay: this.$all('.configure ul .color section .buttons button')[1],
            }
        }
    }
    $(sel) {
        return document.querySelector(sel)
    }
    $all(sel) {
        return document.querySelectorAll(sel)
    }

    setInfoDivPos(x, y) {
        let offset = 20
        x += offset
        y += offset
        this.div_info.style.left = `${x}px`
        this.div_info.style.top = `${y}px`

        this.div_info.style.left = `${x}px`
        this.div_info.style.top = `${y}px`
    }

    setConfigDivPos(x, y) {
        let offset = 20
        x += offset
        y += offset

        this.div_config.style.left = `${x}px`
        this.div_config.style.top = `${y}px`
    }

    show_info() {
        this.div_info.style.display = ''
        this.div_info.style.opacity = '100'
        this.div_info.style.pointerEvents = 'all'
    }

    hide_info() {
        this.div_info.style.opacity = '0'
        this.div_info.style.pointerEvents = 'none'
        setTimeout(() => {
            this.div_info.style.display = 'none'
        }, 600);
    }

    show_config() {
        this.div_config.style.display = ''
        this.div_config.style.opacity = '100'
        this.div_config.style.pointerEvents = 'all'

    }

    hide_config() {
        this.div_config.style.opacity = '0'
        this.div_config.style.pointerEvents = 'none'
        setTimeout(() => {
            this.div_config.style.display = 'none'
        }, 600);
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
}