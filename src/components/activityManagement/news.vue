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
            <el-form-item label="活动时间"  prop="date">
              <el-date-picker v-model="ruleForm.date" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="活动规则" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" :rows="12"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import eventBus from "../../bus.js";

  export default {
    name: "news",
    data() {
      return {
        ruleForm: {
          name: '',
          date: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
          ],
          date: [
            { required: true, message: '请选择日期和时间', trigger: 'change'}
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
            eventBus.$emit('getTarget', this.ruleForm);
            this.$router.replace("/nextStep");


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
