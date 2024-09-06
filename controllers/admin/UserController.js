const UserServices = require('../../services/admin/UserServices');

const JWT = require('../../util/JWT');

const UserController = {
    /* 登录接口 */
    login: async (req, res) => {
        const { username, password } = req.body;
        let result = await UserServices.login(username, password);
        if (result) {
            //生成token 返回给前端 在header里
            const token = JWT.generate(
                {
                    username: result.username,
                    _id: result._id,
                },
                '1d'
            );
            //传给前端 使用res.header
            res.header('Authorization', token);
            res.send({
                code: '200',
                msg: '登陆成功',
                ActionType: 'OK',
                data: {
                    username: result.username,
                    _id: result._id,
                    avatar: result.avatar,
                    role: result.role,
                    introduction: result.introduction,
                    gender: result.gender ? result.gender : 0,
                },
            });
        } else {
            res.send({
                code: ' -1',
                msg: '用户名密码不匹配',
            });
        }
    },
    /* 修改个人信息 */
    update: async (req, res) => {
        /* 用户更改的信息 */
        const { username, introduction, gender } = req.body;
        /* 解构token 获取用户信息 */
        let token = req.headers.authorization.split(' ')[1];
        let payload = JWT.verify(token);
        /* 头像路径处理 */
        let fullUrl = '';
        if (req.file) {
            let avatar = `/img/${req.file.filename}`;
            //拼接完整路径 包括url+host+path
            fullUrl = req.protocol + '://' + req.get('host') + avatar;
        }
        await UserServices.update({
            _id: payload._id,
            username,
            introduction,
            gender: Number(gender),
            avatar: fullUrl || '', // 如果 fullUrl 为空，则使用空字符串
        });
        let responseData = {
            msg: '修改成功',
            ActionType: 'OK',
            data: {
                username,
                introduction,
                gender: Number(gender),
            },
        };
        if (fullUrl) {
            responseData.data.avatar = fullUrl;
        }
        res.send(responseData);
    },
    /* 创建用户 */
    addUser: async (req, res) => {
        const { username, password, role, introduction, gender, creator } = req.body;
        if (req.file) {
            let avatar = `/img/${req.file.filename}`;
            //拼接完整路径 包括url+host+path
            fullUrl = req.protocol + '://' + req.get('host') + avatar;
        }
        await UserServices.addUser({
            username,
            password,
            role,
            introduction,
            gender: Number(gender),
            avatar: fullUrl || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png', // 如果 fullUrl 为空，则使用空字符串
            creator,
        });
        let responseData = {
            msg: '修改成功',
            ActionType: 'OK',
            data: {
                username,
                introduction,
                role,
                gender: Number(gender),
            },
        };
        if (fullUrl) {
            responseData.data.avatar = fullUrl;
        }
        res.send(responseData);
    },
    /* 查询用户 */
    getList: async (req, res) => {
        let result = await UserServices.getList({
            _id: req.params.id,
        });
        res.send({
            msg: '查询成功',
            ActionType: 'OK',
            data: result,
        });
    },
    /* 删除用户 */
    delList: async (req, res) => {
        await UserServices.delList({ _id: req.params.id });

        res.send({
            msg: '删除成功',
            ActionType: 'OK',
        });
    },
    /* 获取单个用户信息 */
    getCustomer: async (req, res) => {
        let result = await UserServices.getCustomer({ _id: req.params.id });
        res.send({
            msg: '查询成功',
            ActionType: 'OK',
            data: {
                username: result.username,
                role: result.role,
                password: result.password,
                _id: result._id,
            },
        });
    },
    /* 修改用户信息 */
    putList: async (req, res) => {
        let { _id, username, password, role } = req.body;
        let result = await UserServices.putList({ _id, username, password, role });

        res.send({
            msg: '修改成功',
            ActionType: 'OK',
        });
    },
};

module.exports = UserController;
