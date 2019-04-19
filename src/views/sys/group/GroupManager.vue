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
      <el-form>
        <el-form-item label="组信息" prop="name">
        </el-form-item>
      </el-form>

      <el-tree ref="grouptree" @node-click="handleNodeClick" :data="data" node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
      </el-tree>
    </el-col>
    <el-col :span="18" class="toolbar" style="padding-bottom: 0px;">
      <el-form>
        <el-form-item label="所选择组：" prop="name">{{ groupName }}
        </el-form-item>
        <el-tabs :tab-position="tabPosition" style="height: 200px;">
          <el-tab-pane label="包含用户">包含用户</el-tab-pane>
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
import { getTreeLabel } from '../../../util/util'
export default {
  data () {
    return {
      groupName: '开发一部 / 一组',
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
      },
      data: [{
        id: 1,
        label: '技术中心',
        children: [{
          id: 4,
          label: '一部',
          children: [{
            id: 9,
            label: '一组'
          }, {
            id: 10,
            label: '二组'
          }]
        }]
      }, {
        id: 2,
        label: '数据中心',
        children: [{
          id: 5,
          label: '一部'
        }, {
          id: 6,
          label: '二部'
        }]
      }, {
        id: 3,
        label: '研发中心',
        children: [{
          id: 7,
          label: '一部'
        }, {
          id: 8,
          label: '二部'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick (node, data, value) {
      this.groupName = getTreeLabel(data)
      console.dir(data)
    },
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
