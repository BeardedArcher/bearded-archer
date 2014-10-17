var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('users', {
        id: {
            type: 'int',
            primaryKey: true,
            autoIncrement: true
        }
    }, callback);
    db.addColumn('users', 'login', {
        type: 'string',
        length: 32
    });
    db.addColumn('users', 'password', {
        type: 'string',
        length: 32
    });
};

exports.down = function(db, callback) {
    db.dropTable('users', callback);
};