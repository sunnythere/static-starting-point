// Create our top-level express app
// Bring in our models/database, sync before opening server
const express = require('express');
const bodyParser = require('body-parser');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const models = require('./models');
const app = express();

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(volleyball);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.use('/', require('./routes'));

// failed to catch req above means 404, forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle any errors
app.use(function (err, req, res, next) {
    console.error(err, err.stack);
    res.status(err.status || 500);
    res.render('error', {
        error: err
    });
});

models.db.sync({})
    .then(function () {
        app.listen(3000, function (err) {
            if (err) return console.error(err);
            console.log('Server listening intently on 3000!');
        });
    })
    .catch(console.error);



