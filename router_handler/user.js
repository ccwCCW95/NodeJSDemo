/*
 * @Author: Changwei Cao
 * @Date: 2022-11-11 15:18:07
 * @LastEditors: Changwei Cao
 * @LastEditTime: 2022-12-07 13:38:53
 * @Description: 
 */
// 导入数据库操作模块
const db = require('../db/index')

// 导入 bcryptjs 这个包
const bcrypt = require('bcryptjs')

//导入生成Token的包
const jwt = require('jsonwebtoken')

// 导入全局的配置文件
const config = require('../config')


// 注册新用户的处理函数
exports.regUser = (req, res) => {
    // 获取客户端提交到服务器的用户信息
    const userinfo = req.body
    // 对表单数据进行合法性校验
    // if (!userinfo.username || !userinfo.password){
    //     return res.send({status: 1, message: '用户名或密码不合法！'})
    // }

    // 定义sql, 查询用户名是否被占用
    const sqlStr = 'select * from ev_users where username=?'

    db.query(sqlStr, userinfo.username, (err, results) => {
        // 执行sql失败
        if(err){
            // return res.send({status: 1, message: err.message})
            return res.cc(err)
        }

        // 判断用户名是否被占用
        if(results.length > 0){
            // return res.send({status: 1, message: '用户名已被占用！'})
            return res.cc('用户名已被占用！')
        }

        // 调用 bcrypt.hashSync() 对密码进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        // 定义插入新用户的sql语句
        const sqlInsert = 'insert into ev_users set ?'

        db.query(sqlInsert, {username: userinfo.username, password: userinfo.password}, (err, results) => {
            // 判断sql语句是否执行成功
            if(err){
                // return res.send({status: 1, message: err.message})
                return res.cc(err)
            }

            // 判断影响行数是否为1
            if(results.affectedRows != 1){
                // return res.send({status: 1, message: '注册用户失败，请稍候再试！'})
                return res.cc('注册用户失败，请稍候再试！')
            }

            // 注册用户成功
            // res.send({status: 0, message: '注册用户成功！'})
            return res.cc('注册用户成功！', 0)
        })
    })

}

// 登录的处理函数
exports.login = (req, res) => {
    // 接受数据
    const userinfo = req.body
    // 定义sql语句
    const sql = 'select * from ev_users where username = ?'
    // 执行sql, 根据返回值判断是否登录
    db.query(sql, userinfo.username, (err, results) => {
        if(err) return res.cc(err)
        if(results.length != 1) return res.cc('登录失败！')

        // 判断密码是否正确
        const compareResults = bcrypt.compareSync(userinfo.password, results[0].password)
        if(!compareResults) return res.cc('密码错误！')

        // 在服务端生成Token字符串
        const user = {...results[0], password: '', user_pic: ''}
        const tokenStr = jwt.sign(user, config.jwtSecretKeyv, {expiresIn: config.expiresIn})
        
        // 响应给客户端
        res.send({
            status: 0,
            message: '登录成功！',
            token: 'Bearer ' + tokenStr,
        })
    })
}