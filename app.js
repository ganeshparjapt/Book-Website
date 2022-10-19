const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const { strict } = require('assert');
const { create } = require("domain");
const { stringify } = require("querystring");
mongoose.connect('mongodb://localhost/harry',{useNewUrlParser: true});
const port = 500;

// create schema
var contactSchema = new mongoose.Schema({
    name:String,
    fatherName: String,
    email: String,
    phone: Number,
    desc: String


    
});
var contact =mongoose.model('contact',contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
// ENDPOINTS
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

//data base post request
app.post('/contact', (req, res) => {
    var myData = new contact (req.body);

    myData.save().then(()=>{
        res.send("this data has been save to the data base")
}).catch(()=>{
    res.status(200).send("item has not save")
});
})
// ENDPOINTS
app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
})
// ENDPOINTS
app.get('/saler', (req, res) => {
    const params = {}
    res.status(200).render('saler.pug', params);
})
// ENDPOINTS
app.get('/services', (req, res) => {
    const params = {}
    res.status(200).render('services.pug', params);
})


// START THE SERVER
app.listen(port, () => {
    console.log(` successfully on port ${port}`);
});