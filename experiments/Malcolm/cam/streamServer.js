var http = require("http"),
    drone = require("./node-dronestream-master/lib/server");


var server = http.createServer(function(req, res) {
  require("fs").createReadStream(__dirname + "/index.html").pipe(res);
});

drone.listen(server);
server.listen(5555);