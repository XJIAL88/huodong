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
          <el-form :inline="true" ref="ruleForm" :model="formInline" class="demo-form-inline">
            <el-form-item label="选择状态">
              <el-select v-model="formInline.region" placeholder="全部状态">
                <el-option label="进行中" value="shanghai"></el-option>
                <el-option label="即将开始" value="beijing"></el-option>
                <el-option label="已下架" value="beijing"></el-option>
                <el-option label="已失效" value="beijing"></el-option>
                <el-option label="待配置" value="beijing"></el-option>
                <el-option label="审批中" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="formInline.search" placeholder="搜索活动名称或活动id"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
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
                  width="80">
                </el-table-column>
              </div>
              <el-table-column
                prop="b"
                label="活动id"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="c"
                label="活动名称"
                width="200">
              </el-table-column>
              <el-table-column
                prop="d"
                label="开始时间"
                width="200">
              </el-table-column>
              <el-table-column
                prop="e"
                label="结束时间"
                width="200">
              </el-table-column>
              <el-table-column
                prop="f"
                label="创建时间"
                width="200">
              </el-table-column>
              <el-table-column
                prop="g"
                label="活动状态"
                width="200">
                <el-button type="primary" size="mini">{{tableData[0].g}}</el-button>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    <i class="el-icon-view"></i>
                  </el-button>
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    <i class="el-icon-download"></i>
                  </el-button>
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
  export default {
    name: "home",
    data() {
      return {
        formInline: {
          search: '',
          region: ''
        },
        // 表格
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
          children: [{
            id: 31,
            b: 'LW180515002',
            c: '六一儿童节活动',
            d: '2018/12/11 18:00:00',
            e: '2018/12/11 18:00:00',
            f: '2018/12/11 18:00:00',
            g: '进行中'
          }]
        }],
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
            {
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }
          ])
        }, 1000)
      },
      onSubmit() {
        console.log('submit!');
      },
      resetForm(formName) {
        this.$refs[ruleForm].resetFields();
      },
      //页码
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
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
</style>
