var express = require('express');
var app = express();


var api = require('./api/api')(app);

app.use(express.static('web'));
app.set('view engine', 'jade');
app.set('views', './web/views');


app.get('/', function(req, res) {
  // res.send('Ready for commands');
  res.render('index', {});
});

app.listen(8888, function() {
  console.log('listening on 8888');
})
