export default class INFO {
    constructor(options) {
        this.name = 'Info'

        this.verts = this.kFormatter(options.verts)
        this.tris = this.kFormatter(options.tris)
        this.geometryTime = this.sFormatter(options.geometryTime)

        this.iterations = options.iterations
        this.droplets = this.kFormatter(options.droplets)
        this.erosionTime = this.sFormatter(options.erosionTime)

        this.size = options.size + 'px'
        this.normalized = options.normalized
        this.mapTime = this.sFormatter(options.mapTime)

        this.on = false
        this.mouse = {
            x: 0,
            y: 0
        }
        this.body = {
            div_main: document.querySelector('.info')
        }
        this.idleTime = 0
    }

    setContent() {
        let info = {
            verts: document.querySelector('.info .item ul li .verts h1'),
            tris: document.querySelector('.info .item ul li .tris h1'),
            geometryTime: document.querySelector('.info .item ul li .geometry-time h1'),

            iterations: document.querySelector('.info .item ul li .iterations h1'),
            droplets: document.querySelector('.info .item ul li .droplets h1'),
            erosionTime: document.querySelector('.info .item ul li .erosion-time h1'),

            size: document.querySelector('.info .item ul li .size h1'),
            normalized: document.querySelector('.info .item ul li .normalized h1'),
            mapTime: document.querySelector('.info .item ul li .map-time h1'),
        }

        info.verts.innerHTML = this.verts
        info.tris.innerHTML = this.tris
        info.geometryTime.innerHTML = this.geometryTime

        info.iterations.innerHTML = this.iterations
        info.droplets.innerHTML = this.droplets
        info.erosionTime.innerHTML = this.erosionTime

        info.size.innerHTML = this.size
        info.normalized.innerHTML = this.normalized
        info.mapTime.innerHTML = this.mapTime
    }

    resetContent(options) {
        this.verts = this.kFormatter(options.verts)
        this.tris = this.kFormatter(options.tris)
        this.geometryTime = this.sFormatter(options.geometryTime)

        this.iterations = options.iterations
        this.droplets = this.kFormatter(options.droplets)
        this.erosionTime = this.sFormatter(options.erosionTime)

        this.size = options.size + 'px'
        this.normalized = options.normalized
        this.mapTime = this.sFormatter(options.mapTime)
    }

    setBehaviour(options) {
        // this.toggle()()
        document.addEventListener('keydown', (e) => {
            var key = e.keyCode || e.which;
            if (key === 17) {
                this.idleTime = 0
                this.toggle()
            }
        }, false);


        if (options.followMouse) {
            document.addEventListener('mousemove', e => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                this.idleTime = 0
                if (this.on) {
                    this.setPostion(this.mouse.x, this.mouse.y)
                }

            })
        }


        if (options.hideOnClick) {
            document.addEventListener('click', e => {
                if (this.on) {
                    this.toggle()
                }
            })
        }

        if (options.autoClose) {
            var idleInterval = setInterval(this.timerIncrement.bind(this), 1000);
        }

    }

    // Private
    kFormatter(num) {
        return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(2)) + 'k' : Math.sign(num) * Math.abs(num)
    }

    sFormatter(num) {
        return (num / 1000).toFixed(2) + 's'
    }

    toggle() {
        if (this.on) {
            this.hide()
            this.on = false
        } else {
            this.setPostion(this.mouse.x, this.mouse.y)
            this.show()
            this.on = true
        }
    }

    show() {
        this.body.div_main.style.display = ''
        this.body.div_main.style.opacity = '100'
        this.body.div_main.style.pointerEvents = 'all'
    }

    hide() {
        this.body.div_main.style.opacity = '0'
        this.body.div_main.style.pointerEvents = 'none'
        setTimeout(() => {
            this.body.div_main.style.display = 'none'
        }, 600);
    }

    setPostion(x, y) {
        let offset = 20
        x += offset
        y += offset
        this.body.div_main.style.left = `${x}px`
        this.body.div_main.style.top = `${y}px`

        this.body.div_main.style.left = `${x}px`
        this.body.div_main.style.top = `${y}px`
    }

    timerIncrement() {
        if (this.on) {
            this.idleTime = this.idleTime + 1;
            if (this.idleTime > 5) {
                this.on = false
                this.hide()
                this.idleTime = 0
            }
        }

    }

}