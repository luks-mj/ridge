<template>
  <div>
    <el-card class="box-card">
      <div>
        <el-form ref="form" :model="form" label-width="0px">
          <el-row :gutter="20">
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-form-item>
                  <el-select
                    v-model="form.departmentname"
                    placeholder="选择区域"
                    size="small"
                  >
                    <el-option
                      label="分水一楼"
                      value="分水一楼"
                    ></el-option>
                    <el-option label="分水二楼" value="分水二楼"></el-option>

                  </el-select>
                </el-form-item></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-form-item>
                  <el-select
                    v-model="form.roomNo"
                    placeholder="选择窗口"
                    size="small"
                  >
                    <el-option label="10" value="10"></el-option>
                    <el-option label="13" value="13"></el-option>
                    <el-option label="14" value="14"></el-option>
                    <el-option label="15" value="15"></el-option>
                    <el-option label="16" value="16"></el-option>
                    <el-option label="17" value="17"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="4" value="4"></el-option>
                    <el-option label="5" value="5"></el-option>
                    <el-option label="6" value="6"></el-option>
                    <el-option label="7" value="7"></el-option>
                    <el-option label="8" value="8"></el-option>
                    <el-option label="9" value="9"></el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>

            <el-col :span="2"
              ><div class="grid-content bg-purple">
                <el-button type="primary" @click="handelclick" size="small"
                  >查询</el-button
                >
              </div></el-col
            >
          </el-row>
        </el-form>

        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column label="所属区域" prop="departmentname" width="160">
          </el-table-column>
          <el-table-column prop="groupname" label="窗口" width="50">
          </el-table-column>
          <el-table-column
            width="100"
            prop="evlDate"
            label="时间"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total"
            label="总办件量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="veryGood"
            label="满意量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="noBad"
            width="90"
            label="一般满意量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="bad"
            label="不满意量"
            show-overflow-tooltip
          ></el-table-column>

          <el-table-column
            width="130"
            prop="unResponse"
            label="未评价(群众未评)"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="toTal1"
            label="总评价量"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="manYIdu"
            label="满意率"
            show-overflow-tooltip
          > <template slot-scope="scope">
            {{scope.row.manYIdu}}%
          </template></el-table-column>

        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import wicket from '../api/wicket'
export default {
  data() {
    return {
      form: {
        departmentname: "",
        roomNo: "",
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      value1: "",
      tableData: [
      /*  {
          area: "不动产交易综合业务区",
          window: "F24",
          time: "2012-11-04",
          total: "7",
          satisfaction: "4",
          ordinary: "0",
          unsatisfactory: "0",
          unevaluation: "0",
          masses: "3",
          massesnum: "4",
          efficiency: "100%",
          realize: "25%",
        },
        {
          area: "社会事物区",
          window: "F24",
          time: "2012-11-04",
          total: "7",
          satisfaction: "4",
          ordinary: "0",
          unsatisfactory: "0",
          unevaluation: "0",
          masses: "3",
          massesnum: "4",
          efficiency: "100%",
          realize: "25%",
        },
        {
          area: "商事登记区",
          window: "F24",
          time: "2012-11-04",
          total: "7",
          satisfaction: "4",
          ordinary: "0",
          unsatisfactory: "0",
          unevaluation: "0",
          masses: "3",
          massesnum: "4",
          efficiency: "100%",
          realize: "25%",
        },
        {
          area: "公安综合业务区",
          window: "F24",
          time: "2012-11-04",
          total: "7",
          satisfaction: "4",
          ordinary: "0",
          unsatisfactory: "0",
          unevaluation: "0",
          masses: "3",
          massesnum: "4",
          efficiency: "100%",
          realize: "25%",
        },
        {
          area: "社保综合服务区",
          window: "F24",
          time: "2012-11-04",
          total: "7",
          satisfaction: "4",
          ordinary: "0",
          unsatisfactory: "0",
          unevaluation: "0",
          masses: "3",
          massesnum: "4",
          efficiency: "100%",
          realize: "25%",
        },*/
      ],
      multipleSelection: [],
      currentPage: 5,
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handelclick() {
      let params = {
        roomNo:this.form.roomNo,
        pageNum: this.form.pageNum,
        pageSize: this.form.pageSize,
        departmentname: this.form.departmentname,
        beginTime: this.$moment(new Date(new Date().toLocaleDateString()).getTime()).format("YYYY-MM-DD hh:mm:ss"),
      };
      console.log("参数", params);
      this.$api.wicket.getWicketlist(params).then((res) => {
        if (res.data.code == 200) {
          this.tableData = res.data.info.list;
          this.form.total = res.data.info.total;
          consoel.log(res);
        }
      });
    },
  },
  mounted() {
    console.log(1111);
    // this.editableTabsValue = this.$store.state.menuName
    console.log(this.$store.state + "11111");
  },
  watch: {
    $router(to, from) {
      alert(1);
      console.log(to);
    },
    // editableTabsValue: this.$store.state.menuName
  },
};
</script>

<style scoped>
.time {
  width: 37vh;
}
</style>
