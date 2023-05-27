const Router = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../database/Schemas/userSchema');
const historyModel = require('../database/Schemas/history');
const dotevn = require('dotenv');
dotevn.config();

const routes = new Router();

const SECRET_KEY = process.env.SECRET_KEY;

const historyMiddleware = (req, res, next) => {
    // check if token exits 
    if (req.headers.token) {
        const result = jwt.verify(req.headers.token, SECRET_KEY);
        req.userId = result.id;
        next();
    }
    else res.status(200).json("Please login!!");
};

// add a new history in the user
routes.post('/', historyMiddleware, async (req, res) => {
    try {

        const newHistory = new historyModel({
            name: req.body.name,
            calculation: req.body.calculation,
            result: req.body.result
        });

        const result = await newHistory.save();

        // now push the id into the userhistory
        const data = await userModel.findByIdAndUpdate(req.userId, {
            $push: {
                history: result._id.toString()
            }
        });

        res.status(200).json(newHistory);
    } catch (error) {
        res.status(200).json("Some error occured");
    }
})

// get the history of the user
routes.get('/', historyMiddleware, async (req, res) => {
    try {

        const user = await userModel.findById(req.userId);

        const history = user.history;
        // now traverse through history and find the result
        const result = await Promise.all(
            history.map(async (data) => {
                const t = await historyModel.findById(data);
                return t;
            })
        )

        res.status(200).json(result);
    } catch (error) {
        res.status(200).json("Some error occured");
    }
});

//delete a particular history of the user
routes.delete('/:id', historyMiddleware, async (req, res) => {
    try {

        const updateUser = await userModel.findByIdAndUpdate(req.userId, {
            $pull: {
                history: req.params.id
            }
        });

        // now delete from the history model
        const result = await historyModel.findByIdAndDelete(req.params.id);

        res.status(200).json({ updateUser, result });

    } catch (error) {
        res.status(200).json("Some error occured during deletion of the history");
    }
})

module.exports = routes;