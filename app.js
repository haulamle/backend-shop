const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
dotenv.config()
const app = express()

const port = process.env.PORT || 5000
const route = require('./apiRoutes')

app.use(express.urlencoded({
    extended: true
  })
);
const corsOptions = {
  origin: '*',
  credentials: true,
 };
app.use(cors(corsOptions))
app.use(express.static("public"));
app.use(express.json())
app.use(fileUpload());
app.use(morgan('combined'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})