import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faGithub as Icon_github,
    faArtstation as Icon_artstation,
    faInstagram as Icon_instagram,
} from '@fortawesome/free-brands-svg-icons'
import {
    faMugHot as Icon_coffee,
    faBug as Icon_bug
} from '@fortawesome/free-solid-svg-icons'

import BasicIcon from '../MiscComponents/BasicIcon';

export default class SocialsRootView extends Component {
    render() {
        return (
            <div className={'socials-main'}>
                <div className={'socials-container'}>
                    <BasicIcon 
                        tooltip_Placement={"top"}
                        tooltip_Label={'View Source'}
                        icon={Icon_github}
                        onMouseDown={() => this.props.onMouseDown('git')}

                    />
                    <BasicIcon 
                        tooltip_Placement={"top"}
                        tooltip_Label={'Report a Bug'}
                        icon={Icon_bug}
                        onMouseDown={() => this.props.onMouseDown('bug')}

                    />
                    <BasicIcon 
                        tooltip_Placement={"top"}
                        tooltip_Label={'Check out my Art'}
                        icon={Icon_artstation}
                        onMouseDown={() => this.props.onMouseDown('art')}

                    />
                    <BasicIcon 
                        tooltip_Placement={"top"}
                        tooltip_Label={'Follow Me On Instagram'}
                        icon={Icon_instagram}
                        onMouseDown={() => this.props.onMouseDown('insta')}

                    />
                </div>

                <div className={'socials-coffee'} onMouseDown={() => this.props.onMouseDown('coffee')}>
                    <FontAwesomeIcon icon={Icon_coffee} color={'black'} className={'ui-icon-coffee'} />
                    <div className={'socials-coffee-text'}>
                        Buy Me A Coffee!
                    </div>
                </div>

                {/* <div className={'socials-text'}>
                    Procedural Terrain made using layered Simplex Noise and Vertex Shaders. Read more about it here.
                </div> */}
            </div>
        );
    }
}
