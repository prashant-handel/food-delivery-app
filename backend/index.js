const express = require('express');
const app = express();
const port = 5000;
const connectDB = require('./db');
const cors=require("cors");

 app.use(cors({credentials: true}));

connectDB();
app.use(express.json());
app.use('/api',require('./Routes/CreateUser'));
app.use('/api',require('./Routes/DisplayData'));

app.get('/',(req,res)=>{
    res.send("Hello World!");
})

app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})