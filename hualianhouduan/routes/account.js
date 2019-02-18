var express = require('express');
var router = express.Router();

// 引入连接数据库模块
const connection = require('./connect');
const jwt = require('jsonwebtoken');
const secrekey = 'nihao';

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

//显示账号数据和分页
router.get('/accountlist',(req,res)=>{
    //接收传过来的数据
    let {pageSize,currentPage}=req.query;
    //设置前置判断当前数据是否为空
    pageSize = pageSize?pageSize:3;
    currentPage = currentPage?currentPage:1;
    //设置sql语句
    let sqlstr = 'select * from account order by ctime desc';
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

//修改账号回填
router.get('/accountedit',(req,res)=>{
    let {id} = req.query;
    //设置sql
    let sqlstr = `select * from account where id = ${id}`;
    connection.query(sqlstr,(err,data)=>{
        if (err) throw err;
        res.send(data);
    })
});

//设置保存修改
router.post('/accountsaveeidt',(req,res)=>{
    let {username,usergroup,editid} = req.body;
    //设置sql
    let sqlstr = `update account set username='${username}', usergroup='${usergroup}' where id=${editid}`;
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

//批删
router.get('/batchdelete',(req,res)=>{
    //接收前端发送过来的数据
    let {selectedId} = req.query;
    // console.log(selectedId);
    //构造sql语句
    let sqlstr = `delete from account where id in (${selectedId})`;

    // console.log(sqlstr);
    connection.query(sqlstr,(err,data)=>{
        if (err) throw err;
        if (data.affectedRows > 0) {
            res.send({"error_code": 0, "reason":"批量删除成功"})
        } else {
            res.send({"error_code": 1, "reason":"批量删除失败"})
        }
    })

});

//登录模块
router.post('/login',(req,res)=>{
   let {username,pwd}=req.body;
   let sqlstr = `select * from account where username='${username}'and password='${pwd}'`;
   connection.query(sqlstr,(err,data)=>{
       if (err) throw err;
       if (data.length){
           let obj = data[0];
           let objs = JSON.stringify(obj);
           let newobj = JSON.parse(objs);
           //生成token
           let token = jwt.sign(newobj,secrekey,{expiresIn: 60 * 60});
           res.send({"error_code": 0, "reason":"登录成功",token,"username":newobj.username})
       } else {
           res.send({"error_code": 1, "reason":"登录失败,请输入正确的用户名密码"})
       }
   })
});

module.exports = router;