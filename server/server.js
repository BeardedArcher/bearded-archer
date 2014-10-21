/**
 * Load env variables
 */
require('node-env-file')('./development.env');
require('debug').colors = [2, 1, 3, 6];

/**
 * Load required modules
 */

var fs = require('fs'), 
http = require('http'),
socketio = require('socket.io'),
user = require('./modules/users'),
debug = {
    log: require('debug')('log'),
    warning: require('debug')('warning'),
    error: require('debug')('error'),
    secure: require('debug')('secure')
};

debug.log('Standard logs visible');
debug.error('Error logs visible');
debug.warning('Warning logs visible');
debug.secure('Secure logs visible');

/**
 * Start listening
 */
var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8080, function() {
    debug.log('Listening at: http://localhost:8080');
}),
io = socketio.listen(server).on('connection', function (socket) {
    var loggedUsers = {};
    socket.on('login', function(data) {
        debug.log('Tried to login: ', data.login, data.password);
        user.register(data.login, data.password);
    }),
    socket.on('register', function(data) {

    }),
    socket.on('createGame', function (data) {
        console.log('Creating game: ', data.host, data.guest);
        socket.broadcast.emit('message', msg);
    });
});
