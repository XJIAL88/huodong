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
      <el-tabs v-model="activeName" type="card" class="tab" :before-leave="stopTab" @tab-click="handleClick">
        <el-tab-pane label="基础设置" name="first">
          <baseSet :tab="tab"></baseSet>
        </el-tab-pane>
        <el-tab-pane label="参与设置" name="second">
          <joinSet :tab="tab" :moduleId="moduleId"></joinSet>
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
  import prizeSet from './wanCommunity/prizeSet';
  export default {
    components: {
      baseSet,
      joinSet,
      prizeSet
    },
    data() {
      return {
        activeName: 'first',
        moduleId: 0,  // 模块ID
        stopTab: function (a, b) {}
      };
    },
    methods: {
      tab (num) {
        this.activeName = num
      },
      handleClick(tab, event) {
      }
    },
    created () {
      this.$route.query.moduleId = this.moduleId;
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
