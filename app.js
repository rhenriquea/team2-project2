require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const express = require('express');
app.use(cors());
const path = require('path');
const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const multer = require('multer')

const PORT = process.env.PORT || 5000;

// Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project 2 API with Swagger',
      version: '0.1.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [{
      url: 'http://localhost:5000',
    }, ],
  },
  apis: ['./docs/**/*.yaml'],
};

// Body parser
// app.use(bodyParser.urlencoded({
//   extended: false
// })).use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

/**
 * Image Upload Logic
 */

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter }).single('cover'));

app.use(bodyParser.json()); // application/json


const specs = swaggerJsdoc(options);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Routes
app.use('/api/v1', require('./routes/movies'));
// app.use('/', swaggerUi.serve, swaggerUi.setup(specs));



const {
  MONGODB_USER,
  MONGODB_PASS,
  DB_NAME
} = process.env;
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.2pngo.mongodb.net/${DB_NAME}`;

// Server Start
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.info('Database Connected');
    app.listen(PORT, () =>
      console.info(`Listening on http://localhost:${PORT}`)
    );
  });