import React, { Component } from 'react';
import "./main.css";
import SocialsRootView from './SocialsRootView';

export default class SocialsRootViewController extends Component {

    constructor(props) {
        super(props)
        this.onMouseDown = this.onMouseDown.bind(this)
    }

    onMouseDown(label) {
        switch (label) {
            case 'git':
                window.open('https://github.com/FarazzShaikh', '_blank')
                break;
            case 'art':
                window.open('https://www.artstation.com/farazshaikh', '_blank')
                break;
            case 'insta':
                window.open('https://www.instagram.com/faar.az/', '_blank')
                break;

            case 'coffee':
                window.open('https://www.buymeacoffee.com/faraz', '_blank')
                break;

            case 'bug':
                window.open('https://github.com/FarazzShaikh/Terrain-Builder/issues/new', '_blank')
                break;

            default:
                break;
        }
        console.log(label)
    }

    render() {
        return (
            <SocialsRootView
                onMouseDown={this.onMouseDown}
            />
        );
    }
}

