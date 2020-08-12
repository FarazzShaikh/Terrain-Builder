import React, { Component } from 'react';
import "./main.css";


export default class BasicButton extends Component {

    render() {
        return (
            <div 
                className={this.props.classOverride ? this.props.classOverride : 'ResolutionInputView-button'} 
                onMouseDown={this.props.onMouseDown}
            >
                {this.props.buttonLabel}
            </div>
        );
    }
}

