import React, { Component } from "react";
import styled from 'styled-components';

export class FOOTER extends Component {

    render() {
        const ImgStyled = styled.img`
            width: 2%;
            cursor: pointer;
            transition: all 200ms ease-out;
            :hover {
                width: 3%;
            }
        `
        return (
            <>
                <ImgStyled
                    src={process.env.PUBLIC_URL + '/footer/github.svg'}
                    onClick={() => window.location.href = 'https://github.com/FarazzShaikh/Terrain-Builder'}
                    title={'View Source'}

                />
                
                <ImgStyled
                    src={process.env.PUBLIC_URL + '/footer/artstation.svg'}
                    onClick={() => window.location.href = 'https://www.artstation.com/farazshaikh'}
                    title={'View My Adventured in 3D'}
                />
            </>

        )
    }
}