<template>
  <!--编辑界面-->
  <el-dialog title="编辑" :visible.sync="dialogVisible" :show-close="false">
    <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="editForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="editForm.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passsword">
        <el-input type="password" placeholder="请输入密码" v-model="editForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入内容" v-model="editForm.email"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="editForm.state">
          <el-radio-button label=1>启用</el-radio-button>
          <el-radio-button label=2>禁用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="editForm.address"></el-input>
      </el-form-item>
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
