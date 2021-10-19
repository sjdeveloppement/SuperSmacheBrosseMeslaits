import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

const UserIsGuest = false;
const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            <NavLink exact to="/login" activeClassName="nav-active">
                Se connecter
            </NavLink>
            {UserIsGuest && <NavLink exact to="/account" activeClassName="nav-active">
                Mon compte
            </NavLink>}
        </div>
    );
};

export default Navigation;