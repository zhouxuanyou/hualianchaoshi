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

//显示账号数据和分页
router.get('/accountlist',(req,res)=>{
    //接收传过来的数据
    let {pageSize,currentPage}=req.query;
    //设置前置判断当前数据是否为空
    pageSize = pageSize?pageSize:3;
    currentPage = currentPage?currentPage:1;
    //设置sql语句
    let sqlstr = 'select * from goods order by ctime desc';
    //执行sql
    connection.query(sqlstr,(err,data)=>{
        if (err) throw err;
        //获取总数据条数
        let total = data.length;
        //计算分页条件
        let n = (currentPage-1)*pageSize;
        sqlstr += ` limit ${n}, ${pageSize}`;
        connection.query(sqlstr,(err,data)=>{
            if (err) throw err;
            res.send({
                total,
                data
            })
        })
    })
});

//删除账号
router.get('/goodsdel',(req,res)=>{
    // 接收id
    let { id } = req.query;
    // 根据id 执行删除
    // 构造删除数据的sql语句
    const sqlstr = `delete from goods where id = ${id}`;
    // 执行sql语句
    connection.query(sqlstr, (err, data) => {
        if (err) throw err;
        // 根据删除结果判断
        if (data.affectedRows > 0) {

            // 如果受影响行数大于0 删除成功 返回成功的数据对象给前端
            res.send({"error_code": 0, "reason":"删除数据成功"});
        } else {
            // 否则删除失败 返回失败的数据对象给前端
            res.send({"error_code": 1, "reason":"删除数据失败"});
        }
    })
});

//商品数据回填
router.get('/goodslist',(req,res)=>{
    let {id} = req.query;
    // console.log(id);
    //设置sql
    let sqlstr = `select * from goods where id = ${id}`;
    // console.log(sqlstr);
    // console.log(editId);
    connection.query(sqlstr,(err,data)=>{
        if (err) throw err;
        res.send(data);
    })
});
//修改商品数据保存
router.get('/addgoodseidtt',(req,res)=>{
    let {cateName, barCode, goodsName, salePrice, marketPrice, costPrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc,id} = req.body;
    //设置sql
    let sqlstr = `update account set cateName='${cateName}', barCode='${barCode}',goodsName='${goodsName}',salePrice='${salePrice}',marketPrice='${marketPrice}',costPrice='${costPrice}',goodsNum='${goodsNum}',goodsWeight='${goodsWeight}',unit='${unit}',discount='${discount}',promotion='${promotion}', goodsDesc='${goodsDesc}' where id=${id}`;
    connection.query(sqlstr,(err,data)=>{
        if (err) throw err;
        if (data.affectedRows > 0) {
            // 返回成功的数据对象给前端
            res.send({"error_code": 0, "reason":"修改账号成功"});
        } else {
            // 返回失败的数据对象给前端
            res.send({"error_code": 1, "reason":"修改账号失败"});
        }

    })
});


module.exports = router;