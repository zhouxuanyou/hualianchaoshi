<template>
    <div class="passwordmodify">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>
            <div class="text item">
                <!-- 添加账号表单 -->
                <el-form size="mini" :model="Passwordmodifyform" status-icon :rules="rules" ref="Passwordmodifyform" label-width="100px" class="demo-ruleForm">
                    <!-- 账号 -->
                    <el-form-item label="旧密码" prop="oldpwd">
                        <el-input type="text" v-model="Passwordmodifyform.oldpwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 密码 -->
                    <el-form-item label="密码" prop="password">
                        <el-input type="text" v-model="Passwordmodifyform.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="checkPwd">
                        <el-input type="text" v-model="Passwordmodifyform.checkPwd" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 登录按钮&重置按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('Passwordmodifyform')">添加</el-button>
                        <el-button @click="resetForm('Passwordmodifyform')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import qs from 'qs';
    export default {
        name: "Passwordmodify",
        data() {
            // 自定义密码的验证
            const pass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else if (value.length < 3 || value.length > 6) {
                    callback(new Error("长度在 3 - 6 位"));
                } else {
                    if (this.Passwordmodifyform.checkPwd !== "") {
                        this.$refs.Passwordmodifyform.validateField("checkPwd");
                    }
                    callback();
                }
            };
            // 自定义确认密码的验证
            const checkPass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.Passwordmodifyform.password) {
                    callback(new Error("两次密码不一致"));
                } else {
                    callback();
                }
            };

            //老密码验证
            const oldpass = (rule,value,callback)=>{
                let username = window.localStorage.getItem('username');
                this.req.get(`/account/chekoldpwd`,{
                    odlpwd:value,
                    username
                })
                    .then(response=>{
                        let {error_code,reason} = response.data;
                        if (error_code === 0 ){
                            callback();
                        } else {
                            callback(new Error(reason));
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
            };

            return {
                // 添加账号表单数据
                Passwordmodifyform: {
                    oldpwd: "",
                    password: "",
                    checkPwd: ""
                },
                // 验证规则
                rules: {
                    // 账号
                    oldpwd: [
                        { required: true, validator: oldpass, trigger: "blur" }
                    ],
                    // 密码
                    password: [{ required: true, validator: pass, trigger: "blur" }],
                    // 确认密码
                    checkPwd: [{ required: true, validator: checkPass, trigger: "blur" }],

                }
            };
        },
        methods: {
            // 点击登录按钮 触发这个函数
            submitForm(formName) {
                // 获取表单组件 调用验证方法
                this.$refs[formName].validate(valid => {
                    // 如果所有验证通过 valid就是true
                    if (valid) {

                        // 收集用户输入的所有账号数据
                        let params = {
                            oldpwd: this.Passwordmodifyform.oldpwd,
                            password: this.Passwordmodifyform.password,
                            username:window.localStorage.getItem('username')

                        };

                        // //   console.log(params)
                        // // 跳转到账号管理页面
                        // this.$router.push('/accountmanage')
                        this.req.post('/account/savepwdedit',params)
                            .then(response=>{
                                // 接收后端返回的错误码 和 提示信息
                                let { error_code,  reason } = response;
                                if (error_code === 0){
                                    this.$message({
                                        type: 'success',
                                        message: reason
                                    });
                                    window.localStorage.removeItem('token');
                                    // 跳转到账号管理列表
                                    this.$router.push('/login')
                                }else {
                                    this.$message.error(reason);
                                }

                            })
                            .catch(err=>{
                                console.log(err)
                            })
                    } else {
                        // 否则就是false
                        return false;
                    }
                });
            },
            // 点击重置按钮 触发这个函数
            resetForm(formName) {
                // this.$refs.loginForm.resetFields() 获取整个表单组件 调用重置方法
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less">
    .passwordmodify {
        .el-card {
            .el-card__header {
                text-align: left;
                font-size: 20px;
                font-weight: 600;
                background-color: #f1f1f1;
            }
            .el-card__body {
                text-align: left;
                .el-form {
                    width: 290px;
                    .el-form-item {
                        margin-bottom: 24px;
                    }
                }
            }
        }
    }
</style>