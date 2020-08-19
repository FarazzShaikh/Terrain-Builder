import React, { Component } from 'react';
import TerrainSettingsRootView from './TerrainSettingsRootView';

import "./main.css";

export default class TerrainSettingsRootViewController extends Component {

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
                <TerrainSettingsRootView
                    collapseOpen={this.state.collapseOpen}
                    onArrowPress={this.onArrowPress}
                />
               

        );
    }
}

