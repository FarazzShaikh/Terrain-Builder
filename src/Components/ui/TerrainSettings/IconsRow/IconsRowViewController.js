import React, { Component } from 'react';
import IconsRowView from './IconsRowView';
import "./main.css";

import { connect } from 'react-redux';
import Defaults from '../../../../Redux/Defaults';

class IconsRowViewController extends Component {

    constructor(props) {
        super(props)
        this.onButtonPress = this.onButtonPress.bind(this)
    }

    onButtonPress = (label) => {
        switch (label) {
            case 'download': {
                this.props.set_INTERNAL_doesCaptureMap(true)
                break
            }

            case 'random': {
                this.props.set_GEN('Seed', Math.random())
                break
            }

            case 'save': {
                this.save()
                break
            }

            case 'reset': {
                this.reset()
                break
            }

            default:
                break;
        }
    }

    save() {
        const jsonObject = {
            META_ProjectName: this.props.META_ProjectName,
            GEN_Seed: this.props.GEN_Seed,
            GEN_Scale: this.props.GEN_Scale,
            GEN_Persistance: this.props.GEN_Persistance,
            GEN_Lacunarity: this.props.GEN_Lacunarity,
            GEN_Octaves: this.props.GEN_Octaves,
            GEN_Redistribution: this.props.GEN_Redistribution,
            GEN_zScale: this.props.GEN_zScale,
            GEN_xOff: this.props.GEN_xOff,
            GEN_yOff: this.props.GEN_yOff
        }
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObject));
        var link = document.createElement('a');
        link.download = 'filename.json';
        link.href = dataStr
        link.click();
    }

    reset() {
        for (const key in this.props) {
            if (this.props.hasOwnProperty(key)) {
                if(key.split('_')[0] === 'GEN') {
                    this.props.set_GEN(key.split('_')[1], Defaults[key])
                }
            }
        }
        this.props.set_GEN('Height', Defaults.GEN_zScale)
    }

    render() {
        return (
            <IconsRowView
                onButtonPress={this.onButtonPress}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        META_ProjectName: state.META_ProjectName,

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

function mapDispatchToProps(dispatch) {
    return {
        set_INTERNAL_doesCaptureMap: (data) => dispatch({ type: 'set_INTERNAL_doesCaptureMap', data: data }),
        set_GEN: (label, data) => dispatch({ type: 'set_GEN', data: data, label: label })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IconsRowViewController)