/**
 * Created by lixiaodong on 17/7/6.
 */
var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    hostId:   String,
    monsterId:  String,
    rank: mongoose.Schema.Types.Mixed,
    createTime:   Number
},{minimize:false});

Schema.pre('save',function(next){
    var self = this;

    self.createTime = Date.now();
    self.markModified('rank');

    next();
});

module.exports = Schema;