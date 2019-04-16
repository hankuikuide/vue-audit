<template>
  <section>
    <!--工具条-->
    <el-col :span="24" :class="collapsed ? 'toolbar panel-collapsed':'toolbar'">
      <el-form :inline="true" :model="filters">
        <el-col :span="20">
          <el-form-item v-for="(item,index) in 20" :key="item" :index="index">
            <el-input v-model="filters.name" size="small" placeholder="姓名" @keyup.enter.native="getUsers"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" size="small" v-on:click="getOrders">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="collapse">展开</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-col>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" size="small" @click="getOrders" :disabled="this.sels.length===0">批量删除</el-button>
    </el-col>
  </section>
</template>

<script>
export default {
  data () {
    return {
      filters: {
        name: '',
        recipe: ''
      },
      sels: [],
      collapsed: true
    }
  },
  methods: {
    getOrders () {
      return 1
    },
    collapse () {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style lang="scss" scoped>
.toolbar {
  background: #f2f2f2;
  padding: 10px;
  //border:1px solid #dfe6ec;
  margin: 10px 0px;
  padding-bottom: 0px;
  // transition: height 1s;
  transition: all .3s linear;
  .el-form-item {
    margin-bottom: 10px;
  }
}

.panel-collapsed {
  height:115px;
  overflow:hidden;
  // transition: height 1s;
  transition: all .3s linear;
}
</style>
