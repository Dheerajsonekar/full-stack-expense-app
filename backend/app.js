const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const db = require('./utils/database');
const expense = require('./models/expense');
const userRoutes = require('./routes/userRoutes');


app.use(express.json());
app.use(cors());



app.use('/api/expense', userRoutes);


db.sync().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch(err=>{
    console.error("Database connection error: ", err);
})







