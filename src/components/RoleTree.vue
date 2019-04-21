<template>
  <el-form>
    <el-form-item label="角色信息" prop="name">
    </el-form-item>
    <el-tree ref="roletree" @node-click="handleNodeClick" :data="data" node-key="id" :default-expanded-keys="[1, 2, 3]" :default-checked-keys="[5]" :props="defaultProps">
    </el-tree>
  </el-form>
</template>

<script>
import { getTreeLabel } from '@/util/util'
export default {
  name: '',
  props: {
  },
  watch: {
    filterText (val) {
      this.$refs.roletree.filter(val)
    }
  },
  data () {
    return {
      listLoading: false,
      filterText: '',
      data: [{
        id: 1,
        label: '管理员',
        children: [{
          id: 4,
          label: '初级管理员'
        }, {
          id: 5,
          label: '中级管理员'
        }, {
          id: 6,
          label: '高级管理员'
        }]
      }, {
        id: 2,
        label: '普通用户',
        children: [{
          id: 7,
          label: '黄金用户'
        }, {
          id: 8,
          label: '钻石用户'
        }, {
          id: 9,
          label: '荣耀用户'
        }]
      }, {
        id: 3,
        label: 'VIP',
        children: [{
          id: 10,
          label: '一般VIP'
        }, {
          id: 11,
          label: '贵宾VIP'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  mounted () {
  },
  methods: {
    selsChange (sels) {
      this.sels = sels
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick (node, data, value) {
      let name = getTreeLabel(data)
      let startIndex = name.indexOf('/') + 1
      this.groupName = name.substring(startIndex)
    }
  }
}
</script>
