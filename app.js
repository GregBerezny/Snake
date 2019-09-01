var express = require('express');
var mongoose = require('mongoose');

init();

async function init() {

mongoose.connect('mongodb+srv://admin:1q2w3e4r@snake-wvb6p.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
var HighscoreModel = mongoose.model("highscore", {highscore:Number});

//var score = new HighscoreModel({ highscore: 15 });
/*score.save(function (err) {
  if (err) return handleError(err);
  // saved!
});*/


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

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.get('/', function(req, res) {
	res.render('menu');
});

app.post('/save', function(req, res) {
  if (req.body.score > highscore.highscore) {
    HighscoreModel.findByIdAndUpdate('5d6b46d5e419110fe12cb32c', 
                      {$set:{ highscore : req.body.score}}, 
                      {new: true},
                      function(err){
                       
                      });
  } 
  
  res.json({ ok: true });
});

app.get('/game', async function(req, res) {
  highscore = await HighscoreModel.findById('5d6b46d5e419110fe12cb32c').lean().exec();
	res.render('game', {highscore: highscore.highscore});
});

app.get('/auto', function(req, res) {
	res.render('auto');
});

app.listen(app.get('port'));

}