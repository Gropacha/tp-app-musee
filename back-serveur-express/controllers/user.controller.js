const User = require("../models/user.model");
const { genSalt, hash} = require("bcrypt");
const { maintenant } = require("../../utilitaires/formatDate");

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
    console.log(maintenant()+" / Nouvel utilisateur créé");
    return res.json({newUser});
    } catch (ex) {
    return res.status(404).json({ msg: "Erreur fatale, sortie de route Creer Nouvel User", ex: ex });    
    }
};

const getUser = async (req, res)=>{
    try {const userRecherche = await User.findById(req.params.id);
    return res.json({msg : `vous affichez l'utilisateur id=${req.params.id}`, userRecherche:userRecherche});
    } catch (ex) {
    return res.status(404).json({ msg: "Erreur fatale, sortie de route Get User", ex: ex });    
    }
};

const editUser = async (req, res)=>{
    try {const userModifie = await User.findByIdAndUpdate(
        req.params.id, 
        {...req.body},
        {new:true}
        );
    return res.json({msg : `vous venez de modifier l'utiliateur id=${req.params.id}`, userModifie:userModifie});
    } catch (ex) {
    return res.status(404).json({ msg: "Erreur fatale, sortie de route Edit User", ex: ex });
    }
};

const deleteUser = async (req, res)=>{
    // en réalité il faudrait vérifier si l'utilisateur que l'on veut supprimer n'est pas protéger (Admin et/ou Redacteur)
    // il faudrait vérifier qu'il reste toujours au moins un Admin qui gère l'API !!!
    // même si le vrai "webmaster" reste celui ou celle qui possède les logins d'accès à la BDD et à l'herbergement de l'API
    try {const userDeleted = await User.findByIdAndRemove(req.params.id);
    return res.json({msg : `vous venez d'effacer l'utilisateur id=${req.params.id}`, userDeleted:userDeleted});
    } catch (ex) {
    return res.status(404).json({ msg: "Erreur fatale, sortie de route Delete User", ex: ex });
    }
};

const getAllUser = async (req, res)=>{
    try {const users = await User.find({}).select("-_id email role");
    console.log(maintenant()+" / Liste de tous les utilisateurs");
    return res.json(users);
    } catch (ex) {
    return res.status(404).json({ msg: "Erreur fatale, sortie de route Get All User", ex: ex });
    }
};

module.exports = { 
    createNewUser, 
    getUser, 
    editUser, 
    deleteUser, 
    getAllUser
};