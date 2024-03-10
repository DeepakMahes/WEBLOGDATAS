const express = require('express');
const router = express.Router();
const { user } = require('../models/schema');
const weblogdatarouter = require("./weblogdata");

router.get("/login", (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/login/userverfication", async (req, res) => {
    const { username, password} = req.query; 
    try {

        const existingUser = await user.findOne({ username ,password});
        if (!existingUser || existingUser.password !== password ) {
            return res.status(400).send("Invalid username, password, or user type");
        }
        if(existingUser.usertype==="admin"){
            res.render('main')
        }
        else if (existingUser.usertype==="user"){
            res.render('menu')
        }

    } catch (error) {
        res.status(500).send(error.message);
    }
});



router.get("/login/registration", (req, res) => {
    try {
        res.render("registration");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login/signup/entry', async (req, res) => {
    const { username, password, confirm_password, user_type } = req.body;
    try {
        const existingUser = await user.findOne({ username });
        

        if (existingUser && existingUser.password === password) {
            return res.status(400).json({ message: "Username already exists. Please choose a different one." });
        }
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        await user.create({ username, password, usertype:user_type });

        res.redirect("/login");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.use(weblogdatarouter);
module.exports = router;
