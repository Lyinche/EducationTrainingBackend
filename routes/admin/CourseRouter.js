var express = require('express');
const CourseController = require('../../controllers/admin/CourseController');
var router = express.Router();

const multer = require('multer');
const upload = multer({ dest: 'public/course/' });
//创建课程
router.post('/adminApi/course/addCourse', upload.single('file'), CourseController.addCourse);
//查询课程列表
router.get('/adminApi/course/list:id', CourseController.getCourseList);
//删除课程
router.delete('/adminApi/course/list:id', CourseController.delCourseList);
//查询课程
router.get('/adminApi/course/getDate:id', CourseController.getDate);
//更新课程
router.post('/adminApi/course/updateCourse', upload.single('file'), CourseController.updateCourse);

module.exports = router;
