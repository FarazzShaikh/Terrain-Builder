import React, { Component } from 'react';
import BasicButton from '../../MiscComponents/BasicButton';
import { erode } from '../../../3dView/main/Erosion/Erosion';


export default class ErodeButtonView extends Component {

    render() {
        return (
            <div className={'ErodeButtonView-container'}>
                <BasicButton
                    buttonLabel={'Erode'}
                    onMouseDown={() => erode()}
                    classOverride={'ErodeButtonView-button'}
                />
            </div>

        );
    }
}
