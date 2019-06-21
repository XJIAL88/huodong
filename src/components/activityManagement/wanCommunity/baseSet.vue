<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称：">
      <el-input v-model="ruleForm.name" type="text"></el-input>
    </el-form-item>
    <el-form-item label="活动时间：" prop="date">
      <el-date-picker
        v-model="ruleForm.date"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right" >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="活动规则：" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc" maxlength="1000" show-word-limit rows=8></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import PubSub from 'pubsub-js';
  export default {
    name: "baseSet",
    props: ['tab'],
    data () {
      return {
        rules: {
          date: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        ruleForm: {
          name: '',  // 活动名称
          date: '',  // 活动时间
          desc: ''  // 活动规则
        },
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        },
      }
    },
    methods: {
      submitForm(formName) {
        // 订阅消息
        // PubSub.subscribe('activeName', (msgName, name) => {
        //   console.log(name);
        // })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tab('second');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
    mounted () {
      setTimeout(() => {

      }, 1000)
    }
  }
</script>

<style scoped>

</style>
