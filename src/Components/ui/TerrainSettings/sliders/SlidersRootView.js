import React, { Component } from 'react';
import SliderViewController from './slider/SliderViewController';

export default class SlidersRootView extends Component {

    renderSliders(sliders) {
        let output = []
        for (let i = 0; i < sliders.length; i += 2) {
            const slider1 = sliders[i];
            const slider2 = sliders[i + 1];
            output.push(
                <div className={'sliders-pair'} key={i}>
                    <SliderViewController
                        label={slider1.label}
                        value={slider1.def}
                        min={slider1.min}
                        max={slider1.max}
                        step={slider1.step}
                        onCommitChange={this.props.onCommitChange}
                    />
                    {
                        slider2 ? <SliderViewController
                            label={slider2.label}
                            value={slider2.def}
                            min={slider2.min}
                            max={slider2.max}
                            step={slider2.step}
                            onCommitChange={this.props.onCommitChange}
                        /> : <></>
                    }

                </div>
            )
        }
        return output.map((E) => {
            return E
        })
    }

    render() {
        return (
            <div className={'sliders-root'}>
                {this.renderSliders(this.props.sliders)}
            </div>
        );
    }
}