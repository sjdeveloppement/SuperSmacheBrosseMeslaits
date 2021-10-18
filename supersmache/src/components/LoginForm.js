import React, { useState } from 'react';

const LoginForm = (props) => {
    const [UserIsGuest, setUserIsGuest] = useState(false);
    const [error, setError] = useState(false);
    const [pseudo, setPseudo]= useState("");
    const [password, setPassword]= useState("");
    const [lastName, setName]= useState("");
    const [firstName, setFirstName]= useState("");
    const [mail, setMail]= useState("");
    
    
    // prevent default + schema validation of input
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(pseudo.length > 100 || password.length > 100 || lastName.length > 100 || firstName.length > 100 || mail.length > 100 ||
             !pseudo.match(/^[A-Za-z0-9_!^?àéèîôûïç\s]{3,100}$/)||
             !password.match(/^[A-Za-z0-9_!^?àéèîôûïç\s]{3,100}$/)||
             !lastName.match(/^[A-Za-z0-9_!^?àéèîôûïç\s]{3,100}$/)||
             !firstName.match(/^[A-Za-z0-9_!^?àéèîôûïç\s]{3,100}$/)||
             !mail.match(/^[a-zA-Z0-9_.+-^?àéèîôûïç\s]+@[a-zA-Z0-9-^?àéèîôûïç\s]+\.[a-zA-Z0-9-.^?àéèîôûïç\s]+$/)){
            setError(true);
        }
        // make a else to go in the account if its a log or create account if its a new user
    }

    return (

        <div className="form">
           {!UserIsGuest && <button onClick={()=> setUserIsGuest(true)} className="formSwitch">Déjà membre?</button>} 
           {UserIsGuest &&<button onClick={()=> setUserIsGuest(false)}className="formSwitch">Nouveau compte?</button>}
            {UserIsGuest ? (
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <label htmlFor="pseudo">Pseudo</label>
                    <br />
                    <input onChange={(e) => setPseudo(e.target.value)} type="text" name="pseudo" id="pseudo" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={pseudo} />
                    <br />
                    <label htmlFor="password">Mot de passe</label>
                    <br />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password"style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={password} />
                    <br />
                    { error && <p style={{color: "red"}}>Input invalides</p> }
                    <br />
                    <button type="submit" className="loginBtn">Se connecter</button>
                </form>) : (
                    
                    <form onSubmit={(e)=>handleSubmit(e)} >
                        <input onChange={(e) => setName(e.target.value)} type="text" name="nom" placeholder="Nom" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={lastName} />
                        <br />
                        <input onChange={(e) => setFirstName(e.target.value)} type="text" name="prénom" placeholder="Prénom" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={firstName} />
                        <br />
                        <input onChange={(e) => setPseudo(e.target.value)} type="text" name="pseudo" placeholder="Pseudo" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={pseudo} />
                        <br />
                        <input onChange={(e) => setMail(e.target.value)} type="email" name="mail" placeholder="Email" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={mail} />
                        <br />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Mot de passe" style={{ border: error ? "1px solid red" : "1px solid #e8bc1e"}} value={password} />
                        <br />
                        { error && <p style={{color: "red"}}>Input invalides</p> }
                        <br />
                        <button type="submit" className="createUser">Créer mon compte</button>

                    </form>
               
            )}
        </div>



    )

};

export default LoginForm;