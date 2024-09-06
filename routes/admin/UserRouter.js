var express = require('express');
const UserController = require('../../controllers/admin/UserController');
var router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'public/img/' });

/* 登录 */
router.post('/adminApi/user/login', UserController.login);
/* 修改个人信息 */ //
router.post('/adminApi/user/update', upload.single('file'), UserController.update);
//创建用户
router.post('/adminApi/user/addUser', upload.single('file'), UserController.addUser);
/* 获取用户列表 /adminApi/user/list */
router.get('/adminApi/user/list:id', UserController.getList);
//获取单个用户
router.get('/adminApi/user/customer:id', UserController.getCustomer);
/* 删除用户 */
router.delete('/adminApi/user/list:id', UserController.delList);
/* 修改用户信息 */
router.put('/adminApi/user/list:id', UserController.putList);

module.exports = router;
