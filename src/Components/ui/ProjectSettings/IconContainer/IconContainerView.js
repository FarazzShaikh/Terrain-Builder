import React, { Component } from 'react';
import IconsRowViewController from './IconsRow/IconsRowViewController';

export default class IconContainerView extends Component {
    renderIcons = (iconRows) => {
        return iconRows.map((iconRow, i) => {
            return (
                <IconsRowViewController 
                    key={i}
                    iconRow={iconRow}
                />
            )   
        });
    }

    render() {
        return (
            <div className={'iconContainer-container'}>
                {this.renderIcons(this.props.icons)}
            </div>
        );
    }
}
