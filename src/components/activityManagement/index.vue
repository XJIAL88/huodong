<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <!--面包屑-->
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
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
                <el-option label="审批中" value="1"></el-option>
                <el-option label="待配置" value="2"></el-option>
                <el-option label="已上架" value="3"></el-option>
                <el-option label="已下架" value="4"></el-option>
                <el-option label="已失效" value="5"></el-option>
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
              <el-table-column prop="id" label="活动id" align='center' sortable width="200"></el-table-column>
              <el-table-column prop="name" label="活动名称" align='center' width="200"></el-table-column>
              <el-table-column prop="start_at" label="开始时间" align='center' width="200"></el-table-column>
              <el-table-column prop="end_at" label="结束时间" align='center' width="200"></el-table-column>
              <el-table-column prop="create_at" label="创建时间" align='center' width="200"></el-table-column>
              <el-table-column prop="status" align='center' label="活动状态" width="200">
                <template slot-scope="scope">
                  <el-tag type="primary" >{{scope.row.status |statusFil}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="status" fixed="right" align='center' label="操作" width="150">
                <template slot-scope="scope" class='btn'>
                  <el-button type="text" icon="el-icon-view" @click='see'></el-button>
                  <el-button type="text" icon="el-icon-upload2" v-show='scope.row.status===4'></el-button>
                  <el-button type="text" icon="el-icon-download" v-show='scope.row.status===3'></el-button>
                  <router-link :to="{name:'configuration',params:{id:scope.row.id}}">
                    <el-button type="text" icon="el-icon-edit" v-show='scope.row.status===2 ||scope.row.status===4'></el-button>
                  </router-link>
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

    <!--    <div v-show="!listLoading" class="pagination-container" style="margin-top:10px;text-align:right">-->
    <!--      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page"-->
    <!--                     :page-sizes="[10,20,30,50]" :page-size="query.page_size" layout="total, sizes, prev, pager, next, jumper" :total="total">-->
    <!--      </el-pagination>-->
    <!--    </div>-->
  </div>
</template>

<script>
  import {getList} from "../../api";

  export default {
    name: "home",
    created() {
      this.getList();
    },
    data() {
      return {
        formInline: {
          search: '',
          region: ''
        },
        //=>表格
        tableData: [],
        //=>页码
        currentPage1: 1,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        page: {},
        index: '1',

        //=>loading
        fullscreenLoading: true

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
      },
      see() {
        this.$router.replace('/see');
      },
      //=>获取列表
      async getList() {
        let data = await getList();
        if (data) {
          let ary = data.content.list;
          this.tableData = ary;
          this.fullscreenLoading = false;
          this.page.now_page = data.content.now_page;
          this.page.page_size = data.content.page_size;
          this.page.total = data.content.total;

          console.log(data);
        }

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
            return '已上架';
          case 4:
            return '已下架';
          case 5:
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
