var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    uid             :   String,
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
    createTime      :   Number,
    loginTime       :   Number,
    updateTime      :   Number
});

Schema.methods.syncUpUserInfo = function(upUserInfo){
    var self = this;

    for(var key in upUserInfo){
        self[key] = upUserInfo[key];
    }
    console.log('syncUpUserInfo done ',upUserInfo.uid);
}

if (!Schema.options.toObject)
Schema.options.toObject = {};

Schema.options.toObject.transform = function (doc, ret){
    delete ret._id;
    delete ret.__v;
    return ret;
}

module.exports = Schema;