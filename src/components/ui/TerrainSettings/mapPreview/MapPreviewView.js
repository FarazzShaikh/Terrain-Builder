import React, { Component } from 'react';

export default class MapPreviewView extends Component {

    componentDidUpdate() {
        this.props.updateCanvas()
    }

    render() {
        return (
            <div className={'ui-canvas-container'}>
                <canvas 
                    width={320}
                    height={320}
                    className={'ui-map-canvas'} 
                    ref={this.props.initCanvas} 
                />
            </div>
        );
    }
}