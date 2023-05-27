const Router = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../database/Schemas/userSchema');
const dotenv = require('dotenv');
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY

const routes = new Router();

routes.post('/register', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const result = new userModel({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email
        });

        const user = await result.save();

        res.status(200).json(user);


    } catch (error) {
        res.status(200).json("Some error occured during register");
    }
})

routes.post('/login', async (req, res) => {
    try {
        // find the user by email
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) return res.status(200).json("The user is not found");

        // console.log(user);
        const validPassword = bcrypt.compareSync(req.body.password, user.password);

        if (!validPassword) return res.status(200).json("The password is wrong");

        const token = await jwt.sign({ id: user._id, name: user.name }, SECRET_KEY);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(200).json("Some error occured");
    }
})

routes.get('/', (req, res) => {
    res.json("THis is the reply");
})

module.exports = routes;
