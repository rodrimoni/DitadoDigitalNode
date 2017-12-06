var express    =    require('express');
var app        =    express();
var bodyParser = require('body-parser');

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.static('public'));
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
require('./router/main')(app);

var url = "mongodb://rodrimoni:rodrimoni91@ds131826.mlab.com:31826/ditado-digital";


MongoClient.connect(url, function (err, database){
    if (err) return console.log(err);
    else {
        module.exports.db = database;
        app.listen(process.env.PORT || 3000, function(){
            console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
        });
    }
});