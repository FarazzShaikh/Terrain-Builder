export default class PIMENU {
    constructor() {
        this.name = 'PieMenu'
        this.mouse = {
            x: 0,
            y: 0
        }
        this.on = false
        this.body = {
            div_main: document.querySelector('.settings')
        }
        this.idleTime = 0

        this.children = {}
    }

    addChild(Child, options) {
        let child = new Child(options)
        this.children[child.name] = child
    }

    setBehaviour(options) {
        if (options.autoClose) {
            var idleInterval = setInterval(this.timerIncrement.bind(this), 1000);
        }

        document.addEventListener('mousedown', e => {
            if (e.button === 2) {
                this.on = this.toggle(this.show, this.hide, this.on)
                if (!this.on) {
                    this.idleTime = 0
                }
            }
        })

        if (options.followMouse) {
            document.addEventListener('mousemove', e => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                this.idleTime = 0
                if (!this.on) {
                    this.setPostion(this.mouse.x, this.mouse.y)
                }

            })
        }

        window.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);

        this.setButtonBeehavoiur()
    }

    // Private
    setPostion(x, y) {
        let offset = -25
        x += offset
        y += offset
        this.body.div_main.style.left = `${x}px`
        this.body.div_main.style.top = `${y}px`

        this.body.div_main.style.left = `${x}px`
        this.body.div_main.style.top = `${y}px`
    }

    show() {
        let offest = 100
        let li_items = document.querySelectorAll('.settings ul li')
        li_items.forEach((item, i) => {
            item.style.opacity = '100'
            item.style.pointerEvents = 'all'
            switch (i) {
                case 0:
                    {
                        let currentPos = Number(li_items[0].style.top.split('p')[0])
                        item.style.top = (currentPos + offest) + 'px'
                        break;
                    }

                case 1:
                    {
                        let currentPos = Number(li_items[1].style.top.split('p')[0])
                        item.style.top = (currentPos - offest) + 'px'
                        break;
                    }

                case 2:
                    {
                        let currentPos = Number(li_items[2].style.left.split('p')[0])
                        item.style.left = (currentPos + offest) + 'px'
                        break;
                    }

                default:
                    break;
            }
        });
    }

    hide() {
        let offest = 100
        let li_items = document.querySelectorAll('.settings ul li')
        li_items.forEach((item, i) => {
            item.style.opacity = '0'
            item.style.pointerEvents = 'none'
            switch (i) {
                case 0:
                    {
                        let currentPos = Number(li_items[0].style.top.split('p')[0])
                        item.style.top = (currentPos - offest) + 'px'
                        break;
                    }

                case 1:
                    {
                        let currentPos = Number(li_items[1].style.top.split('p')[0])
                        item.style.top = (currentPos + offest) + 'px'
                        break;
                    }

                case 2:
                    {
                        let currentPos = Number(li_items[2].style.left.split('p')[0])
                        item.style.left = (currentPos - offest) + 'px'
                        break;
                    }

                default:
                    break;
            }
        });
    }

    toggle(on, off, condition) {
        if (condition) {
            off()
            condition = false
        } else {
            on()
            condition = true
        }
        return condition
    }

    timerIncrement() {
        if (this.on) {
            this.idleTime = this.idleTime + 1;
            if (this.idleTime > 5) {
                this.on = this.toggle(this.show, this.hide, this.on)
                this.idleTime = 0
            }
        }

    }

    setButtonBeehavoiur() {
        let li_items = document.querySelectorAll('.settings ul li')

        li_items.forEach((item) => {
            let name = item.className
            name = name.replace(/^\w/, c => c.toUpperCase());

            item.addEventListener('click', () => {
                this.on = this.toggle(this.show, this.hide, this.on)
                this.children[name].toggle()


            })
        })
    }
}