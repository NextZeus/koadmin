const router = require('koa-router')()

router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: 'Hello Koa 2!'
  });
});

router.get('/home', async (ctx, next) => {
  await ctx.render('home', {
    title: 'Hello Koa 2!'
  });
});

router.get('/upload', async (ctx, next) => {
  await ctx.render('upload',{});
});

router.post('/update', async (ctx, next) => {
  let request = ctx.request;
  ctx.body = {status: 'ok',serverTime: Date()};
});

router.get('/profile', async (ctx, next) => {
  await ctx.render('profile',{
    title:  '用户个人信息',
    user:{
      uid:5010499,
      username: ''
    }
  });
});

module.exports = router;
