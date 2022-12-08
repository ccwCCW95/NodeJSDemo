/*
 * @Author: Changwei Cao
 * @Date: 2022-12-07 14:32:58
 * @LastEditors: Changwei Cao
 * @LastEditTime: 2022-12-08 15:43:56
 * @Description: 用户信息路由
 */

const express = require('express')
const router = express.Router()

// 导入路由处理模块
const userinfo_handler = require('../router_handler/userinfo')

// 导入验证规则的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {update_userinfo_schema, update_password_schema} = require('../schema/user')

// 获取用户基本信息的路由
router.get('/userinfo', userinfo_handler.getUserInfo)

// 更新用户基本信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)

// 更新用户密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)

module.exports = router