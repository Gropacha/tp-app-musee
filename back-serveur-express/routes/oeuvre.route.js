const { Router } = require("express");
const { 
    createNewOeuvre, 
    getOeuvre, 
    editOeuvre, 
    deleteOeuvre, 
    getAllOeuvre 
} = require("../controllers/oeuvre.controller");
const { isLogin, isValidOeuvre, isAllowedToEditOeuvre, id_oeuvre, pageNonTrouvee } = require("../controllers/middlewares");

/////////////////////////// FIN DES IMPORTS
const oeuvreRoute = Router();

/////////////////////////// CREATION DE LA ROUTE /oeuvre/
oeuvreRoute.post("/", isLogin, isAllowedToEditOeuvre, isValidOeuvre, createNewOeuvre);           //  C
oeuvreRoute.get("/", getAllOeuvre);                                                              //  R
oeuvreRoute.get("/:id", id_oeuvre, getOeuvre);                                                   //  R
oeuvreRoute.put("/:id", id_oeuvre, isLogin, isAllowedToEditOeuvre, isValidOeuvre, editOeuvre);   //  U
oeuvreRoute.delete("/:id", id_oeuvre, isLogin, isAllowedToEditOeuvre, deleteOeuvre);             //  D

//////////////////////////////////////////// GESTION DES 404 
oeuvreRoute.post("/:params", pageNonTrouvee ); 
oeuvreRoute.put("/", pageNonTrouvee );
oeuvreRoute.delete("/", pageNonTrouvee );

//////////////////////////////////////////// EXPORT DE LA ROUTE /oeuvre/
module.exports = oeuvreRoute;
////////////////////////////////////////////FIN DU FICHIER