
export default class GENERAL {
    constructor(options) {
        this.name = 'General'
        this.globals = options.globals
        this.on = false
        this.mouse = {
            x: 0,
            y: 0
        }
        this.elements = {

            div_main: document.querySelector('.settingsItem-general'),
            img_close: document.querySelector('.settingsItem-general .header img'),

            input_switches: {
                spin: document.querySelector('.settingsItem-general .content .spin .buttons .switch input[type=checkbox]'),
                customHeightMap: document.querySelector('.settingsItem-general .content .customHeightMap .buttons .switch input[type=checkbox]'),
            },

            h1_switchLables: {
                spin: document.querySelector('.settingsItem-general .content .spin h3'),
                customHeightMap: document.querySelector('.settingsItem-general .content .customHeightMap h3'),
            },

            img_resetButtons: {
                spin: document.querySelector('.settingsItem-general .content .spin .buttons img'),
                customHeightMap: document.querySelector('.settingsItem-general .content .customHeightMap .buttons img'),
            },

            fileUpload: {
                button_button: document.querySelector('.settingsItem-general .content .fileUpload .btn'),
                input_input: document.querySelector('.settingsItem-general .content .fileUpload input'),
            },

            input_sliders: {
                resolution: document.querySelector('.rangeInputs .top .resolution input[type=range]'),
            },

            input_sliderLabels: {
                resolution: document.querySelector('.rangeInputs .top .resolution .label input'),
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
                        this.enableReset(sw)
                        if (sw.name === 'customHeightMap') {
                            this.enableFileUpload()
                        }
                    } else {
                        this.disableLabel(sw)
                        this.disableReset(sw)
                        if (sw.name === 'customHeightMap') {
                            this.disableFileUpload()
                        }
                    }

                    if (sw.name === 'spin') {
                        this.globals.doesSpin = sw.checked
                    }
                })
            }
        }

        this.setUploadButtonBehaviour()
        this.setBehaviour_ResetButton()

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

        for (const key in this.elements.input_sliders) {
            if (this.elements.input_sliders.hasOwnProperty(key)) {
                const input = this.elements.input_sliders[key];
                input.name = input.parentElement.classList[1]

                switch (input.name) {
                    case 'resolution':
                        input.value = this.globals.defRes
                        break;
                
                    default:
                        break;
                }

                input.addEventListener('change', () => {
                    const max = this.globals.maxRes
                    const min = this.globals.minRes
                    this.globals[input.name] = (Math.trunc(input.value * max) === 0) ? min : Math.trunc(input.value * max)
                    this.globals.flags['reset_' + input.name] = true

                })

                input.addEventListener('input', () => {
                    const max = this.globals.maxRes
                    const min = this.globals.minRes
                    let placeholder = (Math.trunc(input.value * max) === 0) ? min : Math.trunc(input.value * max)
                    console.log(placeholder)
                    this.elements.input_sliderLabels.resolution.placeholder = placeholder

                })
            }
        }

        for (const key in this.elements.input_sliderLabels) {
            if (this.elements.input_sliderLabels.hasOwnProperty(key)) {
                const label = this.elements.input_sliderLabels[key];
                label.name = label.parentElement.parentElement.classList[1]
                
                label.addEventListener('change', () => {
                    let value 
                    if(!isNaN(label.value)) {
                        if(label.value > this.globals.maxRes) {
                            value = this.globals.maxRes
                            label.value = value
                        } else if(label.value < this.globals.minRes || label.value == 0) {
                            value = this.globals.minRes
                            label.value = value
                        } 
                        

                        this.globals[label.name] = Number(value)
                        this.globals.flags['reset_' + label.name] = true
                    } else {
                        alert('Input must be a number between ' + this.globals.minRes + ' and ' + this.globals.maxRes)
                        value = undefined
                        
                    }

                })
            }
        }

    }

    //Private
    enableLabel(sw) {
        for (const key in this.elements.h1_switchLables) {
            if (this.elements.h1_switchLables.hasOwnProperty(key)) {
                const label = this.elements.h1_switchLables[key];
                const name = label.parentElement.classList[1]

                if (name === sw.name) {
                    label.style.color = 'white'
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
                    label.style.color = 'darkgrey'
                }
            }
        }
    }

    enableReset(sw) {
        for (const key in this.elements.img_resetButtons) {
            if (this.elements.img_resetButtons.hasOwnProperty(key)) {
                const button = this.elements.img_resetButtons[key];
                const name = button.parentElement.parentElement.classList[1]

                if (name === sw.name) {
                    button.style.opacity = '100'
                    button.style.pointerEvents = 'all'
                }


            }
        }
    }

    disableReset(sw) {
        for (const key in this.elements.img_resetButtons) {
            if (this.elements.img_resetButtons.hasOwnProperty(key)) {
                const button = this.elements.img_resetButtons[key];
                const name = button.parentElement.parentElement.classList[1]

                if (name === sw.name) {
                    button.style.opacity = '30%'
                    button.style.pointerEvents = 'none'
                }


            }
        }
    }

    enableFileUpload() {
        const button = this.elements.fileUpload.button_button
        button.style.padding = '8px 20px'
        button.style.height = '20%'
        button.style.pointerEvents = 'all'
        button.style.color = 'grey'
    }

    disableFileUpload() {
        const button = this.elements.fileUpload.button_button
        button.style.padding = ''
        button.style.height = '0px'
        button.style.pointerEvents = 'none'
        button.style.color = 'transparent'
    }

    setBehaviour_ResetButton() {
        for (const key in this.elements.img_resetButtons) {
            if (this.elements.img_resetButtons.hasOwnProperty(key)) {
                const button = this.elements.img_resetButtons[key];
                const name = button.parentElement.parentElement.classList[1]

                switch (name) {
                    case 'spin':
                        button.addEventListener('click', () => {
                            if (!this.globals.flags.resetRotation) {
                                this.globals.flags.resetRotation = true
                                setTimeout(() => {
                                    this.elements.input_switches.spin.click()
                                }, 100);
                            }
                        })
                        break;

                    default:
                        break;
                }


            }
        }
    }

    setUploadButtonBehaviour() {
        const button = this.elements.fileUpload.button_button
        const input = this.elements.fileUpload.input_input
        input.addEventListener('change', () => {
            let filename = 'No File Chosen'
            if (input.files[0]) {
                if (input.files[0].type === 'image/png') {
                    filename = this.truncateString(input.files[0].name, 14)
                } else {
                    alert('Invalid File Type. Use .png Insted')
                }

            }

            button.innerHTML = 'Coming Soon!' //filename


        })
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



}