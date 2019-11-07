const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const sslRedirect = require('heroku-ssl-redirect');
const bodyParser = require('body-parser')
const cors = require('cors')
const server_config = require('./server_config')
var settings = require("../settings");

app = express();
app.use(bodyParser.json())
app.use(cors())

// Configuring the database
const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(server_config.mongo_connection_string, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Import API Routes
require('./routes/accounts.js')(app);
require('./routes/utilities.js')(app);

// Import Vue
app.use(sslRedirect());
app.use(serveStatic(settings.ROOT_DIR + "/client/dist"));
app.use(history());
app.use(serveStatic(settings.ROOT_DIR + "/client/dist"));


var port = process.env.PORT || 5000;
app.listen(port);

console.log('server started '+ port);