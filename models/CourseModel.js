const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseType = {
    name: String, //名称
    introduction: String, //简介
    detail: String, //详细描述
    cover: String, //封面
    creator: String, //作者
};

const CourseModel = mongoose.model('Course', new Schema(CourseType));

module.exports = CourseModel;
