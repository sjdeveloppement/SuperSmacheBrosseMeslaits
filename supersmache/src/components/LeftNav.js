import React from 'react';
import { NavLink } from 'react-router-dom';
import home from '../img/home.svg';
import rocket from '../img/rocket.svg';
import user from '../img/user.svg';
const LeftNav = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/'  activeClassName="active-left-nav">
                       <img  src={home}   alt="home"/>
                    </NavLink>
                    <br />
                    <NavLink to='/trending'  activeClassName="active-left-nav">
                        <img src={rocket}   alt="trending"/>
                    </NavLink>
                    <br />
                    <NavLink to='/account'  activeClassName="active-left-nav">
                        <img src={user}   alt="profil"/>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;