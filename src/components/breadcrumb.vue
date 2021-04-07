<template>
  <div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @edit="handleTabsEdit"
      @tab-click="tabclick"
    >
      <el-tab-pane
        :addable="false"
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        {{ item.content }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "menuList",
  data () {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "窗口办件量统计报表 ",
          name: "wicket",
        },
        {
          title: "工号办件量统计报表",
          name: "jobNum",
        },
        {
          title: "事项办件量统计报表",
          name: "incident",
        },
        {
          title: "部门办件量统计报表",
          name: "department",
        },
      ],
    };
  },

  methods: {
    handleTabsEdit (targetName, action) {
      // console.log(targetName)
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: "New Tab",
          name: newTabName,
          content: "New Tab content",
        });
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        console.log(this.editableTabsValue + '11111')
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },

    tabclick (tab) {
      console.log(tab.index);
      this.$store.dispatch('menuNames', tab.name)
      if (tab.index === "0") {
        this.$router.push({ path: "/wicket" });
      } else if (tab.index === "1") {
        this.$router.push({ path: "/jobNum" });
      } else if (tab.index === "2") {
        this.$router.push({ path: "/incident" });
      } else if (tab.index === "3") {
        this.$router.push({ path: "/department" });
      }
    },
    getBreadcrumb () {
      this.editableTabsValue = this.$store.state.menuName
    }
  },
  mounted () {
    this.getBreadcrumb();
  },
  watch: {
    $route () {
      this.getBreadcrumb();
    }
  }
};
</script>

<style>
</style>