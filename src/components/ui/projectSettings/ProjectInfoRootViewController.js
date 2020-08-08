import React, { Component } from 'react';
import ProjectInfoRootView from './ProjectInfoRootView';
import "./main.css";

import { connect } from 'react-redux';

class ProjectInfoRootViewController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapseOpen: true,
        }
        this.onArrowPress = this.onArrowPress.bind(this)
    }

    onArrowPress = () => {
        this.setState({ collapseOpen: !this.state.collapseOpen })
    }

    render() {
        return (
            <ProjectInfoRootView 
                collapseOpen={this.state.collapseOpen}
                onArrowPress={this.onArrowPress}

                nameValue={this.props.META_ProjectName}
                resolutionValue={this.props.GEN_Resolution}
                seedValue={this.props.GEN_Seed}
                mapResValue={this.props.MAP_Resolution}
                mDate={this.props.META_mDate}

                onResolutionChange={this.props.set_GEN_Resolution}
                onProjectNameChnage={this.props.set_META_ProjectName}
                onMapResChange={this.props.set_MAP_Resolution}
                onSeedChange={(d) => this.props.set_GEN('Seed', Number(d))}

                timeDisplace={this.props.TIME_displace}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        GEN_Resolution: state.GEN_Resolution,
        META_ProjectName: state.META_ProjectName,
        META_mDate: state.META_mDate,

        TIME_displace: state.TIME_displace,

        GEN_Seed: state.GEN_Seed,
        MAP_Resolution: state.MAP_Resolution
    }
}

function mapDispatchToProps(dispatch) {
    return {
        set_GEN_Resolution: (data) => dispatch({type: 'set_GEN_Resolution', data: data}),
        set_META_ProjectName: (data) => dispatch({type: 'set_META_ProjectName', data: data}),
        set_META_mDate: (data) => dispatch({type: 'set_META_mDate', data: data}),

        set_GEN: (label, data) => dispatch({ type: 'set_GEN', data: data, label: label }),
        set_MAP_Resolution: (data) => dispatch({ type: 'set_MAP_Resolution', data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfoRootViewController)
