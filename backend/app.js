const express = require('express')
const ErrorHandler = require('./middleware/error')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/products', express.static(path.join(__dirname, '../products')));


if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:"backend/config/env"})
}


//routes
const user = require('./controller/user')
const product= require('./controller/product')
const order = require('./controller/order')
 app.use('/api/user',user)
app.use('/api/product',product)
app.use('/api',order)

app.use(ErrorHandler)
module.exports=app