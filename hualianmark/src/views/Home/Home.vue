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
                <el-row>
                    <el-col :span="12"><div ></div></el-col>

                    <el-col :span="12"><div></div></el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "Home"
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