import React from 'react';
import LeftNav from '../LeftNav';
import { useSelector } from "react-redux";
const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer)
    return (
        <div className="profil-container">
            <h3>Modifier mon profil</h3>
            <LeftNav />
            <h4> Profil de {userData.pseudo}</h4>
        </div>
    );
};

export default UpdateProfil;