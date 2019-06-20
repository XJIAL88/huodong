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
                v-model="value"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
                class="registered">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="登录：" label-width="60px">
              <el-radio-group v-model="form.resource">
                <el-radio label="有登录" class="registered"></el-radio>
                <el-date-picker
                  v-model="value"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
                <br><br><br>
                <el-radio label="未登录" class="registered"></el-radio>
                <el-date-picker
                  v-model="value"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
              </el-radio-group>
            </el-form-item>
          </el-form-item>
          <el-form-item label="参与条件：" :label-width="formLabelWidth" prop="resource" class="alertLabel">
            <el-radio-group v-model="form.resource">
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
      <el-form-item label="每用户共可参加：" label-width="150px">
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="10000" label="每用户共可参加：" size="small"></el-input-number>
      </el-form-item>
      <el-form-item label="每用户每天可参加：" label-width="150px">
        <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10000" label="每用户每天可参加：" size="small"></el-input-number>
      </el-form-item>
      <el-form-item label="每用户每周可参加：" label-width="150px">
        <el-input-number v-model="num2" @change="handleChange" :min="1" :max="10000" label="每用户每周可参加：" size="small"></el-input-number>
      </el-form-item>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
	export default {
		name: "joinSet",
    data () {
		  return {
        rules: {
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
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
        fileList: [],
        joinCondition: false,
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
        formLabelWidth: '120px',
        value: '',
        num: 1,
        num1: 1,
        num2: 1,
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
      handleChange(value) {
        console.log(value);
      }
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
</style>
