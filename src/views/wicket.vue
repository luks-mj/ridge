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
         <!--   <el-col :span="1"
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
          <el-table-column label="所属区域" prop="departmentname" >
            分水一楼
          </el-table-column>
          <el-table-column prop="roomno" label="窗口">
          </el-table-column>
          <el-table-column
            prop="evlDate"
            label="时间"
            show-overflow-tooltip
          >2021-03-11
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
    export default {
        data() {
            return {
                form: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    timeData: [],
                    departmentname: "",
                    roomNo: ""
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
                    roomno: this.form.roomNo,
                    pageNum: this.form.pageNum,
                    pageSize: this.form.pageSize,
                    //departmentname: this.form.departmentname,
                    beginTime: beginTime == undefined ?
                        "" : this.$moment(beginTime).format("YYYY-MM-DD hh:mm:ss"),
                    endTime: endTime == undefined ?
                        "" : this.$moment(endTime).format("YYYY-MM-DD hh:mm:ss"),
                };
                this.$api.wicket.getWicketlist(params).then((res) => {
                    console.log(params)
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
            $router(to, from) {

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