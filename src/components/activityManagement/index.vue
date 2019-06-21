<template>
  <div>
    <!--面包屑-->
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple" style='text-align: right;'>
          <router-link to="news">
            <el-button>新建活动</el-button>
          </router-link>
        </div>
      </el-col>
    </el-row>
    <!--主体-->
    <el-row style="margin-top: 10px;">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-form :inline="true" ref="formInline" :model="formInline" class="demo-form-inline">
            <el-form-item label="选择状态" prop="region">
              <el-select v-model="formInline.region" placeholder="全部状态">
                <el-option label="进行中" value="进行中"></el-option>
                <el-option label="即将开始" value="即将开始"></el-option>
                <el-option label="已下架" value="已下架"></el-option>
                <el-option label="已失效" value="已失效"></el-option>
                <el-option label="待配置" value="待配置"></el-option>
                <el-option label="审批中" value="审批中"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop='search'>
              <el-input v-model="formInline.search" placeholder="搜索活动名称或活动id"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(tableData)">查询</el-button>
              <el-button @click="resetForm('formInline')">重置</el-button>
            </el-form-item>
          </el-form>
          <div class="tabel">
            <el-table
              :data="tableData"
              style="width: 100%;height: 100%"
              max-height="500"
              row-key="id"
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <div class="ary">
                <el-table-column
                  prop="a"
                  label="序列"
                  align='center'
                  width="80">
                </el-table-column>
              </div>
              <el-table-column
                prop="id"
                label="活动id"
                align='center'
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="name"
                label="活动名称"
                align='center'
                width="200">
              </el-table-column>
              <el-table-column
                prop="start_at"
                label="开始时间"
                align='center'
                width="200">
              </el-table-column>
              <el-table-column
                prop="end_at"
                label="结束时间"
                align='center'
                width="200">
              </el-table-column>
              <el-table-column
                prop="create_at"
                label="创建时间"
                align='center'
                width="200">
              </el-table-column>
              <el-table-column
                prop="status"
                align='center'
                label="活动状态"
                width="200">

                <template slot-scope="scope">
                  <el-tag type="primary" size="mini">{{scope.row.status |statusFil}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                prop="status"
                fixed="right"
                align='center'
                label="操作"
                width="250">
                <template slot-scope="scope" class='btn'>
                  <el-button size="mini" type="primary" icon="el-icon-view"></el-button>
                  <el-button size="mini" type="primary" icon="el-icon-upload2" v-show='scope.row.status===5'></el-button>
                  <el-button size="mini" type="primary" icon="el-icon-download" v-show='scope.row.status===4'></el-button>
                  <el-button size="mini" type="primary" icon="el-icon-edit" v-show='scope.row.status===5 ||scope.row.status===2'></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <footer class='footer'>
      <div class="block" style="text-align: center;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </footer>
  </div>
</template>

<script>
  import {getList} from "../../api";

  export default {
    name: "home",
    async created() {
      //请求接口
      let data = await getList();
      this.tableData = data.list;
      console.log(data);
    },
    data() {
      return {
        formInline: {
          search: '',
          region: ''
        },
        // 表格
        tableData: [],
        //页码
        currentPage1: 1,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    },
    methods: {
      load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([
            // {
            //   id: 31,
            //   date: '2016-05-01',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1519 弄'
            // }, {
            //   id: 32,
            //   date: '2016-05-01',
            //   name: '王小虎',
            //   address: '上海市普陀区金沙江路 1519 弄'
            // }
          ])
        }, 1000)
      },
      onSubmit() {
        console.log('submit');
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //页码
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      filterTag(value, row) {
        return row.tag === value;
      }
    },
    filters: {
      statusFil(tag) {
        switch (tag) {
          case 1:
            return '审批中';
          case 2:
            return '待配置';
          case 3:
            return '即将开始';
          case 4:
            return '进行中';
          case 5:
            return '已下架';
          case 6:
            return '已失效';
        }
      }
    }
  }
</script>
<style scoped>
  .tabel {
    margin-top: 20px;
    height: 100%;
  }

  .footer {
    margin-top: 40px;
  }

  .cell button {
    margin: 4px 0;
  }
</style>
