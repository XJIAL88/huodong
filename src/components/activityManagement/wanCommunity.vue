<template>
  <div class="wan-community">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">活动列表</a></el-breadcrumb-item>
      <el-breadcrumb-item>设置</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <div class="title">
        领礼包
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="tab">
        <el-tab-pane label="基础设置" name="first">
          <el-form ref="form" :model="form" label-width="100px" class="base-set">
            <el-form-item label="活动名称：">
              <el-input v-model="form.name" type="text" maxlength="15" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="活动时间：">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="活动规则：">
              <el-input type="textarea" v-model="form.desc" maxlength="1000" show-word-limit rows=8></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">下一步</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="参与设置" name="second">参与设置</el-tab-pane>
        <el-tab-pane label="奖品设置" name="third">奖品设置</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			};
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			onSubmit() {
				console.log('submit!');
			}
		}
	}
</script>

<style scoped lang="less">
  .el-breadcrumb{  // 面包屑下划线
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
  }
  .wan-community{
    .content{
      .title{}
      .tab{
        .base-set{
          width: 500px;
        }
      }
    }
  }
</style>
