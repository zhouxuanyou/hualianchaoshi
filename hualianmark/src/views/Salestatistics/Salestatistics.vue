<template>
    <div class="salestatistics">
        <!-- 面板组件 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>销售统计</span>
            </div>
            <div class="text item">
                <!-- 报表容器 -->
                <div id="main" style="height:400px"></div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts';
    export default {
        // 这个生命周期可以获取dom
        mounted () {
            // 基于准备好的dom，初始化echarts图表
            var myChart = echarts.init(document.getElementById('main'));

            // 配置对象 （关键就是发送ajax请求 获取到后端数据 使用后端数据 来修改这份配置）
            var option = {
                tooltip: {
                    show: true
                },
                legend: {
                    data:['销量']
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ["1月","2月","3月","4月","5月","6月", "7月"]
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        "name":"销量",
                        "type":"bar",
                        "data":[] // 没有数据
                    }
                ]
            };

            // 为echarts对象加载数据
            myChart.setOption(option);

            // 发送ajax给后端 获取到一份销量数据
            let sales = [100, 50, 160, 38, 56, 99, 10];
            myChart.setOption({  // 发送请求到后端获取数据 只需要重新 setOption 即可。
                series : [
                    {
                        "name":"销量",
                        "data":sales
                    }
                ]
            })

        }
    };
</script>

<style lang="less">
    .salestatistics {
    .el-card {
    .el-card__header {
        text-align: left;
        font-size: 20px;
        font-weight: 600;
        background-color: #f1f1f1;
    }
    .el-card__body {
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409eff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    }
    }
    }
</style>