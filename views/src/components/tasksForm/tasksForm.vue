<template>
  <div id="tasksForm">
    <el-dialog title="创建任务" :visible.sync="dialogFormShow" :show-close="false" :close-on-click-modal="false">
      <el-tabs v-model="taskAttribute" @tab-click="tabClick" type="border-card">
        <el-tab-pane label="常规任务" name="1">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="名称" prop="taskName" :label-width="formLabelWidth">
              <el-input maxlength="20" v-model="ruleForm.taskName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="展示起始时间" prop="time" :label-width="formLabelWidth">
              <el-date-picker
                v-model="ruleForm.time"
                type="datetimerange"
                :picker-options="timeOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="icon" prop="taskIcon" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                action="/imgUtil/upload/"
                :on-preview="handlePreview"
                :before-upload="beforeAvatarUpload"
                :on-success="successUpload"
                :on-remove="handleRemove"
                :on-change="handleChangeUpload"
                :limit="1"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传png文件，且不超过20kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="标文案" :label-width="formLabelWidth">
              <el-input maxlength="20" v-model="ruleForm.tagWords" auto-complete="off" placeholder="最多20个字符"></el-input>
            </el-form-item>
            <el-form-item label="标背景色" :label-width="formLabelWidth">
              <el-color-picker v-model="ruleForm.tagBgColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="标字色" :label-width="formLabelWidth">
              <el-color-picker v-model="ruleForm.tagWordsColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="奖品标文案" :label-width="formLabelWidth">
              <el-input maxlength="20" v-model="ruleForm.prrzeWords" auto-complete="off" placeholder="最多20个字符"></el-input>
            </el-form-item>
            <el-form-item label="奖品标icon" :label-width="formLabelWidth" prop="prizeCate">
              <el-radio-group v-model="ruleForm.prizeCate">
                <el-radio label="1">鲜豆</el-radio>
                <el-radio label="2">优惠券</el-radio>
                <el-radio label="3">通用奖品</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="按钮-未完成" prop="buttonUndone" :label-width="formLabelWidth">
              <el-input maxlength="6" v-model="ruleForm.buttonUndone" auto-complete="off" placeholder="最多6个字符"></el-input>
            </el-form-item>
            <el-form-item label="跳转协议" prop="jumpType" :label-width="formLabelWidth">
              <el-radio v-model="ruleForm.jumpType" label="1">H5 url: <el-input size="small" v-if="ruleForm.jumpType" v-model="ruleForm.url"></el-input></el-radio>
              <div>
                <el-radio v-model="ruleForm.jumpType" label="2">Native</el-radio>
                <el-select size="small" v-model="ruleForm.native" placeholder="请选择">
                  <el-option
                    v-for="item in ruleForm.nativeOptions"
                    :key="item.native"
                    :label="item.label"
                    :value="item.native">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="展示平台" :label-width="formLabelWidth">
              <el-checkbox-group v-model="ruleForm.showPlatform">
                <el-checkbox label="1">APP</el-checkbox>
                <el-checkbox label="2">H5</el-checkbox>
                <el-checkbox label="3">RN</el-checkbox>
                <el-checkbox label="4">小程序</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item style="float:right;">
              <el-button type="primary" @click="closeDialog">取消</el-button>
              <el-button @click="submitCreate(1)">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="特殊任务" name="2">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="名称" prop="taskName" :label-width="formLabelWidth">
              <el-input maxlength="20" v-model="ruleForm.taskName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="门店ID" prop="storeId" :label-width="formLabelWidth">
              <el-input type="number" v-model="ruleForm.storeId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="taskCate" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.taskCate" placeholder="请选择">
                <el-option
                  v-for="item in ruleForm.taskCateOptions"
                  :key="item.taskCate"
                  :label="item.label"
                  :value="item.taskCate">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展示起始时间" prop="time" :label-width="formLabelWidth">
              <el-date-picker
                v-model="ruleForm.time"
                type="datetimerange"
                :picker-options="timeOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="icon" prop="taskIcon" :label-width="formLabelWidth">
              <el-upload
                class="upload-demo"
                action="/imgUtil/upload/"
                :on-preview="handlePreview"
                :before-upload="beforeAvatarUpload"
                :on-success="successUpload"
                :on-remove="handleRemove"
                :on-change="handleChangeUpload"
                :limit="1"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传png文件，且不超过20kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="标文案" :label-width="formLabelWidth">
              <el-input maxlength="20" v-model="ruleForm.tagWords" auto-complete="off" placeholder="最多20个字符"></el-input>
            </el-form-item>
            <el-form-item label="标背景色" :label-width="formLabelWidth">
              <el-color-picker v-model="ruleForm.tagBgColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="标字色" :label-width="formLabelWidth">
              <el-color-picker v-model="ruleForm.tagWordsColor"></el-color-picker>
            </el-form-item>
            
            <el-form-item label="奖励鲜豆值" prop="awardValue" :label-width="formLabelWidth">
              <el-input maxlength="20"  type="number" v-model="ruleForm.awardValue" auto-complete="off" placeholder="请输入100以内的数字"></el-input>
            </el-form-item>
            <el-form-item label="奖品标文案（前端）" :label-width="formLabelWidth">
              <span>+ </span><el-input maxlength="20" :disabled="true" v-model="ruleForm.awardValue" auto-complete="off"  size="small" style="width:70px;"></el-input><span> 鲜豆</span>
            </el-form-item>

            <el-form-item label="奖品标icon" :label-width="formLabelWidth" prop="prizeCate">
              <el-radio-group v-model="ruleForm.prizeCate">
                <el-radio label="1">鲜豆</el-radio>
                <el-radio label="2">优惠券</el-radio>
                <el-radio label="3">通用奖品</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="按钮-未完成" prop="buttonUndone" :label-width="formLabelWidth">
              <el-input maxlength="6" v-model="ruleForm.buttonUndone" auto-complete="off" placeholder="最多6个字符"></el-input>
            </el-form-item>
            <el-form-item label="按钮-已完成" prop="buttonDone" :label-width="formLabelWidth">
              <el-input maxlength="6" v-model="ruleForm.buttonDone" auto-complete="off" placeholder="最多6个字符"></el-input>
            </el-form-item>
            <el-form-item label="跳转协议" prop="jumpType" :label-width="formLabelWidth">
              <el-radio v-model="ruleForm.jumpType" label="1">H5 url: <el-input size="small" v-if="ruleForm.jumpType" v-model="ruleForm.url"></el-input></el-radio>
              <div>
                <el-radio v-model="ruleForm.jumpType" label="2">Native</el-radio>
                <el-select size="small" v-model="ruleForm.native" placeholder="请选择">
                  <el-option
                    v-for="item in ruleForm.nativeOptions"
                    :key="item.native"
                    :label="item.label"
                    :value="item.native">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="有效期" prop="expiry" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.expiry" placeholder="请选择">
                <el-option
                  v-for="item in ruleForm.expiryOptions"
                  :key="item.expiry"
                  :label="item.label"
                  :value="item.expiry">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="周期限制" prop="rate" :label-width="formLabelWidth">
              <el-select v-model="ruleForm.rate" placeholder="请选择">
                <el-option
                  v-for="item in ruleForm.rateOptions"
                  :key="item.rate"
                  :label="item.label"
                  :value="item.rate">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展示平台" :label-width="formLabelWidth">
              <el-checkbox-group v-model="ruleForm.showPlatform">
                <el-checkbox label="1">APP</el-checkbox>
                <el-checkbox label="2">H5</el-checkbox>
                <el-checkbox label="3">RN</el-checkbox>
                <el-checkbox label="4">小程序</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item style="float:right;">
              <el-button type="primary" @click="closeDialog">取消</el-button>
              <el-button @click="submitCreate(2)">确 定1</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: ['dialogFormShow', 'formData', 'mode'],
  data () {
    return {
      formLabelWidth: '150px', // 样式
      taskAttribute: '1', // 默认常规任务
      ruleForm: {
        nativeOptions: [{
          native: '1',
          label: '门店首页'
        }],
        native: '1',
        taskName: '', // 任务名称
        taskCateOptions: [{ // 任务类型
          taskCate: '1',
          label: '访问门店'
        }, {
          taskCate: '2',
          label: '关注门店'
        }],
        taskCate: '1', // 默认类型为访问门店
        prizeCate: '1', // 奖品标icon
        expiryOptions: [{ // 有效期限制
          expiry: '24',
          label: '24小时'
        }, {
          expiry: '168',
          label: '7天'
        },{
          expiry: '720',
          label: '30天'
        }],
        expiry: '24',
        rateOptions: [{ // 周期限制
          rate: '24',
          label: '1天一次'
        }, {
          rate: '168',
          label: '7天一次'
        },{
          rate: '720',
          label: '30天一次'
        },{
          rate: '0',
          label: '总共一次'
        },],
        rate: '24',
        tagWords: '', // 标文案
        tagBgColor: '#ECF7ED', // 字体颜色
        tagWordsColor: '#47B34F', // 字体颜色
        showPlatform: [], // 展示平台
        jumpType: '1', // 跳转协议 默认h5
      },
      rules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { max: 5, message: '最多20个字符', trigger: 'blur' }
        ],
        storeId: [
          { required: true, message: '请输入门店id', trigger: 'blur' }
        ],
        time: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        tasksType: [
          { required: true, message: '请选择任务类型', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请上次icon', trigger: 'blur' },
        ],
        buttonUndone: [
          { required: true, message: '按钮-未完成必填', trigger: 'blur' },
          { max: 6, message: '最多6 个字符', trigger: 'blur' }
        ],
        buttonDone: [
          { required: true, message: '按钮-已完成必填', trigger: 'blur' },
          { max: 6, message: '最多6 个字符', trigger: 'blur' }
        ],
        jumpType: [
          { required: true, message: '请选择跳转协议', trigger: 'blur' }
        ],
        rate: [
          { required: true, message: '请选择周期限制', trigger: 'blur' }
        ],
        expiry: [
          { required: true, message: '请选择有效期', trigger: 'blur' }
        ],
      },
      timeOptions: { // 展示起止时间
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      fileList: []
    }
  },
  computed: {
    showPlatformValue () {
      var showPlatformStr = ''
      for (let i = 0; i < this.ruleForm.showPlatform.length; i++) {
        showPlatformStr += this.ruleForm.showPlatform[i] + ','
      }
      return showPlatformStr
    }
  },
  watch: {
    formData: {
      handler: function (val) {
        this.ruleForm = val[0]
      }
    },
  },
  methods: {
    // tab切换清空表单
    tabClick () {
      this.ruleForm = {
        nativeOptions: [{
          native: '1',
          label: '门店首页'
        }],
        native: '门店首页',
        taskName: '', // 任务名称
        taskCateOptions: [{ // 任务类型
          taskCate: '1',
          label: '访问门店'
        }, {
          taskCate: '2',
          label: '关注门店'
        }],
        taskCate: '1', // 默认类型为访问门店
        prizeCate: '1', // 奖品标icon
        expiryOptions: [{ // 有效期限制
          expiry: '24',
          label: '24小时'
        }, {
          expiry: '168',
          label: '7天'
        },{
          expiry: '720',
          label: '30天'
        }],
        expiry: '24小时',
        rateOptions: [{ // 周期限制
          rate: '24',
          label: '1天一次'
        }, {
          rate: '168',
          label: '7天一次'
        },{
          rate: '720',
          label: '30天一次'
        },{
          rate: '0',
          label: '总共一次'
        },],
        rate: '1天一次',
        tagWords: '', // 标文案
        tagBgColor: '#ECF7ED', // 字体颜色
        tagWordsColor: '#47B34F', // 字体颜色
        showPlatform: [], // 展示平台
        jumpType: '1', // 跳转协议 默认h5
      }
    },
    // 选中h5或native方法
    selectJumpType () {
      console.log(this.ruleForm.jumpType)
    },
    // 点击文件列表触发的函数
    handlePreview(file) {
      console.log(file,'000');
    },
    // 文件上传前的方法
    beforeAvatarUpload (file) {
      const isPNG = file.type === 'image/png'
      const isLt20K = file.size / 1024 < 20

      if (isPNG) {
      } else {
        this.$message.error('上传图片只能是png 格式!')
        this.file = {}
        this.fileList = []
        return false
      }
      if (!isLt20K) {
        this.$message.error('上传文件不能超过 20KB!')
        this.file = {}
        this.fileList = []
        return false
      }
      //验证宽高
      // checkImgPX(40, 40,file)
      var _this = this

      function checkImgPX(width, height,fil) { 
        var objUrl = getObjectURL(fil) ;
        var img = null;  
        img = document.createElement("img");  
        document.body.insertAdjacentElement("beforeEnd", img); // firefox不行  
        img.style.visibility = "hidden";   
        img.src = objUrl;
        var imgwidth=0;
        var imgheight=0;  
        if(img.complete){/*判断是否图片在本页面完成加载*/
          imgwidth = img.offsetWidth;  
          imgheight = img.offsetHeight;
        } else {
          img.onload = function(){/*待图片加载后获取宽和高*/
            imgwidth = img.offsetWidth;  
            imgheight = img.offsetHeight;
            if(imgwidth!=width || imgheight!=height) { 
              _this.$message("必须是40像素*40像素的图片"); 
              _this.file = {}
              _this.fileList = []
              return false
            } 
          }
        }
      }

      // 建立一個可存取到該file的url
      function getObjectURL(file) {
        var url = null
        if (window.createObjectURL != undefined) { // basic
          url = window.createObjectURL(file)
        } else if (window.URL != undefined) { // mozilla
          url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) { // webkit
          url = window.webkitURL.createObjectURL(file)
        }
        return url ;
      }
    },
    successUpload (response, file, fileList) {
      
      if (!Boolean(response.success)) {
        console.log('false')
        this.$message(response.msg)
        this.file = file = {}
        this.fileList = fileList = []
        this.fileList.splice(0,1)
        fileList.splice(0,1)
        console.log(response,file,fileList,'afe')
        return false
      } else {
        this.fileList.push({name: response.name, url: response.url})
        this.file = {url: response.result.url}
      }
      console.log(response,file,fileList,'dsa2')
    },
    // 文件状态改变 
    handleChangeUpload(file, fileList) {
        this.fileList = fileList.slice(-1);
    },
    // 删除图片
    handleRemove(file, fileList) {
      if (this.fileList.length > 1) {
        this.fileList.splice(0,1)
      }
    },
    // 提交创建
    submitCreate (flag) {
      // 数据校验
      if (!this.ruleForm.taskName || this.ruleForm.taskName.length > 20) {
        this.$message.error('任务名称必填且不超过20个字符！')
        return
      } else if (!this.ruleForm.time || this.ruleForm.time.length < 2) {
        this.$message.error('展示起止时间必填！')
        return
      } else if (!this.ruleForm.buttonUndone || this.ruleForm.buttonUndone.length > 6) {
        this.$message.error('按钮未完成必填且不超过6个字符！')
        return
      } else if (!this.ruleForm.jumpType) {
        return
        this.$message.error('跳转协议必填！')
      // } else if (this.ruleForm.taskIcon) {
        // this.$message.error('icon必填！')
      }
      var params = {
        taskName: this.ruleForm.taskName,
        taskAttribute: this.taskAttribute,
        taskCate: this.taskAttribute === '2' ? this.ruleForm.taskCate : '',
        storeId: this.taskAttribute === '2' ? this.ruleForm.storeId : '',
        taskIcon: this.ruleForm.taskIcon,
        startTime: moment(this.ruleForm.time[0]).format('YYYY-MM-DD hh:mm:ss'),
        endTime: moment(this.ruleForm.time[1]).format('YYYY-MM-DD hh:mm:ss'),
        validPeriod: this.taskAttribute === '2' ? this.ruleForm.validPeriod : '',
        tagWords: this.ruleForm.tagWords,
        tagBgColor: this.ruleForm.tagBgColor,
        tagWordsColor: this.ruleForm.tagWordsColor,
        buttonDone: this.taskAttribute === '2' ? this.ruleForm.buttonDone : '',
        buttonUndone: this.ruleForm.buttonUndone,
        showPlatform: this.showPlatformValue,
        prizeCate: this.ruleForm.prizeCate,
        awardValue: this.taskAttribute === '2' ? this.ruleForm.awardValue : '',
        jumpType: this.ruleForm.jumpType,
        prrzeWords: this.taskAttribute === '2' ? this.ruleForm.prrzeWords : '',
        jumpTypeValue: this.ruleForm.jumpTypeValue,
        rate: this.taskAttribute === '2' ? this.ruleForm.rate : '',
        id: this.ruleForm.id
      }
      
      // 任务类型判断
      if (this.mode === 'modifyMode') {
        this.$axios.get('/taskConfig/updateTaskConfig', {
          params: params
        }).then(res => {
          this.closeDialog()
          this.$message(res.data.msg)
          this.pageQuery()
        })
      } else if (this.mode === 'createMode') {
        this.$axios.get('/taskConfig/addTaskConfig', {
          params: params
        }).then(res => {
          this.closeDialog()
          this.$message(res.data.msg)
          this.pageQuery()
        })
      }
    },
    pageQuery () {
      this.$emit('pageQuery')
    },
    closeDialog () {
      this.$emit('closeDialog')
    },
    submitDialog () {
      this.$emit('closeDialog')
    },
  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 150px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
