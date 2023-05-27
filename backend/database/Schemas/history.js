const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    name : {
        type : String,
        require: true
    },
    calculation:{
        type: String,
        require: true
    },
    result:{
        type : String,
        require: true
    }
});

const historyModel = new mongoose.model("history", historySchema );

module.exports = historyModel;