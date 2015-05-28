module.exports = {

  command: function(obj) {
    var roll = obj.roll || 0;
    var pitch = obj.pitch || 0;
    var yaw = obj.yaw || 0;
    var up = obj.up || 0;
    var start = obj.start || false;
    var stop = obj.stop || false;

    console.log('flight got command:', roll, pitch, yaw, up);
  }
}
