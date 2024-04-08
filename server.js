const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use('/user', (req, res, next) => {
  res.render('login', { layout: false });
});

app.get('/', (req, res) => {
  res.render('index', { layout: false })
});

app.get('/home', (req, res) => {
  res.render('index', { layout: false })
});

app.get('/hello/:name', (req, res) => {
  res.render(`Hello`, { layout: false, name: req.params.name });
  console.log(req);
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});