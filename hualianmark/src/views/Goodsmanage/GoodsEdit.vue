<template>
    <div class="goodsedit">
        <el-card class="box-card">
            <!-- 面板标题 -->
            <div slot="header" class="clearfix">
                <span>修改商品</span>
            </div>

            <!-- 面板内容 -->
            <div class="text item">
                <!-- 添加账户表单 -->
                <el-form :model="addGoodsForm" status-icon :rules="rules" ref="addGoodsForm" label-width="100px" class="demo-ruleForm">
                    <!-- 所属分类 -->
                    <el-form-item label="请选择分类" prop="cateName">
                        <el-select v-model="addGoodsForm.cateName" placeholder="请选择分类">
                            <el-option label="酒水类" value="酒水类"></el-option>
                            <el-option label="水果类" value="水果类"></el-option>
                            <el-option label="电子类" value="电子类"></el-option>
                            <el-option label="食品类" value="食品类"></el-option>
                            <el-option label="生活用品" value="生活用品"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 条形码 -->
                    <el-form-item label="条形码" prop="barCode">
                        <el-input type="text" v-model="addGoodsForm.barCode" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 商品名称 -->
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input type="text" v-model="addGoodsForm.goodsName" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 商品进价 -->
                    <el-form-item label="商品进价" prop="costPrice">
                        <el-input type="text" v-model.number="addGoodsForm.costPrice" @blur="autoPrice"></el-input>
                    </el-form-item>
                    <!-- 商品市场价 -->
                    <el-form-item label="商品市场价" prop="marketPrice">
                        <el-input type="text" v-model.number="addGoodsForm.marketPrice" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 商品售价 -->
                    <el-form-item label="商品售价" prop="salePrice">
                        <el-input type="text" v-model.number="addGoodsForm.salePrice" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 入库数量 -->
                    <el-form-item label="入库数量" prop="goodsNum">
                        <el-input type="text" v-model.number="addGoodsForm.goodsNum" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 商品重量 -->
                    <el-form-item label="商品重量" prop="goodsWeight">
                        <el-input type="text" v-model.number="addGoodsForm.goodsWeight" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- 商品单位 -->
                    <el-form-item label="选择单位" prop="unit">
                        <el-select v-model="addGoodsForm.unit" placeholder="选择单位">
                            <el-option label="个" value="个"></el-option>
                            <el-option label="件" value="件"></el-option>
                            <el-option label="盒" value="盒"></el-option>
                            <el-option label="斤" value="斤"></el-option>
                            <el-option label="袋" value="袋"></el-option>
                            <el-option label="瓶" value="瓶"></el-option>
                            <el-option label="箱" value="箱"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 会员优惠 -->
                    <el-form-item label="会员优惠">
                        <el-radio-group v-model="addGoodsForm.discount">
                            <el-radio label="享受"></el-radio>
                            <el-radio label="不享受"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 是否促销 -->
                    <el-form-item label="是否促销">
                        <el-radio-group v-model="addGoodsForm.promotion">
                            <el-radio label="促销"></el-radio>
                            <el-radio label="不促销"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- 商品描述 -->
                    <el-form-item label="商品描述">
                        <el-input type="textarea" v-model="addGoodsForm.goodsDesc"></el-input>
                    </el-form-item>

                    <!-- 添加按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('addGoodsForm')">修改</el-button>
                        <el-button @click="resetForm('addGoodsForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    let {editId} = require('./Goodsmanage');
    export default {
        name: "GoodsAdd",
        data() {
            // 自定义一个验证密码一致性的函数
            const confirmPwd = (rule, value, callback) => {
                // 非空验证
                if (value === "") {
                    // 输出不能为空的提示
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.addGoodsForm.password) {
                    // 一致性验证
                    // 输出密码不一致的回调
                    callback(new Error("两次密码不一致"));
                } else {
                    // 成功提示（绿色勾勾）
                    callback();
                }
            };
            return {
                eiditid:'',
                // 登录表单数据对象
                addGoodsForm: {
                    cateName: "",
                    barCode: "",
                    goodsName: "",
                    costPrice: "",
                    marketPrice: "",
                    salePrice: "",
                    goodsNum: "",
                    goodsWeight: "",
                    unit: "",
                    discount: "",
                    promotion: "",
                    goodsDesc: ""
                },
                // 验证的字段
                rules: {
                    // 验证分类名称
                    cateName: [
                        { required: true, message: "账号不能为空", trigger: "blur" }, // 非空验证
                        {
                            min: 3,
                            max: 6,
                            message: "长度必须 3 到 6 个字符",
                            trigger: "change"
                        } // 长度验证
                    ],
                    // 条形码
                    barCode: [
                        { required: true, message: "条形码不能为空", trigger: "blur" } // 非空验证
                    ],
                    // 商品名称
                    goodsName: [
                        { required: true, message: "商品名称不能为空", trigger: "blur" } // 非空验证
                    ],
                    // 商品进价
                    costPrice: [
                        { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                    ],
                    // 市场价
                    marketPrice: [
                        { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                    ],
                    // 售价
                    salePrice: [
                        { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                    ],
                    // 入库数量
                    goodsNum: [
                        { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                    ],
                    // 商品重量
                    goodsWeight: [
                        { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                    ],
                    // 单位
                    unit: [
                        { required: true, message: "不能为空", trigger: "change" } // 非空验证
                    ],
                    // 是否打折
                    discount: [
                        { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                    ],
                    // 是否促销
                    promotion: [
                        { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                    ],
                    // 商品描述
                    goodsDesc: [
                        { required: true, message: "不能为空", trigger: "blur" } // 非空验证
                    ]
                }
            };
        },
        created() {
            // 自动发送请求 获取所有用户账号数据
            this.getgoodslist();
        },
        methods: {
            //表单回填
            getgoodslist(){

                let id  = this.$route.query.id;
                // id=id?id:1;
                if (!id){
                    return false;
                }
                // console.log(id);

                this.req.get(`/goods/goodslist`,{id})
                    .then(response=>{
                        let res = response[0];
                        console.log(res);
                        this.addGoodsForm.cateName = res.cateName;
                        this.addGoodsForm.barCode = res.barCode;
                        this.addGoodsForm.goodsName = res.goodsName;
                        this.addGoodsForm.costPrice = res.costPrice;
                        this.addGoodsForm.marketPrice = res.marketPrice;
                        this.addGoodsForm.salePrice = res.salePrice;
                        this.addGoodsForm.goodsNum = res.goodsNum;
                        this.addGoodsForm.goodsWeight = res.goodsWeight;
                        this.addGoodsForm.unit = res.unit;
                        this.addGoodsForm.discount = res.discount;
                        this.addGoodsForm.promotion = res.promotion;
                        this.addGoodsForm.goodsDesc = res.goodsDesc;

                    })
                    .catch(err=>{
                        console.log(err);
                    })
            },
            // 自动填充价格
            autoPrice () {
                this.addGoodsForm.marketPrice = this.addGoodsForm.costPrice * 3;
                this.addGoodsForm.salePrice = this.addGoodsForm.costPrice * 2;
            },
            // 表单提交触发的函数
            submitForm(formName) {

                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 获取用户输入的要新增的账号数据，用一个参数对象保存
                        let id  = this.$route.query.id;
                        // id=id?id:1;
                        if (!id){
                            return false;
                        }
                        let params = {
                            cateName: this.addGoodsForm.cateName,
                            barCode: this.addGoodsForm.barCode,
                            goodsName: this.addGoodsForm.goodsName,
                            costPrice: this.addGoodsForm.costPrice,
                            marketPrice: this.addGoodsForm.marketPrice,
                            salePrice: this.addGoodsForm.salePrice,
                            goodsNum: this.addGoodsForm.goodsNum,
                            goodsWeight: this.addGoodsForm.goodsWeight,
                            unit: this.addGoodsForm.unit,
                            discount: this.addGoodsForm.discount,
                            promotion: this.addGoodsForm.promotion,
                            goodsDesc: this.addGoodsForm.goodsDesc,
                            id:id
                        };

                        // 发送ajax请求  把数据发送给后端
                        this.req
                            .post(
                                "/goods/addgoodseidt",
                                qs.stringify(params), // 参数处理
                            )
                            .then(response => {
                                // 如果请求状态码是1 那么就是请求成功
                                if (response.rstCode === 1) {
                                    // 弹出提示信息
                                    this.$message({
                                        type: "success",
                                        message: response.msg
                                    });

                                    // 跳转到商品管理列表页面
                                    this.$router.push("/goodsmanage");
                                } else {
                                    // 弹出商品添加失败信息
                                    this.$message.error(response.msg);
                                }
                            });
                    } else {
                        console.log("前端验证不通过, 不能发送");
                        return false;
                    }
                });
            },
            // 重置表单触发的函数
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less">
    .goodsedit {
        width: 100%;
        display: flex;
        flex-direction: column;

        .el-main {
            flex: 1;
            .el-card {
                .el-card__header {
                    font-weight: 700;
                    font-size: 15px;
                    background-color: #f1f1f1;
                }
                .el-card__body {
                    .item {
                        .el-form {
                            width: 300px;
                            .el-form-item {
                                .el-form-item__label {
                                    height: 35px;
                                    line-height: 35px;
                                }
                                .el-form-item__content {
                                    height: 35px;
                                    line-height: 35px;
                                    .el-input__inner {
                                        height: 35px;
                                        line-height: 35px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>