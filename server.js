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
        url = require('url'),
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
        var dir = __dirname,
            error = false;
            switch (url.parse(req.url).pathname.split('.').pop()) {
                case '':
                case '/':
                    res.writeHead(200, {
                        'Content-type': 'text/html'
                    });
                    dir += '/frontend/build/index.html'
                    break;
                case 'css':
                    res.writeHead(200, {
                        'Content-type': 'text/css'
                    });
                    dir += '/frontend/build/' + url.parse(req.url).pathname;
                    break;
                case 'js':
                    res.writeHead(200, {
                        'Content-type': 'application/javascript'
                    });
                    dir += '/frontend/build/' + url.parse(req.url).pathname;
                    break;
                case 'ico':
                    res.writeHead(200, {
                        'Content-type': 'image/png'
                    });
                    dir += '/frontend/build/assets/favicon.ico'
                    break;
                case 'png':
                case 'jpg':
                case 'jpeg':
                case 'gif':
                    res.writeHead(200, {
                        'Content-type': 'image/' + url.parse(req.url).pathname.split('.').pop()
                    });
                    dir += '/frontend/build/' + url.parse(req.url).pathname;
                    break;
                default:
                    error = '404';
            }
            
            fs.exists(dir, function(exists) {
                if(error !== '404' && exists) {
                    res.end(fs.readFileSync(dir));
                } else {
                    console.log(1);
                    res.writeHead(404, {
                        'Content-type': 'text/html'
                    });
                    res.end(fs.readFileSync(__dirname + '/frontend/build/index.html'));
                }
            });
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
                    socket.emit('logged', { logged: user.isLogged() });
                    user.syncValues().then(function() {
                        socket.emit('stats', user.getEmitData('stats'));
                    });
                }, function (error) {
                    debug.error(error);
                    socket.emit('logged', { logged: user.isLogged() });
                });
        });
        socket.on('register', function (data) {
            debug.log('Trying to register new user');
            debug.secure('Login: ' + data.login);
            debug.secure('Password: ' + data.password);
            user.register(data.login, data.password)
                .then(function (response) {
                    debug.log(response);
                    debug.log('Registered new user');
                    socket.emit('registered', { registered: true});
                }, function (error) {
                    debug.error('Error during register');
                    debug.secure(error);
                    socket.emit('registered', { registered: false});
                });
        });
        socket.on('checkLogin', function (data) {
            var isLogged = user.isLogged();
            debug.log('Checking if user is logged: ' + isLogged);
            socket.emit('isLogged', { isLogged: isLogged } );
        });
        socket.on('check', function (data) {
            socket.emit('stats', user.getEmitData('stats'));
        });
        socket.on('createGame', function (data) {
            
        });
    });
};
app();