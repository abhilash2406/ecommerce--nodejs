const express = require('express');

const adminRouter = require('./routes/admin');

const shopRouter = require('./routes/shop');

const bodyParser = require('body-parser');

const path = require('path');

const dirName = require('./utils/path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(dirName, 'public'))); //css

app.set('view engine', 'ejs');

app.set('views', path.resolve(dirName, 'views'));

app.use('/admin', adminRouter);

app.use(shopRouter);

app.use((req, res, next) => {
  res.render('404', {
    pageTitle: 'Page Not Found',
    activeLink: '404',
  });
});

app.listen(3001, () => {
  console.log('App started on port 3001');
});
