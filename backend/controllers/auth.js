const UserModel = require('../models/user');



module.exports.signUp = async (req, res) =>{
    console.log(req);
    const {pseudo, email, password, firstName, lastName} = req.body
    try{
        const user = await UserModel.create({pseudo, email, password , firstName, lastName});
        res.status(201).json({user: user._id});
    }
    catch(err){
        res.status(200).send({err})
    }
};