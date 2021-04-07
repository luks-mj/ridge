<template>
  <el-container class="home-container">
    <el-header class="header-font">分水镇便民管理系统</el-header>
    <el-container>
      <el-aside width="200px" class="list">
        <menu-list></menu-list>
      </el-aside>
      <el-main>
        <breadcrumb />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuList from "@/components/MenuList";
import breadcrumb from "@/components/breadcrumb";
export default {
  components: {
    MenuList,
    breadcrumb
  },
  data () {
    return {

    };
  },

  methods: {


  },
  mounted () {


  },

};
</script>

<style>
.home-container {
  height: 100%;
}
.list {
  height: calc(100vh - 60px);
}
.header-font {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 60px;
}
.el-header {
  /* background: #409eff; */
}
.el-aside {
  /* background: #627bca; */
}
/* .el-tabs__new-tab{
  display: none;
} */
</style>
