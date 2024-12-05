const express = require('express')
const app = express()
const configViewEngine = require("./ConfigApp/viewEngine")
const bodyparser = require("body-parser")
const webRoutes = require("./route/web");
const router = require('./route/web');
require('dotenv').config();
const connnectDB = require("./ConfigApp/connectDB")
const APIrouter = require('./route/API')
const Router = require('./route/API')
let port = process.env.PORT || 8089
//config CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// app.use(express.json()) //for json
// app.use(express.urlencoded({ extends: true })) //for  form data 

// app.use(express.json()) //for json
// app.use(express.urlencoded({ extends: true })) //for  form data 
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extends: true }))

configViewEngine(app)
app.use(router)
app.use("/", webRoutes)
app.use(Router)
app.use(APIrouter)
connnectDB();
app.use((req, res) => {
    res.render('404.ejs')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})