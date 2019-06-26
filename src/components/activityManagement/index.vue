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
                  <el-tag disable-transitions>{{scope.row.status |statusFil}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="status" fixed="right" align='center' label="操作" width="170">
                <template slot-scope="scope" class='btn'>
                  <el-tooltip class="item" effect="dark" content="查看" placement="bottom">
                    <el-button type='primary' circle size="mini" icon="el-icon-view" @click="$router.push({params: {id: scope.row.id,number:scope.row.number}, name: 'see'})"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="上架" placement="bottom">
                    <el-button type='primary' circle size="mini" icon="el-icon-upload2" @click='upload(scope.row.id,3)' v-show='scope.row.status===4'></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="下架" placement="bottom">
                    <el-button type='primary' circle size="mini" icon="el-icon-download" @click='upload(scope.row.id,4)' v-show='scope.row.status===3'></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                    <el-button
                      type='primary'
                      icon="el-icon-edit"
                      size="mini"
                      circle
                      @click="$router.push({params: {id: scope.row.id}, name: 'configuration'})"
                      v-show='scope.row.status===2 ||scope.row.status===4'>
                    </el-button>
                  </el-tooltip>
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
          :current-page.sync="query.now_page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="query.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
  </div>
</template>

<script>
  import {getList, update} from "../../api";

  export default {
    inject: ['reload'],
    name: "home",
    created() {
      this.getList();
    },
    data() {
      return {
        total: 0,
        formInline: {
          search: '',
          region: ''
        },
        //=>表格
        tableData: [],
        //=>页码
        query: {
          now_page: 1,
          page_size: 10,
        },
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
        this.query.page_size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.query.now_page = val;
        this.getList();
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      async upload(id, num) {
        let data = await update(id, num);
        if (data.code === 0 && num === 3) {
          this.$message({
            message: '恭喜上架成功！！',
            type: 'success'
          });
          this.reload();
        } else if (data.code !== 0 && num === 3) {
          this.$message.error('很遗憾，上架失败了！！');
        } else if (data.code === 0 && num === 4) {
          this.$message({
            message: '恭喜下架成功！！',
            type: 'success'
          });
          this.reload();
        } else {
          this.$message.error('很遗憾，下架失败了！！');
        }
      },

      //=>获取列表
      async getList(val) {
        let obj = this.query;
        let data = await getList(obj);
        console.log(data);
        // if (data) {
          let ary = data.content.list;
          this.tableData = ary;
          this.fullscreenLoading = false;
          this.total = data.content.total;
        // }

      },
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

  .btns {
    border: none;
    padding: 6px 20px;
    background: #ccc;
    color: #fff;
    border-radius: 4px;
  }
</style>
