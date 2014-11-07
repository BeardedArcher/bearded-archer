var dbm = require('db-migrate'),
    type = dbm.dataType,
    async = require('async');

exports.up = function(db, callback) {
    async.series([
        function(asyncCallback) {
            db.createTable('users', {
                id: {
                    type: 'int',
                    primaryKey: true,
                    autoIncrement: true
                }
            }, asyncCallback);
        },
        function(asyncCallback) {
            db.addColumn('users', 'login', {
                type: 'string',
                length: 32
            }, asyncCallback);
        },
        function(asyncCallback) {
            db.addColumn('users', 'password', {
                type: 'string',
                length: 64
            }, asyncCallback);
        }
    ], callback);
};

exports.down = function(db, callback) {
    db.dropTable('users', callback);
};