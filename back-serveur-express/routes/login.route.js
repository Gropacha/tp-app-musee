const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { Router } = require("express");
const User = require("../models/user.model");
const { itemHashe } = require("../utilitaires/hashache");
const { maintenant } = require("../utilitaires/formatDate");
const { pageNonTrouvee } = require("../controllers/middlewares");

/////////////////////////// FIN DES IMPORTS
const loginRoute = Router();

/////////////////////////// CREATION DE LA ROUTE /login/
loginRoute.post("/", async (req, res)=>{ 
// vérification de email/password pour la création d'un token de connexion 
//(cela pourrait également passer par une double authentification par l'envoi d'un email de connexion par exemple)
    try {
        const { body } = req;
        const { error } = User.isValid(body, {abortEarly:false});
        if ( error ) return res.status(400).json({msg:"Identifiants invalides", err:error.details});
        const userAlreadyRegistred = await User.findOne({ email : body.email });
        if(!userAlreadyRegistred) return res.status(404).json({msg : "Email invalide", err:"Email non enregistrée"});
        const verif = compareSync(body.password, userAlreadyRegistred.password);
        // il n'est pas possible de faire nous même la comparaison => bcrypt.compare() va s'en occuper
        if (!verif) return res.status(404).json({msg : "Mot de passe invalide", err:"Mot de passe invalide"});
        const roleHash = itemHashe(userAlreadyRegistred.role);
        const KEY_USER_PUBLIC = {
            _id : userAlreadyRegistred._id,
            role : roleHash,
        };
        const token = sign(KEY_USER_PUBLIC, process.env.KEY_JWT_PRIVATE);
        // console.log(token);
        console.log(maintenant(), `| Création de token pour l'utilsateur : ${ body.email}`); 
        res.json({ _id:userAlreadyRegistred._id, token:token } ); // authentification => qui est l'utilistateur?                                                 
    }   
    catch (err) {
        console.log(maintenant(), `| Impossible de créer un token, `, err);
        return res.status(404).json({ msg: "Erreur fatale, sortie de route Post Login", err: err });
    }
});
//////////////////////////////////////////// GESTION DES 404
loginRoute.post("/:url", pageNonTrouvee );       
loginRoute.get("/:url?", pageNonTrouvee );
loginRoute.put("/:url?", pageNonTrouvee );
loginRoute.patch("/:url?", pageNonTrouvee );
loginRoute.delete("/:url?", pageNonTrouvee );

//////////////////////////////////////////// EXPORT DE LA ROUTE /login/
module.exports = loginRoute;
////////////////////////////////////////////FIN DU FICHIER