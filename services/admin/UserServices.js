const UserModel = require('../../models/UserModel');

const UserServices = {
    // 用户登录
    login: async (username, password) => {
        return UserModel.findOne({ username, password });
    },
    // 修改用户信息
    update: async ({ _id, username, introduction, gender, avatar }) => {
        const updateFields = {
            username,
            introduction,
            gender,
        };

        if (avatar !== undefined) {
            updateFields.avatar = avatar;
        }

        return UserModel.updateOne({ _id }, updateFields);
    },
    // 创建用户
    addUser: async ({ username, password, role, introduction, gender, avatar, creator }) => {
        return UserModel.create({
            username,
            password,
            role,
            introduction,
            gender,
            avatar,
            creator,
            currency: Number(0),
        });
    },
    // 获取用户列表
    getList: async ({ _id }) => {
        return UserModel.find({ creator: _id }).select({ password: 0 });
    },
    /* 删除用户 */
    delList: async ({ _id }) => {
        return UserModel.deleteOne({ _id });
    },
    /* 获取单个用户 */
    getCustomer: async ({ _id }) => {
        return UserModel.findOne({ _id });
    },
    /* 修改用户信息 */
    putList: async ({ _id, username, password, role }) => {
        return UserModel.updateOne({ _id }, { username, password, role });
    },
};

module.exports = UserServices;
