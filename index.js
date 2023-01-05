// npm install express  //Set-ExecutionPolicy Unrestricted (for nodemon) // npm install nodemon //npm install cors (Stop browser cors error) //npm install mysql //npm i multer //npm install swagger // npm install swagger-ui-express

////   express generic setup

const express = require('express')  
const app = express()   
app.use(express.json());    // to access http request body

const port = 4000

let cors = require("cors"); 
app.use(cors());

//// MySQL starts here

const mysql = require('mysql');// add mySQL into project (npm install mysql) 
const dbConfig = require('./dbconfig/db.config');

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

module.exports = connection;


//swagger starts here

const swaggerUi = require('swagger-ui-express');    
swaggerDocument = require('./swagger.json');
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));  // view swagger on http://localhost:3000/api-docs/


//// routes start here

let routes = require('./public/routes/router');
app.use('/', routes); 


//// app starts here

app.listen(port, () => {   //start the web browser
console.log(`listening at http://localhost:${port}`)
})

