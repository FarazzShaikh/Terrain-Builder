import React, { Component } from 'react';
import ThreeDView from './ThreeDView';
import { main, refreshTerrain } from './main/main';
import "./main.css";

import { connect } from 'react-redux';

class ThreeDViewController extends Component {
    componentDidMount() {
        main(
            {
                terrainResolution: this.props.GLOBAL_terrainResolution,
                GEN_Scale: this.props.GEN_Scale,
                GEN_Persistance: this.props.GEN_Persistance,
                GEN_Lacunarity: this.props.GEN_Lacunarity,
                GEN_Octaves: this.props.GEN_Octaves,
                GEN_Redistribution: this.props.GEN_Redistribution,
                GEN_zScaling: this.props.GEN_zScaling,
                GEN_xOff: this.props.GEN_xOff,
                GEN_yOff: this.props.GEN_yOff

            }
        )

    }

    componentDidUpdate() {
        refreshTerrain(
            {
                terrainResolution: this.props.GLOBAL_terrainResolution,
                GEN_Scale: this.props.GEN_Scale,
                GEN_Persistance: this.props.GEN_Persistance,
                GEN_Lacunarity: this.props.GEN_Lacunarity,
                GEN_Octaves: this.props.GEN_Octaves,
                GEN_Redistribution: this.props.GEN_Redistribution,
                GEN_zScaling: this.props.GEN_zScaling,
                GEN_xOff: this.props.GEN_xOff,
                GEN_yOff: this.props.GEN_yOff

            }
        )

    }

    render() {
        return (
            <ThreeDView />
        );
    }
}

function mapStateToProps(state) {
    return {
        GLOBAL_shouldUpdateTerrain: state.GLOBAL_shouldUpdateTerrain,
        GLOBAL_terrainResolution: state.GLOBAL_terrainResolution,
        GEN_Scale: state.GEN_Scale,
        GEN_Persistance: state.GEN_Persistance,
        GEN_Lacunarity: state.GEN_Lacunarity,
        GEN_Octaves: state.GEN_Octaves,
        GEN_Redistribution: state.GEN_Redistribution,
        GEN_zScaling: state.GEN_zScaling,
        GEN_xOff: state.GEN_xOff,
        GEN_yOff: state.GEN_yOff
    }
}

function mapDispatchToProps(dispatch) {
    return {
        set_GLOBAL_HeightBuffer: (data) => dispatch({type: 'set_GLOBAL_HeightBuffer', data: data}),
        set_GLOBAL_shouldUpdateTerrain: (data) => dispatch({type: 'set_GLOBAL_shouldUpdateTerrain', data: data}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreeDViewController)