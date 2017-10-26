function Util (){
    this.config = null;
    this.init();
}

Util.prototype.init = function(){
    var self = this;
    console.log('monster2-pixi-admin');
    var configName = process.env.NODE_ENV || 'dev';
    var config = require('../config/' + configName + '.json');
    self.config = config;
    console.log('util init end');
}

Util.prototype.getConfig = function(){
    return this.config;
}

module.exports = new Util();