<template>
  <div class="main">
    <div class="content" style="margin-top: 20px;">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="24">
            <h3 class='title'>资源管理</h3>
          </el-col>
          <div v-if='this.activeName === "first"'>
            <el-col :span='8'>
              <el-input placeholder="搜索资源/活动名称或ID" suffix-icon='el-icon-search' v-model="input"></el-input>
            </el-col>
            <el-col :span="16" style='text-align: right;'>
              <el-button type="primary" @click="dialogFormVisible = true">新增奖品</el-button>
            </el-col>
          </div>
          <div v-else>
            <el-col :span="6" style='margin-right: 10px;'>
              <el-cascader style='width:100%;' v-model="value" :options="options" @change="handleChange"></el-cascader>
            </el-col>
            <el-col :span='6'>
              <el-input placeholder="搜索资源/活动名称或ID" suffix-icon='el-icon-search' v-model="input"></el-input>
            </el-col>
            <el-col :span='6'>
              <el-button type="primary" style='margin: 0 10px;'>查询</el-button>
              <el-button style='margin-left: 0;'>取消</el-button>
            </el-col>
          </div>
        </el-row>
      </el-form>
      <el-col :span='24' style="margin-top: 20px;">
        <el-tabs v-model="activeName">
          <el-tab-pane label="奖品列表" name="first">
            <!--奖品列表-->
            <template style='margin-top: 20px;'>
              <el-table :data="tableData" stripe style="width: 100%" max-width='1200'>
                <el-table-column prop="date" label="资源类型" width="190" align='center'></el-table-column>
                <el-table-column prop="name" label="奖品名称" width="190" align='center'></el-table-column>
                <el-table-column prop="address" label="奖品图片" width="190" align='center'></el-table-column>
                <el-table-column prop="address" label="剩余" width="190" align='center'></el-table-column>
                <el-table-column prop="address" label="已发放" width="190" align='center'></el-table-column>
                <el-table-column prop="address" label="创建时间" width="190" align='center'></el-table-column>
                <el-table-column prop="address" label="操作" width="60" align='center'>
                  <template slot-scope="scope" class='btn'>
                    <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                      <el-button type="text" icon="el-icon-edit"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="资源列表" name="second">
            <!--资源列表-->
            <template style='margin-top: 20px; max-width: 1200px;'>
              <el-table :data="resources" stripe style="width: 100%;">
                <el-table-column prop="id" label="资源ID" width="240" align='center'></el-table-column>
                <el-table-column prop="resourceName" label="资源名称" width="240" align='center'></el-table-column>
                <el-table-column prop="activityName" label="活动名称" width="240" align='center'></el-table-column>
                <el-table-column prop="number" label="总数" width="240" align='center'></el-table-column>
                <el-table-column prop="usedNumber" label="已使用" width="240" align='center'></el-table-column>
              </el-table>
              <footer class="footer">
                <el-row>
                  <el-col :span='24'>
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="page.now_page"
                      :page-sizes="[10, 20, 30, 40]"
                      :page-size="page.page_size"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="total">
                    </el-pagination>
                  </el-col>
                </el-row>
              </footer>
            </template>

          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>

    <!--新建奖品模态框-->
    <el-dialog title="新建奖品" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span='22'>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item label="选择活动" :label-width="formLabelWidth" prop="activity">
              <el-select v-model="ruleForm.activity" placeholder="请选择活动" @change="testingActivity">
                <el-option v-for='item in activity' :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择资源" :label-width="formLabelWidth" prop="resources">
              <el-select v-model="ruleForm.resources" placeholder="请选择资源">
                <el-option v-for='item in resourceName' :key="Math.random()" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="输入数量" :label-width="formLabelWidth" prop="number">
              <el-input v-model="ruleForm.number" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="单个奖品所需资源数" :label-width="formLabelWidth" prop="resourceNumber">
              <el-input v-model="ruleForm.resourceNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="奖品名称" :label-width="formLabelWidth" prop="prize">
              <el-input v-model="ruleForm.prize" autocomplete="off"></el-input>
            </el-form-item>
            <!--上传图片-->
            <!--<el-form-item label="奖品图片" :label-width="formLabelWidth" prop="img">-->
            <!--   <el-upload-->
            <!--     class="avatar-uploader"-->
            <!--     action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--     :show-file-list="false"-->
            <!--     :on-success="handleAvatarSuccess"-->
            <!--     :before-upload="beforeAvatarUpload">-->
            <!--     <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
            <!--     <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--   </el-upload>-->
            <!-- </el-form-item>-->
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {awardset, prize, awardsetPrize, toConfigure} from "../../api"

  export default {
    name: "index",
    created() {
      this.getawardset();
      this.getPrize();
    },
    data() {
      return {
        total: 0,
        formLabelWidth: '150px',
        tableData: [],
        resources: [],
        value: [],
        activeName: 'first',
        input: '',
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
        ruleForm: {
          activity: '',
          resourceNumber: '',
          resources: '',
          number: '',
          prize: '',
        },
        rules: {
          activity: [
            {required: true, message: '请选择活动', trigger: 'change'},
            {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'change'}
          ],
          resourceNumber: [
            {required: true, message: '请输入数量', trigger: 'blur'}
          ],
          resources: [
            {required: true, message: '请选择资源', trigger: 'change'}
          ],
          number: [
            {required: true, message: '请输入数量', trigger: 'blur'}
          ],
          prize: [
            {required: true, message: '请输入奖品名称', trigger: 'blur'}
          ],
        },
        activity: [],
        resourceName: [],
        category_name: {},
        prizeId: '',
        options: [],
        //=>页码
        page: {
          now_page: 1,
          page_size: 10,
        },
      };
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
      //=>上传图片
      // beforeAvatarUpload(file) {
      //   const isJPG = file.type === 'image/jpeg';
      //   const isLt2M = file.size / 1024 / 1024 < 2;
      //
      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!');
      //   }
      //   return isJPG && isLt2M;
      // },
      handleChange(value) {
        console.log(value);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //页码
      handleSizeChange(val) {
        this.page.page_size = val;
        this.getawardset();
      },
      handleCurrentChange(val) {
        this.page.now_page = val;
        this.getawardset();
      },
      testingActivity(val) {

        let obj = {};
        let ary = this.activity;
        obj = ary.find((item)=>{//这里的userList就是上面遍历的数据源
          return item.value === val;//筛选出匹配数据
        });

        this.prizeId = obj.id;
        this.getawardsetPrize();
      },
      submit() {
        this.dialogFormVisible = false;
        this.gettoConfigure();
      },

      //====请求接口====
      //=>获取活动资源列表
      async getawardset() {
        let obj = this.page;
        let data = await awardset(obj);
        let ary = data.content.dataList;
        let total = data.content.dataCount;
        this.total = total;
        this.resources = ary;
      },

      //=>新增奖品
      async getPrize() {
        let data = await prize();
        let ary = data.content;
        ary.forEach(item => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.number;
          obj.id = item.id;
          this.activity.push(obj);
        });
        console.log(this.activity);
        console.log(data);
      },

      //=>新增奖品（获取活动资源列表）
      async getawardsetPrize() {
        let obj = this.page, objs = {}, category = {};
        this.page.number = this.ruleForm.activity;
        let data = await awardsetPrize(obj);
        console.log(data);
        objs.label = data.content.dataList[0].category;
        objs.value = data.content.dataList[0].categoryId;
        this.resourceName = [];
        this.resourceName.push(objs);

        this.category_name.activity_name = data.content.dataList[0].activityName; //活动名称
        this.category_name.resource_name = data.content.dataList[0].resourceName; //资源名称
        this.category_name.resource_id = data.content.dataList[0].id; //资源ID
        this.category_name.category_id = data.content.dataList[0].resourceId; //资源类型ID
        this.category_name.category_name = data.content.dataList[0].resourceName;//资源类型名称
      },
      //=>配置奖品池
      async gettoConfigure() {
        let obj = {}, result = this.category_name;

        obj.activity_name = result.activity_name;//活动名称
        obj.resource_name = result.resource_name;//资源名称
        obj.resource_id = result.resource_id;//资源ID
        obj.category_id = result.category_id;//资源类型ID
        obj.category_name = result.category_name;//资源类型名称
        obj.activity_id = this.prizeId;//活动id
        obj.award_number = this.ruleForm.number;//奖品数量
        obj.resource_number = this.ruleForm.resourceNumber;  //单个奖品所需资源数
        obj.name = this.ruleForm.prize;  //奖品名

        let data = await toConfigure(obj);
        console.log(obj);
        console.log(data);
      }
    },

  }
</script>

<style scoped lang=less>
  .title {
    font-size: 16px;
    color: #333333;
    font-weight: 400;
    margin-bottom: 20px;

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

  .cell {
    color: #333;
  }

  .footer {
    text-align: center;
    margin-top: 20px;
  }
</style>
