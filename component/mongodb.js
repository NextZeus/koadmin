var mongoose = require('mongoose');
let Promise = require('bluebird');
mongoose.Promise = Promise;

let util = require('../util/util');
let config = util.getConfig();

Promise.promisifyAll(mongoose.Model);
Promise.promisifyAll(mongoose.Model.prototype);
Promise.promisifyAll(mongoose.Query.prototype);

function DB(){
    this.connections = {};
    this.init();
}

DB.prototype.init = function(){
    var self = this;
    self.getDbConn('lobby');
    self.getDbConn('stats');
    console.log('dbConn init end conns ', Object.keys(self.connections));
}

DB.prototype.createConnection = function(dbName){
    let connection_string = util.config.mongo['connection_string_' + dbName];
    let connection_opt = util.config.mongo['connection_opts_' + dbName];

    console.log('dbName %s connection_string %s connection_opt %j', dbName, connection_string,connection_opt);

    let conn = mongoose.createConnection(connection_string, connection_opt);
    
    conn.on('connected', function(err){
        console.log('mongoose connected ' + dbName + ' error ' + err);
    });

    conn.on('error', function(err){
        console.log('mongoose throw error ' + dbName + ' error ' + err);
    });

    conn.on('disconnected', function(err){
        console.log('mongoose disconnected ' + dbName + ' error ' + err);
    });

    return conn;
}

DB.prototype.getDbConn = function(dbName){
    var self = this;

    let conn = self.connections[dbName];

    if(!conn){
        conn = self.connections[dbName] = self.createConnection(dbName);
    }
    return conn;
}

module.exports = new DB();









