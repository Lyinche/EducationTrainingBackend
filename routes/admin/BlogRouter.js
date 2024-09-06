var express = require('express');
const BlogController = require('../../controllers/admin/BlogController');
var router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'public/blog/' });
//发布内容
router.post('/adminApi/blog/addBlog', upload.single('file'), BlogController.addBlog);
//查询内容列表
router.get('/adminApi/blog/list:id', BlogController.getBlogList);
//修改发布状态
router.put('/adminApi/blog/status', BlogController.updateStatus);
//删除内容
router.delete('/adminApi/blog/list:id', BlogController.delBlogList);
//查询内容
router.get('/adminApi/blog/getBlog:id', BlogController.getBlog);
//更新内容
router.post('/adminApi/blog/updateBlog', upload.single('file'), BlogController.updateBlog);
module.exports = router;
