<template>
  <div class="configuration">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动列表</a></el-breadcrumb-item>
      <el-breadcrumb-item>配置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="top">
        <span class="title">模块添加</span>
        <el-button type="primary" @click="addModule = true" class="btn">添加</el-button>
        <el-dialog title="模块添加" :visible.sync="addModule" width="25%">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="模块名称：" :label-width="labelWidth" class="module-name" prop="name">
              <el-input v-model="form.name" autocomplete="off" type="text" maxlength="15" show-word-limit placeholder="请输入模块名称"></el-input>
            </el-form-item>
            <el-form-item label="模块类型：" :label-width="labelWidth" prop="region">
              <el-select v-model="form.moduleType" placeholder="请选择模块类型">
                <el-option v-for="(item,index) in moduleTypeLists" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button  @click="resetForm('form')">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in activeModuleLists" :key="index" @click="jump('/wanCommunity',item.name)">
          <div class="item-img">
            <img src="../../assets/u806.png" height="32" width="32"/>
          </div>
          <span class="item-title">{{item.name}}</span>
        </div>
        <div class="item" @click="jump('/wanCommunity','万社区')">
          <div class="item-img">
            <img src="../../assets/u806.png" height="32" width="32"/>
          </div>
          <span class="item-title">万社区</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {UPDATE_NAME} from "../../vuex/mutation-types";
  import {mapState} from 'vuex';
  import {reqCreateActiveModule,reqModuleTypeList} from "../../api/api";

  export default {
    data () {
      return {
        addModule: false,  // dialog弹窗
        form: {
          name: '',  // 模块名称
          moduleType: '' // 模块类型
        },
        labelWidth: '120px', // 弹出框label的宽度
        rules: {
          name: [
            { required: true, message: '请输入模块名称', trigger: 'blur' },
            { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
          ],
          moduleType: [
            { required: true, message: '请选择模块类型', trigger: 'change' }
          ]
        },  // 表单验证规则
        moduleTypeLists: [], // 模块类型列表
        activeId: 0,  // 活动ID
        moduleId: 0,  // 模块ID
      }
    },
    methods: {
      jump (path, activeName) {
        this.$store.commit(UPDATE_NAME, activeName);
        const {activeId,moduleId} = this;
        this.$router.push({path, query:{activeId,moduleId}});
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { form, activeId } = this;
            this.addModule = false;
            const name = form.name;
            const moduleType = form.moduleType;
            this.createActiveModule(activeId, name, moduleType);
            this.$refs[formName].resetFields();
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.addModule = false;
        this.$refs[formName].resetFields();
      },
      async createActiveModule (activeId, name, typeId) {
        const result = await reqCreateActiveModule(activeId, name, typeId)
        if (result.code === 0) {
          this.moduleId = result.content;
        }
      },
      async moduleTypeList () {
        const result = await reqModuleTypeList();
        if (result.code === 0) {
          this.moduleTypeLists = result.content;
        }
      }
    },
    mounted() {
      this.activeId = this.$route.params.id;
      this.$store.dispatch('getActiveModuleLists', this.activeId);
      this.moduleTypeList();
    },
    computed: {
      ...mapState({
        activeModuleLists : state => state.configuration.activeModuleLists
      })
    }
  }
</script>

<style  lang=less>
  .el-breadcrumb{  // 面包屑下划线
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .el-dialog__header{ // 弹窗下划线
    border-bottom: 1px solid #eee;
  }
  .configuration {
    .content{
      .top{
        margin: 20px 0 0 50px;
        .title{
          margin-right: 80px;
        }
        .btn{
          width: 130px;
        }
        .module-name{
          .el-input{
            width: 85%;
          }
        }
      }
      .list{
        .item{
          cursor: pointer;
          width: 250px;
          background: #eee;
          display: flex;
          margin-left: 50px;
          margin-top: 50px;
          padding: 10px 0 10px 20px;
          border-radius: 4px;
          .item-img{
            width: 32px;
            height: 32px;
            background: #ff6699;
            padding: 5px;
            border-radius: 5px;
          }
          .item-title{
            color: #333;
            line-height: 40px;
            margin-left: 15px;
          }
        }
      }
    }
  }
</style>
