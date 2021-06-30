require('dotenv').config();

const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;
const app = express();

/**
 * App config to application/json
 * @example
 * http://expressjs.com/en/resources/middleware/body-parser.html
 */
const bodyParser = require('body-parser');

app.use(bodyParser.json());

/**
 * Static Images server
 */
app.use('/images', express.static(path.join(__dirname, 'images')));

/**
 * Image Upload Logic
 */
const multer = require('multer');

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

/**
 * App CORS configuration
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/**
 * Swagger Documentation Setup
 * @example
 * https://swagger.io/specification/
 */
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project 2 API with Swagger',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
  },
  apis: ['./docs/**/*.yaml'],
};

const specs = swaggerJsdoc(options);

/**
 * APP Routes
 */
app
  .use('/api/v1', require('./routes'))
  .use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
  .use('/', (req, res) => res.status(301).redirect('/docs'));

/**
 * Global Error Handling
 */
app.use((error, req, res, next) => {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  const status = error.statusCode || 500;
  const { message } = error;
  res.status(status).json({ type: 'ERROR', status, message });
});

/**
 * Database Configuration
 * @example
 * https://mongoosejs.com/docs/
 */
const mongoose = require('mongoose');

const { MONGODB_USER, MONGODB_PASS, DB_NAME } = process.env;
const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.2pngo.mongodb.net/${DB_NAME}`;

// Server Start
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info('Database Connected');
    app.listen(PORT, () =>
      console.info(`Listening on http://localhost:${PORT}`)
    );
  });
