const postModel = require('../models/post.model');
const userModel = require('../models/user');
const ObjectID = require('mongoose').Types.ObjectId;
const { uploadErrors } = require('../utils/errors.utils');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    }).sort({ createdAt: -1 });
}

module.exports.createPost = async (req, res) => {
    // gestion image
    let fileName;
    if (req.file !== null) {
        try {
            if (req.file.detectedMimeType !== "image/jpg" && req.file.detectedMimeType !== "image/png" && req.file.detectedMimeType !== "image/jpeg")
                throw Error("invalid file");
            if (req.file.size > 500000) throw Error("max size");
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(500).json({ errors });
        }
        fileName = req.body.posterId + Date.now() + '.jpg';

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${fileName}`
            )
        );

    }
    //

    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Inconnu : ' + req.params.id);
    const updatedRecord = {
        message: req.body.message
    }
    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("update error: " + err);
        }
    )
};

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Inconnu : ' + req.params.id);

    postModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error : " + err);
        }
    )
};

// likes
module.exports.likePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Inconnu : ' + req.params.id);

    try {
        postModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }
            },
            {
                new: true
            },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Inconnu : ' + req.params.id);

    try {
        postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id }
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }
            },
            {
                new: true
            },
            (err, docs) => {
                if (!err) res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }

};

// comments post

module.exports.commentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Inconnu : ' + req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }
};

// ici j'??num??re le commentaire a modifi?? en recherchant le commentaire equivalent ?? la req.body.comment et je modifie son texte
module.exports.editCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Inconnu : ' + req.params.id);

    try {
        return postModel.findById(
            req.params.id,
            (err, docs) => {
                const theComment = docs.comments.find((comment) =>
                    comment._id.equals(req.body.commentId)
                )
                if (!theComment) return res.status(404).send('Comment not found')
                theComment.text = req.body.text;
                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs);
                    return res.status(500).send(err);
                })
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }
};

//ici on update car on supprime seulement un commentaire du poste donc findandupdate
module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID Inconnu : ' + req.params.id);

    try {
        postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    }
                }
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        return res.status(400).send(err);
    }
};
