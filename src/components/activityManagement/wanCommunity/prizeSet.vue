<template>
  <div class="main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <!-- <el-col :span="12">-->
        <!-- <h3 class='title'>商品推荐</h3>-->
        <!-- <el-button type="primary" @click="submitForm('ruleForm')" style='display: inline-block;margin-left: 20px;'>添加</el-button>-->
        <!-- </el-col>-->
        <el-col :span="24">
          <div class="title" style='margin: 25px 0;'>奖品设置</div>
          <el-table :data="tableData" style="width: 100%;height: 100%" max-height="500" row-key="id" default-expand-all
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="a" label="奖品级别" width="200" align="center"></el-table-column>
            <el-table-column prop="b" label="资源类型" align='center' sortable width="200">
              <template slot-scope="scope">
                <el-cascader :options="options" v-model="scope.row.select"></el-cascader>
              </template>
            </el-table-column>
            <el-table-column prop="c" label="奖品" align='center' width="200">
              <template slot-scope="scope">
                <el-cascader :options="options" v-model="scope.row.select"></el-cascader>
              </template>
            </el-table-column>
            <el-table-column prop="d" label="发放数量" align='center' width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.c" placeholder="请输入" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="d" label="签到次数" align='center' width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.b" placeholder="请输入" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="select" label="签到类型" width="200" align="center">
              <template slot-scope="scope">
                <el-cascader :options="options" v-model="scope.row.select"></el-cascader>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align='center' width="200">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                  删除奖品
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-col :span="12" style='text-align: left;'>
            <el-form-item>
              <div class="btns">
                <el-button type="primary" @click="isClick && addItem()" style='margin: 0 10px 0 0 ;'>添加奖品</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" style='margin-left: 0;'>确认</el-button>
                <el-button @click="resetForm('ruleForm')">取消</el-button>
              </div>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "prizeSet",
    data() {
      return {
        tableData: [{
          a: 1,
          b: '01',
          c: 'LW180515002',
          d: '五一粽子节活动',
          e: '2018/12/11 18:00:00',
          f: '2018/12/11 18:00:00',
          g: '2018/12/11 18:00:00',
          h: '进行中',
          select: ''
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
        value: [],
        input: '',
        ruleForm: {
          name: '',
          date: '',
          region: '',
          desc: ''
        },
        rules: {},
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        isClick: true,
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
      },
      addItem() {
        let key = '奖品' + parseInt(this.tableData.length + 1);
        let obj = {
          a: key,
          b: "",
          c: "",
          d: [],
          e: "",
          f: "",
          g: 1
        };
        this.tableData.push(obj);
        if (this.tableData.length >= 10) {
          this.isClick = false;
          this.$message.error('很抱歉，只能添加10条信息');
        }
      },
    }
  }
</script>

<style scoped lang=less>
  .title {
    font-size: 16px;
    color: #333333;
    font-weight: 400;
    display: inline-block;

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

  .select {
    width: 150px;
    border: none;
  }

  .btns {
    margin-left: -100px;
    margin-top: 20px;
  }
</style>
