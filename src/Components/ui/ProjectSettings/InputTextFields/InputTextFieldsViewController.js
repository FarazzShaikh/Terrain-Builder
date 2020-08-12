import React, { Component } from 'react';
import "./main.css";
import InputTextFieldsView from './InputTextFieldsView';


export default class InputTextFieldsViewController extends Component {
    render() {
        return (
            <InputTextFieldsView
                nameValue={this.props.nameValue}
                resolutionValue={this.props.resolutionValue}
                seedValue={this.props.seedValue}
                mapResValue={this.props.mapResValue}

                onResolutionChange={this.props.onResolutionChange}
                onProjectNameChnage={this.props.onProjectNameChnage}
                onSeedChange={this.props.onSeedChange}
                onMapResChange={this.props.onMapResChange}
            />
        );
    }
}
