<template>
  <div class="login">
    <!--container布局容器-->
    <el-container>
      <el-main>
        <div class="login-part">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <h4>彩之云活动管理平台</h4>
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.name" placeholder="您的登录名"></el-input>
            </el-form-item>
            <el-form-item label="" prop="pwd">
              <el-input v-model="ruleForm.pwd" placeholder="请输入登录密码" type="password"></el-input>
            </el-form-item>
            <el-form-item label="" class="remember-me">
              <el-checkbox v-model="ruleForm.rememberMe" style='color: #fff;'>记住我</el-checkbox>
            </el-form-item>
            <el-form-item class="my-btn">
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
        loading: false,
        ruleForm: {
          name: 'admin',
          pwd: 'admin',
          rememberMe: false,
        },
        rules: {
          name: [
            {
              required: true,
              message: '请输入您的登录名',
              trigger: 'blur',
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur',
            },
          ],
          pwd: [
            {
              required: true,
              message: '请输入登录密码',
              trigger: 'blur',
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur',
            },
          ],
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          this.loading = true
          setTimeout(() => {
            this.loading = false
            if (valid) {
              this.$router.push({path: '/index'})
            } else {
              console.log('error submit');
              return false
            }
          }, 800)
        })
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .login {
    position: relative;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    background: #2d3a4b;
    height: 100vh;
    padding: 0;
    margin: 0;
  }

  .header {
    width: 1200px;
    height: 95px;
    display: flex;
    padding: 5px;
    margin: 0 auto;
    justify-content: space-between;

    .logo {
      line-height: 95px;

      img {
        vertical-align: middle;
      }

      span {
        margin-left: 10px;
        color: #0091d7;
        font-size: 20px;
      }
    }

    .language {
      .el-dropdown {
        margin-top: 39px;
      }
    }
  }

  .el-main {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height: 600px;
    background-size: 100%;

    .login-part {
      background: #2d3a4b;
      border-radius: 5px;
      padding: 20px 30px;
      width: 400px;
      margin: 100px auto;

      h4 {
        font-size: 24px;
        color: #fff;
        font-weight: 400;
        margin-bottom: 20px;
        text-align: center;
      }

      .remember-me {
        margin-bottom: 0;
      }

      .login-btn {
        width: 240px;
      }
    }
  }

  .my-btn {
    text-align: center;
  }
</style>
