<template>
    <div class="home">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>系统信息</span>
            </div>
            <div class="text item">
                <el-alert
                        title="商品总数：已销售的总金额888，库存商品总价：999"
                        type="info"

                        show-icon>
                </el-alert>
                <el-alert
                        title="导入数据"
                        type="success"
                        show-icon>
                </el-alert>
                <!--左右布局-->
                <el-row :gutter="20">
                    <el-col :span="12"><div >
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>销售排行</span>
                                <el-button style="float: right; padding: 3px 0" type="text"></el-button>
                            </div>
                            <div class="text item">
                                <el-table
                                        :data="saleData"
                                        stripe
                                        style="width: 100%">
                                    <el-table-column
                                            prop="goodsName"
                                            label="商品名称"
                                            >
                                    </el-table-column>
                                    <el-table-column
                                            prop="saleCount"
                                            label="销量"
                                           >
                                    </el-table-column>
                                </el-table>
                            </div>
                        </el-card>
                    </div></el-col>

                    <el-col :span="12"><div>
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>缺货的商品</span>
                            </div>
                            <div class="text item">
                                <el-table
                                        :data="stockoutData"
                                        style="width: 100%">
                                    <!-- 商品名称 -->
                                    <el-table-column
                                            prop="goodsName"
                                            label="商品名称"
                                    >
                                    </el-table-column>
                                    <!-- 库存 -->
                                    <el-table-column
                                            prop="inventory"
                                            label="库存"
                                    >
                                    </el-table-column>
                                    <!-- 操作 -->
                                    <el-table-column
                                            prop="saleCount"
                                            label="操作"
                                    >
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small">入库</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>

                            </div>
                        </el-card>
                    </div></el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                // 销量排行数据
                saleData: [
                    {
                        goodsName: "海飞丝",
                        saleCount: 10
                    },
                    {
                        goodsName: "霸王",
                        saleCount: 80
                    },
                    {
                        goodsName: "蒂花之秀",
                        saleCount: 50
                    },
                    {
                        goodsName: "飘柔",
                        saleCount: 18
                    },
                    {
                        goodsName: "飘柔",
                        saleCount: 18
                    }
                ],
                stockoutData: [
                    {
                        goodsName: "我的优乐美",
                        inventory: 1
                    },
                    {
                        goodsName: "你的娃哈哈",
                        inventory: 2
                    },
                    {
                        goodsName: "它的香飘飘",
                        inventory: 5
                    },
                    {
                        goodsName: "大家的好迪",
                        inventory: 0
                    }
                ]

            }
        }
    }
</script>

<style lang="less">
    .home{
        .el-card{
            .el-card__header{
                text-align: left;
                font-size: 20px;
                font-weight: 800;
                background: #f1f1f1;
            }
            .el-card__body {
                .item {
                    .el-alert {
                        margin-bottom: 20px;
                    }
                }
            }

        }

    }

</style>