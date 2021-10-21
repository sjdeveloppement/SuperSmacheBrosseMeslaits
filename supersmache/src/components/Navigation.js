import React, {useContext, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';

const Navigation = () => {
    const [UserIsGuest, setUserIsGuest] = useState(false);
    const uid = useContext(UidContext);
    return (
        <div className="navigation">
            <NavLink exact to="/" activeClassName="nav-active">
                Accueil
            </NavLink>
            {uid ? ( <NavLink exact to="/account" activeClassName="nav-active">
                Mon compte
            </NavLink>) : (<NavLink exact to="/login" activeClassName="nav-active">
                Se connecter
            </NavLink>)}
        </div>
    );
};

export default Navigation;