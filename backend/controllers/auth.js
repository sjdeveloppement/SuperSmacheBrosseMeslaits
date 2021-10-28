const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const { signInErrors, signUpErrors } = require('../utils/errors.utils');
const maxAge = 7 * 24 * 60 * 60 * 1000;
const createToken = (id) =>{
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};



module.exports.signUp = async (req, res) =>{
    console.log(req);
    const {pseudo, email, password, firstName, lastName} = req.body
    try{
        const user = await UserModel.create({pseudo, email, password , firstName, lastName});
        res.status(201).json({user: user._id});
    }
    catch(err){
        const errors = signUpErrors;
        res.status(403).send({errors})
    }
};

module.exports.signIn = async (req, res) =>{
    const { pseudo, password } = req.body

    try{
        const user = await UserModel.login(pseudo, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        res.status(200).json({user: user._id})
    }
    catch (err){
        const errors = signInErrors(err);
        res.status(401).json({errors});
    }
}
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1 });
    res.redirect('/');
}