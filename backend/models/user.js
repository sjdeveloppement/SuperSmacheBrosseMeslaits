const mongoose = require ('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');// package qui valide l'unicité de l'email
const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate:[isEmail],
            lowercase: true,
            minlength: 3,
            maxlength: 100,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            lowercase: true,
            minlength: 6,
            max: 1024,
            trim: true
        },
        firstName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 100,
            trim: true
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png"
        },

        bio: {
            type: String,
            max: 1024,
        },
        clip: {
            type: String
        },
        followers: {
            type: [String]
        },
        following: {
            type : [String]
        },
        likes: {
            type: [String]
        }
    },{
        timestamps: true,
    }
);
//play fonction avant sauvegarde en bdd
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// vérifications password au login et comparaison avec le password crypté// fonctionne quand on enleve le async/await mais renvoi une erreur de promesse, ne renvoie rien en etant async trouvé d'où vient l'erreur
userSchema.statics.login = async function(pseudo, password){
    const user = await this.findOne({ pseudo });
    if(user){
        const auth =  bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect pseudo');
};
// ajout l'argument unique validator qui empeche un utilisateur de s'inscrire plusieur fois avec le même mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);