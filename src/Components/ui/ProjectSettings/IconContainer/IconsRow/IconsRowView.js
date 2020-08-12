import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class IconsRowView extends Component {
    render() {
        return (
            <div className={'iconContainer-icon-container'}>
                {
                    this.props.iconRow.map((icon, j) => {
                        return (
                            <div className={'iconContainer-main-icon'}  key={j}>
                                <div className={'iconContainer-sub'}>
                                    <FontAwesomeIcon
                                        icon={icon.icon}
                                        color={'white'}
                                        className={'iconContainer-icon'}
                                    />
                                    <div className={'iconContainer-icon-label'}>{icon.label}</div>
                                </div>
                                <div className={'iconContainer-icon-value'}>{icon.value}</div>
                            </div>

                        )
                    })
                }
            </div>
        )
    }
}