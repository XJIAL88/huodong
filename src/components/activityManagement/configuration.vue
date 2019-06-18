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
        <el-dialog title="模块添加" :visible.sync="addModule" width="30%">
          <el-form :model="form">
            <el-form-item label="模块名称：" :label-width="addModule" class="module-name">
              <el-input v-model="form.name" autocomplete="off" type="text" maxlength="15" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="模块类型：" :label-width="addModule">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addModule = false">取 消</el-button>
            <el-button type="primary" @click="addModule = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="list">
        <div class="item" @click="$router.push('/wanCommunity')">
          <div class="item-img">
            <img src="../../assets/u806.png" height="32" width="32"/>
          </div>
          <span class="item-title">万社区新用户礼包</span>
        </div>
        <div class="item">
          <div class="item-img">
            <img src="../../assets/u806.png" height="32" width="32"/>
          </div>
          <span class="item-title">签到领礼包</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		data () {
			return {
				addModule: false,
        text: '',
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}],
				value: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				formLabelWidth: '120px'
      }
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
          display: flex;
          input{
            width: 300px;
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
