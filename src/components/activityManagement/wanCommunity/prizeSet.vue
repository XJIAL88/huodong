<template>
  <div class="main">
          <div class="title" style='margin: 25px 0;'>奖品设置</div>
          <el-table :data="tableData" style="width: 100%;height: 100%" max-height="500" row-key="id" default-expand-all
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label="奖品ID" width="200" align="center">
              <template slot-scope="scope">
                <div>{{scope.row.award_id}}</div>
                <!--<el-input v-model="scope.row.category_name" placeholder="请输入" type="string" @blur="categoryInfo(scope.row.category_name)"></el-input>-->
              </template>
            </el-table-column>
            <el-table-column label="资源类型" align='center' sortable width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.category_name" placeholder="请输入" type="string" @blur="categoryInfo(scope.row.category_name)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="奖品" align='center' width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" placeholder="请输入" type="string" @blur="awardInfo(scope.row.name)"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="award_number" label="发放数量" align='center' width="200">
              <template slot-scope="scope">
                <el-input v-model="scope.row.award_number" placeholder="请输入" type="number" @blur="awardNumInfo(scope.row.award_number)"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="签到次数" align='center' width="200" v-if="isShow">
              <template slot-scope="scope">
                <el-input v-model="scope.row.number" placeholder="请输入" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column  label="签到类型" width="200" align="center" v-if="isShow">
              <template slot-scope="scope">
                <el-select v-model="scope.row.signed_type" placeholder="请选择">
                  <el-option
                    v-for="item in signType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
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
              <div class="btns">
                <el-button type="primary" @click="prevStep" style='margin-left: 0;'>上 一 步</el-button>
                <el-button type="primary" @click="isClick && addItem()" style='margin: 0 10px 0 10px ;'>添加奖品</el-button>
                <el-button type="primary" @click="submitForm()" style='margin-left: 0;'>确认</el-button>
                <el-button @click="resetForm">取消</el-button>
              </div>
          </el-col>
  </div>
</template>

<script>
  import {reqActiveAwardLists,reqConfigPackageAward} from "../../../api/api";

  export default {
    name: "prizeSet",
    props: ['tab'],
    data() {
      return {
        tableData: [], // 奖品列表
        signType: [
          {
            value: '1',
            label: '不签到'
          },
          {
            value: '2',
            label: '连续签到'
          },
          {
            value: '3',
            label: '累计签到'
          }
        ], // 签到下拉列表
        isClick: true,
        isShow: false,  // 是否显示签到类型和签到次数
        activityAward: [],
        sign_num: 1,  // 签到次数
        category_name: "",  // 资源类型
        name: '', // 劵
        award_number: 0, // 发放数量
        category_id: null, // 资源Id
        id: null, // 奖品Id
      }
    },
    methods: {
      prevStep () {
        this.tab('second');
      }, // 上一步
      submitForm() {
        const {activeId, moduleId, typeId} = this.$route.query;
        const arr = this.tableData.map(item => {
          delete item.award_number;
          return item
        });  // 删除数组里的award_number属性
        const activityAward = JSON.stringify(arr); // json转换
        console.log(activityAward);
        this.configAward(activeId,moduleId,typeId,activityAward);
      }, // 确定
      resetForm() {
        this.$router.replace('/index');
      }, // 取消
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }, // 删除奖品
      addItem() {
        // const id = '奖品' + parseInt(this.tableData.length + 1);
        const obj = {
          award_id: this.id,
          name: '',
          category_id: this.category_id,
          category_name: '',
          number: 1,
          signed_type: "1"
        };
        this.tableData.push(obj);

        if (this.tableData.length >= 10) {
          this.isClick = false;
          this.$message.error('很抱歉，只能添加10条信息');
        }
      }, // 添加商品
      async awardList (activity_id) {
        const result = await reqActiveAwardLists(activity_id);
        if (result.code === 0) {
          result.content.map((item,index) => { // 遍历返回的数组，创建相应的对象
            const obj = {
              award_id: result.content[index].id,
              name: result.content[index].name,
              award_number: result.content[index].award_number,
              category_id: result.content[index].category_id,
              category_name: result.content[index].category_name,
              number: 1,
              signed_type: "1"
            };
            this.tableData.push(obj);
          });
          // this.tableData = result.content;
          if (this.tableData === "") {
            this.tableData = []
          }
          this.category_id = result.content[0].category_id;
          this.id = result.content[0].id;
          // console.log(this.tableData);
        }
      },
      async configAward (activeId,moduleId,moduleType,activityAward) {
        const result = await reqConfigPackageAward(activeId,moduleId,moduleType,activityAward);
        console.log(result);
        if (result.code === 0) {
          this.$message({
            message: "添加成功",
            type: 'success'
          });
        } else {
          this.$message({
            message: result.message,
            type: 'success'
          });
        }
      },
      categoryInfo(category_name){
        this.category_name = category_name;
      },  // 资源类型
      awardInfo(name){
        this.name = name;
      },  // 奖品
      awardNumInfo(award_number){
        this.award_number = award_number;
      }, // 发放数量
    },
    created() {
      this.awardList(this.$route.query.activeId);
      PubSub.subscribe("joinSet", (eventName, data) => {
        this.isShow = data.isSign;
        this.$forceUpdate()
      });
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
    /*margin-left: -100px;*/
    margin-top: 20px;
  }
</style>
