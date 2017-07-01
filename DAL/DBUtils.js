//this is only an example, handling everything is yours responsibilty !

var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var configDB = {
    userName: 'nachamni',
    password: 'asdfG2hj',
    server: 'dbelirannach.database.windows.net',
    requestTimeout: 3000,
    options: {encrypt: true, database: 'dbelirannach'}
};
var Connection = require('tedious').Connection;



exports.Select = function (connection, query, callback) {
    let connection2= new Connection(configDB);
  connection2.on('connect', function (err) {
        if (err) {
            console.log(err);
            console.log('Error in connected azure select *******************************************************');
        } else {
            console.log('connected azure select');
            var req = new Request(query, function (err, rowCount) {});
            var ans = [];
            var properties = [];
            req.on('columnMetadata', function (columns) {
                columns.forEach(function (column) {
                    if (column.colName != null)
                        properties.push(column.colName);
                });
            });
            req.on('row', function (row) {
                var item = {};
                for (i = 0; i < row.length; i++) {
                    item[properties[i]] = row[i].value;
                }
                ans.push(item);
            });

            req.on('requestCompleted', function () {
                //don't forget handle your errors
                console.log('request Completed: ' + req.rowCount + ' row(s) returned');
                console.log(ans);
                callback(ans);
            });

            connection2.execSql(req);
        }
    });
};

// execute select queries from DB with promise
exports.promiseSelect = function(connection, query) {
    let connection2= new Connection(configDB);
    console.log(configDB.userName);
    return new Promise(function(resolve,reject){
            var ans = [];
            var properties = [];
        connection2.on('connect', function (err) {
            if(err)
                console.log(err);
            else {
                console.log('connected to azure promise select');
                var req = new Request(query, function (err, rowCount) {
                    if (err) {
                        console.log(err);
                        reject(err.message);
                    }
                });

                req.on('columnMetadata', function (columns) {
                    columns.forEach(function (column) {
                        if (column.colName != null)
                            properties.push(column.colName);
                    });
                });
                req.on('row', function (row) {
                    var item = {};
                    for (i=0; i<row.length; i++) {
                        item[properties[i]] = row[i].value;
                    }
                    ans.push(item);
                });

                req.on('requestCompleted', function () {
                    //don't forget handle your errors
                    console.log('request Completed: '+ req.rowCount + ' row(s) returned');
                    resolve(ans);
                });
                connection2.execSql(req);
            }
        });
    });
};


exports.promiseInsert = function (connection, query) {
    return new Promise(function (resolve, reject) {
        var req = new Request(query, function (err) {
            if (err) {
                console.log(err);
                reject(err.message);
            }
            else{ // succeed
                console.log('Insertion succeed!');
                resolve();
            }
        });
        connection.execSql(req) // perform the query

    });
};

exports.promiseUpdate = function (connection,query) {
    return new Promise(function (resolve, reject) {
        var req = new Request(query,function (err, rowCount,rows) {
            if(err) {
                console.log(err);
                reject(err);
            }
            else{
                resolve();
            }

        });
        connection.execSql(req);
    });
};


exports.Insert = function (connection,query, callback) {
    var req = new Request(query, function (err) {
        if (err) {
            callback(err.message);
        }
        else{ // succeed
            callback('Insertion succeed!');
        }
    });
    connection.execSql(req) // perform the query
};


exports.Select = function (connection, query, callback) {
    let connection2 = new Connection(configDB);
    var ans = [];
    var properties = [];
    connection2.on('connect',function(err){
        if(err)
            console.log(err);
        else
        {
            var req = new Request(query, function (err, rowCount) {
                if (err) {
                    console.log(err);
                    return;
                }
            });

            req.on('columnMetadata', function (columns) {
                columns.forEach(function (column) {
                    if (column.colName != null)
                        properties.push(column.colName);
                });
            });
            req.on('row', function (row) {
                var item = {};
                for (i = 0; i < row.length; i++) {
                    item[properties[i]] = row[i].value;
                }
                ans.push(item);
            });
            req.on('requestCompleted', function () {
                //don't forget handle your errors
                console.log('request Completed: ' + req.rowCount + ' row(s) returned');
                //console.log(ans);
                callback(ans);
            });
            connection2.execSql(req);
        }
    });
};

exports.Update = function (connection,query, callback) {
    let connection2 = new Connection(configDB);
    connection2.on('connect', function (err) {
        if (err) {
            console.log(err);
            console.log("ERROR connected azure update 465465465464654564545645645456465");
        } else {
            console.log("connected azure update !@#!@#@!#@!#@!!$!@!@!!@!@@#!@#!@!#!");
            var request = new Request(query,function (err, rowCount,rows) {
            });
            connection2.execSql(request);
        }
    });
};