module.exports.signUpErrors = (err)=>{
    let errors = { pseudo: '', email:'', password:'', lastName:'', firstName:'' }

    if(err.message.includes('pseudo'))
        errors.pseudo="Pseudo incorrect ou déjà pris";


    if(err.message.includes('email'))
        errors.email = "Email incorrect";

    if(err.message.includes('password'))
        errors.password = "Le mot de passe doit faire 6 caractères min ";

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = "Ce pseudo existe déjà";

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "Cet email existe déjà";
    return errors
};

module.exports.signInErrors = (err) =>{
    let errors = {pseudo:'', password:''}
    if(err.message.includes("pseudo")) 
        errors.pseudo= "Pseudo inconnu";
    if(err.message.includes('password'))
        errors.password = "Mot de passe ne correspond pas";
    
    return errors;
};