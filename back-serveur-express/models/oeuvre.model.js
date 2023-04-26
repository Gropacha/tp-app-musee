const Joi = require("joi");
const { Schema, Types, model } = require("mongoose");

const oeuvreSchema = new Schema({
    nom : {type:String, required:true},
    description : {type:String, required:true},
    image: {type:String, default:"https://source.unsplash.com/random/400x200"},
    dt_creation: {type:Date, required:true},
    dt_modification: {type:Date, required:false},
    auteur : {type:Types.ObjectId, ref:"users", required:true},
    commentaires : {type:[{type:Types.ObjectId, ref:"commentaires"}], default:[]},
    likes : {type:[{type:Types.ObjectId, ref:"users"}], default:[]}
});

const oeuvreJoi = Joi.object({
    nom : Joi.string().min(5).max(255),
    description : Joi.string().min(1).max(10000),
    image: Joi.string().uri(),
    auteur: Joi.string()
})

let Oeuvre = model("oeuvres", oeuvreSchema);
 Oeuvre.isValid = (oeuvre) => oeuvreJoi.validate(oeuvre);

module.exports = Oeuvre;