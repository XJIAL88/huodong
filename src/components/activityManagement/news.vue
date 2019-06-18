<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="17">
        <h3 class='title'>新建活动
          <span><i class='must'>*</i> 为必填项</span>
        </h3>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple" style='text-align: right;'>
          <router-link to="nextStep">
            <el-button type="primary" size="medium">下一步</el-button>
          </router-link>
          <router-link to="news" style='margin-left: 10px;'>
            <el-button size="medium">取消</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <div class="content" style="margin-top: 20px;">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <span class="table">活动名称：</span>
            <el-input v-model="input" placeholder="请输入活动名称" style="width: 70%;"></el-input>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <span class="table"><i class="must">*</i>活动时间：</span>
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style='width: 70%;'>
              </el-date-picker>

          </div>
        </el-col>
        <el-col :span="24" style='margin-top: 20px;'>
          <div class="grid-content bg-purple-dark">
            <span class="table"><i class="must">*</i>活动规则：</span>
            <el-input
              type="textarea"
              :rows="12"
              placeholder="请输入内容"
              v-model="textarea"
              style='width: 70%;'
            >
            </el-input>
          </div>
        </el-col>
      </el-row>
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
        value2: ''
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
