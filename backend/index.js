const express = require('express');
const app = express();
const userRoutes = require("./Routes/userRoute");
const historyRoutes = require('./Routes/historyRoute');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors({
    origin: ['http://localhost:3000']
}))
app.use(express.json());

require('./database/dbconnect');
app.use('/', userRoutes);
app.use('/history', historyRoutes);


app.listen(process.env.PORT, () => {
    console.log("The app is listening");
})