<template>
  <div class="wan-community">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动列表</a></el-breadcrumb-item>
      <el-breadcrumb-item>设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="title">
        领礼包
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tab">
        <el-tab-pane label="基础设置" name="first">
          <baseSet></baseSet>
        </el-tab-pane>
        <el-tab-pane label="参与设置" name="second">
          <joinSet></joinSet>
        </el-tab-pane>
        <el-tab-pane label="奖品设置" name="third">
          <prizeSet></prizeSet>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import baseSet from './wanCommunity/baseSet';
  import joinSet from './wanCommunity/joinSet';
  import prizeSet from './wanCommunity/prizeSet.vue';
  export default {
    components: {
      baseSet,
      joinSet,
      prizeSet
    },
    data() {
      return {
        activeName: 'first',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
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
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped lang="less">
  .el-breadcrumb{  // 面包屑下划线
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .wan-community{
    .content{
      .title{
        margin: 20px;
        color: #333;
      }
      .tab{
        .base-set{
          width: 500px;
        }
        .demo-ruleForm{
          width: 500px;
        }
      }
    }
  }
</style>
