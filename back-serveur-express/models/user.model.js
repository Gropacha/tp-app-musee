const { compareSync } = require("bcrypt");
const Joi = require("joi");
const { Schema, Types, model } = require("mongoose");


const USER = "USER" ;
const REDACTEUR = "REDACTEUR" ;
const ADMIN = "ADMIN";
const roles= [USER, REDACTEUR, ADMIN ];

const userSchema = new Schema({
    
    email : {type:String, required:true},
    password : {type:String, required:true},
    pseudo : String,
    role : {type:String, enum: roles, default:USER},
    likes : {type:[{type:Types.ObjectId, ref:"oeuvres"}], default:[]},
    commentaires: {type:[{type:Types.ObjectId, ref:"commentaires"}], default:[]}
});

const userJoi = Joi.object({
    email : Joi.string().email({ tlds: { allow: false } }).required(),
    password : Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).required()
});

const pseudoJoi = Joi.object ({
    pseudo : Joi.string().min(5).max(25).required()
})

// à rajouter, vérification joi pour les commentaires (limite de texte et de caractères autorisés)

let User =  model("users", userSchema);
User.isValid = (user) => userJoi.validate(user);
User.pseudoIsValid = (pseudo) => pseudoJoi.validate(pseudo);
User.isAdmin = (roleHashUser) => compareSync(ADMIN, roleHashUser );
User.isRedacteur = (roleHashUser) => compareSync( REDACTEUR, roleHashUser  );



module.exports = User;