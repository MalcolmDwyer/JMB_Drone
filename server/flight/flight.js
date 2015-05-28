var arDrone = require('ar-drone'),
  client = arDrone.createClient(),
  drone_state = {};

client.config('control:altitude_max', 3000); // mm

module.exports = {

  command: function(obj) {
    var roll = obj.roll || 0;
    var pitch = obj.pitch || 0;
    var yaw = obj.yaw || 0;
    var up = obj.up || 0;
    var start = obj.start || false;
    var stop = obj.stop || false;

    console.log('flight got command:', roll, pitch, yaw, up);

    if (start === true) {
      if (drone_state.controlState == 'CTRL_LANDED') {
        client.takeoff();
      }
    }

    if (stop === true) {
      client.stop(); vb
      client.land();
    }

    if (drone_state.controlState == 'CTRL_FLYING') {
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
  }
};
