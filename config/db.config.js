const mongoose = require('mongoose');

mongoose.connect('mongodb://complete-project:GAtFae5Dciwz4JEn@127.0.0.1:27017/complete-project', {
    authSource: 'admin',
});

mongoose.connection.once('open', () => {
    console.log('数据库连接成功');
});

mongoose.connection.once('error', () => {
    console.log('数据库连接失败');
});

mongoose.connection.once('close', () => {
    console.log('数据库断开连接');
});

const mongoose = require('mongoose');
