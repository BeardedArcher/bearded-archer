var mysql = require('mysql'),
    connection,
    dbconfig;

if (process.env.OPENSHIFT_MYSQL_DB_HOST) {
    dbconfig = require(process.cwd() + '/database.json').os;
} else {
    dbconfig = require(process.cwd() + '/database.json').dev;
}

connection = mysql.createConnection(dbconfig);
    
exports.connection = connection;