/**
 * Created by lixiaodong on 17/7/6.
 * 流水
 */
var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    uid         :   String,
    orderId     :   String,
    changeAmount:   Number,
    type        :   String,
    resultCode  :   String,
    remainAmount:   Number,
    gameId      :   String,
    taskId      :   String,
    extend      :   String,
    status      :   Boolean,
    createTime  :   Number
},{minimize:false});

Schema.pre('save',function(next){
    var self = this;

    self.createTime = Date.now();

    next();
});

module.exports = Schema;