<template>
  <div class="main">
    <div class="content" style="margin-top: 20px;">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <h3 class='title'>资源管理</h3>
          </el-col>
          <el-col :span="12" style='text-align: right;'>
            <el-form-item>
              <el-button type="primary" @click="dialogFormVisible = true">新增奖品</el-button>
            </el-form-item>
          </el-col>
          <el-col :span='6'>
            <el-input placeholder="搜索资源/活动名称或ID" suffix-icon='el-icon-search' v-model="input"></el-input>
          </el-col>
          <el-col :span='24' style="margin-top: 20px;">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="奖品列表" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="资源列表" name="second">配置管理</el-tab-pane>
              </el-tabs>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-dialog title="新建奖品" :visible.sync="dialogFormVisible">

      <el-row>
        <el-col :span='12'>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">

            <el-form-item label="选择活动" :label-width="formLabelWidth" prop="name">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择类型" :label-width="formLabelWidth" prop="region">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择资源" :label-width="formLabelWidth" prop="date1">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择数量" :label-width="formLabelWidth" prop="date2">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="奖品名称" :label-width="formLabelWidth" prop="type">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="奖品图片" :label-width="formLabelWidth" prop="desc">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>

          </el-form>
        </el-col>
      </el-row>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        activeName: 'first',
        input: '',
        imageUrl: '',
        dialogTableVisible: false,
        dialogFormVisible: false,
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
        formLabelWidth: '150px',
        ruleForm: {
          name: '',
          date: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请选择活动', trigger: 'blur'},
            {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'change'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {required: true, message: '请选择时间', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请至少选择一个活动性质', trigger: 'blur'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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

  .content input {
    display: inline-block;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px dashed #d9d9d9;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .cell{
    color: #333;
  }
</style>
