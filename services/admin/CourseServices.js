const CourseModel = require('../../models/CourseModel');

const CourseServices = {
    /* 创建课程 */
    addCourse: async ({ name, detail, introduction, cover, creator }) => {
        let result = await CourseModel.create({ name, detail, introduction, cover, creator });
        return result;
    },
    /* 查询课程列表 */
    getCourseList: async ({ id }) => {
        let result = await CourseModel.find({ creator: id });
        return result;
    },
    /* 删除课程 */
    delCourseList: async ({ id }) => {
        let result = await CourseModel.deleteOne({ _id: id });
        return result;
    },
    /* 查询课程 */
    getDate: async ({ id }) => {
        let result = await CourseModel.find({ _id: id });
        return result;
    },
    /* 更新课程 */
    updateCourse: async ({ name, detail, introduction, creator, _id, cover }) => {
        let result = await CourseModel.updateOne({ _id }, { name, detail, introduction, creator, cover });
        return result;
    },
};

module.exports = CourseServices;
