import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink to='/'  activeClassName="active-left-nav">
                        <img src="./img/icons/home.svg" alt="home"/>
                    </NavLink>
                    <br />
                    <NavLink to='/trending'  activeClassName="active-left-nav">
                        <img src="./icons/rocket.svg" alt="trending"/>
                    </NavLink>
                    <br />
                    <NavLink to='/profil'  activeClassName="active-left-nav">
                        <img src="./icons/user.svg" alt="profil"/>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;