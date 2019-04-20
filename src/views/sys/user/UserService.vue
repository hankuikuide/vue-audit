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

      <el-tree ref="grouptree" @node-click="handleNodeClick" :data="data" node-key="id" :default-expanded-keys="[1, 2, 3]" :default-checked-keys="[5]" :props="defaultProps">
      </el-tree>
    </el-col>
    <el-col :span="18" class="toolbar" style="padding-bottom: 0px;">
      <el-form>
        <el-form-item label="所选择组：" prop="name">{{ groupName }}
        </el-form-item>
        <el-tabs :tab-position="tabPosition" style="height: 200px;">
          <el-tab-pane label="包含用户">
          <!-- <el-form-item label="包含用户" prop="name">
          </el-form-item> -->
               <!--列表-->
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
          </el-tab-pane>
          <el-tab-pane label="所属角色">所属角色
            <tree-table :data="rowData" :columns="columns" border/>
          </el-tab-pane>
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
import Mock from 'mockjs'
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
      },
      columns: [
        {
          text: '事件',
          value: 'event',
          width: 200
        },
        {
          text: 'ID',
          value: 'id'
        }
      ],
      rowData: [
        {
          id: 0,
          event: '事件1',
          timeLine: 50,
          comment: '无'
        }, {
          id: 1,
          event: '事件1',
          timeLine: 100,
          comment: '无',
          children: [
            {
              id: 2,
              event: '事件2',
              timeLine: 10,
              comment: '无'
            },
            {
              id: 3,
              event: '事件3',
              timeLine: 90,
              comment: '无',
              children: [
                {
                  id: 4,
                  event: '事件4',
                  timeLine: 5,
                  comment: '无'
                },
                {
                  id: 5,
                  event: '事件5',
                  timeLine: 10,
                  comment: '无'
                },
                {
                  id: 6,
                  event: '事件6',
                  timeLine: 75,
                  comment: '无',
                  children: [
                    {
                      id: 7,
                      event: '事件7',
                      timeLine: 50,
                      comment: '无',
                      children: [
                        {
                          id: 71,
                          event: '事件71',
                          timeLine: 25,
                          comment: 'xx'
                        },
                        {
                          id: 72,
                          event: '事件72',
                          timeLine: 5,
                          comment: 'xx'
                        },
                        {
                          id: 73,
                          event: '事件73',
                          timeLine: 20,
                          comment: 'xx'
                        }
                      ]
                    },
                    {
                      id: 8,
                      event: '事件8',
                      timeLine: 25,
                      comment: '无'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
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
      }],
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
  components: { treeTable },
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
