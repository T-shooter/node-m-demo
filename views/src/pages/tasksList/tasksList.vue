<template>
  <div id="tasksList">
     <el-button @click="create" style="margin-bottom:15px;">创建任务</el-button>
     <el-table
      name="taskTable"
      :data="taskData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="门店ID">
              <span>{{ props.row.storeId }}</span>
            </el-form-item>
            <el-form-item label="icon">
              <span>{{ props.row.taskIcon }}</span>
            </el-form-item>
            <el-form-item label="标文案">
              <span>{{ props.row.tagWords }}</span>
            </el-form-item>
            <el-form-item label="标背景色">
              <span>{{ props.row.tagBgColor }}</span>
            </el-form-item>
            <el-form-item label="标字色">
              <span>{{ props.row.tagWordsColor }}</span>
            </el-form-item>
            <el-form-item label="奖品标icon">
              <span>{{ props.row.prizeCate }}</span>
            </el-form-item>
            <el-form-item label="按钮-已完成">
              <span>{{ props.row.buttonDone }}</span>
            </el-form-item>
            <el-form-item label="按钮-未完成">
              <span>{{ props.row.buttonUndone }}</span>
            </el-form-item>
            <el-form-item label="跳转协议">
              <span>{{ props.row.jumpType }}</span>
            </el-form-item>
            <el-form-item label="有效期">
              <span>{{ props.row.expiry }}</span>
            </el-form-item>
            <el-form-item label="周期限制">
              <span>{{ props.row.rate }}</span>
            </el-form-item>
            <el-form-item label="奖励鲜豆值">
              <span>{{ props.row.awardValue }}</span>
            </el-form-item>
            <el-form-item label="展示平台">
              <span>{{ props.row.showPlatform }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="任务ID"
        prop="taskId">
      </el-table-column>
      <el-table-column
        label="任务名称"
        prop="taskName">
      </el-table-column>
      <el-table-column
        width="160"
        label="创建时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        label="任务属性">
        <template slot-scope="scope">
          <span v-if="scope.row.taskAttribute === 1">常规</span>
          <span v-if="scope.row.taskAttribute === 2">特殊</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务类型">
        <template slot-scope="scope">
          <span v-if="scope.row.taskCate === 1">访问门店</span>
          <span v-if="scope.row.taskCate === 2">关注门店</span>
        </template>
      </el-table-column>
      <el-table-column
        label="任务标文案"
        prop="tagWords">
      </el-table-column>
      <el-table-column
        label="奖品标文案"
        prop="prizeWords">
      </el-table-column>
      <el-table-column
        label="展示平台">
        <template slot-scope="scope">
          <span v-if="scope.row.showPlatform === '1'">APP</span>
          <span v-if="scope.row.showPlatform === '2'">H5</span>
          <span v-if="scope.row.showPlatform === '3'">RN</span>
          <span v-if="scope.row.showPlatform === '4'">小程序</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="modifyRow(scope.row, scope.$index)" type="text" size="small">修改</el-button>
          <el-button @click="deleteRow(scope.row, scope.$index)" type="text" size="small">删除</el-button>
          <el-button v-if="scope.row.top === 0" @click="setTopRow(scope.row, scope.$index)" type="text" size="small">置顶</el-button>
          <el-button v-else @click="setCancelTopRow(scope.row, scope.$index)" type="text" size="small">取消置顶</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="padding:20px 0;float:right;"
      @size-change="handleSizeChangeFirstOrder"
      @current-change="handleCurrentChangeFirstOrder"
      :current-page="result.pageNo"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="result.totalCount">
    </el-pagination>
    <!-- 编辑弹窗 -->
    <dialogForm :dialogFormShow="dialogFormShow" @pageQuery="pageQuery" @closeDialog="closeDialog" :formData="formData" :mode="mode"></dialogForm>
  </div>
</template>

<script>
import dialogForm from '../../components/tasksForm/tasksForm.vue'
export default {
  components: {
    dialogForm
  },
  data() {
    return {
      result: { // 分页
        pageNo: 1,
        pageSize: 10,
      },
      dialogFormShow: false,
      mode: '',
      formData: [],
      topShow: true, // 默认显示置顶
      taskData: []
    }
  },
  mounted () {
    // this.pageQuery()
    this.ip()
    this.test()
  },
  methods: {
    test () {
      this.$axios.post('/v1/test',{
        ak: 'dNHdTPGMugMFpt',
        service_id: '127980',
        entity_name: '小明',
        latitude: '39.922018',
        longitude: '116.44365',
        loc_time: '1488785466',
        coord_type_input: 'wgs84',
      }).then(res => {
        console.log(res,'res1')
      })
    },
    ip () {
      this.$axios.get('/v1/ip', {
        params: {
            ip: '220.249.18.222',
            key: '4NMBZ-SRVLS-U7FOA-675QA-RS63F-QTFHO'
        }
      }).then(res => {
        console.log(res,'res')
      })
    },
    pageQuery () {
      this.$axios.post('/taskConfig/pageQuery', {
        pageNo: this.result.pageNo,
        pageSize: this.result.pageSize
      }).then(res => {
        if (res.data.code === '0') {
          this.taskData = res.data.result.resultList
          this.result.totalCount = res.data.result.totalCount
        }
      })
    },
    // 分页
    handleSizeChangeFirstOrder(val) {
      console.log(`每页 ${val} 条`);
      this.result.pageSize = val
      this.searchFirstOrderStore()
    },
    handleCurrentChangeFirstOrder(val) {
      console.log(`当前页: ${val}`);
      this.result.pageNo = val
      this.searchFirstOrderStore()
    },
    
    // 创建按钮
    create () {
      this.mode = 'createMode'
      this.dialogFormShow = true
      // this.form = {}
      // this.form.platShareProportion = 100
    },
    closeDialog () {
      this.dialogFormShow = false
    },
    // 修改按钮
    modifyRow () {
      this.mode = 'modifyMode'
      this.dialogFormShow = true
      this.formData = this.taskData
      // this.dialogFormVisible = true
    },
    // 删除
    deleteRow (row, index) {
      console.log (row);
      this.$axios.get('/taskConfig/removeTaskConfig?id=' + row.id).then(res => {
        if (res.data.code === '0') {
         this.pageQuery()
        }
        this.$message(res.data.msg)
      })
    },
    setTopRow (row, index) {
      this.$axios.get('/taskConfig/stick?id=' + row.id).then(res => {
        console.log(res,'res')
        this.$message(res.data.msg)
        this.pageQuery()
      })
    },
    setCancelTopRow (row, index) {
      this.$axios.get('/taskConfig/cancelStick?id=' + row.id).then(res => {
        console.log(res,'res')
        this.$message(res.data.msg)
        this.pageQuery()
      })
    }
  }
}
</script>

