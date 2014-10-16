var fs = require('fs')
    , http = require('http')
    , socketio = require('socket.io');

var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8080, function() {
    console.log('Listening at: http://localhost:8080');
});

var loggedUsers = [];

socketio.listen(server).on('connection', function (socket) {
    socket.on('login', function(data) {
        console.log(data);
        console.log('Tried to login: ', data.login, data.password);
    }),
    socket.on('createGame', function (data) {
        console.log('Creating game: ', data.host, data.guest);
        socket.broadcast.emit('message', msg);
    });
});