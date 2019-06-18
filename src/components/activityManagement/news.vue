<template>
  <div class="main">
    <div class="content" style="margin-top: 20px;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <h3 class='title'>新建活动
              <span><i class='must'>*</i> 为必填项</span>
            </h3>
          </el-col>
          <el-col :span="12" style='text-align: right;'>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动时间" required>
              <el-form-item prop="date1">
                <el-date-picker type="datetimerange" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="活动规则" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" :rows="12"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <el-form>

    </el-form>
  </div>
</template>

<script>
  export default {
    name: "news",
    data() {
      return {
        input: '',
        value: '',
        textarea: '',
        pickerOptions: {
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
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: '',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期和时间', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动规则', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped lang=less>
  .title {
    font-size: 16px;
    color: #333333;
    font-weight: 400;

    span {
      font-size: 12px;
      color: #cccccc;
      margin-left: 10px;
    }
  }

  .must {
    font-size: 14px;
    color: red;
    vertical-align: middle;
    margin-right: 4px;
  }

  .table {
    color: #333333;
    font-size: 16px;
  }

  .content input {
    display: inline-block;
  }
</style>
