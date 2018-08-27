const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');

const route = require('./cores/routes');

// Databae Connection
mongoose.connect('mongodb://localhost/camboparcel')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(ex => console.log('Could not connect to MongoDB...'));

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

app.use(require('./middlewares/cors'));

const userRouter = require('./controllers/users');
const searchRouter = require('./controllers/search');
const shipmentRouter = require('./controllers/shipment');

app.use('/api/users', userRouter);
app.use('/api/search', searchRouter);
app.use('/api/my-shipment', shipmentRouter);

route(app);

// React UI - views
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app;
