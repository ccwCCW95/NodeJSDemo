/*
 * @Author: Changwei Cao
 * @Date: 2022-12-07 14:44:16
 * @LastEditors: Changwei Cao
 * @LastEditTime: 2022-12-08 15:59:01
 * @Description: 用户信息处理逻辑路由
 */

// 导入数据库模块
const db = require('../db/index')

// 导入处理密码的模块
const bcrypt = require('bcryptjs')

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

// 更新用户密码的路由
exports.updatePassword = (req, res) => {
    // 根据id查询用户的信息
    const sql = 'select * from ev_users where id = ?'

    // 执行查询操作
    db.query(sql, req.user.id, (err, results) => {
        if(err) return res.cc(err)
        if(results.length != 1) return res.cc('未查询到该用户')
        
        // 判断原密码是否正确
        const comparePwd = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if(!comparePwd) return res.cc('原密码输入错误')

        // 更新数据库中的密码
        const updateSql = 'update ev_users set password = ? where id = ?'
        // 对新密码进行加密
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(updateSql, [newPwd, req.user.id], (err, results) => {
            if(err) return res.cc(err)
            if(results.affectedRows != 1) return res.cc('密码修改错误！')
            res.cc('密码修改成功！', 0)
        })
    })
}