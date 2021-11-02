const userModel = require('../models/user');
const fs = require('fs');
const { promisify } = require('util');
const ObjectID = require('mongoose').Types.ObjectId;
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require('../utils/errors.utils');
module.exports.uploadProfil =  (req, res) => {
    try {
        if(req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/png" && req.file.detectedMimeType !== "image/jpeg")
            throw Error("invalid file");
        if(req.file.size > 500000) throw Error("max size");
    }catch(err){
        const errors = uploadErrors(err);
        return res.status(500).json({ errors }); 
    }

    const fileName = req.body.pseudo + ".jpg";
    console.log(fileName);
     pipeline(
        req.file.stream,
        fs.createWriteStream(
            
            `../supersmache/public/assets/profil/${fileName}` //${__dirname}
        )
    );

    try{
         userModel.findByIdAndUpdate(
            req.body.userId,
            {$set: {picture:"./assets/profil/"+ fileName}},
            {new: true, upsert: true, setDefaultsOnInsert: true},
            (err, docs)=>{
                if(!err) return res.send(docs);
                else return res.status(500).send({ message: err });
            }
        );
    }catch(err){
        return res.status(500).send({ message: err });
    }
};

// upload smash clip 10mo maxsize
module.exports.uploadClip =  (req, res) =>{
    
    if (!ObjectID.isValid(req.body.userId))
        return res.status(400).send('ID Inconnu : ' + req.body.userId);// si l'userId n'est pas dans la requete on renvoi l'erreur pour ne pas upload un clip a un user inexistant
    
    try {
        if(req.file.detectedMimeType !== "video/mp4" && req.file.detectedMimeType !== "video/ogg" && req.file.detectedMimeType !== "video/gif")
            throw Error("invalid file");
        if(req.file.size > 10000000) throw Error("max size");
    }catch(err){
        const errors = uploadErrors(err);
        return res.status(500).json({ errors }); 
    }

    const fileName = req.body.pseudo + ".mp4";
    console.log(fileName);
     pipeline(
        req.file.stream,
        fs.createWriteStream(
            
            `../supersmache/public/assets/clip/${fileName}` //${__dirname}
        )
    );

    try{
        userModel.findByIdAndUpdate(
           req.body.userId,
           {$set: {clip:"./assets/clip/"+ fileName}},
           {new: true, upsert: true, setDefaultsOnInsert: true},
           (err, docs)=>{
               if(!err) return res.send(docs);
               else return res.status(500).send({ message: err });
           }
       );
   }catch(err){
       return res.status(500).send({ message: err });
   }
}