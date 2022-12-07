/*
 * @Author: Changwei Cao
 * @Date: 2022-12-07 14:44:16
 * @LastEditors: Changwei Cao
 * @LastEditTime: 2022-12-07 14:55:16
 * @Description: 用户信息处理逻辑路由
 */

// 导入数据库模块
const db = require('../db/index')

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

    // res.send('ok')
}