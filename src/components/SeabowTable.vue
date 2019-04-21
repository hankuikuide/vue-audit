<template>
  <el-table :data="users" :row-style="{height:0}" :header-row-style="{height:0}" :header-cell-style="{padding:0}" :cell-style="{padding:0}" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
    <el-table-column type="selection" width="45">
    </el-table-column>
    <el-table-column prop="name" label="用户名" width="100" sortable>
    </el-table-column>
    <el-table-column prop="userName" label="姓名" width="100" sortable>
    </el-table-column>
    <el-table-column prop="email" label="邮箱" min-width="200" sortable>
    </el-table-column>
    <el-table-column prop="lastDate" label="最近登录时间" width="180" sortable>
    </el-table-column>
    <el-table-column prop="loginCount" label="登录次数" width="120" sortable>
    </el-table-column>
  </el-table>
</template>

<script>
import Mock from 'mockjs'
export default {
  name: '',
  props: {
  },
  data () {
    return {
      listLoading: false,
      users: [{
        name: Mock.Random.first(),
        userName: Mock.Random.cname(),
        email: Mock.Random.email(),
        lastDate: Mock.Random.datetime(),
        loginCount: Mock.Random.integer(60, 100)
      }, {
        name: Mock.Random.first(),
        userName: Mock.Random.cname(),
        email: Mock.Random.email(),
        lastDate: Mock.Random.datetime(),
        loginCount: Mock.Random.integer(60, 100)
      }, {
        name: Mock.Random.first(),
        userName: Mock.Random.cname(),
        email: Mock.Random.email(),
        lastDate: Mock.Random.datetime(),
        loginCount: Mock.Random.integer(60, 100)
      }, {
        name: Mock.Random.first(),
        userName: Mock.Random.cname(),
        email: Mock.Random.email(),
        lastDate: Mock.Random.datetime(),
        loginCount: Mock.Random.integer(60, 100)
      }, {
        name: Mock.Random.first(),
        userName: Mock.Random.cname(),
        email: Mock.Random.email(),
        lastDate: Mock.Random.datetime(),
        loginCount: Mock.Random.integer(60, 100)
      }]
    }
  },
  mounted () {
  },
  methods: {
    selsChange (sels) {
      this.sels = sels
    }
  }
}
</script>
