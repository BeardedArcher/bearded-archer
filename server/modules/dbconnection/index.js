var mysql = require('mysql'),
    dbconfig = require('./database.json');
    
exports.connection = mysql.createConnection(dbconfig);