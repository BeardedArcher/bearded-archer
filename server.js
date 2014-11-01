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
        users = require('custom')('users'),
        q = require('q'),
        server,
        io,
        port = process.env.OPENSHIFT_NODEJS_PORT || 8081,
        ip = process.env.OPENSHIFT_NODEJS_IP || 'localhost',
        debug = require('custom')('logs'),
        loggedUsers = users.loggedUsers;

    /**
     * Start listening
     */
    server = http.createServer(function (req, res) {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end(fs.readFileSync(__dirname + '/index.html'));
    }).listen(port, ip, function () {
        debug.log('Listening at: ' + ip + ':' + port);
    });
    
    io = socketio.listen(server).on('connection', function (socket) {
        var user = new users.user;
        socket.on('disconnect', function() {
            user.logout(socket);
        });
        socket.on('login', function (data) {
            debug.log('Trying to sign in user');
            debug.secure('Login: ' + data.login);
            debug.secure('Password: ' + data.password);
            user.login(data.login, data.password, socket)
                .then(function (response) {
                    debug.log(response);
                    socket.emit({logged: true});
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
        socket.on('check', function (data) {
            console.log('---');
            console.log(loggedUsers.showList());
        });
        socket.on('createGame', function (data) {
//                console.log('Creating game: ', data.host, data.guest);
//                socket.broadcast.emit('message', msg);
        });
    });
};
app();