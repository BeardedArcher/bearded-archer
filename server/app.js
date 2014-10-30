var app = function () {
    'use strict';
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
        q = require('q'),
        server,
        io,
        debug = {
            log: require('debug')('log    '),
            warning: require('debug')('warning'),
            error: require('debug')('error  '),
            secure: require('debug')('secure ')
        };

    debug.log('Standard logs visible');
    debug.error('Error logs visible');
    debug.warning('Warning logs visible');
    debug.secure('Secure logs visible');

    /**
     * Start listening
     */
    server = http.createServer(function (req, res) {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(fs.readFileSync(__dirname + '/index.html'));
    }).listen(8080, function () {
        debug.log('Listening at: http://localhost:8080');
    });
    io = socketio.listen(server).on('connection', function (socket) {
        var loggedUsers = {};
        socket.on('login', function (data) {
            debug.log('Trying to sign in user');
            debug.secure('Login: ' + data.login);
            debug.secure('Password: ' + data.password);
            user.login(data.login, data.password)
                .then(function (response) {
                    debug.log(response);
                    socket.emit({logged: true});
                    loggedUsers = {};
                }, function (error) {
                    debug.error(error);
                    socket.emit({logged: false});
                });
        });
        socket.on('register', function (data) {
            debug.log('Trying to register new user');
            debug.secure('Login: ' + data.login);
            debug.secure('Password: ' + data.password);
            user.register(data.login, data.password)
                .then(function (response) {
                    debug.log('Registered new user');
                    socket.emit({registered: true});
                }, function (error) {
                    debug.error('Error during register');
                    debug.secure(error);
                    socket.emit({registered: false});
                });
        });
        socket.on('createGame', function (data) {
//                console.log('Creating game: ', data.host, data.guest);
//                socket.broadcast.emit('message', msg);
        });
    });
};
app();