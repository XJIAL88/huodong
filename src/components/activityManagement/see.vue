<template>
  <div class="main">
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <h3 class='title'>新建活动
            <span><i class='must'>*</i> 为必填项</span>
          </h3>
        </el-col>
        <el-col :span="12" style='text-align: right;'>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">返回</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style='margin-top: 20px;'>
      <el-col :span="12">
        <div class='title'>活动名称：<i>万社区拉新活动</i></div>
      </el-col>
      <el-col :span="12">
        <div class='title'>活动名称：<i>万社区拉新活动</i></div>
      </el-col>
    </el-row>
    <el-row style='margin-top: 20px;'>
      <el-col :span="12">
        <div class='title'>活动状态：
          <el-button type="success" size="small">进行中</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row style='margin-top: 20px;'>
      <el-col :span="24">
        <div class='title' style='margin-bottom: 20px;'>活动奖品：</div>
        <el-table :data="tableData" align='center' border style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style='margin-top: 20px;'>
      <el-col :span="24">
        <div class='title' style='margin-bottom: 20px;'>活动规则：</div>
        <el-input type="textarea" v-model="desc" maxlength="1000" show-word-limit rows=8></el-input>
      </el-col>
    </el-row>
    <el-divider></el-divider>

    <div class="icon">
      <el-row>
        <el-col :span="12">
          <span>step1</span>
        </el-col>
        <el-col :span="12" style='text-align: right; font-size: 24px;'>
          <div>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row style='margin-top: 20px;'>
        <el-col :span="12">
          <div class='title'>模块名称：<i>签到</i></div>
        </el-col>
        <el-col :span="12">
          <div class='title'>模块时间：<i>2018-10-24 16:48 - 2018-10-24 16:48</i></div>
        </el-col>
      </el-row>
      <el-row style='margin-top: 20px;'>
        <el-col :span="24">
          <div class='title' style='margin-bottom: 20px;'>活动规则：</div>
          <el-input type="textarea" v-model="desc" maxlength="1000" show-word-limit rows=8></el-input>
        </el-col>
      </el-row>
      <el-row style='margin-top: 20px;'>
        <el-col :span="12">
          <div class='title'>参与条件：<i>基础条件</i></div>
        </el-col>
        <el-col :span="12">
          <div class='title'>注册时间：<i>2018-10-24 16:48 - 2018-10-24 16:48</i></div>
        </el-col>
      </el-row>
      <el-row style='margin-top: 20px;'>
        <el-col :span="24">
          <div class='title' style='margin-bottom: 20px;'>商品推荐：</div>
        </el-col>
        <el-col :span='8'></el-col>
        <el-col :span='8'></el-col>
        <el-col :span='8'></el-col>
      </el-row>
      <el-row style='margin-top: 20px;'>
        <el-col :span="24">
          <div class='title' style='margin-bottom: 20px;'>奖品：</div>
          <el-row type="flex" class="row-bg" justify="space-between" style='margin: 20px 0'>
            <el-col :span="6"><div class="picImg"></div></el-col>
            <el-col :span="6"><div class="picImg"></div></el-col>
            <el-col :span="6"><div class="picImg"></div></el-col>
          </el-row>
          <el-table :data="tableData" align='center' border style="width: 100%">
            <el-table-column
              prop="date"
              label="奖品类别"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="资源类型"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="奖品">
            </el-table-column>
            <el-table-column
              prop="address"
              label="发放数量">
            </el-table-column>
            <el-table-column
              prop="address"
              label="每日上限（数量）">
            </el-table-column>
            <el-table-column
              prop="address"
              label="发放时间">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='24' style='text-align: center; margin-top: 20px;'>
          <el-button type="primary"><i class="el-icon-circle-plus el-icon--left"> 增加模块</i></el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    name: "see",
    data() {
      return {
        ruleForm: {
          name: '',
          date: '',
          desc: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        desc: '',
      }

    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(row) {
        console.log(row);
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

  div.title {
    i {
      font-style: normal;
    }
  }

  .content input {
    display: inline-block;
  }

  .icon {
    font-size: 18px;
    color: #333;
  }
  .picImg{
    width: 100%;
    height: 200px;
    background: #ccc;
    border-radius: 8px;
  }
</style>
