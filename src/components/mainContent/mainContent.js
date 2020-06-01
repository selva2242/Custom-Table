import React from 'react';
import './mainContent.css';
import axios from 'axios';
import LeftNav from '../leftNav/leftNav';
import ViewPort from '../viewPort/viewPort';

const MainContent = () => {
    return(
        <div className="mainContent">
            <LeftNav />
            <ViewPort />
        </div>
    )
}

export default MainContent;