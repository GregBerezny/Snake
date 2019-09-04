var express = require('express');
var mongoose = require('mongoose');

var aiID = "5d6f214a1c9d440000462eda";
var playerID = "5d6b46d5e419110fe12cb32c";
var mode = '';

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
    if (mode === 'player') {
      HighscoreModel.findByIdAndUpdate(playerID, 
        {$set:{ highscore : req.body.score}}, 
        {new: true},
        function(err){
                       
        });
    } else if (mode === 'ai') {
      HighscoreModel.findByIdAndUpdate(aiID, 
        {$set:{ highscore : req.body.score}}, 
        {new: true},
        function(err){
         
        });
    }
  } 
  
  res.json({ ok: true });
});

app.get('/game', async function(req, res) {
  highscore = await HighscoreModel.findById(playerID).lean().exec();
  mode = "player";
	res.render('game', {highscore: highscore.highscore});
});

app.get('/auto', async function(req, res) {
  highscore = await HighscoreModel.findById(aiID).lean().exec();
  mode = "ai";
	res.render('auto', {highscore: highscore.highscore});
});

app.listen(app.get('port'));

}