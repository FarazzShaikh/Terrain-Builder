import React, { Component } from 'react';
import {
    faDownload as Icons_download,
    faSave as Icon_save,
    faSdCard as Icon_load,
    faRandom as Icon_random,
    faRedoAlt as Icon_reset
} from '@fortawesome/free-solid-svg-icons'
import BasicIcon from '../../MiscComponents/BasicIcon';

export default class IconsRowView extends Component {
    render() {
        return (
            <div className={'ui-icon-main'}>
                <div className={'ui-icon-contianter'}>
                    <BasicIcon
                        tooltip_Placement={"top"}
                        tooltip_Label={'Load Terrain - COMING SOON'}
                        icon={Icon_load}
                        onMouseDown={() => { }}
                        disabled={true}
                    />
                    <BasicIcon
                        tooltip_Placement={"top"}
                        tooltip_Label={'Save Terrain'}
                        icon={Icon_save}
                        onMouseDown={() => this.props.onButtonPress('save')}
                    />
                    <BasicIcon
                        tooltip_Placement={"top"}
                        tooltip_Label={'Download'}
                        icon={Icons_download}
                        onMouseDown={() => this.props.onButtonPress('download')}

                    />
                </div>
                <div className={'ui-icon-contianter'}>
                    <BasicIcon
                        tooltip_Placement={"top"}
                        tooltip_Label={'Randomize Seed'}
                        icon={Icon_reset}
                        onMouseDown={() => this.props.onButtonPress('reset')}
                    />
                    <BasicIcon
                        tooltip_Placement={"top"}
                        tooltip_Label={'Randomize Seed'}
                        icon={Icon_random}
                        onMouseDown={() => this.props.onButtonPress('random')}
                    />
                </div>

            </div>
        );
    }
}