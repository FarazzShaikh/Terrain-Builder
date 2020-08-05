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
import {
    Tooltip, 
    Zoom, 
    withStyles
} from '@material-ui/core';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

export default class SocialsRootView extends Component {
    render() {
        return (
            <div className={'socials-main'}>
                <div className={'socials-container'}>
                    <LightTooltip
                        title="View Source."
                        placement="top"
                        TransitionComponent={Zoom}
                    >
                        <div>
                            <FontAwesomeIcon icon={Icon_github} color={'white'} className={'ui-icon'} onMouseDown={() => this.props.onMouseDown('git')} />
                        </div>

                    </LightTooltip>
                    <LightTooltip
                        title="Report a Bug."
                        placement="top"
                        TransitionComponent={Zoom}
                    >
                        <div>
                            <FontAwesomeIcon icon={Icon_bug} color={'white'} className={'ui-icon'} onMouseDown={() => this.props.onMouseDown('bug')} />
                        </div>

                    </LightTooltip>
                    <LightTooltip
                        title="Check out my 3D Artwork."
                        placement="top"
                        TransitionComponent={Zoom}
                    >
                        <div>
                            <FontAwesomeIcon icon={Icon_artstation} color={'white'} className={'ui-icon'} onMouseDown={() => this.props.onMouseDown('art')} />
                        </div>

                    </LightTooltip>
                    <LightTooltip
                        title="Follow me on Instagram!"
                        placement="top"
                        TransitionComponent={Zoom}
                    >
                        <div>
                            <FontAwesomeIcon icon={Icon_instagram} color={'white'} className={'ui-icon'} onMouseDown={() => this.props.onMouseDown('insta')} />
                        </div>

                    </LightTooltip>
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
