var flight = require('../flight/flight.js'),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json();

module.exports = function(app) {
  app.post('/api/fly', jsonParser, function(req, res) {
    var input = req.body;

    // var command = {
    //   start: false,
    //   stop: false,
    //   up: 0,
    //   roll: 0,
    //   pitch: 0,
    //   yaw: 0
    // };

    var command = {
      start: false,
      stop: false,
      up: input.z,
      roll: input.x,
      pitch: input.y,
      yaw: 0
    };

    console.log(req.body);

    flight.command(req.body);
    console.log(command);
    res.sendStatus(200);
  });

  app.post('/api/start', function(req, res) {
    flight.command({start: true});
    res.sendStatus(200);
  });

  app.post('/api/stop', function(req, res) {
    flight.command({stop: true});
    res.sendStatus(200);
  });

  app.get('/api/state', function(req, res) {
    app.set('dronestate', flight.dronestate());
    res.sendStatus(200);
  });
};
