import React, { Component } from 'react';
import Draggable from 'react-draggable';
import Collapse from '@material-ui/core/Collapse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAngleDown as Icon_arrow,
    faArrowsAlt as Icon_move
} from '@fortawesome/free-solid-svg-icons'

import MapPreviewViewController from './mapPreview/MapPreviewViewController';
import IconsRowViewController from './IconsRow/IconsRowViewController';
import SlidersRootViewController from './sliders/SlidersRootViewController';

export default class TerrainSettingsRootView extends Component {
    render() {
        return (
            <Draggable handle={'.ui-dragIcon'}>
                <div className={'ui-root'}>
                    <div className={'ui-container'}
                        style={{
                            width: this.props.collapseOpen ? 320 : 200
                        }}
                    >
                        <div className={'ui-header'}
                            style={{
                                border: this.props.collapseOpen ? '' : '0px'
                            }}
                        >
                            <div>
                                <div className={'ui-title'}>Terrain Settings</div>
                                <div className={'ui-subtitle'}>Saved</div>
                            </div>
                            <div>
                            <FontAwesomeIcon
                                icon={Icon_move}
                                color={'white'}
                                className={'ui-dragIcon'}
                            />
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
                            
                        </div>
                        <Collapse
                            in={this.props.collapseOpen} timeout="auto" unmountOnExit

                        >
                            <SlidersRootViewController />
                            <IconsRowViewController />
                            <MapPreviewViewController />
                        </Collapse>

                    </div>
                </div>
            </Draggable>

        );
    }
}
