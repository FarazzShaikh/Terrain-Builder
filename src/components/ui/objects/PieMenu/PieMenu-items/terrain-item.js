import React, { Component } from "react";
import Css from 'styled-components';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import CardContent from '@material-ui/core/CardContent';

import { TextField, Slider, IconButton, InputAdornment, Fade  } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Shuffle, KeyboardArrowRight, FastfoodOutlined } from '@material-ui/icons';


import "./main.css";

const COLOR_SHADOW = '#b88335'
const COLOR_PRIMARY = '#ffb74d'


export class TERRAIN_ITEM extends Component {

    constructor() {
        super()

        this.state = {
            Erosion: true,

            Custom: false,
            customSeed: undefined,
            custom_inputIsFull: false,

            defaults: {
                Resolution: 256,
                Scale: 0.06,
                Persistance: 2,
                Lacunarity: 2,
                Octaves: 8
            },

            visible: true
        }
       
    }

    componentDidMount = () => {
        this.GLOBALS = this.props.globals
    }

    rangeOnChange = (e, value, name, type) => {
        let key = name.split(' ').length > 1 ? name.split(' ')[0] + name.split(' ')[1] : name.split(' ')[0]

        this.GLOBALS[key] = value
        this.GLOBALS.flags[`reset_${type}`] = true 
        console.log(key)
    }

    onSwitchChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name.split(' ')[0]]: e.target.checked,
        })
    }
    
    switch = ({name, type}) => {
        return (
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <h4 
                    style={{ margin: 0, padding: 0, fontWeight: '200',}}
                    className={
                        this.state[name.split(' ')[0]] ? 'label-glow' : ''
                    }
                    
                >{name}
                </h4>
                <Switch
                    checked={this.state[name.split(' ')[0]]}
                    name={name}
                    color="primary"
                    onChange={this.onSwitchChange}
                    classes={
                        this.state[name.split(' ')[0]] ? 
                            {
                                track: 'switch-glow'
                            } :
                            {
                                thumb: ''
                            }
                    }
                    onClick={(e) => {
                        let key = name.split(' ').length > 1 ? name.split(' ')[0] + name.split(' ')[1] : name.split(' ')[0]

                        if(key !== 'CustomSeed') {
                            this.GLOBALS[key] = e.target.checked
                            this.GLOBALS.flags[`reset_${type}`] = true
                        }
                        
                    }}
                />
                  
            </div> 
        )
    }

    input = ({name, type}) => {
        return (
            <>
                {this.switch({name: name, type: type})}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                }}>
                    <TextField
                        disabled={!this.state.Custom}
                        id="outlined-number"
                        type="text"
                        placeholder={this.state.Custom ? '' : 'Disabled'}
                        size='small'
                        margin="dense"
                        onChange={(e) => {
                            if(e.target.value.length > 0) {
                                this.setState({
                                    custom_inputIsFull: true,
                                    customSeed: e.target.value
                                })
                            } else {
                                this.setState({
                                    custom_inputIsFull: false
                                })
                            }
                            
                        }}
                    />
                    <IconButton
                        style={{
                            right: 0,
                            marginLeft: 5,
                        }}
                        onClick={(e) => {
                            if(this.state.custom_inputIsFull && this.state.Custom) {
                                let seed = this.state.customSeed
                                let key = name.split(' ').length > 1 ? name.split(' ')[0] + name.split(' ')[1] : name.split(' ')[0]
                                this.GLOBALS[key] = seed
                                this.GLOBALS.flags[`reset_${type}`] = true 
                            } else {
                                let seed = Math.random()
                                let key = name.split(' ').length > 1 ? name.split(' ')[0] + name.split(' ')[1] : name.split(' ')[0]
                                this.GLOBALS[key] = seed
                                this.GLOBALS.flags[`reset_${type}`] = true
                            }
                            
                        }}
                        disabled={!this.state.Custom}
                    >
                    {this.state.custom_inputIsFull && this.state.Custom ? <KeyboardArrowRight /> : <Shuffle />}
                    </IconButton>
                </div>
                
            </>
        )
    }

    range = ({name, type, min, max, step, marks, label}) => {
        
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: 20
            }}>

                <h4 
                    style={{ 
                        margin: 0, 
                        padding: 0, 
                        color:'white', 
                        fontWeight: '200', 
                        width: '100%', 
                        textAlign: 'left',
                        textShadow: '0px 0px 10px #000000',
                    }}
                    
                >{name}</h4>
                <Slider
                    defaultValue={this.state.defaults[name]}
                    valueLabelDisplay={label}
                    step={step}
                    max={max}
                    min={min}
                    marks={marks}
                    onChangeCommitted={(e, v) => {
                        this.rangeOnChange(e, v, name, type)
                    }}
                />

            </div>
            
        )
    }

    renderExpantionCard = () => {
        const resolution_marks = [
            {
                value: 128,
                label: '128',
            },
            {
                value: 256,
                label: '256',
            },
            {
                value: 512,
                label: '512',
            },
            {
                value: 1024,
                label: '1024',
            },
        ];

        const generateMarks = (min, max, step, precision) => {
            let centerL = ((min + max) - (step * 2)) / 2
            let centerR = ((min + max) + (step * 2)) / 2
            let marks = [
                {
                    value: min,
                    label: String(min),
                },
                {
                    value: centerL.toFixed(precision),
                    label: String(centerL.toFixed(precision)),
                },
                {
                    value: centerR.toFixed(precision),
                    label: String(centerR.toFixed(precision)),
                },
                {
                    value: max,
                    label: String(max),
                },
            ]
            
            return marks
        }


        return (
            
                <></>
            
        )
        
        
    }

    render() {

        const Container = {
            MoreHorizIcon: Css.div`
                display: flex;
                justify-content: flex-end;
                margin: 0;
                margin-top: 20px;
                margin-right: 5px;
            `
        }

        const resolution_marks = [
            {
                value: 128,
                label: '128',
            },
            {
                value: 256,
                label: '256',
            },
            {
                value: 512,
                label: '512',
            },
            {
                value: 1024,
                label: '1024',
            },
        ];

        const generateMarks = (min, max, step, precision) => {
            let centerL = ((min + max) - (step * 2)) / 2
            let centerR = ((min + max) + (step * 2)) / 2
            let marks = [
                {
                    value: min,
                    label: String(min),
                },
                {
                    value: centerL.toFixed(precision),
                    label: String(centerL.toFixed(precision)),
                },
                {
                    value: centerR.toFixed(precision),
                    label: String(centerR.toFixed(precision)),
                },
                {
                    value: max,
                    label: String(max),
                },
            ]
            
            return marks
        }

        return (

            <Fade in={this.state.visible}>
                <Card

                    raised={true}
                    elevation={12}
                    style={{
                        width: 300,
                        height: 300,
                        backgroundColor: '#242424',
                        zIndex: 10,
                        borderRadius:10,   

                        position: 'absolute',
                        top: 0,
                        left: 0,

                        overflowY: 'scroll'                     
                    }}
                    classes={{root: 'custom-scrollbar'}}

                >
                    <CardContent>
                        <h3 style={{ margin: 0, padding: 0, color:'white'}}>Terrain.</h3>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'space-between',
                            flexDirection: 'column',
            
                            margin: '0px 20px',
                        }}>
                            {this.switch({name: 'Erosion', type: 'Erode'})}
                            {this.input({name: 'Custom Seed', type: 'Displace'})}
                        </div>

                        <div style={{margin: '10px 20px'}}>
                            {this.range({name: 'Resolution', type: 'Displace', min: 128, max: 1024, step: null, marks: resolution_marks, label: 'off'})}
                            {this.range({name: 'Scale', type: 'Displace', min: 0.01, max: 0.1, step: 0.01, marks: generateMarks(0.01, 0.1, 0.01, 2), label: 'auto'})}
                            {this.range({name: 'Persistance', type: 'Displace', min: 1, max: 4, step: 0.1, marks: generateMarks(1, 4, 0.1, 0), label: 'auto'})}
                            {this.range({name: 'Lacunarity', type: 'Displace', min: 1, max: 4, step: 0.1, marks: generateMarks(1, 4, 0.1, 0), label: 'auto'})}
                            {this.range({name: 'Octaves', type: 'Displace', min: 7, max: 14, step: 1, marks: generateMarks(7, 14, 1, 0), label: 'auto'})}
                        </div>

                    </CardContent>

                </Card>
                  
            </Fade>
                

        )

    }
}