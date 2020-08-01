import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faDownload as Icons_download,
  faSave as Icon_save,
  faSdCard as Icon_load,
  faSync as Icon_refresh
} from '@fortawesome/free-solid-svg-icons'

export default class IconsRowView extends Component {
    render() {
        return (
            <div className={'ui-icon-contianter'}>
                <div>
                    <FontAwesomeIcon icon={Icon_load} color={'white'} className={'ui-icon'} />
                    <FontAwesomeIcon icon={Icon_save} color={'white'} className={'ui-icon'} />
                    <FontAwesomeIcon icon={Icons_download} color={'white'} className={'ui-icon'} />
                </div>
                <FontAwesomeIcon icon={Icon_refresh} color={'white'} className={'ui-icon'} />
            </div>
        );
    }
}