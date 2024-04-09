const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const upload = multer();

const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', (req, res, next) => {
  res.render('login');
});

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/home', (req, res) => {
  res.render('index')
});

app.get('/about', (req, res) => {
  res.render('about')
});

app.get('/contact', (req, res) => {
  res.render('contact')
});

app.get('/info', (req, res) => {
  res.render('info')
});

app.get('/history', (req, res) => {
  res.render('history')
});

app.get('/hello/:name', (req, res) => {
  res.render(`Hello`, { name: req.params.name });
  console.log(req);
});

app.post('/contact/send-message', upload.single('project'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const project = req.file;

  if (author && sender && title && message && project) {
    res.render('contact', { isSent: true, project: project.originalname });
  } else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});