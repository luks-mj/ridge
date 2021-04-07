<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="activepath"
      router
      @select="selectMenu"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-chat-round"></i>
          <span>评价管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="item in list"
            :key="item.id"
            :index="item.path"
            >{{ item.label }}</el-menu-item
          >

          <!-- <el-menu-item index="wicket">窗口办件量统计报表</el-menu-item>
          <el-menu-item index="jobNum">工号办件量统计报表</el-menu-item>
          <el-menu-item index="incident">事项办件量统计报表</el-menu-item>
          <el-menu-item index="department">部门办件量统计报表</el-menu-item>
          <el-menu-item index="today">今日办件统计</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "menuList",
  data () {
    return {
      activepath: 'wicket',
      list: [
        { id: "1", label: "窗口办件量统计报表", path: "wicket" },
        { id: "2", label: "工号办件量统计报表", path: "jobNum" },
        { id: "3", label: "事项办件量统计报表", path: "incident" },
        { id: "4", label: "部门办件量统计报表", path: "department" },
        { id: "5", label: "今日办件统计", path: "today" },
      ],
      openedTab: []
    };
  },
  methods: {
    selectMenu (val, name, e) {
      console.log(val)
      this.$store.dispatch('menuNames', val)
    }
  },
  mounted () {
    this.activepath = this.$store.state.menuName
  },
  watch: {
    $route () {
      this.activepath = this.$store.state.menuName
    }
  }
};
</script>

<style>
</style>