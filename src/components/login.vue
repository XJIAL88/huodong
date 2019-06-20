<template>
  <div class="login">
    <!--container布局容器-->
    <el-container>
      <el-main>
        <div class="login-part">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <h4>彩之云活动管理平台</h4>
            <el-form-item label="登录" prop="name">
              <el-input v-model="ruleForm.name" placeholder="您的登录名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="ruleForm.pwd" placeholder="请输入登录密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="" class="remember-me">
              <el-checkbox v-model="ruleForm.rememberMe">记住我</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary large" @click="submitForm('ruleForm')" class="login-btn" :loading="loading">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        loading: false,
        logo_title: '代理商后台管理系统',
        language: '语言',
        ruleForm: {
          loginId: 'admin',
          name: 'admin',
          pwd: 'admin',
          rememberMe: false
        },
        rules: {
          name: [
            {required: true, message: '请输入您的登录名', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          pwd: [
            {required: true, message: '请输入登录密码', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
        },
      }
    },
    methods: {
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            if (valid){
              this.$router.push({path: '/home'})
            }else {
              console.log('error submit');
              return false;
            }
          }, 800);
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .login{
    position: relative;
    top: 0;
    left: 0;
    z-index: 3;
    background: rgba(38, 78, 129, 1);
  }
  .header {
    width: 1200px;
    height: 95px;
    display: flex;
    padding: 5px;
    margin: 0 auto;
    justify-content: space-between;
    .logo{
      line-height: 95px;
      img{
        vertical-align: middle;
      }
      span{
        margin-left: 10px;
        color: #0091D7;
        font-size: 20px;
      }
    }
    .language{
      .el-dropdown{
        margin-top: 39px;
      }
    }
  }

  .el-header {
    background-color: #0091D7;
  }

  .el-main{
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height: 600px;
    background-size: 100%;
    .login-part{
      position: absolute;
      left: 50%;
      top: 35%;
      margin: -193px 0 0 -143px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 5px;
      padding: 20px 30px;
      h4{
        font-size: 18px;
        color: #696969;
      }
      .remember-me{
        margin-bottom: 0;
      }
      .login-btn{
        width: 240px;
      }
    }
  }
</style>
