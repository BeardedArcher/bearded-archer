var dbm = require('db-migrate'),
    type = dbm.dataType,
    async = require('async');

exports.up = function(db, callback) {
    async.series([
        function(asyncCallback) {
            db.addColumn('users', 'exp', {
                type: 'int',
            }, asyncCallback);
        },
        function(asyncCallback) {
            db.addColumn('users', 'gold', {
                type: 'int'
            }, asyncCallback);
        }
    ], callback);
};

exports.down = function(db, callback) {
    async.series([
        function(asyncCallback) {
            db.removeColumn('users', 'exp', asyncCallback);
        },
        function(asyncCallback) {
            db.removeColumn('users', 'gold', asyncCallback);
        }
    ], callback);
};
