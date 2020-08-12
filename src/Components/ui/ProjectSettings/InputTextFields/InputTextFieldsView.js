import React, { Component } from 'react';
import InputTextField from '../../MiscComponents/InputTextField';


export default class InputTextFieldsView extends Component {

    render() {
        return (
            <div className={'ResolutionInputView-main'}>
                <div className={'ResolutionInputView-main-container'}>
                    <InputTextField
                        value={this.props.nameValue}
                        label={'Name'}
                        type={'text'}
                        placeholder={'String'}
                        buttonLabel={'Set'}
                        onMouseDown={this.props.onProjectNameChnage}
                    />
                    <InputTextField
                        value={this.props.seedValue}
                        label={'Seed'}
                        type={'number'}
                        placeholder={'Number'}
                        buttonLabel={'Set'}
                        onMouseDown={this.props.onSeedChange}
                    />

                </div>
                <div className={'ResolutionInputView-main-container'}>
                    <InputTextField
                        value={this.props.resolutionValue}
                        label={'Resolution'}
                        type={'number'}
                        placeholder={'Number'}
                        buttonLabel={'Set'}
                        onMouseDown={this.props.onResolutionChange}
                    />
                    <InputTextField
                        value={this.props.mapResValue}
                        label={'Map Resolution'}
                        type={'number'}
                        placeholder={'Number'}
                        buttonLabel={'Set'}
                        onMouseDown={this.props.onMapResChange}
                    />
                </div>

            </div>
        );
    }
}
