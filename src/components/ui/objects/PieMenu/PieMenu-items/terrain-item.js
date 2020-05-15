import React, { Component } from "react";
import Css from 'styled-components';
import Card from '@material-ui/core/Card';
import Switch from '@material-ui/core/Switch';
import CardContent from '@material-ui/core/CardContent';

import { TextField, Slider, Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


import "./main.css";

const COLOR_SHADOW = '#b88335'
const COLOR_PRIMARY = '#ffb74d'


export class TERRAIN_ITEM extends Component {

    constructor() {
        super()
        this.state = {
            Erosion: true,
            Custom: false,

            range: {
                Resolution: 256
            },

        }
    }

    onSwitchChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name.split(' ')[0]]: e.target.checked,
        })
    }
    
    switch = ({name}) => {
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
                />
                  
            </div> 
        )
    }

    input = ({name}) => {
        return (
            <>
                {this.switch({name: name})}
                <TextField
                    disabled={!this.state.Custom}
                    id="outlined-number"
                    type="text"
                    placeholder={this.state.Custom ? '' : 'Disabled'}
                    size='small'
                    margin="dense"
                />
            </>
        )
    }

    range = ({name}) => {
        const marks = [
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
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
                
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
                    defaultValue={this.state.range.Resolution}
                    step={null}
                    max={1024}
                    min={128}
                    marks={marks}
                />

            </div>
            
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

        return (
            
                <Card
                    raised={true}
                    elevation={12}
                    style={{
                        width: 300,
                        backgroundColor: '#242424',
                        zIndex: 10,
                        borderRadius:10,
                        overflow: 'scroll'

                        
                    }}

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
                            {this.switch({name: 'Erosion'})}
                            {this.input({name: 'Custom Seed'})}
                        </div>

                        <div style={{margin: '10px 20px'}}>
                            {this.range({name: 'Resolution'})}
                        </div>

                        <Container.MoreHorizIcon>
                            <MoreHorizIcon 
                                style={{
                                    cursor: 'pointer'
                                }} 
                                onClick={(e) => {
                                    
                                    
                                }}
                            />
                        </Container.MoreHorizIcon>
                        
                    </CardContent>

                </Card>

        )

    }
}