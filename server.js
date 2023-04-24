
const express = require('express');
const bookRoutes = require('./routes/books')
const mongoose = require('mongoose')
const cors = require('cors');
//express app 

const app = express();

//Middlewares
app.use(express.json()); //parses the http request's body/data to the 'req' object like body-parser
app.use(cors());
app.use((req, res, next) => {
    console.log(req.path, req.method); //Middleware for logging the requests to console our server
    next()                              //This middle ware will run everytime before getting to the requested route coz of 'next' function
})

app.use('/', bookRoutes);

//connect to db
mongoose.connect("mongodb+srv://dbUserDeep:Bakingit7*@cluster0.gzzew.gcp.mongodb.net/BookList")
    .then(() => {
        //listern for requests only after connection
        app.listen(5000, () => {
            console.log("Connected to DB Listening on port", 5000);
        })
    })
    .catch((error) => {
        console.log(error);
    })

