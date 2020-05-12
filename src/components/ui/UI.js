import React, { Component } from "react";
import styled from 'styled-components';

import { HEADER } from "./objects/Header";
import { FOOTER } from "./objects/Footer";
import { PIEMENU } from "./objects/PieMenu";



export class UI extends Component {

    constructor() {
        super()
        this.state = {
            clicked: ''
        }
    }

    checkClickedItem = (item) => {
        console.log(item)
    }

    render() {
        const Containers = {
            Header: styled.div`
                width: 95vw;

                position: absolute;
                top: 0;
                left: 0;

                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;

                margin-top: 2%;
                margin-left: 2.5vw;
            `,
            Footer: styled.div`
                width: 95vw;

                position: absolute;
                bottom: 0;
                left: 0;

                filter: invert(100%);
                display: flex;
                justify-content: space-between;
                align-items: center;

                margin-bottom: 2%;
                margin-left: 2.5vw;
            `,
           PieMenu: styled.div`
                width: 95vw;

                position: absolute;
                top: 0;
                left: 0;

                display: flex;
                justify-content: space-between;
                align-items: center;

                margin-bottom: 2%;
                margin-left: 2.5vw;

                font-family: 'Open Sans';
            `,
        }

        return (
            <>
                <Containers.Header>
                    <HEADER />
                </Containers.Header>
                <Containers.Footer>
                    <FOOTER />
                </Containers.Footer>
                <Containers.PieMenu>
                    <PIEMENU checkClickedItem={this.checkClickedItem.bind(this)} />
                </Containers.PieMenu>
            </>

        )
    }
}