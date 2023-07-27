const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL)
.then(result=>{
    console.log('Database Connected.');
})

const userRoute = require('./routes/User');
const taskRoute = require('./routes/Task'); 

app.use(userRoute);
app.use(taskRoute);

app.use((err, req, res, next)=>{
    const message = err.message;
    const data = err.data;
    const stat = err.statusCode || 500;
    res.status(stat).json({message : message , data : data});
});


    
        app.listen(8080,  result=>{
            console.log('Connected to Server.');
        })
    