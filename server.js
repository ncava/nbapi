import express from 'express';
import passport from 'passport';
import db from './db.js';
import path from 'path';
import fs from 'fs';
import Authorization from "./auth.js"

const __dirname = fs.realpathSync('.');

class NbaBackendServer {
  constructor() {
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    const authorization = new Authorization(app);
    app.use('/public', express.static('/public/assets/Logo-NBA-PNG-Images-HD.jpg'));

    app.get('/login/', this._login);
    app.get('/', authorization.checkAuthenticated, this._goHome);

    app.get('/auth/google/', passport.authenticate('google', {
      scope: ['email', 'profile']
    }));

    app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));

    app.post("/logout", (req, res) => {
      req.logOut(err => console.log(err));
      res.redirect("/login");
    });

    app.get('/lookup/:rival1/:rival2/:fecha', this._doLookup); 
    app.post('/save', this._doSave); 

    // Start server
    app.listen(3000, () => console.log('Listening on port 3000'));
  }

  async _login(req, res) {
    res.sendFile(path.join(__dirname, "public/login.html"));
  }

  async _goHome(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
  }

  async _doLookup(req, res) {
    const rival1 = req.params.rival1;
    const rival2 = req.params.rival2;
    const fecha = req.params.fecha;
    const query = { rival1: rival1, rival2: rival2, fecha: fecha };
    const collection = db.collection("partidos");
    const stored = await collection.findOne(query);
    const response = {
      rival1: rival1,
      rival2: rival2,
      fecha: fecha,
      resultado: stored ? stored.resultado : ''
    };
    res.json(response);
  }

  async _doSave(req, res) {
    const partido = req.body;
    const query = { rival1: partido.rival1, rival2: partido.rival2, fecha: partido.fecha };
    const update = { $set: { resultado: partido.resultado } };
    const params = { upsert: true };
    const collection = db.collection("partidos");
    await collection.updateOne(query, update, params);
    res.json({ success: true });
  }
}

new NbaBackendServer();
