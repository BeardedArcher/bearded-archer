var mysql = require('mysql'),
    connection = mysql.createConnection(dbconfig),
    dbconfig;

if (process.env.OPENSHIFT_MYSQL_DB_HOST) {
    dbconfig = require(process.cwd() + '/database.json').os;
} else {
    dbconfig = require(process.cwd() + '/database.json').dev;
}
    
exports.connection = connection;