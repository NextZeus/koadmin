var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.set('debug', true);

let util = require('../util/util');
let config = util.getConfig();

let Mongoose = function(){
    this.init();
}

Mongoose.prototype.init = function(){

    mongoose.connect(config.mongodb.uri,config.mongodb.options);
    mongoose.connection.on('connected',()=>{
        console.log("Mongoose connection successed!");
    });
    mongoose.connection.on('error',(err)=>{
        console.error('Mongoose connection error ',err);
    });
    mongoose.connection.on('disconnected',()=>{
        console.log("mongoose connection disconnected!");
    });
    mongoose.connection.on('open',()=>{
        console.log("Mongoose connected to " + config.mongodb.uri);
    });
}

module.exports = new Mongoose();

