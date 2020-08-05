import React, { Component } from 'react';
import "./main.css";
import InputTextFieldsView from './InputTextFieldsView';


export default class InputTextFieldsViewController extends Component {
    render() {
        return (
            <InputTextFieldsView 
                nameValue={this.props.nameValue}
                resolutionValue={this.props.resolutionValue}

                onResolutionChange={this.props.onResolutionChange}
                onProjectNameChnage={this.props.onProjectNameChnage}
            />
        );
    }
}
