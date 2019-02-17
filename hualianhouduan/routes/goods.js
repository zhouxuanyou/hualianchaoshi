var express = require('express');
var router = express.Router();

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
    // 设置响应头 解决跨域(目前最主流的方式)
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


// 引入连接数据库模块
const connection = require('./connect');

//添加商品
router.post('/addgoods', (req, res) => {

    // 接收参数
    let { cateName, barCode, goodsName, salePrice, marketPrice, costPrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc } = req.body;

    // 构造sql语句
    const sqlStr = 'insert into goods(cateName, barCode, goodsName, salePrice,marketPrice, costPrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc) values(?,?,?,?,?,?,?,?,?,?,?,?)';
    // 接收到的数据参数
    const sqlParams = [cateName, barCode, goodsName, salePrice, marketPrice, costPrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc]

    // 执行sql语句
    connection.query(sqlStr, sqlParams, (err, data) => {
        if (err) {
            throw err;
        } else {
            // 如果受影响的数据行数 > 0 就是成功
            if (data.affectedRows > 0) {
                // 返回成功的信息（数据对象）给前端
                res.send({"rstCode": 1, "msg":"添加商品成功"})

            } else {
                // 否则就是失败 返回失败的信息（数据对象）给前端
                res.send({"rstCode": 0, "msg":"添加商品失败"})
            }
        }
    })
});




module.exports = router;