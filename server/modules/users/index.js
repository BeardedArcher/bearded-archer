var mysql = require('mysql');

exports.register = function() {
    mysql.query('SELECT * FROM users');
}