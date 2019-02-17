<template>
    <div class="account-manage">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>商品管理</span>
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
                            prop="barCode"
                            label="商品条形码"
                    >
                    </el-table-column>

                    <!-- 用户组 -->
                    <el-table-column
                            prop="goodsName"
                            label="商品名称"
                    >
                    </el-table-column>

                    <!-- 所属分类 -->
                    <el-table-column prop="cateName" label="所属分类">
                    </el-table-column>
                    <!-- 售价 -->
                    <el-table-column prop="costPrice" label="进价">
                    </el-table-column>

                    <el-table-column prop="salePrice" label="促销价">
                    </el-table-column>
                    <el-table-column prop="marketPrice" label="市场价">
                    </el-table-column>
                    <el-table-column prop="goodsNum" label="库存">
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    type="primary"
                                    size="mini"
                                    @click="handleEdit(scope.row.id)">
                                <i class="el-icon-edit"></i>
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row.id)">
                                <i class="el-icon-delete"></i>
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <!-- 分页 -->
                <div style="margin-top: 20px;">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[1, 3, 5, 10, 20, 50]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
                <!-- 修改的弹出模态框 -->
                <el-dialog title="账号修改" width="400px" :visible.sync="flag">
                    <!-- 回填表单 -->
                    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="70px">
                        <!-- 账号 -->
                        <el-form-item label="账号" prop="username">
                            <el-input style="width: 194px;" type="text" v-model="editForm.username" autocomplete="off"></el-input>
                        </el-form-item>

                        <!-- 选中用户组 -->
                        <el-form-item label="用户组" prop="usergroup">
                            <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
                                <el-option label="普通用户" value="普通用户"></el-option>
                                <el-option label="高级管理员" value="高级管理员"></el-option>
                            </el-select>
                        </el-form-item>

                    </el-form>
                    <!-- 表单的尾部 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="flag = false">取 消</el-button>
                        <el-button type="primary" @click="saveedit('editForm')">确 定</el-button>
                    </div>
                </el-dialog>
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
                ],
                flag: false,
                // 修改表单数据
                editForm: {
                    username: "",
                    usergroup: ""
                },
                // 验证规则
                rules: {
                    // 账号
                    username: [
                        { required: true, message: "请输入账号", trigger: "blur" },
                        { min: 2, max: 6, message: "长度在 2 - 6 位", trigger: "blur" }
                    ],
                    // 用户组
                    usergroup: [
                        { required: true, message: '请选择用户组', trigger: 'change' }
                    ]
                },
                editId: "", // 要修改的数据的id
                selectedAccount: [], // 被选中的账号数据
                currentPage: 1, // 当前页
                total: 0, // 数据总条数
                pageSize: 3 // 每页条数
            };
        },
        // 生命周期的钩子函数 created 自动触发 vue组件实例对象创建完成 dom还没有绑定 这个函数里面适合发送ajax请求 获取数据
        created() {
            // 自动发送请求 获取所有用户账号数据
            this.getaccountelist();
        },
        methods: {
            //设置获取账号数据设置分页
            getaccountelist(){
                //获取当前分页数据
                let currentPage = this.currentPage;
                let pageSize = this.pageSize;
                this.axios.get('http://127.0.0.1:888/goods/accountlist',
                    {
                        params:{
                            currentPage,
                            pageSize
                        }
                    }
                )
                    .then(response=>{
                        let{data,total} = response.data;
                        this.total = total;
                        this.tableData = data;
                        //判断当前数据存在和是否在第一页
                        if ( !data.length && this.currentPage !== 1) {
                            // 页码减去 1
                            this.currentPage -= 1;
                            // 再调用自己
                            this.getaccountelist();
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            handleSizeChange(val) {
                // 保存每页显示的条数
                this.pageSize = val;
                this.getaccountelist();
            },
            handleCurrentChange(val) {
                // 保存每页显示的条数
                this.currentPage = val;
                this.getaccountelist();
            },
            handleSelectionChange(val) {
                this.selectedAccount = val;
            },
            handleEdit(id) {
                //保存当前id
                this.editid = id;

                this.axios.get(`http://127.0.0.1:888/account/accountedit?id=${id}`)
                    .then(response=>{
                        let res = response.data[0];
                        this.editForm.username = res.username;
                        this.editForm.usergroup = res.usergroup;
                        this.flag = true;
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
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
            },
            saveedit(formName){
                this.$refs[formName].validate(valid=>{
                    if (valid){
                        //保存当前的数据
                        let params = {
                            username: this.editForm.username,
                            usergroup: this.editForm.usergroup,
                            editid: this.editid
                        };

                        this.axios.post('http://127.0.0.1:888/account/accountsaveeidt',qs.stringify( params ))
                            .then(response=>{
                                let {error_code,reason} = response.data;
                                if (error_code === 0 ){
                                    this.$message({
                                        type: "success",
                                        message: reason
                                    });
                                    this.getaccountelist();
                                } else {
                                    this.$message.error(reason);
                                }
                                this.flag = false;
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                    } else {
                        return false;
                    }
                });

            },



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