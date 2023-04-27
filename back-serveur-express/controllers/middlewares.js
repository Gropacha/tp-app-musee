const { verify } = require("jsonwebtoken");
const Oeuvre = require("../models/oeuvre.model");
const User = require("../models/user.model");
const { maintenant } = require("../utilitaires/formatDate");


const isValidOeuvre = (req, res, next)=> {
  try {
      const { body } = req;
      const { error } = Oeuvre.isValid(body);
      if (error) return res.status(400).json({msg: error.details});
      next();
  } catch (ex) {
  return res.status(404).json({ msg: "Erreur fatale, sortie de route middleware / isValidOeuvre", ex: ex });
  }
};

const isValidUser = async (req, res, next) => {
  try {
      const { body } = req;
      const { error } = User.isValid(body, {abortEarly : false});
      if (error) return res.status(400).json({isValidUser:"identifiant non valide !", err:error.details});
      const isUserAlreadyRegistred = await User.findOne({email:body.email});
      if (isUserAlreadyRegistred) return res.status(400).json({msg : "email déjà utilisé"});
      next();
  } catch (ex) {
  return res.status(404).json({ msg: "Erreur fatale, sortie de route middleware / isValidUser", ex: ex });
  }
}

const id_user = async (req, res, next) => {
  try {
      const id_params = req.params.id;
      const id_registred = await User.findById(id_params);
      if(id_registred) {
        next();
      } else {
        res.status(404).json({msg: "l'utilisateur demandé n'existe pas !!!"});
      }
  } catch (ex) {
  res.status(404).json({msg: "l'utilisateur demandé n'existe pas !!!", ex: ex});
  }
}

const isLogin =  (req, res, next) => { // vérification du token d'authentification
  try {
      const tokenUser = req.header("user-token");
      if (!tokenUser) {
          console.log(maintenant()+" / Erreur Vous n'êtes pas connecté !");
          return res.status(400).json({msg : "token manquant"});
      } else {
          try {
              const load = verify(tokenUser, process.env.KEY_JWT_PRIVATE);
              req.payload = load;
              req.body.auteur = load._id;
              return next();
          } catch (ex) {
          console.log(maintenant()+" / Erreur Votre token de connexion n'est pas valide !");
          return res.status(400).json({msg : "JWT invalid"});
          }
      }
  } catch (ex) {
  return res.status(404).json({ msg: "Erreur fatale, sortie de route middleware / isLogin", ex: ex });
  }
}

const isAdmin = (req, res, next) => { // soit interroger le payload (le cas ici) / soit faire une demande async/await à la base de donnée si on ne veut pas que les identifiants(même hashés) soit contenus dans le payload
  try {
      const roleHashUser = req.payload.role;
      if (User.isAdmin(roleHashUser)) {
          next();
      } else {
          res.status(403).json({msg: "Vous n'avez pas les droits nécessaires"});
      }
  } catch (ex) {
  return res.status(404).json({ msg: "Erreur fatale, sortie de route middleware / isAdmin", ex: ex });
  }
}

const testRole = ({payload}, res, next) => {
  const roleHashUser = payload.role;
  console.log(roleHashUser);
  console.log(User.isAdmin(roleHashUser)?"Admin":"non Admin");
  console.log(User.isRedacteur(roleHashUser)?"Redacteur":"non Redacteur");
  next();
}

const isAllowedToEditOeuvre =  ({payload}, res, next) => { // seul un Admin ou un Redacteur peut modifier une oeuvre
  try {
      const roleHashUser = payload.role;
      if (User.isAdmin(roleHashUser) || User.isRedacteur(roleHashUser)) {
          next();
      } else {
          res.status(403).json({msg: "Vous n'avez pas les droits nécessaires pour modifier un article"});
      }
  } catch (ex) {
  return res.status(404).json({ msg: "Erreur fatale, sortie de route middleware / isAllowedToEditOeuvre", ex: ex });
  }
}

const isAllowedToEditUser =  ({payload}, res, next) => { // seul un Admin ou l'utilisateur lui même peut modifier un profil utilisateur
  try {
      const roleHashUser = payload.role;
      const id_user = payload._id;
      if (User.isAdmin(roleHashUser) || id_user===req.params.id) {
        next();
      } else {
        res.status(403).json({msg: "Vous n'avez pas les droits nécessaires pour modifier un utilisateur"});
      }
  } catch (ex) {
  return res.status(404).json({ msg: "Erreur fatale, sortie de route middleware / isAllowedToEditUser", ex: ex });
  }
}

const id_oeuvre = async (req, res, next) => {
  try {
      const id_params = req.params.id;
      const id_registred = await Oeuvre.findById(id_params);
      if(id_registred) {
        next();
      } else {
        res.status(404).json({msg: "la page demandée n'existe pas !!!"});
      }
  } catch (err) {
  res.status(404).json({msg: "la page demandée n'existe pas !!!", err:err});
  }
}

module.exports.isValidUser = isValidUser;
module.exports.isValidOeuvre = isValidOeuvre;
module.exports.id_user = id_user;
module.exports.id_oeuvre = id_oeuvre;
module.exports.isLogin = isLogin;
module.exports.isAdmin = isAdmin;
module.exports.isAllowedToEditOeuvre = isAllowedToEditOeuvre;
module.exports.isAllowedToEditUser = isAllowedToEditUser;

module.exports.testRole = testRole;