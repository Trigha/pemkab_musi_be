const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

const dataHukumRoutes = require('./src/routes/dataHukumRoutes');
const dataUserRoutes = require('./src/routes/dataUserRoutes')

const errorHandler = require('./src/utils/errorHandler');
const decidePlatform = require('./src/helper/decidePlatform.helper')

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const publicUploadPath = path.join(__dirname, 'public', 'uploads');

app.use(express.json());

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);

app.use(function (req, res, next) {
  let origin = req.headers.origin;
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    "Content-Security-Policy", 
    "default-src 'self' http://jdihmusirawasutara.com; " +
    "default-src 'self'"
  );
  next();
});


// app.use((req, res, next) => {
//   res.setHeader("Content-Security-Policy", "default-src 'self' http://jdihmusirawasutara.com");
//   next();
// });

app.use('/api/data-hukum', dataHukumRoutes)
app.use('/api/user', dataUserRoutes)

app.use(cors()); // Enable CORS middleware

app.use(express.json());
app.use('/uploads', express.static(publicUploadPath));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(publicUploadPath);
  decidePlatform()
});