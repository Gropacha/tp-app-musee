const Joi = require("joi");
const { Schema, Types, model } = require("mongoose");

const commentaireSchema = new Schema({
    commentaire : {type:String, required:true},
    auteur : {type:Types.ObjectId, ref:"users", required:true},
    oeuvre : {type:Types.ObjectId, ref:"oeuvres", required:true},
});

const commentaireJoi = Joi.object({
    commentaire : Joi.string().min(5).max(10000).required()
})

let Commentaire = model("commentaires", commentaireSchema);
 Commentaire.isValid = commentaire => commentaireJoi.validate(commentaire);

module.exports = Commentaire;