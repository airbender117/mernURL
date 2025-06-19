//require express
const express = require('express')
const app = express()
const port = 9090

const connectDB = require('./db/connect')

//middlewares

const path = require("path")
require('dotenv').config()
// app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//view engine

const cors = require('cors');
app.use(cors());


//routes

const userRoute = require('./routes/user')
// const staticRoute = require('./routes/staticRouter')
const urlRoute = require('./routes/url')
// const URL = require("./models/url");
const redirectRoute = require('./routes/redirectRoute')



// app.use('/', staticRoute)
app.use('/user', userRoute)
app.use('/url', urlRoute)
app.use('/redirect',redirectRoute)
console.log("Redirect route mounted");

//main function

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => { console.log(`Connection at http://localhost:${port}`) })

    } catch (error) {
        console.log(error)
    }
}
app.use((req, res) => {
  res.status(404).json({ message: "Custom 404: Route not found" });
});

start()