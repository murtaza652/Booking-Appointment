const path = require('path');
const User=require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const app = express();
app.use(cors());
const deleteRoutes = require('./routes/delete');
const postRoutes = require('./routes/post');

app.use(bodyParser.json());

app.use('/delete', deleteRoutes);
app.use('/add-user', postRoutes);
sequelize
    .sync()
    .then((res)=>{
    app.listen(3000);
    })
    .catch((err)=>{
        conssole.log(err);
    });