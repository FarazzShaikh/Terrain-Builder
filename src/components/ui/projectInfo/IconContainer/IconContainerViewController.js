import React, { Component } from 'react';
import {
    faDrawPolygon as Icon_verts,
    faHourglassHalf as Icon_renderTime,
    faTv as Icon_resolution,
} from '@fortawesome/free-solid-svg-icons'
import "./main.css";
import IconContainerView from './IconContainerView';

export default class IconContainerViewController extends Component {
    constructor(props) {
        super(props)
        this.icons = [
            [
                {
                    icon: Icon_verts,
                    label: 'Verticies',
                    value: '000',
                },
                {
                    icon: Icon_resolution,
                    label: 'Resolution',
                    value: '000',
                },
                {
                    icon: Icon_renderTime,
                    label: 'Render',
                    value: '000',
                }
            ],
            
        ]
    }

    render() {
        return (
            <IconContainerView 
                icons={this.icons}
            />
        );
    }
}

