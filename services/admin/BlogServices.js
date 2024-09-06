const BlogModel = require('../../models/BlogsModel');

const BlogServices = {
    //发布内容
    addBlog: async ({ title, content, category, cover, creator, status, editTime }) => {
        return BlogModel.create({
            title, //标题
            content, //内容
            category, //类别 0通知 1动态 2案例
            cover, //封面
            editTime, //编辑时间
            creator, //作者
            status, //发布状态 0未发布 1已发布
        });
    },
    //查询内容列表
    getBlogList: async ({ _id }) => {
        return BlogModel.find({ creator: _id });
    },
    //修改发布状态
    updateStatus: async ({ _id, status, editTime }) => {
        return BlogModel.updateOne({ _id }, { status, editTime });
    },
    //删除内容
    delBlogList: async ({ _id }) => {
        return BlogModel.deleteOne({ _id });
    },
    //查询内容
    getBlog: async ({ _id }) => {
        return BlogModel.findOne({ _id });
    },
    /* 修改内容 */
    updateBlog: async ({ _id, title, content, category, cover, status, editTime }) => {
        if (cover) {
            return BlogModel.updateOne({ _id }, { title, content, category, cover, status, editTime });
        } else {
            return BlogModel.updateOne({ _id }, { title, content, category, status, editTime });
        }
    },
};

module.exports = BlogServices;
