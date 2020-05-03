export default class LOADING {
    constructor(options) {
        this.name = 'Loading'

        this.elements = {
            div_main: document.querySelector('.loading'),
            message:  document.querySelector('.loading .content h1')
        }
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

    setLoadMessage(message) {
        this.elements.message.innerHTML = message + '...'

        
    }
}