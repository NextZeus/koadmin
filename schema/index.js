var userSchema = require('./monster2/user.js');
var statsSchema = require('./monster2/stats.js');
var hostSchema = require('./monster2/host.js');
let damageRecordSchema = require('./monster2/damageRecord');
let fightRecordSchema = require('./monster2/fightRecord');
let contributionRankSchema = require('./monster2/contributionRank');
let dbConn = require('../component/mongodb');

function Model(){
    this.$id = 'dbModel';
    this.models = {};
    this.statsModels = {};
    this.init();
}

Model.prototype.init = function(){
    var self = this;
}

Model.prototype.getSchemaByCollectionName = function(collectionName){
    switch(collectionName){
    case 'user':
        return userSchema;
    case 'host':
        return hostSchema;
    case 'damageRecord':
        return damageRecordSchema;
    case 'fightRecord':
        return fightRecordSchema;
    case 'contributionRank':
        return contributionRankSchema;
    }
}

Model.prototype.getStatsModel = function(time=Date.now()){
    let self = this;

    let year = new Date(time).getFullYear();
    let month = new Date(time).getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let dateStr = '' + year + month;
    let collectionName = 'flowsys_' + dateStr;

    let model = self.statsModels[collectionName];

    if (!model) {
        model = self.statsModels[collectionName] = dbConn.getDbConn('stats').model(collectionName, statsSchema);
    }
    return model;
}

Model.prototype.createStats = function(option){
    var self = this;
    var model = self.getStatsModel();

    return model.create(option);
}

Model.prototype.getModel = function(collectionName){
    var self = this;

    var model = self.models[collectionName];

    if(!model){
        let schema = self.getSchemaByCollectionName(collectionName);
        let conn = dbConn.getDbConn('lobby');
        model = self.models[collectionName] = conn.model(collectionName,schema);
    }

    return model;
}

Model.prototype.findOne = function(collectionName,option){
    var self = this;
    
    var model = self.getModel(collectionName);

    return model.findOne(option);
}

Model.prototype.create = function(collectionName,option){
    var self = this;
    var model = self.getModel(collectionName);
    return model.create(option);
}

Model.prototype.update = function(collectionName, conditions, update, options={}){
    var self = this;
    var model = self.getModel(collectionName);
    return model.update(conditions, update, options);
}

module.exports = new Model();
