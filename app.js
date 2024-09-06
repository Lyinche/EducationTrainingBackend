var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var usersRouter = require('./routes/admin/UserRouter');
var BlogRouter = require('./routes/admin/BlogRouter');
var CourseRouter = require('./routes/admin/CourseRouter');
const JWT = require('./util/JWT');

var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ===token===中间件 */
app.use((req, res, next) => {
    //如果授权通过 token有效就放行next
    //如果token过期了就返回错误
    //Login界面需要跳过这个中间件
    if (req.url === '/adminApi/user/login') {
        next();
        return;
    }
    //从前端头拿到 然后根据持票人加空格的格式切割字符串拿到token
    const token = req.headers['authorization'].split(' ')[1];
    if (token) {
        //token是真的  解析数据供后面生成新的使用
        var payload = JWT.verify(token);
        if (payload) {
            //token校验通过 生成新的token刷新计时
            const newToken = JWT.generate(
                {
                    username: payload.username,
                    _id: payload._id,
                },
                '1d'
            );
            //把新的token返回出去
            res.header('Authorization', newToken);
            next();
        } else {
            res.status(401).send({
                code: '-1',
                msg: 'token过期',
            });
        }
    }
});

app.use(usersRouter);
app.use(BlogRouter);
app.use(CourseRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
