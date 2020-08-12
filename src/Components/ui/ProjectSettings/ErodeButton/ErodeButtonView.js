import React, { Component } from 'react';
import BasicButton from '../../MiscComponents/BasicButton';


export default class ErodeButtonView extends Component {

    render() {
        return (
            <div className={'ErodeButtonView-container'}>
                <BasicButton
                    buttonLabel={'Erosion Coming Soon!'}
                    onMouseDown={() => console.log('Erosion Coming Soon')}
                    classOverride={'ErodeButtonView-button'}
                />
            </div>

        );
    }
}
