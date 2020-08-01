import React, { Component } from 'react';
import UIRootView from './UIRootView';
import "./main.css";

export default class UIRootViewController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapseOpen: true
        }
        this.onArrowPress = this.onArrowPress.bind(this)
    }

    onArrowPress = () => {
        this.setState({ collapseOpen: !this.state.collapseOpen })
    }

    render() {
        return (
            <UIRootView 
                collapseOpen={this.state.collapseOpen}
                onArrowPress={this.onArrowPress}
            />
        );
    }
}

