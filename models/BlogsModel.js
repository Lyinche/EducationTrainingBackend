const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogsType = {
    title: String, //标题
    content: String, //内容
    category: Number, //类别 0通知 1动态 2案例
    cover: String, //封面
    creator: String, //作者
    status: Number, //发布状态 0未发布 1已发布
    editTime: Date, //编辑时间
};

const BlogsModel = mongoose.model('Blog', new Schema(BlogsType));

module.exports = BlogsModel;
