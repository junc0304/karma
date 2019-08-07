import React from 'react';

import './App.scss';
import Header from './Header';
import Footer from './Footer';

export default (props) => {
    return (
            <div className="bg" >
                <Header/>
                <div className="container" >
                    { props.children }
                </div>
                <Footer/>
            </div>
    );
}