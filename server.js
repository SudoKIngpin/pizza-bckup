require('dotenv').config()

const express=require('express')
const ejs=require('ejs') ///template engine

const expressLayout=require('express-ejs-layouts')
//use for avoid repetition and make a layout 
//dynamic code of diff. pages  wil be injected in layout.ejs file 

const app=express() // express pbject
const mongoose=require('mongoose')

const session=require("express-session")
const flash=require("express-flash")

const MongoDbStore=require("connect-mongo")


const path=require('path') 

const { error } = require('console')
const { collection } = require('./app/models/menu')

const PORT=process.env.PORT || 3000 //PORT environment variable


// Database moongose.Connection

const uri='mongodb://localhost:27017/pizza';

mongoose.connect(uri, {
    useNewUrlParser: true, // Ensures parsing MongoDB connection strings
    useUnifiedTopology: true, // Ensures MongoDB driver uses the new topology engine
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});


// session store 

const mongoStore = MongoDbStore.create({
    mongoUrl: uri, // MongoDB connection string
    collectionName: 'sessions', // Collection to store sessions
});






// Session config middleware 

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore, // Use the newly created MongoStore
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Cookie expiration (1 day)
    },
}));

app.use(flash())


//Assests 

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:false}))




//global middleware 
app.use((req , res , next )=>{
    res.locals.session=req.session
    next()
})



// set template engine 
app.use(expressLayout)

app.set('views',path.join(__dirname,"/resources/views"))
app.set("view engine",'ejs')



require('./routes/web')(app) //routes










app.listen(PORT,()=>{ 
    console.log(`Listening on port ${PORT} `)
})


