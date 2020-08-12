import React, { Component } from 'react';
import {
    faDrawPolygon as Icon_verts,
    faHourglassHalf as Icon_renderTime,
    faTv as Icon_resolution,
} from '@fortawesome/free-solid-svg-icons'
import "./main.css";
import IconContainerView from './IconContainerView';

import numeral from 'numeral';

export default class IconContainerViewController extends Component {
    render() {
        return (
            <IconContainerView 
                icons={[
                    [
                        {
                            icon: Icon_verts,
                            label: 'Verticies',
                            value: `${numeral(this.props.resolutionValue*this.props.resolutionValue).format('0.0a')}`,
                        },
                        {
                            icon: Icon_resolution,
                            label: 'Resolution',
                            value: `${numeral(this.props.mapResValue).format('0,0')}px`,
                        },
                        {
                            icon: Icon_renderTime,
                            label: 'Render',
                            value: makeDigits(this.props.timeDisplace),
                        }
                    ],
                    
                ]}
                
            />
        );
    }
}

function makeDigits(num) {
    let str = String(num)

    while(str.length < 3) {
        str = `0${str}`
    }

    return str
}

