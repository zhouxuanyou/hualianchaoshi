var express = require('express');
var router = express.Router();

// 引入连接数据库模块
const connection = require('./connect');

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
    // 设置响应头 解决跨域(目前最主流的方式)
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//添加账号
router.post('/accountadd',(req,res)=>{

    //接收前端发送过来的数据
    let {username,password,usergroup} = req.body;
    // console.log('接收到前端发送过来的数据',usergroup,username,password);
   //  //将数据存入数据库
    let sqlstr = `insert into account(username, password, usergroup) values('${username}', '${password}', '${usergroup}')`;
    // console.log(sqlstr);
   //  //执行sql
   connection.query(sqlstr,(err,data)=>{
       if (err) throw err;
       // 判断受影响的行数
       if (data.affectedRows > 0) {
           // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
           res.send({"error_code": 0, "reason":"插入数据成功"});
       } else {
           // 失败：返回给前端失败的数据对象
           res.send({"error_code": 1, "reason":"插入数据失败"});
       }
    });
});

//显示账号数据
router.get('/accountlist',(req,res)=>{
    //设置sql语句
    let sqlstr = 'select * from account order by ctime desc';
    //执行sql
    connection.query(sqlstr,(err,data)=>{
        if (err) throw err;
        res.send(data);
    })
});

//删除账号
router.get('/accountdel',(req,res)=>{
    // 接收id
    let { id } = req.query;
    // 根据id 执行删除
    // 构造删除数据的sql语句
    const sqlstr = `delete from account where id = ${id}`;
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

module.exports = router;