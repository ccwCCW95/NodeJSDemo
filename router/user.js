/*
 * @Author: Changwei Cao
 * @Date: 2022-11-11 15:06:14
 * @LastEditors: Changwei Cao
 * @LastEditTime: 2022-11-11 15:24:43
 * @Description: 
 */
const express = require('express')

const router = express.Router()

// 导入用户路由处理函数对应的模块
const user_handler = require('../router_handler/user')

// 注册新用户
router.post('/reguser', user_handler.regUser)

// 登录
router.post('/login', user_handler.login)

module.exports = router