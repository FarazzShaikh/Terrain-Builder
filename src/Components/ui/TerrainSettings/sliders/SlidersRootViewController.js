import React, { Component } from 'react';
import SlidersRootView from './SlidersRootView';
import "./main.css";

import { connect } from 'react-redux';

class SlidersRootViewController extends Component {
    constructor(props) {
        super(props)
        this.onCommitChange = this.onCommitChange.bind(this)
    }

    onCommitChange = (label, value) => {
        this.props.set_GEN(label, value)
    }

    render() {
        const sliders = [
            {
                label: 'Scale',
                min: 0.1,
                max: 2,
                def: this.props.GEN_scale,
                step: 0.01,
            },
            {
                label: 'Height',
                min: 0.1,
                max: 0.5,
                def: this.props.GEN_zScale,
                step: 0.01,
            },
            {
                label: 'Lacunarity',
                min: 0.1,
                max: 5,
                def: this.props.GEN_lacunarity,
                step: 0.1,
            },
            {
                label: 'Persistance',
                min: 0.1,
                max: 5,
                def: this.props.GEN_persistance,
                step: 0.1,
            },
            {
                label: 'Octaves',
                min: 1,
                max: 7,
                def: this.props.GEN_octaves,
                step: 1,
            },
            {
                label: 'Redistribution',
                min: 0.1,
                max: 10,
                def: this.props.GEN_redistribution,
                step: 0.1,
            },
            {
                label: 'xOff',
                min: 0,
                max: 50,
                def: this.props.GEN_xOff,
                step: 0.1,
            },
            {
                label: 'yOff',
                min: 0,
                max: 50,
                def: this.props.GEN_yOff,
                step: 0.1,
            },
            
        ]
        return (
            <SlidersRootView
                sliders={sliders}
                onCommitChange={this.onCommitChange}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        
        GEN_scale: state.GEN_Scale,
        GEN_persistance: state.GEN_Persistance,
        GEN_lacunarity: state.GEN_Lacunarity,
        GEN_octaves: state.GEN_Octaves,
        GEN_redistribution: state.GEN_Redistribution,
        GEN_zScale: state.GEN_zScale,
        GEN_xOff: state.GEN_xOff,
        GEN_yOff: state.GEN_yOff
    }
}

function mapDispatchToProps(dispatch) {
    return {
        set_GEN: (label, data) => dispatch({type: 'set_GEN', data: data, label: label})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlidersRootViewController)