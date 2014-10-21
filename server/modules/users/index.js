var db = require(process.cwd() + '/modules/dbconnection').connection,
    crypto = require('crypto');

exports.register = function(login, password) {
    var salt = crypto.randomBytes(8).toString(),
        data = {
            login: login,
            password: crypto.createHash('sha256').update(password + salt).digest('hex'),
            salt: salt
        };
    db.query('INSERT INTO users SET ?', data);
}

exports.login = function() {
    db.query('SELECT * FROM users');
}