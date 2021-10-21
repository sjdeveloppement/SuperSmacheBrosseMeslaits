const UserModel = require('../models/user');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res)=>{
    const users = await UserModel.find().select('-password'); // -password permet de ne pas renvoyer le mdp en front même crypté
    res.status(200).json(users);
}

module.exports.userInfo = (req, res)=>{
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Inconnu : '+ req.params.id)

    UserModel.findById(req.params.id, (err, docs) =>{
        if(!err) res.send(docs);
        else console.log('ID Inconnu '+ err);
    }).select('-password');
};