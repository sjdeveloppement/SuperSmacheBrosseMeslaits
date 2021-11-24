import React from 'react';
import LeftNav from '../LeftNav';
import { useSelector } from "react-redux";
import UploadImg from './UploadImg';
const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer)
    return (
        <div className="profil-container">
            <h3>Modifier mon profil</h3>
            <LeftNav />
            <h4> Profil de {userData.pseudo}</h4>
            <div className="update-container">
                <div className="left-part"><p>left part</p></div>
                <div className="right-part">
                    <h5>Photo de profil</h5>
                    <img src={userData.picture} alt="user-pic"/>
                    UPLOAD PIC
                    <UploadImg />
                </div>
                
            </div>
        </div>
    );
};

export default UpdateProfil;