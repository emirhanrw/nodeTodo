const express = require('express')
const app = express()
require('dotenv').config()
require('./config/databaseConnection')

const HomeRouter = require('./routes/HomeRouter')

app.set('view engine', 'ejs')
app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use('/', HomeRouter)

const port = process.env.PORT || 5001
app.listen(port,()=>{
    console.log(`listening to ${port}`);
})