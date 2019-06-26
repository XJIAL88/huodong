<template>
  <div class="main">
    <el-form label-width="100px" class="demo-ruleForm">
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
        <div class='title'>活动名称：<i>{{detail.name}}</i></div>
      </el-col>
      <el-col :span="12">
        <div class='title'>活动时间：<i>{{detail.create_at}} ~ {{detail.end_at}}</i></div>
      </el-col>
    </el-row>
    <el-row style='margin-top: 20px;'>
      <el-col :span="12">
        <div class='title'>活动状态：
          <button ref='btn' class='btn'>{{detail.status | status}}</button>
        </div>
      </el-col>
    </el-row>
    <el-row style='margin-top: 20px;'>
      <el-col :span="24">
        <div class='title' style='margin-bottom: 20px;'>活动奖品：</div>
        <el-table :data="tableData" align='center' border style="width: 100%;max-width: 1200px;">
          <el-table-column
            prop="date"
            label="资源类型"
            align='center'
            width="240">
          </el-table-column>
          <el-table-column
            prop="name"
            label="奖品名称"
            align='center'
            width="240">
          </el-table-column>
          <el-table-column
            width="240"
            align='center'
            prop="address"
            label="剩余">
          </el-table-column>
          <el-table-column
            width="240"
            align='center'
            prop="address"
            label="已发放">
          </el-table-column>
          <el-table-column
            width="240"
            align='center'
            prop="address"
            label="已使用">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style='margin-top: 20px;'>
      <el-col :span="24">
        <div class='title' style='margin-bottom: 20px;'>活动规则：</div>
        <el-input type="textarea" v-model="detail.rule" disabled='disabled' maxlength="1000" show-word-limit rows=8></el-input>
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
          <el-input type="textarea"  v-model="desc" maxlength="1000" show-word-limit rows=8></el-input>
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
      <!--商品推荐-->
      <!--  <div class='commodity'>-->
      <!--        <el-row type="flex" class="row-bg" justify="space-between" style='margin: 20px 0'>-->
      <!--          <el-col :span="24">-->
      <!--            <div class='title' style='margin-bottom: 20px;'>商品推荐：</div>-->
      <!--          </el-col>-->
      <!--        </el-row>-->
      <!--        <el-row>-->
      <!--          <el-col :span="6">-->
      <!--            <div class="picImg"></div>-->
      <!--          </el-col>-->
      <!--          <el-col :span="6">-->
      <!--            <div class="picImg"></div>-->
      <!--          </el-col>-->
      <!--          <el-col :span="6">-->
      <!--            <div class="picImg"></div>-->
      <!--          </el-col>-->
      <!--        </el-row>-->
      <!--      </div>-->
      <el-row style='margin-top: 20px;'>
        <el-col :span="24">
          <div class='title' style='margin-bottom: 20px;'>奖品：</div>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              align='center'
              prop="date"
              label="奖品类别"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="资源类型"
              align='center'
              width="180">
            </el-table-column>
            <el-table-column
              align='center'
              prop="address"
              label="奖品">
            </el-table-column>
            <el-table-column
              align='center'
              prop="address"
              label="发放数量">
            </el-table-column>
            <el-table-column
              align='center'
              prop="address"
              label="每日上限（数量）">
            </el-table-column>
            <el-table-column
              align='center'
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
  import {detail, activity} from "../../api";

  export default {
    name: "see",
    created() {
      let num = this.$route.params.id,
        number = this.$route.params.number;
      this.getdetail(num);
      this.getactivity(num, number);

    },
    data() {
      return {
        tableData: [],
        detail: {},
        desc: '',
      }
    },
    methods: {
      resetForm() {
        this.$router.replace('/index');
      },
      handleClick(row) {
        console.log(row);
      },

      //=>请求活动详情
      async getdetail(num) {
        let data = await detail(num);
        this.detail = data.content;
        let status = this.detail.status;
        console.log(data);
        switch (status) {
          case 1:
            this.$refs.btn.style.backgroundColor = "#409eff";
            break;
          case 2:
            this.$refs.btn.style.backgroundColor = "#ccc";
            break;
          case 3:
            this.$refs.btn.style.backgroundColor = "#67c23a";
            break;
          case 4:
            this.$refs.btn.style.backgroundColor = "#ccc";
            break;
          case 5:
            this.$refs.btn.style.backgroundColor = "#ccc";
            break;
        }
      },

      //=>请求活动资源列表
      async getactivity(a, b) {
        let data = await activity(a, b);
        console.log(data);
      }
    },
    filters: {
      status(tag) {
        switch (tag) {
          case 1:
            return '审批中';
          case 2:
            return '待配置';
          case 3:
            return '已上架';
          case 4:
            return '已下架';
          case 5:
            return '已失效';
        }
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

  .picImg {
    width: 100%;
    height: 200px;
    background: #ccc;
    border-radius: 8px;
  }

  .btn {
    border: none;
    padding: 6px 20px;
    background: #ccc;
    color: #fff;
    border-radius: 4px;
  }
</style>
