import React from 'react';
import { Nav, Nav2 } from '../components/nav'
import Ibar from '../components/inputbar'
import '../style/selfstyling.css';

function Generator() {

    return (
        <div className="mainc">
            <Nav></Nav>
            <Nav2></Nav2>
            <Ibar></Ibar>
        </div>

    );
}

export default Generator;
