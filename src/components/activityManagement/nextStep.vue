<template>
  <div class="main">
<!--    <el-row :gutter="20">-->
<!--      <el-col :span="17">-->
<!--        <h3 class='title'>新建活动-->
<!--          <span><i class='must'>*</i> 为必填项</span>-->
<!--        </h3>-->
<!--      </el-col>-->
<!--      <el-col :span="7">-->
<!--        <div class="grid-content bg-purple" style='text-align: right;'>-->
<!--          <router-link to="index">-->
<!--            <el-button type="primary" size="medium">提交审核</el-button>-->
<!--          </router-link>-->
<!--          <router-link to="news" style='margin-left: 10px;'>-->
<!--            <el-button size="medium">取消</el-button>-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </el-col>-->

<!--      <el-col :span="24">-->
<!--        <div class="tabel" style='margin-top: 30px;'>-->
<!--          <div class="grid-content bg-purple-dark">-->
<!--            <h3 class='title' style="margin-bottom: 10px;"><i class='must'>*</i>资源调用</h3>-->
<!--            <div class="tabel">-->
<!--              <el-table-->
<!--                :data="tableData"-->
<!--                style="width: 100%;height: 100%"-->
<!--                max-height="500"-->
<!--                row-key="id"-->
<!--                default-expand-all-->
<!--                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">-->
<!--                <div class="ary">-->
<!--                  <el-table-column-->
<!--                    prop="a"-->
<!--                    label="序列"-->
<!--                    width="80">-->
<!--                  </el-table-column>-->
<!--                </div>-->
<!--                <el-table-column-->
<!--                  prop="b"-->
<!--                  label="活动id"-->
<!--                  sortable-->
<!--                  width="200">-->

<!--                    <el-select v-model="value" placeholder="请选择">-->
<!--                      <el-option-->
<!--                        v-for="item in options"-->
<!--                        :key="item.value"-->
<!--                        :label="item.label"-->
<!--                        :value="item.value">-->
<!--                      </el-option>-->
<!--                    </el-select>-->

<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  prop="c"-->
<!--                  label="活动名称"-->
<!--                  width="200">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  prop="d"-->
<!--                  label="开始时间"-->
<!--                  width="200">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  prop="e"-->
<!--                  label="结束时间"-->
<!--                  width="200">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  prop="f"-->
<!--                  label="创建时间"-->
<!--                  width="200">-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  prop="g"-->
<!--                  label="活动状态"-->
<!--                  width="200">-->
<!--                  <el-button type="primary" size="mini">{{tableData[0].g}}</el-button>-->
<!--                </el-table-column>-->
<!--                <el-table-column-->
<!--                  fixed="right"-->
<!--                  label="操作"-->
<!--                  width="120">-->
<!--                  <template slot-scope="scope">-->
<!--                    <el-button-->
<!--                      @click.native.prevent="deleteRow(scope.$index, tableData)"-->
<!--                      type="text"-->
<!--                      size="small">-->
<!--                      <i class="el-icon-view"></i>-->
<!--                    </el-button>-->
<!--                    <el-button-->
<!--                      @click.native.prevent="deleteRow(scope.$index, tableData)"-->
<!--                      type="text"-->
<!--                      size="small">-->
<!--                      <i class="el-icon-download"></i>-->
<!--                    </el-button>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--              </el-table>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->
<div>ddd</div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <h3 class='title'>新建活动
            <span><i class='must'>*</i> 为必填项</span>
          </h3>
        </el-col>
        <el-col :span="12" style='text-align: right;'>
          <el-form-item>
            <router-link to='/nextStep'>
              <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
            </router-link>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动时间" required>
            <el-form-item prop="date1">
              <el-date-picker type="datetimerange" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="活动规则" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" :rows="12"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "nextStep",
    data(){
      return{
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
        value: '',
        input:''
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

