module.exports = {

  command: function(obj) {
    var roll = obj.roll;
    var pitch = obj.pitch;
    var yaw = obj.yaw;
    var up = obj.up;

    console.log('flight got command:', roll, pitch, yaw, up);
  }
}
