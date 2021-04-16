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
                    placeholder="选择部门"
                    size="small"
                    clearable
                  >
                    <el-option
                      label="分水行政服务中心"
                      value="分水行政服务中心"
                    ></el-option>
                    <el-option
                      label="水电气专区"
                      value="水电气专区"
                    ></el-option>
                    <el-option
                      label="社保综合服务区"
                      value="社保综合服务区"
                    ></el-option>
                    <el-option
                      label="公积金综合业务区"
                      value="公积金综合业务区"
                    ></el-option>
                    <el-option
                      label="不动产交易综合业务区"
                      value="不动产交易综合业务区"
                    ></el-option>
                    <el-option
                      label="出入境综合业务区"
                      value="出入境综合业务区"
                    ></el-option>
                    <el-option
                      label="就业管理区"
                      value="就业管理区"
                    ></el-option>
                    <el-option
                      label="市民卡综合业务区"
                      value="市民卡综合业务区"
                    ></el-option>
                    <el-option
                      label="综合受理区"
                      value="综合受理区"
                    ></el-option>

                    <!-- <el-option
                      v-for="item in departmentSelList"
                      :key="item.departmentID"
                      :label="item.departmentname"
                      :value="item.departmentID"
                    ></el-option> -->
                  </el-select>
                </el-form-item>
              </div></el-col
            >
            <el-col :span="6"
              ><div class="grid-content bg-purple">
                <el-form-item>
                  <el-date-picker
                    size="small"
                    class="time"
                    v-model="form.timeData"
                    type="daterange"
                    range-separator="to"
                    start-placeholder="查询日期起"
                    end-placeholder="查询日期止"
                  >
                  </el-date-picker>
                </el-form-item></div
            ></el-col>
            <el-col :span="2"
              ><div class="grid-content bg-purple">
                <el-button type="primary" @click="getSearchList" size="small"
                  >查询</el-button
                >
              </div></el-col
            >
            <el-col :span="1"
              ><div class="grid-content bg-purple">
                <el-button type="primary" size="small">导出数据</el-button>
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
          border
        >
          <el-table-column type="selection" width="50"> </el-table-column>
          <el-table-column label="部门" prop="departmentname">
          </el-table-column>
          <el-table-column prop="roomno" label="窗口">
          </el-table-column>
          <el-table-column label="时间" show-overflow-tooltip>
            <template slot-scope="scope">{{
              scope.row.evlDate | time("YYYY-DD-MM hh:mm:ss")
            }}</template>
</el-table-column>
<el-table-column prop="total" label="总办件量" show-overflow-tooltip></el-table-column>
<el-table-column prop="veryGood" label="满意量" show-overflow-tooltip></el-table-column>
<el-table-column prop="noBad" label="一般满意量" show-overflow-tooltip></el-table-column>
<el-table-column prop="bad" label="不满意量" show-overflow-tooltip></el-table-column>

<el-table-column prop="unResponse" label="未评价(群众未评)" show-overflow-tooltip></el-table-column>
<el-table-column prop="toTal1" label="总评价量" show-overflow-tooltip></el-table-column>
<el-table-column prop="manYIdu" label="满意率" show-overflow-tooltip>
    <template slot-scope="scope">
      {{scope.row.manYIdu == 0? 100:scope.row.manYIdu}}%
          </template>
</el-table-column>
</el-table>

<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="form.total">
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
                    timeData: [],
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                },
                departmentSelList: [],
                value1: "",
                tableData: [],
                multipleSelection: [],
                currentPage: 5,
            };
        },
        methods: {
            handleSizeChange(val) {
                this.form.pageSize = val;
                this.getSearchList();
            },
            handleCurrentChange(val) {
                this.form.pageNum = val;
                this.getSearchList();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 查询
            // getSearchList(pageNum, pageSize, total,section,timeData) {
            //   pageNum = this.form.pageNum;
            //   pageSize = this.form.pageSize;
            //   total = this.form.total;
            //   // let params = this.form;
            //   section = this.form.section;
            //   timeData = this.from.timeData;
            //   console.log(section)
            //   console.log(timeData)
            //   this.$api.wicket.getSearchList(pageNum, pageSize, total,section,timeData).then((res) => {
            //     // console.log(res.data.info);
            //     this.tableData = res.data.info.list;
            //     this.form.total = res.data.info.total;
            //   });
            // },

            getSearchList() {
                // let params = this.form;

                // var beginTime =
                //   this.form.timeData[0] == ""
                //     ? ""
                //     : this.$moment(this.form.timeData[0]).format("YYYY-MM-DD hh:mm:ss");
                // var endTime =
                //   this.form.timeData[1] == ""
                //     ? ""
                //     : this.$moment(this.form.timeData[1]).format("YYYY-MM-DD hh:mm:ss");
                let beginTime = this.form.timeData[0];
                let endTime = this.form.timeData[1];
                let params = {
                    pageNum: this.form.pageNum,
                    pageSize: this.form.pageSize,
                    // total: this.form.total,
                    departmentname: this.form.departmentname,
                    // beginTime:this.form.timeData[0],
                    // endTime:this.form.timeData[1]
                    beginTime: beginTime == undefined ? "" : this.$moment(beginTime).format("YYYY-MM-DD hh:mm:ss"),
                    endTime: endTime == undefined ? "" : this.$moment(endTime).format("YYYY-MM-DD hh:mm:ss"),
                };
                if (params.departmentname == "分水行政服务中心" || params.departmentname == "") {
                    this.$api.wicket.getSearchList(params).then((res) => {
                        this.tableData = res.data.info.list;
                        this.form.total = res.data.info.total;
                    });
                } else {
                    this.tableData = null
                }

            },

            // 下拉列表
            // getSelectList() {
            //   this.$api.department.getdepartment().then((res) => {
            //     // console.log(res)
            //     this.departmentSelList = res.data;
            //   });
            // },
        },
        mounted() {
            // this.getSelectList();
            this.getSearchList();
        },
        watch: {
            $router(to, from) {},
            // editableTabsValue: this.$store.state.menuName
        },
    };
</script>

<style scoped>
    .time {
        width: 37vh;
    }
</style>