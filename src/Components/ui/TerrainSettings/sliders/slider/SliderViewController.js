import React, { Component } from 'react';
import SliderView from './SliderView';
import "./main.css";

export default class SliderViewController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value
        }

        this.onChange = this.onChange.bind(this)
    }

    componentDidUpdate(pProps) {
        if(pProps.value !== this.props.value) {
            this.setState({ value: this.props.value })
        }
    }

    onChange = (e, v) => {
        this.setState({value: v})
    }

    render() {
        return (
            <SliderView 
                label={this.props.label}
                value={this.state.value}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                onChange={this.onChange}
                onCommitChange={this.props.onCommitChange}
            />
        );
    }
}