import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    Tooltip, 
    Zoom, 
    withStyles
} from '@material-ui/core';
import "./main.css";

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

export default class BasicIcon extends Component {
    render() {
        return (
            <LightTooltip
                title={this.props.tooltip_Label}
                placement={this.props.tooltip_Placement}
                TransitionComponent={Zoom}
            >
                <div>
                    <FontAwesomeIcon 
                        icon={this.props.icon} 
                        color={this.props.disabled ? '#191919': 'white'} 
                        className={this.props.disabled ? 'misc-icon-disabled' : 'misc-icon'} 
                        onMouseDown={this.props.onMouseDown} 
                    />
                </div>

            </LightTooltip>
        );
    }
}