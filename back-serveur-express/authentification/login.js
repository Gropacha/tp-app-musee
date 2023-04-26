const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { Router } = require("express");
const User = require("../models/user.model");
const { itemHashe } = require("../../utilitaires/hashache");
const { maintenant } = require("../../utilitaires/formatDate")


const loginRoute = Router();

loginRoute.post("/", async (req, res)=>{ // vérification de email/password pour la création d'un token de connexion (cela pourrait également passer par une double authentification par l'envoi d'un email de connexion par exemple)
    try {
        const { body } = req;
        const { error } = User.isValid(body, {abortEarly:false});
        if ( error ) return res.status(400).json(error.details);
        const userAlreadyRegistred = await User.findOne({ email : body.email });
        if(!userAlreadyRegistred) return res.status(404).json({msg : "aucun profil trouvé avec ces identifiants"});
        const verif = compareSync(body.password, userAlreadyRegistred.password);
        // il n'est pas possible de faire nous même la comparaison => bcrypt.compare() va s'en occuper
        if (!verif) return res.status(404).json({msg : "aucun profil trouvé avec ces identifiants"});
        const roleHash = itemHashe(userAlreadyRegistred.role);
        const KEY_USER_PUBLIC = {
            _id : userAlreadyRegistred._id,
            role : roleHash
        };
        const token = sign(KEY_USER_PUBLIC, process.env.KEY_JWT_PRIVATE);
        res.json({ msg: "Bienvenu", token : token }); // authentification => qui est l'utilistateur?
                                                    // autorisation associé à l'utilisateur authentifié
                                                    // jsonwebtoken : https://jwt.io
    } catch (ex) {
    return res.status(404).json({ msg: "Erreur fatale, sortie de route Post Login", ex: ex });
    }
});

// traitement de toutes les requêtes possibles envoyées à la "racine du serveur";
// quand les pages de connexion et  d'accueil seront créées 
// => faire des res.redirect("....")

loginRoute.post("/:url", (req, res)=> {
    console.log(maintenant()+" / Page de connexion");
    res.json({msg: "futur écran de connexion"});
} );       

loginRoute.get("/:url?", (req, res)=> {
    console.log(maintenant()+" / Page de connexion");
    res.json({msg: "futur écran de connexion"});
});

loginRoute.put("/:url?", (req, res)=> {
    console.log(maintenant()+" / Page de connexion");
    res.json({msg: "futur écran de connexion"});
});

loginRoute.patch("/:url?", (req, res)=> {
    console.log(maintenant()+" / Page de connexion");
    res.json({msg: "futur écran de connexion"});
});

loginRoute.delete("/:url?", (req, res)=> {
    console.log(maintenant()+" / Page de connexion");
    res.json({msg: "futur écran de connexion"});
});


module.exports = loginRoute;