<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="参与条件：" prop="resource">
      <el-radio-group v-model="ruleForm.resource" @change="limit(ruleForm.resource)">
        <el-radio label="不限制"></el-radio>
        <el-radio label="限制"></el-radio>
      </el-radio-group>
      <el-button type="primary" class="btn" @click="joinCondition = true" :disabled="disable">&nbsp;&nbsp;添&nbsp;&nbsp;&nbsp;加&nbsp;&nbsp;</el-button>
      <!--对话框-->
      <el-dialog title="参与条件：" :visible.sync="joinCondition">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="基础条件：" :label-width="formLabelWidth" class="alertLabel">
            <br>
            <el-form-item label="注册时间：" label-width="90px">
              <el-date-picker
                v-model="form.registeredTime"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
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
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
                <br><br><br>
                <el-radio label="未登录" class="registered"></el-radio>
                <el-date-picker
                  v-model="form.unLoginTime"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
              </el-radio-group>
            </el-form-item>
          </el-form-item>
          <el-form-item label="参与条件：" :label-width="formLabelWidth" prop="joinConditionRadio" class="alertLabel">
            <el-radio-group v-model="form.joinConditionRadio" @change="joinCond(form.joinConditionRadio)">
              <el-radio label="无"></el-radio>
              <el-radio label="签到"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')">取 消</el-button>
          <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
        </div>
      </el-dialog>
    </el-form-item>
    <el-form-item label="参与用户组：">
      <el-upload
        class="upload-demo"
        accept="text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        action="#"
        :before-upload="beforeUpload"
        :http-request="uploadSectionFile"
        :on-success="success"
        multiple
        :limit="3">
        <el-button type="primary">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
        <div slot="tip" class="el-upload__tip">一次不超过2万个手机号， 只允许上传.xlsx、.csv后缀的文件</div>
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
  import {reqUserPackageUpload, reqConfigModule} from "../../../api/api";
  import PubSub from 'pubsub-js';
  export default {
    name: "joinSet",
    props: ['tab','moduleId'],
    data () {
      return {
        rules: {
          resource: [
            { required: true, message: '请选择参与条件', trigger: 'change' } // 参与条件的校验
          ],
          joinConditionRadio: [
            { required: true, message: '请选择参与条件', trigger: 'change' } // 参与条件的校验
          ],
        },  // 表单验证规则
        ruleForm: {
          resource: '',  // 参与条件单选按钮
        },
        joinCondition: false,  // dialog弹出框
        form: {
          loginRadio: '',  // 登录单选按钮
          joinConditionRadio: '',  // 参与条件单选按钮
          registeredTime: '', // 注册时间
          loginTime: '', // 登录时间
          unLoginTime: '' // 未登录时间
        }, // 弹出框表单
        formLabelWidth: '120px', // 弹出框内基础条件和参与条件label的宽度
        allNum: 1,  // 总次数
        dayNum: 1,  // 每天次数
        weekNum: 1,  // 没周次数
        disable: true,  // 添加按钮的使用与禁用
        moduleTypeId: 0,  // 模块类型ID
        file: '',  // 文件类型
        firstForm: {},  // 第一张表单信息
        limitType: [],  // 限制类型
        limitRegisterTime: [],  // 限制注册时间
        limitLoginTime: [],  // 限制登录时间
        limitNoLoginTime: [],  // 限制未登录时间
        joinConditionValue: 1, // 是否设置需要签到，1不需要，2需要
        userPackage: 1,  // 是否上传用户限制包，1未上传，2 有上传
      }
    },
    methods: {
      async uploadSectionFile (file) {
        const result = await reqUserPackageUpload(this.$route.query.moduleId,file.file.type);
        console.log(result);
        if (result.code === 0) {
          this.userPackage = 2
        }
      },
      success(response, file, fileList) {

      },
      beforeUpload(file) {
        this.file = file.type
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.form.registeredTime.length !== 0) {
              limit_register_time = JSON.stringify([{time: this.form.registeredTime[0] + ',' + this.form.registeredTime[1]}]);
              this.limitType.push(2)
            }
            if (this.form.loginTime.length !== 0) {
              limit_register_time = JSON.stringify([{time: this.form.loginTime[0] + ',' + this.form.loginTime[1]}]);
              this.limitType.push(3)
            }
            if (this.form.unLoginTime.length !== 0) {
              limit_register_time = JSON.stringify([{time: this.form.unLoginTime[0] + ',' + this.form.unLoginTime[1]}]);
              this.limitType.push(4)
            }
            if (this.limitType.length === 0) {
              this.limitType.push(1)
            }
            this.limitType = this.limitType.join(',');
            const activity_id = this.$route.query.activeId;  // 活动ID
            const module_id = this.$route.query.moduleId;  // 模块ID
            const {name} = this.firstForm;  // 模块名称
            const {start_at} = this.firstForm;  // 活动模块开始时间
            const {end_at} = this.firstForm;  // 活动模块结束时间
            const {desc} = this.firstForm;  // 活动模块描述
            const number_daily = this.dayNum;  // 每日可参加次数
            const number_weekly = this.weekNum;  // 每周可参加次数
            const number_total = this.allNum;  // 总共可参加次数
            let limit_type = this.limitType;  // 限制类型
            let limit_register_time = this.limitRegisterTime; // 限制注册时间
            const limit_login_time = this.limitLoginTime; // 限制登录时间
            const limit_no_login_time = this.limitNoLoginTime; // 限制未登录时间
            const has_limit_user_package = this.userPackage; // 是否上传用户限制包
            const has_limit_signed = this.joinConditionValue;  // 是否设置签到


            this.tab('third');
            this.configModule(activity_id, module_id, name, start_at, end_at,desc,number_daily, number_weekly,number_total,limit_type,limit_register_time,limit_login_time, limit_no_login_time,has_limit_user_package,has_limit_signed)
          } else {
            return false;
          }
        });
      }, // 下一步
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.joinCondition = false;
            this.$refs[formName].resetFields();
          } else {
            return false;
          }
        });
      },  // 确定
      resetForm(formName) {
        this.joinCondition = false;
        this.$refs[formName].resetFields();
      },  // 取消
      limit(type) {
        if (type === '不限制') {
          this.disable = true;
          this.form.loginRadio = '';
          this.form.registeredTime = '';
          this.form.loginTime = '';
          this.form.unLoginTime = '';
          this.joinConditionValue = 1;
          this.limitType = []
        } else {
          this.disable = false
        }
      },
      joinCond(type) {
        if (type === '无') {
          this.joinConditionValue = 1
        } else if(type === '签到'){
          this.joinConditionValue = 2
        } else{
          this.joinConditionValue = 1
        }
      },
      async configModule (activity_id, module_id, name, start_at, end_at,desc,number_daily, number_weekly,number_total,limit_type,limit_register_time,limit_login_time, limit_no_login_time,has_limit_user_package,has_limit_signed) {
        const result = await reqConfigModule(activity_id, module_id, name, start_at, end_at,desc,number_daily, number_weekly,number_total,limit_type,limit_register_time,limit_login_time, limit_no_login_time,has_limit_user_package,has_limit_signed);
        if (result.code === 0) {
          this.moduleTypeId = result.content;
          console.log(111);
        }
        console.log(result);
      }
    },
    created () {
      PubSub.subscribe("baseSet", (eventName, data) => {
        this.firstForm = data;
      });
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
    margin-left: 20px;
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
