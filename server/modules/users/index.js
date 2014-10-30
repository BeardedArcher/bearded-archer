var db = require(process.cwd() + '/modules/dbconnection').connection,
    crypto = require('crypto'),
    q = require('q'),
    generateSalt = function (length) {
        'use strict';
        return crypto.randomBytes(length).toString('hex');
    },
    hashPassword = function (password, salt) {
        'use strict';
        return crypto.createHash('sha256').update(password + salt, "utf8").digest('hex');
    };

exports.register = function (login, password) {
    'use strict';

    var defered = q.defer(),
        salt = generateSalt(8),
        data = {
            login: login,
            password: hashPassword(password, salt),
            salt: salt
        };
        console.log(salt);
    db.query('INSERT INTO users SET ?', data, function (error, result) {
        if (error) {
            defered.reject(new Error(error));
        } else {
            defered.resolve(result.affectedRows);
        }
    });
    
    return defered.promise;
};

exports.login = function (login, password) {
    'use strict';

    var defered = q.defer();
        db.query('SELECT id FROM `users` WHERE `login` = ? AND `password` = SHA2(CONCAT(?, `salt`), 256)',
        [login, password],
        function (error, result) {
            if (error) {
                defered.reject(new Error(error));
            } else {
                if(result[0] == undefined) {
                    defered.reject(new Error('Incorrect login or password'));
                } else {
                    defered.resolve(result[0].id);
                }
            }
        });

    return defered.promise;
};