<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <selecttree
            :props="props"
            :options="list"
            :value="valueId"
            :clearable="isClearable"
            :accordion="isAccordion"
            @getValue="getValue($event)"/>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.name" size="small" placeholder="姓名" @keyup.enter.native="getUsers"></el-input>
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
    <el-table
        :data="users"
        :row-style="{height:0}"
        :header-row-style="{height:0}"
        :header-cell-style="{padding:0}"
        :cell-style="{padding:0}"
        highlight-current-row
        v-loading="listLoading"
        @selection-change="selsChange"
        @row-click="rowClick"
        style="width: 100%;">
      <el-table-column type="selection" width="45">
      </el-table-column>
      <el-table-column type="index" label="序号" width="50" sortable>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="100" sortable>
      </el-table-column>
      <el-table-column label="姓名" width="100" sortable>
        <template slot-scope="scope">
          <el-button type="text">{{scope.row.userName}}</el-button>
        </template>
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
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form>
        <el-form-item label="所选择用户：" prop="name">{{ userName }}
          <el-button type="danger" size="small" @click="batchRemove" :disabled="this.sels.length===0"  style="float:right;">批量删除</el-button>
          <el-pagination layout="total, sizes, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5,10,20,30,40]" :page-size="pageSize" :total="total" style="float:right;">
          </el-pagination>
        </el-form-item>
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane label="所属角色">
            <div v-for="o in 2" :key="o" class="text item" style="float:left; margin:10px">
              <el-tag size="medium">{{ '用户角色 ' + o }}</el-tag>
            </div>
            <!-- 解决float：left换行的问题 -->
            <div style="clear:both"></div>
            <el-button style="margin:10px;" type="primary" size="small" @click="handleEdit">编辑角色</el-button>
          </el-tab-pane>
          <el-tab-pane label="所属组">
            <div v-for="o in 2" :key="o" class="text item" style="float:left; margin:10px">
              <el-tag size="medium">{{ '用户组 ' + o }}</el-tag>
            </div>
            <!-- 解决float：left换行的问题 -->
            <div style="clear:both"></div>
            <el-button style="margin:10px;" type="primary" size="small" @click="handleEdit">编辑组</el-button>
          </el-tab-pane>
          <el-tab-pane label="用户权限">用户权限</el-tab-pane>
          <el-tab-pane label="总权限">总权限</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-col>
    <editrole :dialogVisible.sync="editFormVisible" :editForm="editForm" v-on:listenToChildEvent="updateRowFormEditForm"></editrole>
  </section>
</template>
<script>
import selecttree from '../../../components/TreeSelect'
import editrole from '../EditRole'
import { getTreeLabel } from '../../../util/util'
export default {
  data () {
    return {
      userName: '',
      tabPosition: 'left',
      filters: {
        name: '',
        recipe: ''
      },
      sels: [],
      editFormVisible: false, // 编辑界面是否显示
      listLoading: false,
      addLoading: false,
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: null, // 初始ID（可选）
      props: { // 配置项（必选）
        value: 'id',
        label: 'title',
        children: 'children'
        // disabled:true
      },
      // 编辑界面数据
      editForm: {
        id: 0,
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        state: 0
      },
      // 选项列表（必选）
      list: [
        {
          id: 1,
          title: '技术中心',
          parentId: 0,
          children: [
            {
              id: 2,
              title: '一部'
            }, {
              id: 3,
              title: '二部'
            }
          ]
        }, {
          id: 4,
          title: '培训中心',
          parentId: 0,
          disabled: true,
          children: [
            {
              id: 5,
              title: '新员工培训'
            }, {
              id: 6,
              title: '技能培训'
            }
          ]
        }, {
          id: 7,
          title: '集团中心',
          parentId: 0,
          children: [
            {
              id: 8,
              title: '人事部'
            }, {
              id: 9,
              title: '行政部'
            }
          ]
        }
      ],
      users: [],
      total: 0,
      pageNum: 0,
      pageSize: 5,
      addFormRules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      }
    }
  },
  components: {
    selecttree,
    editrole
  },
  methods: {
    filterState: function (value, row) {
      return row.state === value
    },
    // 状态转换
    formatState: function (value) {
      if (value === 1 || value === 2) {
        return this.$store.getters.formatState(value)
      } else {
        return ''
      }
    },
    // 显示编辑界面
    handleEdit: function () {
      this.editFormVisible = true
    },
    updateRowFormEditForm: function (row) {
      // TODO 是否进一步优化
      this.users.forEach(user => {
        if (user.id === row.id) {
          user.userName = row.userName
          user.name = row.name
          user.createDate = row.createDate
          user.state = parseInt(row.state)
          user.email = row.email
          user.address = row.address
        }
      })
    },
    rowClick (row, column, event) {
      this.userName = row.userName
      this.editForm = Object.assign({}, row)
    },
    handleNodeClick (node, data, value) {
      let name = getTreeLabel(data)
      let startIndex = name.indexOf('/') + 1
      this.userName = name.substring(startIndex)
    },
    // 获取用户列表
    getUsers () {
      let para = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        name: this.filters.name
      }
      this.listLoading = true
      this.postRequest('/user/getAllUsers', para).then((res) => {
        this.total = res.data.data.total
        this.users = res.data.data.list
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.dir(err)
      })
    },
    handleCurrentChange (val) {
      this.pageNum = val - 1
      this.getUsers()
    },
    handleSizeChange: function (val) {
      console.dir('page size :' + val)
    },
    handleAdd () {

    },
    getValue (value) {
      this.valueId = value
      console.log(this.valueId)
    },
    selsChange (sels) {
      this.sels = sels
    },
    // 新增
    addSubmit () {

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
