var arDrone = require('ar-drone'),
  client = arDrone.createClient(),
  drone_state = {};

client.config('control:altitude_max', 3000); // mm

client.on('navdata', function(info) {
  drone_state = info.demo;
});
// var lastCommand = {};

module.exports = {

  command: function(obj) {
    var roll = obj.roll/9.8 || 0;
    var pitch = obj.pitch/9.8 || 0;
    var yaw = obj.yaw || 0;
    var up = obj.up/9.8 || 0;
    var start = obj.start || false;
    var stop = obj.stop || false;

    var deltaPitch = 0;

    // if (lastCommand && lastCommand.pitch) {
    //   pitch =  pitch - lastCommand.pitch;
    // }

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

      // if (Math.abs(up) > Math.abs(pitch) && Math.abs(up) > Math.abs(roll)) {
      //   if (up >= 0) {
      //     client.up(up);
      //   } else {
      //     client.down(Math.abs(up));
      //   }
      // }
      if (Math.abs(pitch) > 0.3 && Math.abs(pitch) > Math.abs(roll)) {
        if (pitch >= 0) {
          client.front(pitch*.25);
        } else {
          client.back(Math.abs(pitch*.25));
        }
      }
      else if (Math.abs(roll) > 0.3) {
        if (roll >= 0) {
          client.right(roll*.25);
        } else {
          client.left(Math.abs(roll*.25));
        }
      }
      else {
        client.stop()
      }
    }

    // lastCommand = obj;
  },

    // Returns current drone state
  dronestate: function() {
    return drone_state;
  }
};
