import React from 'react';
import Navigation from "../components/Navigation";
import LoginForm from '../components/LoginForm';

const Login = () => {
    
    return (
        <div className="Login">
            <Navigation />
            <video autoPlay={true} muted={true} loop className="video" id="video" width="100%">
                <source src='/assets/final.mp4' type="video/mp4"/>
            </video>
            
            <div className="log">
                <LoginForm />
            </div>
            
            
        </div>
    );
};

export default Login;