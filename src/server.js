const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});