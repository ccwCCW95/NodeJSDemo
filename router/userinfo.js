/*
 * @Author: Changwei Cao
 * @Date: 2022-12-07 14:32:58
 * @LastEditors: Changwei Cao
 * @LastEditTime: 2022-12-07 14:46:16
 * @Description: 用户信息路由
 */

const express = require('express')
const router = express.Router()

// 导入路由处理模块
const userinfo_handler = require('../router_handler/userinfo')

router.get('/userinfo', userinfo_handler.getUserInfo)

module.exports = router