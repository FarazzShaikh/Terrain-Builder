import React, { Component } from "react";
import { 
    MapTwoTone, 
    FilterHdrTwoTone, 
    PublicTwoTone,
} from '@material-ui/icons';


import './PieMenu.css'
import { Fade } from "@material-ui/core";

export class PIEMENU extends Component{

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
                    enabled:  this.toggle(this.show.bind(this), this.hide.bind(this), this.state.enabled)
                })

                if (!this.state.enabled) {
                    this.idleTime = 0
                }
            }
        })

        window.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);
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
                        <li 
                            className="map" 
                            onClick={() => {
                                this.props.checkClickedItem('map')
                                this.setState({
                                    enabled:  this.toggle(this.show.bind(this), this.hide.bind(this), this.state.enabled)
                                })
                            }}
                        >
                            <div className="button">
                                <MapTwoTone className='img' style={{filter: 'invert(100%)'}} />
                                <h1>Map</h1>
                            </div>

                        </li>
                        <li 
                            className="terrain"
                            onClick={() => {
                                this.props.checkClickedItem('terrain')
                                this.setState({
                                    enabled:  this.toggle(this.show.bind(this), this.hide.bind(this), this.state.enabled)
                                })
                            }}
                        >
                            <div className="button">
                                <FilterHdrTwoTone className='img' style={{filter: 'invert(100%)'}} />
                                <h1>Terrain</h1>
                            </div>

                        </li>
                        <li 
                            className="world"
                            onClick={() => {
                                this.props.checkClickedItem('world')
                                this.setState({
                                    enabled:  this.toggle(this.show.bind(this), this.hide.bind(this), this.state.enabled)
                                })
                            }}
                        >
                            <div className="button">
                                <PublicTwoTone className='img' style={{filter: 'invert(100%)'}} />
                                <h1>World</h1>
                            </div>

                        </li>
                        
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

        this.setState({
            enabled: true
        })
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
        this.setState({
            enabled: false
        })
    }
}