import React, { Component } from 'react';
import ThreeDView from './ThreeDView';
import { main, refreshTerrain, rebuildTerrain } from './main/main';
import "./main.css";

import { connect } from 'react-redux';

class ThreeDViewController extends Component {
    componentDidMount() {
        main({...this.props})
    }

    componentDidUpdate(pProps) {
        if (Number(pProps.GEN_Resolution) !== Number(this.props.GEN_Resolution)) {
            rebuildTerrain({...this.props})
        } else {
            refreshTerrain({...this.props})
        }
    }

    render() {
        return (
            <ThreeDView />
        );
    }
}

function mapStateToProps(state) {
    return {
        GEN_Resolution: state.GEN_Resolution,
        GEN_Seed: state.GEN_Seed,
        GEN_Scale: state.GEN_Scale,
        GEN_Persistance: state.GEN_Persistance,
        GEN_Lacunarity: state.GEN_Lacunarity,
        GEN_Octaves: state.GEN_Octaves,
        GEN_Redistribution: state.GEN_Redistribution,
        GEN_zScale: state.GEN_zScale,
        GEN_xOff: state.GEN_xOff,
        GEN_yOff: state.GEN_yOff
    }
}

export default connect(mapStateToProps)(ThreeDViewController)