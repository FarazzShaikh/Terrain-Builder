export default class ui {
    constructor(plane, defaults) {
        this.plane = plane

        

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
                shading_real: this.$all('.configure ul .shading section .buttons button')[0],
                shading_stylized: this.$all('.configure ul .shading section .buttons button')[1],

                color_heatmap: this.$all('.configure ul .color section .buttons button')[0],
                color_clay: this.$all('.configure ul .color section .buttons button')[1],
            },

            buttons_reset: this.$('.configure ul li section .buttons .img'),
                
        }

        let buttonArr = this.setDefaultsConfig(this.config, defaults)
        this.setEventListeners_Reset(this.config.buttons_reset, this.config, defaults, 'buttons')
        for (let i = 0; i < 2; i+=2) {
            this.setEventListeners_Config([buttonArr[0], buttonArr[1]])
            this.setEventListeners_Config([buttonArr[2], buttonArr[3]])
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

    setDefaultsConfig(config, defaults) {
        let buttonArr = []
        for (let key in config.buttons) {
            if (config.buttons.hasOwnProperty(key)) {
                const button = config.buttons[key]
                let nkey = key.split('_')[1]
                if(nkey === defaults.color || nkey === defaults.shading) {
                    this.select_Button(button)
                    button.isSelected = true
                } else {
                    this.deselect_Button(button)
                    button.isSelected = false
                }
                buttonArr.push(button)
                button.value = nkey
                button.key = key.split('_')[0]
            }
        }
        return buttonArr
    }

    select_Button(button) {
        button.style.backgroundColor = 'white'
        button.children[0].style.color = '#686868'
        button.style.boxShadow = '0px 0px 20px 0px rgba(0, 0, 0, 0.75)'
        button.style.transform = 'scale(1.1, 1.1)'
    }

    deselect_Button(button) {
        button.style.backgroundColor = '#686868'
        button.children[0].style.color = 'white'
        button.style.boxShadow = ''
        button.style.transform = ''
    }

    setEventListeners_Config(buttons) {
        buttons.forEach((b, i) => {
            b.i = i
            b.addEventListener('click', () => {
                if(!b.isSelected) {
                    let otherIndex = (b.i === 0) ? 1 : 0
                    this.deselect_Button(buttons[otherIndex])
                    this.select_Button(b)
                    b.isSelected = true
                    buttons[otherIndex].isSelected = false

                } else {
                    let otherIndex = (b.i === 0) ? 1 : 0
                    this.select_Button(buttons[otherIndex])
                    this.deselect_Button(b)
                    b.isSelected = false
                    buttons[otherIndex].isSelected = true
  
                }

                this.buttonEventHandler(buttons)
            })  
        })
    }

    setEventListeners_Reset(div, config, defaults, type) {
        if(type === 'buttons') {
            div.addEventListener('click', () => {
                console.log('click')
                let buttons = this.setDefaultsConfig(config, defaults)
                this.buttonEventHandler(buttons)
            })
        } else {
            div.addEventListener('click', () => {
                console.log('inputs')
                
            })
        }
        
    
    }

    buttonEventHandler(buttons) {
        buttons.forEach(b => {
            if(b.isSelected) {
                sessionStorage.setItem(b.key, b.value)

                switch (b.key) {
                    case 'color':
                        this.plane.color()
                        break;

                    case 'shading':
                        if(this.plane.recalcNormals() === -1) {
                            console.log('invalid shading data')
                        }
                        
                        break;
                    
                    default:
                        break;
                }
            }
            
        });
    }


}