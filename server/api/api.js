var flight = require('../flight/flight.js');

module.exports = function(app) {
  app.post('/api/fly', function(req, res) {

    var command = {
      start: false,
      stop: false,
      up: 0,
      roll: 0,
      pitch: 0,
      yaw: 0
    };

    flight.command(command);
    console.log(command);
    res.sendStatus(200)
  });


  app.post('/api/start', function(req, res) {
    flight.command({start: true});
  });

  app.post('/api/stop', function(req, res) {
    flight.command({stop: true});
  });
};
