<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="参与条件：" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="不限制"></el-radio>
        <el-radio label="限制"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="参与用户组：">
      <el-button type="primary" @click="joinCondition = true">&nbsp;&nbsp;添&nbsp;&nbsp;&nbsp;加&nbsp;&nbsp;</el-button>
      <!--对话框-->
      <el-dialog title="参与条件：" :visible.sync="joinCondition">
        <el-form :model="form" :rules="rules">
          <el-form-item label="基础条件：" :label-width="formLabelWidth" class="alertLabel">
            <br>
            <el-form-item label="注册时间：" label-width="90px">
              <el-date-picker
                v-model="form.registeredTime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                class="registered">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="登录：" label-width="60px">
              <el-radio-group v-model="form.loginRadio">
                <el-radio label="有登录" class="registered"></el-radio>
                <el-date-picker
                  v-model="form.loginTime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
                <br><br><br>
                <el-radio label="未登录" class="registered"></el-radio>
                <el-date-picker
                  v-model="form.unLoginTime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
              </el-radio-group>
            </el-form-item>
          </el-form-item>
          <el-form-item label="参与条件：" :label-width="formLabelWidth" prop="resource" class="alertLabel">
            <el-radio-group v-model="form.joinConditionRadio">
              <el-radio label="无"></el-radio>
              <el-radio label="签到"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="joinCondition = false">取 消</el-button>
          <el-button type="primary" @click="joinCondition = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button type="primary" class="btn">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item label="参与次数：">
      <el-input placeholder="无限" v-model="allNum">
        <template slot="prepend">每用户共可参加</template>
        <template slot="append">次</template>
      </el-input>
      <el-input placeholder="无限" v-model="dayNum">
        <template slot="prepend">每用户每天可参加</template>
        <template slot="append">次</template>
      </el-input>
      <el-input placeholder="无限" v-model="weekNum">
        <template slot="prepend">每用户没周可参加</template>
        <template slot="append">次</template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "joinSet",
    props: ['tab'],
    data () {
      return {
        rules: {
          resource: [
            { required: true, message: '请选择参与条件', trigger: 'change' } // 参与条件的校验
          ],
        },
        ruleForm: {
          resource: '',  // 参与条件单选按钮
        },
        fileList: [],  // 上传文件
        joinCondition: false,  // dialog弹出框
        form: {
          loginRadio: '',  // 登录单选按钮
          joinConditionRadio: '',  // 参与条件单选按钮
          registeredTime: '', // 注册时间
          loginTime: '', // 登录时间
          unLoginTime: '' // 未登录时间
        },
        formLabelWidth: '120px', // 弹出框内基础条件和参与条件label的宽度
        allNum: 1,  // 总次数
        dayNum: 1,  // 每天次数
        weekNum: 1,  // 没周次数
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      onSubmit() {
        console.log('submit!');
      },
      submitForm(formName) {
        // 订阅消息
        // PubSub.subscribe('activeName', (msgName, name) => {
        //   console.log(name);
        // })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.tab('third');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="less">
  .registered{
    margin-bottom: 30px;
  }
  .el-dialog__header{ // 弹窗下划线
    border-bottom: 1px solid #eee;
  }
  .btn{
    margin-top: 20px;
  }
  .alertLabel{
    font-size: 20px;
    color: #000;
    font-weight: 700;
  }
  .el-input{
    margin-bottom: 20px;
  }
</style>
