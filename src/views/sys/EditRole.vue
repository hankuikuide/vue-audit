<template>
  <!--编辑界面-->
  <el-dialog title="编辑" :visible.sync="dialogVisible" :show-close="false">
    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[1, 2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="onClose">取消</el-button>
      <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogVisible', 'editForm'], // 界面是否显示
  data () {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      editLoading: false,
      editFormRules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    // 编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            let para = Object.assign({}, this.editForm)
            this.postRequest('/user/editUser', para).then(res => {
              this.logining = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$emit('listenToChildEvent', this.editForm)
              this.$emit('update:dialogVisible', false)
            }).catch(() => {
              this.logining = false
            })
          })
        }
      })
    },
    onClose () {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>
