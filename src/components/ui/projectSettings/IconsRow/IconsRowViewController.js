import React, { Component } from 'react';
import IconsRowView from './IconsRowView';
import "./main.css";

import { connect } from 'react-redux';

class IconsRowViewController extends Component {

    constructor(props) {
        super(props)
        this.onButtonPress = this.onButtonPress.bind(this)
    }

    onButtonPress = (label) => {
        switch (label) {
            case 'download': {
                this.props.set_GLOBAL_doesCaptureMap(true)
                break
            }

            default:
                break;
        }
    }

    render() {
        return (
            <IconsRowView
                onButtonPress={this.onButtonPress}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        set_GLOBAL_doesCaptureMap: (data) => dispatch({type: 'set_GLOBAL_doesCaptureMap', data: data})
    }
}

export default connect(null, mapDispatchToProps)(IconsRowViewController)