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
            <template style='margin-top: 20px;'>
              <el-table :data="tableData" stripe style="width: 100%" max-width='1200'>
                <el-table-column prop="date" label="资源ID" width="200" align='center'></el-table-column>
                <el-table-column prop="name" label="资源名称" width="200" align='center'></el-table-column>
                <el-table-column prop="address" label="活动名称" width="200" align='center'></el-table-column>
                <el-table-column prop="address" label="总数" width="200" align='center'></el-table-column>
                <el-table-column prop="address" label="已使用" width="200" align='center'></el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>


    <!--新建奖品模态框-->
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
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        value: [],
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
        },
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
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
      },
      handleChange(value) {
        console.log(value);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
</style>
