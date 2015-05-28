var express = require('express');
var app = express();


var api = require('./api/api')(app);

app.set('view engine', 'jade');
app.set('views', './web/views')

app.get('/', function(req, res) {
  res.send('Ready for commands');
});

app.listen(8888, function() {
  console.log('listening on 8888');
})
