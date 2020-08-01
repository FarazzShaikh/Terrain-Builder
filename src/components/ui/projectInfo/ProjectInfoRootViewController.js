import React, { Component } from 'react';
import ProjectInfoRootView from './ProjectInfoRootView';
import "./main.css";

export default class ProjectInfoRootViewController extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collapseOpen: true
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
            />
        );
    }
}

