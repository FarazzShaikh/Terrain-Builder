import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faDownload as Icons_download,
    faSave as Icon_save,
    faSdCard as Icon_load,
    faSync as Icon_refresh
} from '@fortawesome/free-solid-svg-icons'
import BasicIcon from '../../miscComponents/BasicIcon';

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
                        tooltip_Label={'Save Terrain - COMING SOON'}
                        icon={Icon_save}
                        onMouseDown={() => { }}
                        disabled={true}
                    />
                    <BasicIcon
                        tooltip_Placement={"top"}
                        tooltip_Label={'Download'}
                        icon={Icons_download}
                        onMouseDown={() => this.props.onButtonPress('download')}

                    />
                </div>
                <BasicIcon
                    tooltip_Placement={"top"}
                    tooltip_Label={'Refresh - COMING SOON'}
                    icon={Icon_refresh}
                    onMouseDown={() => {}}
                    disabled={true}
                />
            </div>
        );
    }
}