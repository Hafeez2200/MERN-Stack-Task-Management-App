const express = require('express');
require('dotenv').config();
const cookieParser = require("cookie-parser");
require('./database/connection')

const userApi = require('./routes/userRoute');
const taskApi = require('./routes/taskRoute');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));
app.use(cookieParser());
app.use('/api/v1',userApi);
app.use('/api/v1',taskApi);

app.get('/',(req,res)=>{
    res.status(200).send("hello");
})


app.listen(1000,()=>{
    console.log(`Server started at port ${process.env.PORT}`);
    
})

