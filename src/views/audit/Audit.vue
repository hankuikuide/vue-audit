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
          <el-button type="primary" size="small" @click="alert(1)">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </section>
</template>
<script >
export default {
  data () {
    return {
      filters: {
        name: '1111',
        recipe: ''
      },
      users: []
    }
  },
  methods: {
    filterState: function (value, row) {
      return row.state === value
    },
    // 获取用户列表
    getUsers () {
      let para = {
        name: 'administrator'
      }
      this.listLoading = true
      this.getRequest('/audit/hello', para).then((res) => {
        this.total = res.data.total
        this.users = res.data.users
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.dir(err)
      })
    }
  },
  mounted () {
    this.getUsers()
  }
}

</script>

<style lang="scss">
</style>
