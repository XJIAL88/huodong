<template>
  <div class="main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <h3 class='title'>新建活动
            <span><i class='must'>*</i> 为必填项</span>
          </h3>
        </el-col>
        <el-col :span="12" style='text-align: right;'>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交审核</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-table :data="tableData" style="width: 100%;height: 100%" max-height="500" row-key="id" default-expand-all
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <div class="ary">
              <el-table-column prop="a" label="资源类型" width="250">
<!--                <el-select v-model="ruleForm.region" placeholder="请选择活动区域">-->
<!--                  <el-option label="区域一" value="shanghai" ></el-option>-->
<!--                  <el-option label="区域二" value="beijing"></el-option>-->
<!--                </el-select>-->
                <select v-model="ruleForm.region">
                  <option value ="volvo">Volvo</option>
                  <option value ="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </el-table-column>
            </div>
            <el-table-column
              prop="b"
              label="对应资源id"
              sortable
              width="250">
            </el-table-column>
            <el-table-column
              prop="c"
              label="资源名称"
              width="250">
            </el-table-column>
            <el-table-column
              prop="d"
              label="数量"
              width="250">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="250">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "nextStep",
    data() {
      return {
        tableData: [{
          id: 1,
          a: '01',
          b: 'LW180515002',
          c: '五一粽子节活动',
          d: '2018/12/11 18:00:00',
          e: '2018/12/11 18:00:00',
          f: '2018/12/11 18:00:00',
          g: '进行中'
        }, {
          id: 2,
          a: '02',
          b: 'LW180515002',
          c: '五一粽子节活动',
          d: '2018/12/11 18:00:00',
          e: '2018/12/11 18:00:00',
          f: '2018/12/11 18:00:00',
          g: '进行中'
        }, {
          id: 3,
          a: '03',
          b: 'LW180515002',
          c: '五一粽子节活动',
          d: '2018/12/11 18:00:00',
          e: '2018/12/11 18:00:00',
          f: '2018/12/11 18:00:00',
          g: '进行中',
        }, {
          id: 4,
          a: '04',
          b: 'LW180515002',
          c: '五一粽子节活动',
          d: '2018/12/11 18:00:00',
          e: '2018/12/11 18:00:00',
          f: '2018/12/11 18:00:00',
          g: '进行中',
        }],
        value: '',
        input: '',
        ruleForm: {
          name: '',
          date: '',
          region: '',
          desc: ''
        },
        rules: {},
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            this.$router.replace("/index");
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
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
</style>

