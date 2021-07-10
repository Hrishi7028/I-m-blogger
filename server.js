require('dotenv').config();
var cors = require('cors');
const express = require('express');
const app = express();
const connection = require('./config/db')
const router = require('./routes/userRouters')
const postRouter = require('./routes/postRouter')
const bodyParser = require('body-parser');
// database connection 
connection();

// middleware setup
app.use(express.json());
app.use(cors());


//user registration router
app.use('/',router);

// all post routes
app.use('/',postRouter)

app.listen(process.env.PORT,() =>{
    console.log(`Server is running on port ${process.env.PORT} successfully`);
})