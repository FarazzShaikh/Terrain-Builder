import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faInfoCircle as Icon_tooltip
} from '@fortawesome/free-solid-svg-icons'

export default class SliderView extends Component {
    render() {
        return (
            <div className={'container'}>
                <div className={'text-container'}>
                    <div className={'label'}>
                        {this.props.label}
                        <FontAwesomeIcon icon={Icon_tooltip} color={'white'} className={'slider-tooltip'} />
                    </div>
                    <div className={'value'}>
                        {this.props.value}
                    </div>
                </div>

                <Slider
                    className={'slider'}
                    value={this.props.value}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    onChange={(e, v) => { this.props.onCommitChange(this.props.label, v); this.props.onChange(e, v) }}
                    onChangeCommitted={(e, v) => this.props.onCommitChange(this.props.label, v)}
                />
            </div>
        );
    }
}