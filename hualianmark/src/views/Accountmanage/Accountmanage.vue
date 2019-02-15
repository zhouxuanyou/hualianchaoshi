<template>
    <div class="account-manage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>账号管理</span>
            </div>
            <div class="text item">
                <!-- 账号管理表格 -->
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                >
                    <!-- 单选框 -->
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>

                    <!-- 账号 -->
                    <el-table-column
                            prop="username"
                            label="账号"
                    >
                    </el-table-column>

                    <!-- 用户组 -->
                    <el-table-column
                            prop="usergroup"
                            label="用户组"
                    >
                    </el-table-column>

                    <!-- 日期 -->
                    <el-table-column
                            label="创建日期"
                    >
                        <template slot-scope="scope">{{ scope.row.ctime | filterctime}}</template>
                    </el-table-column>

                    <!-- 操作 -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    type="primary"
                                    size="mini"
                                    @click="handleEdit(scope.row.id)">
                                <i class="el-icon-edit"></i> 编辑
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.id)">
                                <i class="el-icon-delete"></i>  删除
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </el-card>

    </div>
</template>

<script>
    import moment from 'moment';
    import qs from 'qs';
    export default {
        name: "Accountmanage",
        data() {
            return {
                tableData: [
                ]
            };
        },
        // 生命周期的钩子函数 created 自动触发 vue组件实例对象创建完成 dom还没有绑定 这个函数里面适合发送ajax请求 获取数据
        created() {
            // 自动发送请求 获取所有用户账号数据
            this.getaccountelist();
        },
        methods: {
            //设置获取账号数据
            getaccountelist(){
                this.axios.get('http://127.0.0.1:888/account/accountlist')
                    .then(response=>{

                        this.tableData = response.data
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            handleSelectionChange(val) {
                this.multiplication = val;
            },
            handleEdit() {},
            //删除账号
            handleDelete(id) {
                this.$confirm('你确定要删除吗？','提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(()=>{
                        this.axios.get(`http://127.0.0.1:888/account/accountdel?id=${id}`)
                            .then(response=>{
                                // 接收后端返回的错误码 和 提示信息
                                let { error_code, reason } = response.data;
                                // 判断
                                if (error_code === 0) {
                                    // 弹出删除成功的提示
                                    this.$message({
                                        type: "success",
                                        message: reason
                                    });
                                    // 输出列表（再次调用请求所有用户账号的函数 由于之前已经删除了 所以再次请求 得到的是删除后的数据）
                                    this.getaccountelist();
                                } else {
                                    // 弹出删除失败的提示
                                    this.$message.error(reason);
                                }

                            })
                            .catch(err=>{
                                console.log(err)
                            })

                    })
            }
        },
        filters:{
            filterctime(ctime){
                return moment(ctime).format("YYYY/MM/DD HH:mm:ss");

            }
        }
    }
</script>

<style lang="less">
    .account-manage {
        .el-card {
            .el-card__header {
                text-align: left;
                font-size: 20px;
                font-weight: 600;
                background-color: #f1f1f1;
            }
        }
    }
</style>