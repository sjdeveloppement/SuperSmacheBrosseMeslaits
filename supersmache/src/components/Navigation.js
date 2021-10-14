import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            <NavLink exact to="/login" activeClassName="nav-active">
                Se connecter
            </NavLink>
        </div>
    );
};

export default Navigation;