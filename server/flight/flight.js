var arDrone = require('ar-drone'),
  client = arDrone.createClient(),
  drone_state = {};

client.config('control:altitude_max', 3000); // mm

client.on('navdata', function(info) {
  drone_state = info.demo;
});
var lastCommand = {};

module.exports = {

  command: function(obj) {
    var roll = obj.roll || 0;
    var pitch = obj.pitch || 0;
    var yaw = obj.yaw || 0;
    var up = obj.up || 0;
    var start = obj.start || false;
    var stop = obj.stop || false;

    var deltaPitch = 0;

    if (lastCommand && lastCommand.pitch) {
      pitch =  pitch - lastCommand.pitch;
    }

    console.log('flight got command:', roll, pitch, yaw, up);

    if (start === true) {
      if (drone_state.controlState == 'CTRL_LANDED') {
        console.log('starting drone');
        client.takeoff();
     }
    }

    if (stop === true) {
      client.stop();
      client.land();
    }

    if (drone_state.controlState != 'CTRL_LANDED') {
      console.log('going up');
      if (up >= 0) {
        client.up(up);
      } else {
        client.down(Math.abs(up));
      }

      if (pitch >= 0) {
        client.front(pitch);
      } else {
        client.back(Math.abs(pitch));
      }

      if (roll >= 0) {
        client.right(roll);
      } else {
        client.left(Math.abs(roll));
      }
    }

    lastCommand = obj;
  },

    // Returns current drone state
  dronestate: function() {
    return drone_state;
  }
};
