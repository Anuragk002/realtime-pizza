require('dotenv').config()
const express= require('express')
const app = express()
const ejs= require('ejs')
const path = require('path')
const expressLayout= require('express-ejs-layouts')
const PORT=process.env.PORT || 3300
const mongoose= require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore= require('connect-mongo')(session)


//database connection
const url='mongodb://localhost/pizza'
mongoose.connect(url, { useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true, useFindAndModify: true});
const connection= mongoose.connection;
connection.once('open', ()=>{
    console.log('Database connected..');
}).catch(err=>{
    console.log('Connection failed ..')
});

//session store
let mongoStore= new MongoDbStore({
    mongooseConnection: connection,
    collection  : 'sessions'
})

//Session config
app.use(session({
    secret : process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000*1000} //age
}))

app.use(flash())

//assets
app.use(express.static('public'))
app.use(express.json())

//global middlewares
app.use((req,res,next)=>{
    res.locals.session=req.session
    next()
})
// always keep this expressLayout part above routes
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)


app.listen(PORT,()=>{
    console.log(`Listening on port....... ${PORT}` )
})