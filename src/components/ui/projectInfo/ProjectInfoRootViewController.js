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

                nameValue={this.props.GLOBAL_ProjectName}
                resolutionValue={this.props.GLOBAL_terrainResolution}
                mDate={this.props.GLOBAL_mDate}

                onResolutionChange={this.props.set_GLOBAL_terrainResolution}
                onProjectNameChnage={this.props.set_GLOBAL_ProjectName}

                timeDisplace={this.props.TIME_displace}
            />
        );
    }
}


function mapStateToProps(state) {
    return {
        GLOBAL_terrainResolution: state.GLOBAL_terrainResolution,
        GLOBAL_ProjectName: state.GLOBAL_ProjectName,
        GLOBAL_mDate: state.GLOBAL_mDate,

        TIME_displace: state.TIME_displace,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        set_GLOBAL_terrainResolution: (data) => dispatch({type: 'set_GLOBAL_terrainResolution', data: data}),
        set_GLOBAL_ProjectName: (data) => dispatch({type: 'set_GLOBAL_ProjectName', data: data}),
        set_GLOBAL_mDate: (data) => dispatch({type: 'set_GLOBAL_mDate', data: data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfoRootViewController)
