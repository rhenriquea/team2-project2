require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();

app.use(cors());

const mongoose = require('mongoose');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

const specs = swaggerJsdoc(options);

// Routes
app.use('/movies', require('./routes/movies'));
app.post('/add-movies', require('./routes/movies'));

app.use('/', swaggerUi.serve, swaggerUi.setup(specs));

// Body parser
app.use(bodyParser.urlencoded({
  extended: false
})).use(bodyParser.json());

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