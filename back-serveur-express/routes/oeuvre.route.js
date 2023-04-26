const { Router } = require("express");
const { 
    createNewOeuvre, 
    getOeuvre, 
    editOeuvre, 
    deleteOeuvre, 
    getAllOeuvre 
} = require("../controllers/oeuvre.controller");
const { isLogin, isValidOeuvre, isAllowedToEditOeuvre, id_oeuvre } = require("../controllers/middlewares");


const oeuvreRoute = Router();

oeuvreRoute.post("/", isLogin, isAllowedToEditOeuvre, isValidOeuvre, createNewOeuvre);       //  C

oeuvreRoute.get("/:id", id_oeuvre, getOeuvre);           //  R

oeuvreRoute.put("/:id", id_oeuvre, isLogin, isAllowedToEditOeuvre, isValidOeuvre, editOeuvre);        //  U

oeuvreRoute.delete("/:id", id_oeuvre, isLogin, isAllowedToEditOeuvre, deleteOeuvre);     //  D

oeuvreRoute.get("/", getAllOeuvre);

module.exports = oeuvreRoute;

