const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserType = {
    username: {
        type: String,
    }, // 用户名
    password: String, // 密码
    gender: Number, // 性别 0: 保密 1: 男 2: 女
    introduction: String, // 备注|简介
    avatar: {
        //头像
        type: String,
        default: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    }, // 头像
    role: Number, // 角色 0:管理员 1:老师 2:学生
    creator: String,
    currency: Number, //积分|货币
};

const UserModel = mongoose.model('User', new Schema(UserType));

module.exports = UserModel;
