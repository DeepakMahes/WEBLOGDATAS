const express=require('express')
const mongoose = require("./models/db");
const port = 4000;
const {data,user} = require("./models/schema");
const linkdata = require('./routers/userrouter')
const linkweb=require('./routers/weblogdata')

const app=express()
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use('/', linkdata)
app.use('/admin',linkweb)
app.use('/user',linkweb)

   app.listen(port, () => {
     console.log("server is running in 4000");
   });