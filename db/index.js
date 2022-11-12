/*
 * @Author: Changwei Cao
 * @Date: 2022-11-12 13:30:01
 * @LastEditors: Changwei Cao
 * @LastEditTime: 2022-11-12 13:31:48
 * @Description: 
 */
const mysql = require('mysql')

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '888888',
    database: 'nodejs',
})

module.exports = db