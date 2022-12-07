/*
 * @Author: Changwei Cao
 * @Date: 2022-11-11 14:10:50
 * @LastEditors: Changwei Cao
 * @LastEditTime: 2022-12-07 14:41:23
 * @Description: 
 */

// 引入express模块
const express = require('express')

// 创建服务器实例对象
const app = express()

// 导入验证规则中间件
const joi = require('joi')

// 导入并配置cors中间件
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件 解析 application/x-www-form-urlencoded
app.use(express.urlencoded({extended: false}))

// 在导入路由模块之前，封装res.cc函数
app.use((req, res, next) => {
    res.cc = function(err, status = 1){
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }

    next()
})

// 配置解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(expressJWT({secret: config.jwtSecretKeyv}).unless({path: [/^\/api/]}))

const { path } = require('@hapi/joi/lib/errors')

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if(err instanceof joi.ValidationError) return res.cc(err)
    // 身份验证失败后的错误
    if(err.name == 'UnauthorizedError') return res.cc('身份验证失败！')
    // 未知的错误
    res.cc(err)
})

// 启动服务器 监听3007 并开启回调函数
app.listen(3007, () => {
    console.log('api server is running at http://127.0.0.1:3007')
})