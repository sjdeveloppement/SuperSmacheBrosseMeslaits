import React, { useContext, useState } from 'react';
import Navigation from "../components/Navigation";
import { UidContext } from '../components/AppContext';

const Account = () => {
    const uid = useContext(UidContext);


    return (
        <div className="account">
            <Navigation />
            <h1>Welcome</h1>
            {uid ? (
            <div className="log-container">
                <h2>Modifier mon profil</h2>
            </div>) : (window.location = '/login')}

        </div>
    );
};

export default Account;