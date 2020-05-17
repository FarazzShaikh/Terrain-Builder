import React, { Component } from "react";
import { 
    Card,
    CardContent,
    TextField, 
    Slider, 
    IconButton, 
    Fade ,
    Tooltip
} from '@material-ui/core';

import { 
    Shuffle,
    KeyboardArrowRight,
    Close,
    Help
} from '@material-ui/icons';


import "./main.css";


export class EROSION_ITEM extends Component {

    constructor(props) {
        super(props)
        this.GLOBALS = this.props.globals

        this.state = {
           
            defaults: {
                Steps: this.GLOBALS.Steps,
                Rain_Amount: this.GLOBALS.Rain_Amount,
                Sediment_Deposited: this.GLOBALS.Sediment_Deposited,
                Sediment_Eroded: this.GLOBALS.Sediment_Eroded,
            },


            mousePos: {
                x: 0,
                y: 0
            },

        }
       
    }

    toolTIps = {
        Steps: 'Number of simulation steps.',
        Rain_Amount: 'Percentage of Verticies that recieve rain.',
        Sediment_Deposited: 'How much sediment is deposited by flowing water.',
        Sediment_Eroded: 'How much soil is taken out by flowing water.',
    }

    rangeOnChange = (e, value, name, type) => {
        let key = name.split(' ').length > 1 ? name.split(' ')[0] + name.split(' ')[1] : name.split(' ')[0]
        
        this.GLOBALS[key] = value
        this.GLOBALS.flags[`reset_${type}`] = true 

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
        let title = name.split('_').length > 1 ? name.split('_')[0] + " " + name.split('_')[1] : name
        return (
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: 20
                }}

            >

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
                        
                    >{title}</h4>

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
        const generateMarks = (min, max, step, precision, numberOfMarks) => {
            let centerL
            let centerR
            if(numberOfMarks === 2) {
                centerL = ((min + max) - (step * 2)) / 2
                centerR = ((min + max) + (step * 2)) / 2
            } else if(numberOfMarks === 1) {
                centerL = ((min + max)) / 2
                centerR = 0
            }
            
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
                            <h2 style={{ margin: 0, padding: 0, color:'white'}}>Erosion.</h2>
                            <IconButton 
                                onClick={this.props._onClose}
                                size='small'
                            >
                                <Close />
                            </IconButton>
                            
                        </div>
                    
                        <div style={{margin: '10px 20px'}}>

                            {this.range({name: 'Steps', type: 'Erode', min: 100, max: 500, step: 10, marks: generateMarks(100, 500, 10, 0, 1), label: 'auto'})}
                            {this.range({name: 'Rain_Amount', type: 'Erode', min: 0.001, max: 0.01, step: 0.001, marks: generateMarks(0.001, 0.01, 0.001, 3, 2), label: 'auto'})}
                            {this.range({name: 'Sediment_Deposited', type: 'Erode', min: 1, max: 10, step: 1, marks: generateMarks(1, 10, 1, 0, 2), label: 'auto'})}
                            {this.range({name: 'Sediment_Eroded', type: 'Erode', min: 1, max: 10, step: 1, marks: generateMarks(1, 10, 1, 0, 2), label: 'auto'})}
                            
                        </div>

                    </CardContent>

                </Card>
                  
            </Fade>
                

        )

    }
}