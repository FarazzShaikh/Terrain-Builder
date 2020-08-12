import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from "@material-ui/core/styles";
import "./main.css";
import BasicButton from './BasicButton';

const styles = {
    input: {
        color: "white",
    }
};

class InputTextField extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
        }
    }

    componentDidUpdate(pProps) {
        if(pProps.value !== this.props.value) {
            this.setState({ value: this.props.value })
        }
    }

    render() {
        return (
            <div className={'ResolutionInputView-textinput-container'}>
                <TextField
                    focused
                    size={'small'}
                    variant={'outlined'}
                    label={this.props.label}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={(v) => this.setState({ value: v.target.value })}
                    InputProps={{
                        className: this.props.classes.input
                    }}
                />
                <BasicButton 
                    onMouseDown={() => this.props.onMouseDown(this.state.value)}
                    buttonLabel={this.props.buttonLabel}
                />
            </div>
        );
    }
}

export default withStyles(styles)(InputTextField);