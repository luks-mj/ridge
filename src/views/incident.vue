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
                    v-model="form.groupname"
                    placeholder="选择事项"
                    size="small"
                  >
                    <el-option label="养老综合业务FS" value="养老综合业务FS"></el-option>
                    <el-option label="市场监管综合业务FS" value="市场监管综合业务FS"></el-option>
                    <el-option label="车架管综合业务FS" value="车架管综合业务FS"></el-option>
                    <el-option label="公安一窗通办" value="公安一窗通办"></el-option>
                    <el-option label="交警综合业务FS" value="交警综合业务FS"></el-option>
                    <el-option label="身份证受理业务FS" value="身份证受理业务FS"></el-option>
                    <el-option label="户籍综合业务FS" value="户籍综合业务FS"></el-option>
                    <el-option
                      label="税务(房产交易、耕占)FS"
                      value="税务(房产交易、耕占)FS"
                    ></el-option>
                    <el-option label="分水镇综合业务FS" value="分水镇综合业务FS"></el-option>
                    <el-option label="医疗综合业务FS" value="医疗综合业务FS"></el-option>
                    <el-option label="市民卡综合业务FS" value="市民卡综合业务FS"></el-option>
                    <el-option
                      label="就业实业综合业务FS"
                      value="就业实业综合业务FS"
                    ></el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>

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
          <!--  <el-col :span="1"
              ><div class="grid-content bg-purple">
                <el-button type="primary" size="small">导出数据</el-button>
              </div></el-col
            >-->
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
          <el-table-column label="事项" prop="groupname" >
          </el-table-column>
          <!-- <el-table-column prop="window" label="窗口"  width="50"> </el-table-column> -->
          <el-table-column
         
            prop="evlDate"
            label="时间"
            show-overflow-tooltip
          >
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

<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="form.total">
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
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    groupname: "",
                    timeData: [],
                },
                tableData: [],
                multipleSelection: [],
                currentPage: 5,
            };
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.form.pageSize = val;
                this.getSearchList();
            },
            handleCurrentChange(val) {
                this.form.pageNum = val;
                this.getSearchList();
            },
            getSearchList() {
                let beginTime = this.form.timeData[0];
                let endTime = this.form.timeData[1];
                let params = {
                    pageNum: this.form.pageNum,
                    pageSize: this.form.pageSize,
                    groupname: this.form.groupname,
                    beginTime: beginTime == undefined ?
                        "" : this.$moment(beginTime).format("YYYY-MM-DD hh:mm:ss"),
                    endTime: endTime == undefined ?
                        "" : this.$moment(endTime).format("YYYY-MM-DD hh:mm:ss"),
                };
                this.$api.wicket.getIncidentlist(params).then((res) => {
                    this.tableData = res.data.info.list;
                    this.form.total = res.data.info.total;
                });
            },
        },
        mounted() {
            this.getSearchList();
            // this.editableTabsValue = this.$store.state.menuName
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