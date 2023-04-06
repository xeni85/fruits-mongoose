const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

const dotenv = require('dotenv');
dotenv.config();

const Fruit = require('./models/fruit');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


//---Middleware---
const mongoose = require('mongoose');
const Fruit = require('./models/fruit.js');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {});


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});


app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
app.use(express.urlencoded({extended: true}));






mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//---Routing---
app.get('/fruits', (req, res)=>{
    Fruit.find({}, (error, allFruits)=>{
        res.render('fruits/Index', {
            fruits: allFruits
        });
    });
});
app.get('/fruits/new', (req, res) => {
    res.render('New');
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

Fruit.create(req.body, (error, createdFruit)=>{
    res.redirect('/fruits');
});


app.get('/fruits/:id', (req, res)=>{
    Fruit.findById(req.params.id, (err, foundFruit)=>{
        res.render('fruits/Show', {
            fruit:foundFruit
        });
    });
});

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});