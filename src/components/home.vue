<template>
  <div id="app">
    <el-container id='content'>
      <el-aside width="200px" style='border-right:1px solid #ccc;background:rgb(249, 249, 249);'>
        <div class="logo">
          <img src="../assets/clogo.png" alt="" style='width: 134px;'>
        </div>
        <!--侧边栏-->
        <el-col>
          <el-menu :router="true" class="el-menu-vertical-demo" style='border: none;'>
            <el-menu-item index="/resource">
              <span slot="title">资源管理</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <span>活动管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/index">活动列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <!--主体-->
      <el-container>
        <el-header style=''>
          <div class="main">
            <div class="left">
              <h1>彩之云活动管理平台</h1>
            </div>
            <div class="right">
              <el-dropdown>
                <div class="pic">
                  <img src="" alt="">
                </div>
                <span class="el-dropdown-link">用户信息</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click="open">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'home',
    mounted() {
      let clientW = document.documentElement.clientHeight || document.body.clientHeight,
        content = document.getElementById('content');
      content.style.height = clientW + 'px';
    },
    methods: {
      open() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style>
  @import "../assets/css/reset.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .right {
    float: right;
  }

  .left {
    float: left;
  }

  .left h1 {
    margin-top: 14px;
    font-weight: 400;
    font-style: normal;
    font-size: 22px;
    color: #434343;
  }

  .logo {
    width: 100%;
    height: 64px;
    padding: 8px 22px;
    box-sizing: border-box;
    background: rgba(38, 78, 129, 1);
  }

  .pic {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ccc;
    position: relative;
    top: 23px;
    left: -35px;
  }
</style>
