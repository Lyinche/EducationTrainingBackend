const CourseServices = require('../../services/admin/CourseServices');

const CourseController = {
    /* 创建课程 */
    addCourse: async (req, res) => {
        const { name, detail, introduction, creator } = req.body;
        if (req.file) {
            let cover = `/course/${req.file.filename}`;
            //拼接完整路径 包括url+host+path
            fullUrl = req.protocol + '://' + req.get('host') + cover;
        }
        await CourseServices.addCourse({
            name,
            detail,
            introduction,
            cover: fullUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', // 如果 fullUrl 为空，则使用空字符串
            creator,
        });
        let responseData = {
            msg: '修改成功',
            ActionType: 'OK',
            data: {
                name,
                introduction,
                detail,
                creator,
            },
        };
        if (fullUrl) {
            responseData.data.cover = fullUrl;
        }
        res.send(responseData);
    },
    /* 查询课程列表 */
    getCourseList: async (req, res) => {
        const { id } = req.params;
        const result = await CourseServices.getCourseList({ id });
        res.send({
            msg: '查询成功',
            ActionType: 'OK',
            data: result,
        });
    },
    /* 删除课程 */
    delCourseList: async (req, res) => {
        const { id } = req.params;
        await CourseServices.delCourseList({ id });
        res.send({
            msg: '删除成功',
            ActionType: 'OK',
        });
    },
    /* 查询课程 */
    getDate: async (req, res) => {
        const { id } = req.params;
        const result = await CourseServices.getDate({ id });
        res.send({
            msg: '查询成功',
            ActionType: 'OK',
            data: result,
        });
    },
    /* 更新课程 */
    updateCourse: async (req, res) => {
        const { name, detail, introduction, creator, _id } = req.body;
        if (req.file) {
            let cover = `/course/${req.file.filename}`;
            //拼接完整路径 包括url+host+path
            fullUrl = req.protocol + '://' + req.get('host') + cover;
        }
        await CourseServices.updateCourse({
            name,
            detail,
            introduction,
            cover: fullUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', // 如果 fullUrl 为空，则使用空字符串
            creator,
            _id,
        });
        let responseData = {
            msg: '修改成功',
            ActionType: 'OK',
            data: {
                name,
                introduction,
                detail,
                creator,
            },
        };
        if (fullUrl) {
            responseData.data.cover = fullUrl;
        }
        res.send(responseData);
    },
};

module.exports = CourseController;
