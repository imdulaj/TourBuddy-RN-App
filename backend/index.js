//import express(we can add any name like express)
const express = require('express')
var bodyParser = require('body-parser')

//create express app
const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


const placeRoute = require('./routes/place-routes')
const registerRoute = require("./routes/register-route");
const loginRoute = require("./routes/login-route");


app.use('/place', placeRoute);

app.use('/images',express.static('images'));

app.use("/register", registerRoute);

app.use("/login", loginRoute);



//start the backend server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })