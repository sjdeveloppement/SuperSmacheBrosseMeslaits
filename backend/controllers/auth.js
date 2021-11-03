const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const { signInErrors, signUpErrors } = require('../utils/errors.utils');
const maxAge = 7 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

// Création d'un schema de validation du mot de passe afin de sécuriser les comptes avec un mdp fort
const passwordValidator = require('password-validator');

const schema = new passwordValidator();
schema
    .is().min(6) // min 6 caractères
    .has().digits(1) // min 1 chiffre
    .has().uppercase(1) // min 1 caractère majuscule
    .has().lowercase(1) // min 1 caractère minuscule
    .has().symbols(1) // min 1 symbole
    .has().not().spaces(); // ne doit pas contenir d'espace


module.exports.signUp = async (req, res) => {
    console.log(req);
    if (schema.validate(req.body.password)) {


        const { pseudo, email, password, firstName, lastName } = req.body
        try {
            const user = await UserModel.create({ pseudo, email, password, firstName, lastName });
            res.status(201).json({ user: user._id });
        }
        catch (err) {
            const errors = signUpErrors;
            res.status(403).send({ errors })
        }
    } else {
        res.status(401).json({ message: "Mot de passe incomplet, il doit contenir au moins 8 caractères, un chiffre, une majuscule, une minuscule, un symbole et pas d'espace !" });
        return false;
    }
};

module.exports.signIn = async (req, res) => {
    const { pseudo, password } = req.body

    try {
        const user = await UserModel.login(pseudo, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        res.status(200).json({ user: user._id })
    }
    catch (err) {
        const errors = signInErrors(err);
        res.status(401).json({ errors });
    }
}
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}