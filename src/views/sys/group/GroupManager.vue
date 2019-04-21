<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" size="small" placeholder="姓名" @keyup.enter.native="getUsers"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filters.recipe" size="small">
            <el-option v-for="item in $store.state.recipes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-col :span="6" class="toolbar" style="padding-bottom: 0px;">
      <grouptree></grouptree>
    </el-col>
    <el-col :span="18" class="toolbar" style="padding-bottom: 0px;">
      <el-form>
        <el-form-item label="所选择组：" prop="name">{{ groupName }}
        </el-form-item>
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="包含用户">
            <seabowtable></seabowtable>
          </el-tab-pane>
          <el-tab-pane label="所属角色">所属角色</el-tab-pane>
          <el-tab-pane label="组权限">组权限</el-tab-pane>
          <el-tab-pane label="总权限">总权限</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-col>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" size="small" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
    </el-col>
  </section>
</template>
<script>
import seabowtable from '@/components/SeabowTable'
import grouptree from '@/components/GroupTree'
export default {
  components: {
    seabowtable,
    grouptree
  },
  data () {
    return {
      groupName: '',
      tabPosition: 'left',
      filters: {
        name: '',
        recipe: ''
      },
      sels: [],
      addLoading: false,
      addFormRules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleAdd () {

    },
    getUsers () {

    },
    // 新增
    addSubmit () {

    },
    batchRemove () {

    },
    onClose () {
    }
  }
}
</script>

<style lang="scss">
@import "../user/UserManager.css";
</style>
