<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" size="small" placeholder="名称" @keyup.enter.native="getUsers"></el-input>
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
      <el-table-column type="selection" width="45">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50" sortable>
      </el-table-column>
      <el-table-column prop="id" label="菜单Id" width="100" sortable>
      </el-table-column>
      <el-table-column prop="name" label="菜单名称" width="100" sortable>
      </el-table-column>
      <el-table-column prop="url" label="菜单路径" width="100" sortable>
      </el-table-column>
      <el-table-column prop="path" label="Path" width="180" sortable>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100" :filters="[{ text: '启用', value: 1 }, { text: '禁用', value: 2 }]" :filter-method="filterState" :formatter="formatState">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state===1 ?'primary':'success'" disable-transitions>{{formatState(scope.row.state)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="parentId" label="父节点Id" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="leaf" label="叶子节点" min-width="150" sortable>
      </el-table-column>
      <el-table-column prop="iconCls" label="图标" width="300" sortable>
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

    <EditMenu :dialogVisible.sync="editFormVisible" :editForm="editForm" v-on:listenToChildEvent="updateRowFormEditForm"></EditMenu>
    <AddMenu :dialogVisible.sync="addFormVisible"></AddMenu>
  </section>
</template>
<script src="./MenuManager.js">
</script>

<style lang="scss">
@import "../sys/UserManager.css";
</style>
