const { Router } = require("express");
const { 
    createNewUser, 
    getUser, 
    editUser, 
    deleteUser, 
    getAllUser 
} = require("../controllers/user.controller");
const { isValidUser, id_user, isLogin, isAllowedToEditUser, isAdmin, pageNonTrouvee } = require("../controllers/middlewares");

/////////////////////////// FIN DES IMPORTS
const userRoute = Router();

/////////////////////////// CREATION DE LA ROUTE /user/
userRoute.post("/", isValidUser, createNewUser);                                //  C
userRoute.get("/", isLogin, isAdmin, getAllUser);                               //  R
userRoute.get("/:id", id_user, isLogin, isAllowedToEditUser, getUser);          //  R
userRoute.put("/:id", id_user, isLogin, isAllowedToEditUser, editUser);         //  U
userRoute.delete("/:id", id_user, isLogin, isAllowedToEditUser, deleteUser);    //  D

//////////////////////////////////////////// GESTION DES 404 
userRoute.post("/:params", pageNonTrouvee ); 
userRoute.put("/", pageNonTrouvee );
userRoute.delete("/", pageNonTrouvee );

//////////////////////////////////////////// EXPORT DE LA ROUTE /user/
module.exports = userRoute;
////////////////////////////////////////////FIN DU FICHIER