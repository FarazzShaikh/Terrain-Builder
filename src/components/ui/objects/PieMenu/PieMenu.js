import React, { Component } from "react";
import {
    MapTwoTone,
    FilterHdrTwoTone,
    PublicTwoTone,
} from '@material-ui/icons';
import './PieMenu.css'
import { Fade } from "@material-ui/core";

const Icons = {
    map: () => (<MapTwoTone className='img' style={{ filter: 'invert(100%)' }} />),
    terrain: () => (<FilterHdrTwoTone className='img' style={{ filter: 'invert(100%)' }} />),
    world: () => (<PublicTwoTone className='img' style={{ filter: 'invert(100%)' }} />),
}

export class PIEMENU extends Component {

    constructor() {
        super()
        this.state = {
            position: {
                x: 100,
                y: 100
            },
            enabled: false,
        }

        this.mouse = {
            x: 0,
            y: 0
        }

    }

    componentDidMount() {
        setInterval(this.timerIncrement.bind(this), 1000);

        document.addEventListener('mousemove', e => {
            if (!this.state.enabled) {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                this.idleTime = 0
                this.setPostion(this.mouse.x, this.mouse.y)
            }
        })

        document.addEventListener('mousedown', e => {
            if (e.button === 2) {
                this.setState({
                    enabled: this.toggle(this.show.bind(this), this.hide.bind(this), this.state.enabled)
                })

                if (!this.state.enabled) {
                    this.idleTime = 0
                }
            }
        })

        window.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        }, false);
    }

    render_listItems = (items) => {
       
        return (
            <>
                {
                    items.map((item) => {
                        return (
                            <li
                                key={item.className}
                                className={item.className}
                                onClick={() => {
                                    this.props.checkClickedItem(item.className)
                                    this.setState({
                                        enabled: this.toggle(this.show.bind(this), this.hide.bind(this), this.state.enabled)
                                    })
                                }}
                            >
                                <div className="button">
                                    {Icons[item.className]()}
                                    <h1>{item.className.replace(/^./, item.className[0].toUpperCase())}</h1>
                                </div>

                            </li>
                        )
                    })
                }
            </>
        )

        

    }

    render() {
        return (
            <Fade
                in={this.state.enabled}
            >
                <div
                    className="settings"
                    style={{
                        left: this.state.position.x + 'px',
                        top: this.state.position.y + 'px'
                    }
                    }>
                    <ul>
                        {this.render_listItems(this.props.listItems)}
                    </ul>
                </div>
            </Fade>

        )
    }

    setPostion(x, y) {
        let offset = -25
        x += offset
        y += offset
        this.setState({
            position: {
                x: x,
                y: y
            }
        })
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
        if (this.state.enabled) {
            this.idleTime = this.idleTime + 1;
            if (this.idleTime > 5) {
                this.setState({
                    enabled: this.toggle(this.show.bind(this), this.hide.bind(this), this.state.enabled)
                })
                this.idleTime = 0
            }
        }

    }

    show() {
        let offset = 100
        let li_items = document.querySelectorAll('.settings ul li')
        let finalAngle = (360 / li_items.length)
        let angle = 180

        li_items.forEach((item, i) => {
            item.style.opacity = '100'
            item.style.pointerEvents = 'all'



            let finalPos = {
                x: (Math.sin(this.radians(angle)) * offset),
                y: (Math.cos(this.radians(angle)) * offset)
            }

            item.style.left = finalPos.x + 'px'
            item.style.top = finalPos.y + 'px'


            angle += finalAngle
        });

        this.setState({
            enabled: true
        })
    }

    hide() {
        let li_items = document.querySelectorAll('.settings ul li')
        li_items.forEach((item, i) => {
            item.style.left = ''
            item.style.top = ''
        });

        this.setState({
            enabled: false
        })
    }

    radians(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
    }
}