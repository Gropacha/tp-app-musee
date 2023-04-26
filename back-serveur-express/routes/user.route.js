const { Router } = require("express");
const { 
    createNewUser, 
    getUser, 
    editUser, 
    deleteUser, 
    getAllUser 
} = require("../controllers/user.controller");
const { isValidUser, id_user, isLogin, isAllowedToEditUser, isAdmin } = require("../controllers/middlewares");


const userRoute = Router();

userRoute.post("/", isValidUser, createNewUser);       //  C

userRoute.get("/:id", id_user, isLogin, isAllowedToEditUser, getUser);           //  R

userRoute.put("/:id", id_user, isLogin, isAllowedToEditUser, editUser);        //  U

userRoute.delete("/:id", id_user, isLogin, isAllowedToEditUser, deleteUser);     //  D

userRoute.get("/", isLogin, isAdmin, getAllUser);

module.exports = userRoute;