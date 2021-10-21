import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = (props) => {
    const [UserIsGuest, setUserIsGuest] = useState(false);
    const [error, setError] = useState(false);
    const [pseudo, setPseudo]= useState("");
    const [password, setPassword]= useState("");
    const [lastName, setName]= useState("");
    const [firstName, setFirstName]= useState("");
    const [mail, setMail]= useState("");
    
    
    
    // prevent default + schema validation of input
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const terms = document.getElementById('terms');
        const termsError = document.querySelector('.terms.error');
        if(!terms.checked ){
            setError(true);
        }
        if(  pseudo.length > 100 || password.length > 100 || lastName.length > 100 || firstName.length > 100 || mail.length > 100 ||
             !pseudo.match(/^[A-Za-z0-9_!^?àéâèîôêûïç\s]{3,100}$/)||
             !password.match(/^[A-Za-z0-9_!^?àâéèêîôûïç\s]{3,100}$/)||
             !lastName.match(/^[A-Za-z0-9_!^?àéâèêîôûïç\s]{3,100}$/)||
             !firstName.match(/^[A-Za-z0-9_!^?àéâêèîôûïç\s]{3,100}$/)||
             !mail.match(/^[a-zA-Z0-9_.+-^?àéèêâîôûïç\s]+@[a-zA-Z0-9-^?àéèêâîôûïç\s]+\.[a-zA-Z0-9-.^?àéèâêîôûïç\s]+$/)){
            setError(true);
        }
       
        // make a else to go in the account if its a log or create account if its a new user
        else{
           await axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/register`,
                withCredentials: true,
                data: {
                    pseudo,
                    password,
                    lastName,
                    firstName,
                    mail,
                }
            }).then((res)=>{
                window.location= '/login';
                setError(false);
                setPseudo("");
                setPassword("");
                setName("");
                setFirstName("");
                setMail("");
            }).catch((err)=>{
                console.log(err);
            });
            
        }
    }
    const handleSubmitLogin = (e) =>{
        e.preventDefault();
        if( pseudo.length > 100 || password.length > 100 ||
             !pseudo.match(/^[A-Za-z0-9_!^?àéâèîôêûïç\s]{3,100}$/)||
             !password.match(/^[A-Za-z0-9_!^?àâéèêîôûïç\s]{3,100}$/)
             ){
            setError(true);
        }
       
        // make a else to go in the account if its a log or create account if its a new user
        else{
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/user/login`,
                withCredentials: true,
                data: {
                    pseudo,
                    password,
                }
            }).then((res)=>{
                console.log(res);
                window.location ='/account';
                setError(false);
                setPseudo("");
                setPassword("");
            }).catch((err)=>{
                console.log(err);
            })
            
        }
    }

    return (

        <div className="form" >
           {!UserIsGuest && <button onClick={()=> setUserIsGuest(true)} className="formSwitch">Déjà membre?</button>} 
           {UserIsGuest &&<button onClick={()=> setUserIsGuest(false)}className="formSwitch">Nouveau compte?</button>}
            {UserIsGuest ? (
                <form onSubmit={(e)=>handleSubmitLogin(e)}>
                    <label htmlFor="pseudo">Pseudo</label>
                    <br />
                    <input onClick={()=>setError(false)} onChange={(e) => setPseudo(e.target.value)} type="text" name="pseudo" id="pseudo" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={pseudo} />
                    <br />
                    <label htmlFor="password">Mot de passe</label>
                    <br />
                    <input onClick={()=>setError(false)} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password"style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={password} />
                    <br />
                    { error && <p style={{color: "red"}}>Input invalides</p> }
                    <br />
                    <button type="submit" className="loginBtn">Se connecter</button>
                </form>) : (
                    
                    <form onSubmit={(e)=>handleSubmit(e)} >
                        <input onChange={(e) => setName(e.target.value)} onClick={()=>setError(false)} type="text" name="nom" placeholder="Nom" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={lastName} />
                        <br />
                        <input onChange={(e) => setFirstName(e.target.value)} onClick={()=>setError(false)} type="text" name="prénom" placeholder="Prénom" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={firstName} />
                        <br />
                        <input onChange={(e) => setPseudo(e.target.value)} onClick={()=>setError(false)} type="text" name="pseudo" placeholder="Pseudo" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={pseudo} />
                        <br />
                        <input onChange={(e) => setMail(e.target.value)} onClick={()=>setError(false)} type="email" name="mail" placeholder="Email" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={mail} />
                        <br />
                        <input onChange={(e) => setPassword(e.target.value)} onClick={()=>setError(false)} type="password" name="password" placeholder="Mot de passe" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={password} />
                        <br />
                        
                        { error && <p style={{color: "red"}}>Input invalides</p> }
                        <div className="form-group">
                        <input type="checkbox" id="terms" onClick={()=>setError(false)} />
                        <label htmlFor="terms">J'accepte les <a id="cgu" href="/" target="_blank" rel="noopener noreferrer">
                           Condition générales</a>
                        </label>
                        </div>
                        
                        <br />
                       
                        <br />
                        <button type="submit" className="createUser">Créer mon compte</button>

                    </form>
               
            )}
        </div>



    )

};

export default LoginForm;