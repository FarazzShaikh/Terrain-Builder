import React, { Component } from 'react';
import IconsRowView from './IconsRowView';
import "./main.css";

export default class IconsRowViewController extends Component {
    render() {
        return (
            <IconsRowView
                iconRow={this.props.iconRow}
            />
        );
    }
}