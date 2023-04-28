const Oeuvre = require("../models/oeuvre.model");
const { maintenant } = require("../utilitaires/formatDate")

/////////////////////////// FIN DES IMPORTS
const createNewOeuvre = async ({body}, res)=>{
   try { const dt_creation = new Date();
   const newOeuvre = new Oeuvre({...body, dt_creation});
   await newOeuvre.save();
   console.log(maintenant(),"| Création d'une nouvelle oeuvre : ", body.nom);
   return res.json( newOeuvre );
   } catch (err) {
   console.error(maintenant(), "| Erreur Création de l'oeuvre : ", body.nom, err);
   return res.status(404).json({ msg: "Erreur fatale, sortie de route Création Nouvelle Oeuvre", err:err });
   }
};

const getOeuvre = async (req, res)=>{
   try {const oeuvreById = await Oeuvre.findById(req.params.id);
   console.log(maintenant(), "| Get de l'oeuvre n° ", req.params.id);
   return res.json( oeuvreById );
   } catch (err) {
   console.error(maintenant(), "| Erreur Get de l'oeuvre n° ", req.params.id, err);
   return res.status(404).json({ msg: "Erreur fatale, sortie de route Get Oeuvre", err:err });
   }
};

const editOeuvre = async (req, res)=>{
   try {const now = new Date();
   const oeuvreModifiee = await Oeuvre.findByIdAndUpdate(
      req.params.id, 
      { ...req.body, dt_modification:now}, 
      {new: true}
   );
   console.log(maintenant(), "| Modification de l'oeuvre n° ", req.params.id);
   return res.json( oeuvreModifiee );
   } catch (err) {
   console.error(maintenant(), "| Erreur Modification de l'oeuvre n° ", req.params.id, err);
   return res.status(404).json({ msg: "Erreur fatale, sortie de route Edit Oeuvre", err:err }); 
   }
};

const deleteOeuvre = async (req, res)=>{
   try {const oeuvreByIdToDelete = await Oeuvre.findByIdAndRemove(req.params.id);
   console.log(maintenant(), "| Delete de l'oeuvre n° ", req.params.id);
   return res.json( oeuvreByIdToDelete );
   } catch (err) {
   console.error(maintenant(), "| Erreur Delete de l'oeuvre n° ", req.params.id, err);
   return res.status(404).json({ msg: "Erreur fatale, sortie de route Delete Oeuvre", err:err });
   }
};

const getAllOeuvre = async (req, res)=>{
   try {const allOeuvre = await Oeuvre.find({}).select("-_id nom description").populate("auteur", "email -_id");
   console.log(maintenant(), "| Get all oeuvres");
   return res.json( allOeuvre );
   } catch (err) {
   console.error(maintenant(),"| Erreur Get all oeuvres", err);
   return res.status(404).json({ msg: "Erreur fatale, sortie de route Get All Oeuvre", err:err });
   }
};

//////////////////////////////////////////// EXPORT UNIQUE DU CONTROLLER OEUVRE
module.exports = { 
   createNewOeuvre, 
   getOeuvre, 
   editOeuvre, 
   deleteOeuvre, 
   getAllOeuvre
};
////////////////////////////////////////////FIN DU FICHIER