import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleDown as Icon_arrow,
} from '@fortawesome/free-solid-svg-icons'
import IconContainerViewController from './IconContainer/IconContainerViewController';
import ResolutionInputViewController from './InputTextFields/InputTextFieldsViewController';

export default class ProjectInfoRootView extends Component {
    render() {
        return (
            <div className={'ProjectInfo-root'}>
                <div className={'ProjectInfo-container'}
                    style={{
                        width: this.props.collapseOpen ? 320 : 200
                    }}
                >
                    <div className={'ProjectInfo-header'}
                        style={{
                            border: this.props.collapseOpen ? '' : '0px'
                        }}
                    >
                        <div>
                            <div className={'ProjectInfo-name'}>{this.props.nameValue}</div>
                            <div className={'ProjectInfo-cdate'}>{`M: ${this.props.mDate}`}</div>
                        </div>

                        <FontAwesomeIcon
                            icon={Icon_arrow}
                            color={'white'}
                            className={'ProjectInfo-icon '}
                            onMouseDown={this.props.onArrowPress}
                            style={{
                                transform: this.props.collapseOpen ? '' : 'rotate(180deg)'
                            }}
                        />
                    </div>
                    <Collapse
                        in={this.props.collapseOpen} timeout="auto" unmountOnExit
                        classes={{ container: 'ProjectInfo-colapse' }}
                    >
                        <ResolutionInputViewController 
                            nameValue={this.props.nameValue}
                            resolutionValue={this.props.resolutionValue}

                            onResolutionChange={this.props.onResolutionChange}
                            onProjectNameChnage={this.props.onProjectNameChnage}
                        />
                        <IconContainerViewController 
                            resolutionValue={this.props.resolutionValue}

                            timeDisplace={this.props.timeDisplace}
                        />
                    </Collapse>
                </div>
            </div>
        );
    }
}
