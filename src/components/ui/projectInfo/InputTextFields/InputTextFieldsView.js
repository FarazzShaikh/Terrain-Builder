import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";

const styles = {
    input: {
        color: "white",
        fontSize: 13
    }
};

class InputTextFieldsView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nVal: this.props.nameValue,
            rVal: this.props.resolutionValue
        }
    }

    render() {
        return (
            <div className={'ResolutionInputView-main'}>
                <div className={'ResolutionInputView-textinput-container'}>
                    <TextField
                        focused
                        size={'small'}
                        label="Rename Project."
                        variant={'standard'}
                        placeholder={'Name.'}
                        value={this.state.nVal}
                        onChange={(v) => this.setState({ nVal: v.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            className: this.props.classes.input,
                        }}
                        inputProps={{
                            maxLength: 24,
                        }}
                    />
                    <div className={'ResolutionInputView-button'} onMouseDown={() => this.props.onProjectNameChnage(this.state.nVal)}>
                        Rename - COMING SOON
                    </div>
                </div>

                <div className={'ResolutionInputView-textinput-container'}>
                    <TextField
                        focused
                        size={'small'}
                        label="Change Resolution."
                        type="number"
                        variant={'standard'}
                        placeholder={'Resolution.'}
                        value={this.state.rVal}
                        onChange={(v) => this.setState({ rVal: v.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            className: this.props.classes.input
                        }}
                    />
                    <div className={'ResolutionInputView-button'} onMouseDown={() => this.props.onResolutionChange(this.state.rVal)}>
                        Change - COMING SOON
                    </div>
                </div>


            </div>
        );
    }
}

export default withStyles(styles)(InputTextFieldsView);