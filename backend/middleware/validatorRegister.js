const validatorRegister = require('validator');
module.exports = (req, res, next) => {
    if(!validatorRegister.isEmail(req.body.email)){
        return res.status(400).json({
            error: "Email invalide, veuillez rentrer un email valide"
        })
    }
    // check si le pseudo est vide
    if (validatorRegister.isEmpty(req.body.pseudo)){
        return res.status(400).json({
            error: "Le champs du pseudo est vide"
        })
    }
    //check si il y a des caractère spéciaux dans l'email
    if(validatorRegister.matches(req.body.email, /^[/$<>*/|\s]+$/i)){
        
        return res.status(400).json({
            error: "L'email ne doit pas contenir des caractères spéciaux de ce type < / > * $ |"
        })
    }
    // check si le pseudo n'a pas de caractères non autorisés
    if(!validatorRegister.matches(req.body.pseudo,  /^[a-zéèùâûêîôàùï'\d\-_\s]+$/i)){
        
        return res.status(400).json({
            error: "Le pseudo ne doit pas contenir des caractères spéciaux"
        })
    }
    // check si le pseudo n'a pas moins de 2 caractères
    if(!validatorRegister.isLength(req.body.pseudo,  {min:6, max: 255})){
        
        return res.status(400).json({
            error: "Minimum 6 caractères pour le pseudo"
        })
    }
    else{
        next();
    }
};
