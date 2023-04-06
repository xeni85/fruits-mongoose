const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

require('dotenv').config();

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());



//---Middleware---
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
app.use(express.urlencoded({extended: true}));


const mongoose = require('mongoose');
const Fruit = require('./models/fruit.js');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//---Routing---
app.get('/fruits/', (req, res) => {
    res.render('Index', {fruits: fruits});
});
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    res.redirect('/fruits'); //send the user back to /fruits
});

app.post('/fruits', (req, res) => {
    res.send(fruits);
});
app.post('/fruits/', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.send(createdFruit);
    });
});

app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    res.render('Show', {
        fruit: fruits[req.params.indexOfFruitsArray]
    });
});



app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});