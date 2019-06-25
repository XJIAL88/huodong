<template>
  <div class="main">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
          <div class="title" style='margin-bottom: 20px;'>资源调用</div>
          <el-table border :data="tableData" stripe style="width: 100%;height: 100%;" max-width='1200' max-height="500">
            <el-table-column prop="categoryId" label="资源类型" width="350" align="center">
              <template slot-scope="scope">
                <el-cascader
                  :options="categoryList"
                  v-model="scope.row.categoryId"
                  @change="changeCategory(scope.row)"
                  :props="props"
                  :show-all-levels="false"
                ></el-cascader>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="资源名称" width="350" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.label"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in scope.row.resourceList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="num" label="数量" align='center' width="350">
              <template slot-scope="scope">
                <el-input v-model="scope.row.number" placeholder="请输入" type="number" style='width: 60%;'></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" align='center' width="150">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" style='margin-top: 20px;'>
          <el-button @click="addItem" type="primary">添加资源</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {create, getCategory, getResource} from "../../api";

  export default {
    name: "nextStep",
    created() {
      this.getcategoryList();
    },
    data() {
      return {
        value: [],
        categoryList: [],
        tableData: [],
        table: [],
        ruleForm: {
          name: '',
          date: '',
          region: '',
          desc: ''
        },
        props: {
          label: "title",
          value: "id",
          children: "son"
        },
      }
    },
    methods: {
      addItem() {
        let obj = {
          categoryId: [],
          category: "",
          number: "",
          name: '',
          resourceList: [],
          resourceId: "",
          resourceName: "",
          grantType: 1
        };
        this.tableData.push(obj);
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let newData = JSON.parse(localStorage.getItem('newData'));
            let result = [], obj = {}, ary = this.tableData, arys = [],resource=[];
            ary.forEach(item => {
              let obj = {}, length = item.categoryId.length, num = item.label;
              let val = length > 1 ? item.categoryId[length - 1] : item.categoryId;
              obj.number = item.number;
              obj.categoryId = val;
              if (item.resourceList[num]) {
                let cat = item.resourceList[num].category.split("_");
                cat = cat.slice(cat.length - 2, cat.length - 1).toString();
                obj.category = cat;
                obj.grantType = item.resourceList[num].grantType;
                obj.resourceName = item.resourceList[num].label;
                obj.resourceId = item.resourceList[num].resourceId;
              }
              arys.push(obj);
            });
            arys.forEach(item => {
              resource.push(item);
            });

            let a = newData.name,
              b = newData.start_at,
              c = newData.end_at,
              d = newData.desc,
              e = JSON.stringify(resource);
            console.log(newData);
            this.createList(a, b, c, d, e);
            this.$router.replace("/index");
            this.$message({message: '提交审核成功！', type: 'success'});

          } else {
            this.$message.error('提交审核失败！');
            return false;
          }
        });
      },
      resetForm() {
        this.$router.replace("/index");
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

      //=>获取id
      changeCategory(value) {
        let length = value.categoryId.length;
        let val = length > 1 ? value.categoryId[length - 1] : value.categoryId[0];
        this.getResource(val);
      },

      // ======接口请求======

      //=>创建活动
      async createList(a, b, c, d, e) {
        let data = await create(a, b, c, d, e);
        console.log(data);
      },

      //=>获取资源类型列表
      async getcategoryList() {
        let data = await getCategory();
        this.categoryList = data.content.dataList;
      },

      //=>获取资源列表
      async getResource(num) {
        let data = await getResource(num);
        console.log(data);
        let arys = [];
        let ary = data.content.dataList;
        ary.forEach((item, index) => {
          let obj = {};
          obj.label = item.name;
          obj.category = item.category;
          obj.resourceId = item.id;
          obj.grantType = item.grantType;
          obj.value = index;
          arys.push(obj);
        });
        this.tableData[this.tableData.length - 1].resourceList = arys;
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

  .el-input el-input--suffix {
    margin-bottom: 0;
  }
</style>

