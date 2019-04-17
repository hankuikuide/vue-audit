<template>
  <!--新增界面-->
  <el-dialog title="新增" :visible.sync="dialogVisible" :show-close="false">
    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="addForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="addForm.userName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passsword">
        <el-input type="password" placeholder="请输入密码" v-model="addForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input placeholder="请输入内容" v-model="addForm.email">
          <template slot="append">@163.com</template>
        </el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="addForm.state">
          <el-radio-button label="启用"></el-radio-button>
          <el-radio-button label="禁用"></el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="地址">
        <el-input type="textarea" v-model="addForm.address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="onClose">取消</el-button>
      <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Mock from 'mockjs'
export default {
  props: ['dialogVisible'], // 新增界面是否显示
  data () {
    return {
      addLoading: false,
      addFormRules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      },
      // 新增界面数据
      addForm: {
        name: Mock.Random.first(),
        userName: Mock.Random.cname(),
        password: 123456,
        email: Mock.Random.email('163.com'),
        state: '禁用',
        address: Mock.mock('@county(true)')
      }
    }
  },
  methods: {
    // 新增
    addSubmit: function () {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            let para = Object.assign({}, this.addForm)
            this.postRequest('/api/user/addUser', para).then(res => {
              this.logining = false
              console.dir(res.data)
              this.$message({
                message: '添加成功',
                type: 'success'
              })
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
