const ioredis = require("ioredis");
let util = require('../util/util');
let config = util.getConfig();

function Redis(){
    this.client = null;
    this.init();
}

Redis.prototype.init = function(){
    let self = this;

    const client = !!config.redis.Single ? new ioredis(config.redis.Single) : new ioredis.Cluster(config.redis.Cluster);
    client.on('connect',()=>{
        console.log("Redis connected");
    });
    client.on("ready",()=>{
        console.log('Redis ready');
    });
    client.on("error",(err)=>{
        console.log('Redis error ',err);
    });
    client.on("close",()=>{
        console.log("Redis closed");
    });
    client.on("reconnecting",()=>{
        console.log("Redis reconnect...");
    });
    client.on("end",()=>{
        console.log('Redis end');
    });

    self.client = client;
}


module.exports = new Redis();
