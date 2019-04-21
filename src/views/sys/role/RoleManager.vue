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
      <roletree></roletree>
    </el-col>
    <el-col :span="18" class="toolbar" style="padding-bottom: 0px;">
      <el-form>
        <el-form-item label="所选择角色：" prop="name">{{ groupName }}
        </el-form-item>
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="包含用户">
            <seabowtable></seabowtable>
          </el-tab-pane>
          <el-tab-pane label="包含组">包含组
          </el-tab-pane>
          <el-tab-pane label="角色权限">角色权限</el-tab-pane>
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
import roletree from '@/components/RoleTree'

import treeTable from '../../../components/TreeTable'
import { getTreeLabel } from '../../../util/util'
export default {
  data () {
    return {
      groupName: '',
      tabPosition: 'left',
      filters: {
        name: '',
        recipe: ''
      },
      sels: [],
      listLoading: false,
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
  components: {treeTable, seabowtable, roletree},
  methods: {
    handleNodeClick (node, data, value) {
      let name = getTreeLabel(data)
      let startIndex = name.indexOf('/') + 1
      this.groupName = name.substring(startIndex)
    },
    handleAdd () {

    },
    selsChange (sels) {
      this.sels = sels
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
