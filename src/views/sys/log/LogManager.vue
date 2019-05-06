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
      </el-form>
    </el-col>
       <!--列表-->
    <el-table :data="users" :row-style="{height:0}" :header-row-style="{height:0}" :header-cell-style="{padding:0}" :cell-style="{padding:0}" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="45">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50" sortable>
      </el-table-column>
      <el-table-column prop="name" label="操作名称" width="150" sortable>
      </el-table-column>
      <el-table-column prop="content" label="操作内容" width="400" sortable>
      </el-table-column>
      <el-table-column prop="operator" label="操作人" width="180" sortable>
      </el-table-column>
      <el-table-column prop="createDate" label="操作时间" width="180" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" size="small" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
    </el-col>
  </section>
</template>
<script>
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
      users: [],
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
    selsChange (sels) {
      this.sels = sels
    },
    getUsers () {
      this.listLoading = true
      this.getRequest('/logs').then((res) => {
        this.total = res.data.data.total
        this.users = res.data.data
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.dir(err)
      })
    },
    batchRemove () {

    },
    onClose () {
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style lang="scss">
@import "../user/UserManager.css";
</style>
