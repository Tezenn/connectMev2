require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router');

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.port || 3009, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
