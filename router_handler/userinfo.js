/*
 * @Author: Changwei Cao
 * @Date: 2022-12-07 14:44:16
 * @LastEditors: Changwei Cao
 * @LastEditTime: 2022-12-07 22:43:10
 * @Description: 用户信息处理逻辑路由
 */

// 导入数据库模块
const db = require('../db/index')

// 获取用户基本信息的函数
exports.getUserInfo = (req,res) => {
    // 定义sql语句
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'

    // 调用sql语句
    db.query(sql, req.user.id, (err, results) => {
        // 执行错误
        if(err) return res.cc(err)
        // 未查询到信息
        if(results.length != 1) return res.cc('获取用户信息失败！')

        // 用户信息获取成功
        res.send({
            status: 0,
            message: '用户信息获取成功',
            data: results[0],
        })
    })
}

// 更新用户基本信息的路由
exports.updateUserInfo = (req, res) => {
    // 定义sql
    const sql = 'update ev_users set ? where id = ?'
    // 调用执行
    db.query(sql, [req.body, req.body.id], (err, results) => {
        // 执行失败
        if(err) return res.cc(err)
        // 更新失败
        if(results.affectedRows != 1) return res.cc('更新用户信息失败！')
        // 成功
        res.cc('更新成功！', 0)
    })
}