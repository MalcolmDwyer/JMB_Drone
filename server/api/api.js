var flight = require('../flight/flight.js');

module.exports = function(app) {
  app.post('/api/fly', function(req, res) {

    flight.command({
      up: 0,
      roll: 0,
      pitch: 0,
      yaw: 0
    });
  });
};
