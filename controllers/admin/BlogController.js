const BlogServices = require('../../services/admin/BlogServices');

const BlogController = {
    //发布内容
    addBlog: async (req, res) => {
        let { title, content, category, creator, status } = req.body;
        if (req.file) {
            let avatar = `/blog/${req.file.filename}`;
            //拼接完整路径 包括url+host+path
            fullUrl = req.protocol + '://' + req.get('host') + avatar;
        }

        let result = await BlogServices.addBlog({
            title, //标题
            editTime: new Date(), //编辑时间
            content, //内容
            category: Number(category), //类别 0通知 1动态 2案例
            creator, //作者
            status: Number(status), //发布状态 0未发布 1已发布
            cover: fullUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        });
        if (result) {
            res.send({
                msg: '创建成功',
                ActionType: 'OK',
            });
        } else {
            res.send({
                msg: '创建失败',
                ActionType: 'NO',
            });
        }
    },
    //查询内容列表
    getBlogList: async (req, res) => {
        let result = await BlogServices.getBlogList({
            _id: req.params.id,
        });
        res.send({
            msg: '查询成功',
            ActionType: 'OK',
            data: result,
        });
    },
    //修改发布状态
    updateStatus: async (req, res) => {
        let result = await BlogServices.updateStatus({
            ...req.body,
            editTime: new Date(),
        });
        res.send({
            msg: '修改成功',
            ActionType: 'OK',
            // data: result,
        });
    },
    //删除内容
    delBlogList: async (req, res) => {
        let result = await BlogServices.delBlogList({ _id: req.params.id });
        if (result) {
            res.send({
                msg: '删除成功',
                ActionType: 'OK',
            });
        } else {
            res.send({
                msg: '删除失败',
                ActionType: 'NO',
            });
        }
    },
    //查询单条内容
    getBlog: async (req, res) => {
        let result = await BlogServices.getBlog({ _id: req.params.id });
        res.send({
            msg: '查询成功',
            ActionType: 'OK',
            data: result,
        });
    },
    //更新内容
    updateBlog: async (req, res) => {
        let { title, content, category, status, _id } = req.body;
        if (req.file) {
            let avatar = `/blog/${req.file.filename}`;
            //拼接完整路径 包括url+host+path
            fullUrl = req.protocol + '://' + req.get('host') + avatar;
        }

        let result = await BlogServices.updateBlog({
            _id,
            title, //标题
            editTime: new Date(), //编辑时间
            content, //内容
            category: Number(category), //类别 0通知 1动态 2案例
            status: Number(status), //发布状态 0未发布 1已发布
            cover: fullUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        });
        if (result) {
            res.send({
                msg: '修改成功',
                ActionType: 'OK',
            });
        } else {
            res.send({
                msg: '修改失败',
                ActionType: 'NO',
            });
        }
    },
};

module.exports = BlogController;
