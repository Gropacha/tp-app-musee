const User = require("../models/user.model");
const { genSalt, hash} = require("bcrypt");
const { maintenant } = require("../utilitaires/formatDate");

/////////////////////////// FIN DES IMPORTS
const createNewUser = async ({body}, res)=>{
    try {const salt = await genSalt(10);
    // créé une clef unique pour le processus de hashache à suivre
    const passwordHashe = await hash(body.password, salt);
    // Hashache du password rentré par l'utilisateur
    const newUser = new User({...body, password:passwordHashe});
    // Un nouvel objet User est créé, le password est écrasé avec la valeur hashée
    await newUser.save();
    // Envoi de nouvel User vers la BDD
    // traiter l'affichage et le front avant l'envoi à la base de donnée
    console.log(maintenant(), `| Nouvel utilisateur créé :`, newUser._doc._id);
    return res.json(newUser._doc._id);
    } catch (err) {
    console.log(maintenant(), `| Erreur création utilisateur`, err);    
    return res.status(404).json({ msg: "Erreur fatale, sortie de route Creer Nouvel User", err:err });    
    }
};

const getUser = async (req, res)=>{
    try {const userRecherche = await User.findById(req.params.id);
    console.log(maintenant(), `| Accès à l'utilisateur : ${req.params.id}`, userRecherche );
    return res.json(userRecherche);
    } catch (err) {
    console.log(maintenant(), `| Erreur get utilisateur : ${req.params.id}`, err); 
    return res.status(404).json({ msg: `Erreur fatale, sortie de route Get User${req.params.id}`, err: err });    
    }
};

const editUser = async (req, res)=>{
    try {const userModifie = await User.findByIdAndUpdate(
        req.params.id, 
        {...req.body},
        {new:true}
        );
    console.log(maintenant(), `| Modification de l'utilisateur : ${req.params.id}`, userModifie );
    return res.json(userModifie);
    } catch (err) {
    console.log(maintenant(), `| Erreur édition utilisateur : ${req.params.id}`, err);     
    return res.status(404).json({ msg: "Erreur fatale, sortie de route Edit User", err: err });
    }
};

const deleteUser = async (req, res)=>{
    // en réalité il faudrait vérifier si l'utilisateur que l'on veut supprimer n'est pas protéger (Admin et/ou Redacteur)
    // il faudrait vérifier qu'il reste toujours au moins un Admin qui gère l'API !!!
    // même si le vrai "webmaster" reste celui ou celle qui possède les logins d'accès à la BDD et à l'herbergement de l'API
    try {const userDeleted = await User.findByIdAndRemove(req.params.id);
    console.log(maintenant(), `| Suppression de l'utilisateur : ${req.params.id}`, userDeleted);
    return res.json(userDeleted);
    } catch (err) {
    console.log(maintenant(), `| Erreur suppression utilisateur : ${req.params.id}`, err); 
    return res.status(404).json({ msg: "Erreur fatale, sortie de route Delete User", err: err });
    }
};

const getAllUser = async (req, res)=>{
    try {const users = await User.find({}).select("-_id email role");
    console.log(maintenant()+" | Liste de tous les utilisateurs :", users);
    return res.json(users);
    } catch (err) {
    console.log(maintenant(), `| Erreur affichage liste de tous les utilisateurs`, err); 
    return res.status(404).json({ msg: "Erreur fatale, sortie de route Get All User", err: err });
    }
};

//////////////////////////////////////////// EXPORT UNIQUE DU CONTROLLER OEUVRE
module.exports = { 
    createNewUser, 
    getUser, 
    editUser, 
    deleteUser, 
    getAllUser
};
////////////////////////////////////////////FIN DU FICHIER