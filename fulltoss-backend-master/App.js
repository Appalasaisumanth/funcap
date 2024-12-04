const express = require("express");
const mongoose = require("mongoose");
const { createOne, login,Signup,getteam,updateteam } = require('./auth_creator'); // Destructure the exports
const {getProducts,createProducts}=require('./product_creator');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const App = express();
const path = require('path');

require("dotenv").config();
App.use(express.json());
App.use(cors());

App.get('/', (req, res) => {
    res.status(200).json({ "message": "welcome to backend of funcap" });
});

App.get('/create', createOne); // Use POST for creation
App.post('/login', login); // Use POST for login
App.post('/signup',Signup);
App.get('/:username',getteam);
App.patch('/update',updateteam);

App.post('/product/create',createProducts);
App.get('/product/:team',getProducts);



App.use('*',(req,res)=>{res.status(400).json({message:"invalid request/route"})});


const PORT = process.env.PORT||5000;
App.listen(PORT, () => {
    console.log(`API started at http://localhost:${PORT}`);
});

mongoose.connect(process.env.MONGO||'mongodb+srv://appalasaisumanth:Samy%40samy123@cluster0.3tbj05s.mongodb.net/fulltoss')
