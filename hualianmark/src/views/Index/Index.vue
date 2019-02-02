<template>
    <div class="index">
        <el-container>
            <!--left-->
            <el-aside width="200px">
                <Nav></Nav>
            </el-aside>
            <!--right-->
            <el-container>
                <el-header>
                    <Top></Top>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>
                    <Bottom></Bottom>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Nav from '@/components/Nav/Nav.vue';
    import Top from '@/components/Top/Top.vue';
    import Bottom from '@/components/Bottom/Bottom.vue';
    export default {
        components:{
            Nav,
            Top,
            Bottom
        }
    }
</script>

<style lang="less">
    .index{
        height: 100%;
        .el-container{
            height: 100%;

            .el-aside {
                background-color: #D3DCE6;
                text-align: center;
            }

            .el-main {
                background-color: #E9EEF3;
                color: #333;
                text-align: center;
            }
            .el-header,
            .el-footer {
                background-color: #fff;
                color: #2d3a4b;
                text-align: center;
                line-height: 60px;
            }
            .el-header {
                border-bottom: 1px solid #ccc;
            }
        }


    }



</style>