import React, { Component } from "react";
import styled from 'styled-components';

export class HEADER extends Component {
    render() {
        const ImgStyled = styled.img`
             width: 10%;
             cursor: pointer;
        `
        return (
            <>
                <ImgStyled
                    src={process.env.PUBLIC_URL + '/header/logo.svg'}
                    onClick={() => window.location.href = './'}
                />

                <ImgStyled
                    src={process.env.PUBLIC_URL + '/header/threeJSLogo.png'}
                    onClick={() => window.location.href = 'https://threejs.org/'}
                />
            </>

        )
    }
}