<template>
  <!--新增界面-->
  <el-dialog title="新增" :visible.sync="dialogVisible" :show-close="false">
    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="addForm.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" prop="url">
        <el-input v-model="addForm.url" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="Path" prop="path">
        <el-input  v-model="addForm.path" show-password></el-input>
      </el-form-item>
      <el-form-item label="父节点ID" prop="parentId">
        <el-input placeholder="请输入内容" v-model="addForm.parentId">
        </el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="addForm.state">
          <el-radio-button label=1>启用</el-radio-button>
          <el-radio-button label=2>禁用</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="addForm.iconCls"></el-input>
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
        state: 1,
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
            this.postRequest('/config/addMenu', para).then(res => {
              console.dir(res.data)
              this.addLoading = false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$emit('update:dialogVisible', false)
            }).catch(() => {
              this.addLoading = false
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
