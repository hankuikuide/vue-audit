<template>
  <el-form>
    <el-form-item label="组信息" prop="name">
      <el-input size="small" placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    </el-form-item>
    <el-tree ref="grouptree" :filter-node-method="filterNode" @node-click="handleNodeClick" :data="data" node-key="id" :default-expanded-keys="[1, 2, 3]" :default-checked-keys="[5]" :props="defaultProps">
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
      this.$refs.grouptree.filter(val)
    }
  },
  data () {
    return {
      listLoading: false,
      filterText: '',
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
