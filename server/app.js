//Require core modules
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'

const port = process.env.NODE_ENV || 3000;
const logger = morgan('combined')
const app = express()

//Apply middleware
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json
app.use(logger) // TODO add customer logger to a file with rotation later
app.use(helmet());
app.use(cors())



app.get('/', (req, res) => {
    res.status(200).send({ message: "Welcome to my dummy endpoint^^" })
})
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})