var mongoose = require('mongoose');

let util = require('../../util/util');

var Schema = new mongoose.Schema({
    uid             :   String,
    hostId          :   Number,
    username        :   String,
    upliveCode      :   String,
    userToken       :   String,
    avatar          :   String,
    bill            :   Number,
    countryCode     :   String,
    diamond         :   Number,
    expValue        :   Number,
    gender          :   Number,
    grade           :   Number,
    source          :   Number,
    status          :   Number,
    summonTimes     :   mongoose.Schema.Types.Mixed,
    catchedSpriteNumber:    Number,
    spriteIntegral  :   Number,
    createTime      :   Number,
    loginTime       :   Number,
    updateTime      :   Number
},{minimize:false});

Schema.methods.syncUpUserInfo = function(upUserInfo){
    var self = this;

    for(var key in upUserInfo){
        self[key] = upUserInfo[key];
    }
}

Schema.pre('save', function(next){
    var self = this;

    self.updateTime = Date.now();
    self.username = self.username.replace(/['"\\/\b\f\n\r\t]/g, '');  
    self.summonTimes = self.summonTimes || {};
    self.catchedSpriteNumber = self.catchedSpriteNumber || 0;
    self.spriteIntegral = self.spriteIntegral || 0;

    self.markModified('summonTimes');

    next();
});

Schema.pre('findOne', function(next){
    var self = this;
    var mn = util.getStartAndEndTimestampOfDay();
    if(self.updateTime <= mn.morning){
        // console.warn('host prefindOne reset info');
        self.summonTimes = self.summonTimes || {};
        for(var monsterId in self.summonTimes){
            self.summonTimes[monsterId] = 0;
        }
        self.catchedSpriteNumber = 0;
        self.spriteIntegral = 0;
        self.updateTime = Date.now();
    }
    next();
})

module.exports = Schema;