export default class TERRAIN {
    constructor(options) {
        this.name = 'Terrain'
        this.globals = options.globals
        this.on = false
        this.mouse = {
            x: 0,
            y: 0
        }
        this.elements = {

            div_main: document.querySelector('.settingsItem-terrain'),
            img_close: document.querySelector('.settingsItem-terrain .header img'),

            input_switches: {
                enable: document.querySelector('.settingsItem-terrain .content .enable .buttons .switch input[type=checkbox]'),
                erodeSeed: document.querySelector('.settingsItem-terrain .content .erodeSeed .buttons .switch input[type=checkbox]'),
            },

            h1_switchLables: {
                enable: document.querySelector('.settingsItem-terrain .content .enable h3'),
                erodeSeed: document.querySelector('.settingsItem-terrain .content .erodeSeed h3'),
            },

            img_resetButtons: {
                enable: document.querySelector('.settingsItem-terrain .content .enable .buttons img'),
                erodeSeed: document.querySelector('.settingsItem-terrain .content .erodeSeed .buttons img'),
            },

            fileUpload: {
                div: document.querySelector('.settingsItem-terrain .content .customSeed'),
                button_button: document.querySelector('.settingsItem-terrain .content .customSeed .btn'),
                input_input: document.querySelector('.settingsItem-terrain .content .customSeed input'),
            },

            input_sliders: {
                resolution: document.querySelector('.settingsItem-terrain .rangeInputs .top .resolution input[type=range]'),
                scale: document.querySelector('.settingsItem-terrain .rangeInputs .top .scale input[type=range]'),
                noiseScale: document.querySelector('.settingsItem-terrain .rangeInputs .top .noiseScale input[type=range]'),
                persistance: document.querySelector('.settingsItem-terrain .rangeInputs .top .persistance input[type=range]'),
                lacunarity: document.querySelector('.settingsItem-terrain .rangeInputs .top .lacunarity input[type=range]'),
                octaves: document.querySelector('.settingsItem-terrain .rangeInputs .top .octaves input[type=range]'),

            },

            input_sliderLabels: {
                resolution: document.querySelector('.settingsItem-terrain .rangeInputs .top .resolution .label input'),
                scale: document.querySelector('.settingsItem-terrain .rangeInputs .top .scale .label input'),
                noiseScale: document.querySelector('.settingsItem-terrain .rangeInputs .top .noiseScale .label input'),
                persistance: document.querySelector('.settingsItem-terrain .rangeInputs .top .persistance .label input'),
                lacunarity: document.querySelector('.settingsItem-terrain .rangeInputs .top .lacunarity .label input'),
                octaves: document.querySelector('.settingsItem-terrain .rangeInputs .top .octaves .label input'),

            }

        }



    }

    setBehaviour() {
        for (const key in this.elements.input_switches) {
            if (this.elements.input_switches.hasOwnProperty(key)) {
                const sw = this.elements.input_switches[key]
                sw.name = sw.parentElement.parentElement.parentElement.classList[1]

                sw.addEventListener('change', () => {
                    if (sw.checked) {
                        this.enableLabel(sw)
                            // this.enableReset(sw)
                        if (sw.name === 'erodeSeed') {
                            this.enableSeedInput()
                        }
                    } else {
                        this.disableLabel(sw)
                            // this.disableReset(sw)
                        if (sw.name === 'erodeSeed') {
                            this.disableSeedInput()
                        }
                    }

                    if (sw.name === 'enable') {
                        this.globals.flags.erosion_enable = sw.checked
                        this.globals.flags.erosion_lock = this.globals.flags.erosion_lock ? false : true
                    }


                })


            }
        }

        if (this.globals.flags.erosion_enable) {
            this.elements.input_switches.enable.click()

        }
        this.setBehaviour_ResetButton()
        this.setSeedInputBehaviour()
        this.setBehaviour_Sliders()

        document.addEventListener('mousemove', e => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.idleTime = 0


        })

        this.elements.img_close.addEventListener('click', () => {
            if (this.on) {
                this.toggle()
            }
        })



    }

    //Private
    enableLabel(sw) {
        for (const key in this.elements.h1_switchLables) {
            if (this.elements.h1_switchLables.hasOwnProperty(key)) {
                const label = this.elements.h1_switchLables[key];
                const name = label.parentElement.classList[1]

                if (name === sw.name) {
                    label.style.color = 'var(--main-primary)'
                    label.style.textShadow = '0px 0px 20px var(--main-primary)'
                }

            }
        }
    }

    disableLabel(sw) {
        for (const key in this.elements.h1_switchLables) {
            if (this.elements.h1_switchLables.hasOwnProperty(key)) {
                const label = this.elements.h1_switchLables[key];
                const name = label.parentElement.classList[1]


                if (name === sw.name) {
                    label.style.color = 'var(--main-secondary)'
                    label.style.textShadow = ''
                }
            }
        }
    }

    enableSeedInput() {
        const input = this.elements.fileUpload.input_input
        const div = this.elements.fileUpload.div
        const button = this.elements.fileUpload.button_button

        div.style.height = '35px'
        div.style.pointerEvents = 'all'

        button.style.color = 'white'
        button.style.height = '45px'
        div.style.boxShadow = ' 0px 0px 20px 0px rgba(0, 0, 0, 0.75)'
        input.style.color = 'white'

        this.globals.flags.customSeed_enable = true
    }

    disableSeedInput() {
        const input = this.elements.fileUpload.input_input
        const div = this.elements.fileUpload.div
        const button = this.elements.fileUpload.button_button

        div.style.height = '0px'
        div.style.pointerEvents = 'none'
        button.style.color = 'transparent'
        button.style.height = '100%'
        div.style.boxShadow = ' 0px 0px 0px 0px rgba(0, 0, 0, 0.75)'
        input.style.color = 'transparent'

        this.globals.flags.customSeed_enable = true
    }

    setSeedInputBehaviour() {
        const div = this.elements.fileUpload.div
        const button = this.elements.fileUpload.button_button
        const input = this.elements.fileUpload.input_input


        button.addEventListener('click', () => {
            let ascii = 0
            for (let i = 0; i < input.value.length; i++) {
                ascii += Number(input.value.charCodeAt(i));
            }

            this.globals.seed = ascii
            this.globals.flags.reset_seed = true
        })
    }

    setBehaviour_ResetButton() {
        for (const key in this.elements.img_resetButtons) {
            if (this.elements.img_resetButtons.hasOwnProperty(key)) {
                const button = this.elements.img_resetButtons[key];
                const name = button.parentElement.parentElement.classList[1]

                switch (name) {
                    case 'enable':
                        button.addEventListener('click', () => {
                            if (!this.globals.flags.erosion_enable) {
                                this.elements.input_switches.enable.click()
                            }
                        })
                        break;
                    case 'erodeSeed':
                        button.addEventListener('click', () => {
                            this.elements.fileUpload.input_input.value = Math.random()
                        })
                        break;
                    default:
                        break;
                }


            }
        }
    }

    setBehaviour_Sliders() {
        for (const key in this.elements.input_sliders) {
            if (this.elements.input_sliders.hasOwnProperty(key)) {
                const input = this.elements.input_sliders[key];
                input.name = input.parentElement.classList[1]
                input.value = this.globals['def_' + input.name]


                input.addEventListener('change', () => {
                    const max = this.globals['max_' + input.name]
                    const min = this.globals['min_' + input.name]
                    this.globals[input.name] = (Math.trunc(input.value * max) === 0) ? min : Math.trunc(input.value * max)
                    this.globals.flags['reset_' + input.name] = true


                })

                input.addEventListener('input', () => {
                    this.elements.input_sliderLabels[input.name].value = ''
                    const max = this.globals['max_' + input.name]
                    const min = this.globals['min_' + input.name]
                    let placeholder = (Math.trunc(input.value * max) === 0) ? min : Math.trunc(input.value * max)
                    this.elements.input_sliderLabels[input.name].placeholder = placeholder

                })
            }
        }

        for (const key in this.elements.input_sliderLabels) {
            if (this.elements.input_sliderLabels.hasOwnProperty(key)) {
                const label = this.elements.input_sliderLabels[key];
                label.name = label.parentElement.parentElement.classList[1]

                label.addEventListener('change', () => {
                    let value
                    const max = this.globals['max_' + input.name]
                    const min = this.globals['min_' + input.name]
                    let validated = this.validateInput(label.value, value, min, max)
                    if (validated.status) {
                        label.value = validated.label
                        this.globals[label.name] = Number(validated.value)
                        this.globals.flags['reset_' + label.name] = true

                        let normalizedValue = this.normalize(Number(validated.value), min, max)
                        this.elements.input_sliders[label.name].value = normalizedValue
                    } else {
                        alert('Scale must be a number between ' + min + ' and ' + max)
                        value = undefined

                    }




                })
            }
        }
    }

    truncateString(str, num) {
        if (str.length <= num) {
            return str
        }
        return str.slice(0, num) + '...'
    }

    show() {
        this.elements.div_main.style.display = ''
        this.elements.div_main.style.opacity = '100'
        this.elements.div_main.style.pointerEvents = 'all'
    }

    hide() {
        this.elements.div_main.style.opacity = '0'
        this.elements.div_main.style.pointerEvents = 'none'
        setTimeout(() => {
            this.elements.div_main.style.display = 'none'
        }, 600);
    }

    setPostion(x, y) {
        let offset = 20
        x += offset
        y += offset
        this.elements.div_main.style.left = `${x}px`
        this.elements.div_main.style.top = `${y}px`

        this.elements.div_main.style.left = `${x}px`
        this.elements.div_main.style.top = `${y}px`
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

    normalize(value, min, max) {
        return (value - min) / (max - min);
    }

    validateInput(label, value, min, max) {
        if (!isNaN(label)) {
            if (label > max) {
                value = max
                label = value
            } else if (label < min || label == 0) {
                value = min
                label = value
            } else {
                value = label
            }


            return {
                status: true,
                label: label,
                value: value
            }
        } else {
            return {
                status: false,
                label: undefined,
                value: undefined
            }

        }
    }


}