var mysql = require('mysql'),
    dbconfig = require(process.cwd() + '/database.json').dev,
    connection = mysql.createConnection(dbconfig);
    
exports.connection = connection;