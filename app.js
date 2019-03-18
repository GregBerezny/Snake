var express = require('express');
//var messages = require('./lib/message.js');

//#9fb8ad;
//e6e8e6
//#3f403f;

var app = express();

// set up handlebars view engine
var handlebars = require('express-handlebars')
    .create({ defaultLayout:'main' });
    
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('menu');
});

app.get('/game', function(req, res) {
	res.render('game');
});

app.listen(app.get('port'));