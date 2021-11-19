import React, { useContext } from 'react';
import Navigation from "../components/Navigation";
import { UidContext } from '../components/AppContext';

const Account = () => {
    const uid = useContext(UidContext);


    return (
        <div className="account">
            <nav>
                <Navigation />
                <h1>Welcome</h1>
                {uid ? (
                <div className="log-container">
                    <h2>Bienvenue machin</h2>
                    <h3>Modifier mon profil</h3>
                </div>) : (window.location = '/login')}
            </nav>
        </div>
    );
};

export default Account;