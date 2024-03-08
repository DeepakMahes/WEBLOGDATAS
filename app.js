const express=require('express')
const mongoose = require("./models/db");
const port = 4000;
const {data,user} = ('./models/schema')
const linkweb=require('./routers/userrouter')
const app=express()
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use('/', linkweb)
// app.get('/edit', (req, res) => {

//     res.render('edit', { value: value });
// });


// app.use('/weblog', require('./routers/weblogdata'));


app.listen(port, () => {
     console.log("server is running in 4000");
   });