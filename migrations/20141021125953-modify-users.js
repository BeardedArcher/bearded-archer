var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.addColumn('users', 'salt', {
        type: 'string',
        length: 16
    }, callback);
};

exports.down = function(db, callback) {
    db.removeColumn('users', 'salt', callback);
};