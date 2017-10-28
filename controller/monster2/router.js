const router = require('koa-router')();
const ejs = require('ejs');
let fs = require('fs');

let dbModel = require('../../schema/index');

let EjsTemplateDirName = __dirname + '/../../views/';
let jsFileDirName = '/ajaxJavascripts/';

let ejsFile = {
    '/p/monster2/home': EjsTemplateDirName + 'monster2/home.ejs'
}

let ajaxFile = {
    '/p/monster2/home': jsFileDirName + 'monster2/home.js'
}

function getEjsFileSrc(originalUrl){
    let fileSrc = ejsFile[originalUrl];
    let file = fs.readFileSync(fileSrc).toString();
    return file;
}

router.get('/p/*', async (ctx, next) => {
    let originalUrl = ctx.originalUrl;
    let ajaxSrc = ajaxFile[originalUrl];
    let file = getEjsFileSrc(originalUrl);
    let template = ejs.render(file, {user:{username:'小东'}});
    await ctx.render('home',{template: template, ajaxSrc:   ajaxSrc});
});

router.post('/d/playerDetail', async function(ctx, next){
    let req = ctx.request;
    let uid = req.body.uid;
    console.log('req.body: ',req.body);
    let user = await dbModel.findOne('user',{uid: uid});
    console.log('query user : ', user);
    ctx.body = {user:   user.toObject()};
});

router.post('/d/update', async (ctx, next) => {
    ctx.body = {status:'ok'};
});

module.exports = router;