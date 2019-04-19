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

    <!--列表-->
    <el-table :data="users" :row-style="{height:0}" :header-row-style="{height:0}" :header-cell-style="{padding:0}" :cell-style="{padding:0}" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="expand" width="30">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="姓名:">{{ props.row.name }}</el-form-item>
            <el-form-item label="性别:">{{ props.row.sex }}</el-form-item>
            <el-form-item label="年龄:">{{ props.row.age }}</el-form-item>
            <el-form-item label="生日:">{{ props.row.birth }}</el-form-item>
            <el-form-item label="地址:">{{ props.row.addr }}</el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="45">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50" sortable>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="100" sortable>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="100" sortable>
      </el-table-column>
      <el-table-column prop="createDate" label="创建日期" width="180" sortable>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100" :filters="[{ text: '启用', value: 1 }, { text: '禁用', value: 2 }]" :filter-method="filterState" :formatter="formatState">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state===1 ?'primary':'success'" disable-transitions>{{formatState(scope.row.state)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" size="small" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="total, sizes, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,30,40]" :page-size="pageSize" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <EditUser :dialogVisible.sync="editFormVisible" :editForm="editForm" v-on:listenToChildEvent="updateRowFormEditForm"></EditUser>
    <AddUser :dialogVisible.sync="addFormVisible"></AddUser>
  </section>
</template>
<script src="./UserManager.js">
</script>

<style lang="scss">
@import "UserManager.css";
</style>
