<template>
    <el-menu
            background-color="#2d3a4b"
            unique-opened
            active-text-color="rgb(64, 158, 255)"
            :default-active="this.$route.path"
            router>
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
            <el-menu-item index="/">系统信息</el-menu-item>
        </el-submenu>
        <!-- 导航二 -->
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>账号管理</template>
            <el-menu-item index="/accountmanage">账号管理</el-menu-item>
            <el-menu-item index="/accountadd">添加账号</el-menu-item>
            <el-menu-item index="/passwordmodify">密码修改</el-menu-item>
        </el-submenu>
        <!-- 导航三 -->
        <el-submenu index="3">
            <template slot="title"><i class="el-icon-goods"></i>商品管理</template>
            <el-menu-item index="/goodsmanage">商品管理</el-menu-item>
            <el-menu-item index="/goodsadd">添加商品</el-menu-item>
        </el-submenu>
        <!-- 导航四 -->
        <el-submenu index="4">
            <template slot="title"><i class="el-icon-date"></i>统计管理</template>
            <el-menu-item index="/salestatistics">销售统计</el-menu-item>
        </el-submenu>
        <!-- 导航五 -->
        <el-submenu index="5">
            <template slot="title"><i class="el-icon-star-on"></i>进货管理</template>
            <el-menu-item index="/kucunguanli">库存管理</el-menu-item>
            <el-menu-item index="/kucunadd">添加库存</el-menu-item>
        </el-submenu>
        <!-- 导航六 -->
        <el-submenu index="6">
            <template slot="title"><i class="el-icon-star-off"></i>出货管理</template>
            <el-menu-item index="/goodslist">销售列表</el-menu-item>
            <el-menu-item index="/goodschuhuo">商品出货</el-menu-item>
            <el-menu-item index="/goodstuihuo">商品退货</el-menu-item>
        </el-submenu>
        <!-- 导航七 -->
        <el-submenu index="7">
            <template slot="title"><i class="el-icon-tickets"></i>会员管理</template>
            <el-menu-item index="/zhanghguanli">账号管理</el-menu-item>
            <el-menu-item index="/zhanghaoadd">添加账号</el-menu-item>
        </el-submenu>
        <!-- 导航八 -->
        <el-submenu index="8">
            <template slot="title"><i class="el-icon-menu"></i>分类管理</template>
            <el-menu-item index="/fenleiguanli">分类管理</el-menu-item>
            <el-menu-item index="/tianjiafenlei">添加分类</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style lang="less">
    .el-menu {
        border: none;
        height: 100%;
        .el-submenu {
            .el-submenu__title {
                color: #fff;
            }
        }
        .el-menu-item {
            color: #fff;
        }
    }
</style>