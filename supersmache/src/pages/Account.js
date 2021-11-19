import React, { useContext } from 'react';
import Navigation from "../components/Navigation";
import { UidContext } from '../components/AppContext';
import Logout from '../components/Logout';
import { useSelector } from 'react-redux';

const Account = () => {
    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className="account">
            <nav>
                <Navigation />
                <h1>Welcome</h1>
                
                {uid ? (
                <div className="log-container">
                    <h2>Bienvenue {userData.pseudo}</h2>
                    <Logout />
                    <h3>Modifier mon profil</h3>
                </div>) : (window.location = '/login')}
            </nav>
        </div>
    );
};

export default Account;