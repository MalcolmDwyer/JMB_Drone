module.exports = {
  remap: function(obj) {
    var x = obj.x;
    var y = obj.y;
    var z = obj.z;

    console.log('Remapper got (' + x + ', ' + y + ', ' + z +')');

    return {};
  }
}
