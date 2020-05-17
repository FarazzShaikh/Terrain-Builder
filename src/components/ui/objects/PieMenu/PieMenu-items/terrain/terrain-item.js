import React, { Component } from "react";
import { 
    Card,
    Switch,
    CardContent,
    TextField, 
    Slider, 
    IconButton, 
    Fade ,
    Divider,
    Tooltip
} from '@material-ui/core';

import { 
    Shuffle,
    KeyboardArrowRight,
    Close,
    Help
} from '@material-ui/icons';


import "./main.css";


export class TERRAIN_ITEM extends Component {

    constructor(props) {
        super(props)
        this.GLOBALS = this.props.globals

        this.state = {
            Erosion: this.GLOBALS.Erosion,

            Custom: false,
            customSeed: undefined,
            custom_inputIsFull: false,

            defaults: {
                Resolution: this.GLOBALS.Resolution,
                Scale: this.GLOBALS.Scale,
                Height: this.GLOBALS.Height,
                Persistance: this.GLOBALS.Persistance,
                Lacunarity: this.GLOBALS.Lacunarity,
                Octaves: this.GLOBALS.Octaves
            },


            mousePos: {
                x: 0,
                y: 0
            },

        }
       
    }

    toolTIps = {
        Resolution: 'Number Of Verts along one side of the mesh.',
        Height: 'Height of Final Terrain',
        Scale: 'Number that determines at what distance to view the noisemap.',
        Persistance: 'Number that determines how much each octave contributes to the overall shape.',
        Lacunarity: 'Number that determines how much detail is added or removed at each octave.',
        Octaves: 'Number of levels of detail you want you perlin noise to have.'
    }

    rangeOnChange = (e, value, name, type) => {
        let key = name.split(' ').length > 1 ? name.split(' ')[0] + name.split(' ')[1] : name.split(' ')[0]
        

        this.GLOBALS[key] = value
        this.GLOBALS.flags[`reset_${type}`] = true 

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

                        this.GLOBALS[key] = e.target.checked
                        this.GLOBALS.flags[`reset_${type}`] = true
                        
                    }}
                />
                  
            </div> 
        )
    }

    input = ({name, type}) => {
        
        return (
            <>
                
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <TextField
                        focused
                        color={this.state.custom_inputIsFull ? 'primary' : 'secondary'}
                        //focused={this.state.custom_inputIsFull}
                        id="outlined-number"
                        type="text"
                        placeholder={`${this.GLOBALS.CustomSeed}`}
                        label='Custom Seed'
                        fullWidth
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
                                    custom_inputIsFull: false,
                                    customSeed: e.target.value
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
                            if(this.state.custom_inputIsFull) {
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
                        size='small'
                        
                    >
                    {this.state.custom_inputIsFull ? <KeyboardArrowRight /> : <Shuffle />}
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

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
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

                    <Tooltip title={this.toolTIps[name]}>
                        <IconButton size='small'>
                            <Help />
                        </IconButton>
                    </Tooltip>
                    
                    
                </div>
                
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


    render() {

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

            <Fade in={this.props.visible}>
                <Card
                    raised={true}
                    elevation={12}
                    style={{
                        width: 400,
                        height: 400,
                        backgroundColor: '#242424',
                        zIndex: 10,
                        borderRadius:5,   

                        position: 'absolute',
                        top: this.props.y ,
                        left: this.props.x ,

                        overflowY: 'scroll'                     
                    }}
                    classes={{root: 'custom-scrollbar'}}

                >
                    
                    <CardContent>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h2 style={{ margin: 0, padding: 0, color:'white'}}>Terrain.</h2>
                            <IconButton 
                                onClick={this.props._onClose}
                                size='small'
                            >
                                <Close />
                            </IconButton>
                            
                        </div>
                        
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
                            {this.range({name: 'Height', type: 'Displace', min: 1, max: 16, step: 1, marks: generateMarks(1, 16, 1, 0), label: 'auto'})}
                            <Divider style={{
                                marginTop: 20
                            }} />
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