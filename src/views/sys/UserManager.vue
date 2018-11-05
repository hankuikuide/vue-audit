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
      <el-table-column prop="name" label="姓名" width="100" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="80" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="80" sortable>
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="100" sortable>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100" :filters="[{ text: '进行中', value: 1 }, { text: '已完成', value: 2 }]" :filter-method="filterState" :formatter="formatState">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state===1 ?'primary':'success'" disable-transitions>{{formatState(scope.row.state)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="addr" label="地址" width="350" sortable>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="150" sortable>
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
      <el-pagination layout="prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,30,40]" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <AddUser :dialogVisible.sync="addFormVisible"></AddUser>
  </section>
</template>
<script src="./UserManager.js">
</script>

<style lang="scss">
@import 'UserManager.css';
</style>
