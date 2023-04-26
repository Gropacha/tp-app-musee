require("dotenv").config(); // permet d'accèder au variable d'environnement du projet (URI de mongoDB, mot de passe Admin du futur forum...)
const express = require("express"); // permet de créer facilement un serveur
const { connect } = require("mongoose"); // permet de se connecter à une base de donnée MongoDB
const cors = require("cors");

const connexionMongoDB = async ()=>{ // version await/async de la connexion à la base de donnée    
    // astuce: par défaut la variable d'environnement NODE_ENV n'existe pas => URI redirige vers l'URI de développement
    // lors du passe en production : set NODE_ENV=production (créer et/ou met à jour la variable MODE_ENV)
    const URI = process.env.NODE_ENV==="production"? process.env.URI_PROD : process.env.URI_DEV;
    try {
        await connect(URI);
        const app=express();
        app.use(express.json());
        app.use(express.urlencoded({extended :false}));        
        app.use(cors());
        return app;
    } catch(err){
        throw new Error("Erreur de connexion à la base de donnée " + err);
    }
    // connect(URI) // connexion à la base de donnée du projet / version .then .catch
    //     .then(()=>console.log(`${moment().format('dddd DD MMMM YYYY HH:mm:ss,SSS')} / Connexion à mongoDB en mode ${process.env.NODE_ENV?"PROD":"DEV"} réussie`))
    //     .catch(err => console.log(err))
}

module.exports = connexionMongoDB;
