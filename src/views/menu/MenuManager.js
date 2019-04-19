// import util from '../../common/js/util'
import AddMenu from './addmenu/AddMenu.vue'
import EditMenu from './editmenu/EditMenu.vue'
export default {
  data () {
    return {
      filters: {
        name: '',
        recipe: ''
      },
      users: [],
      total: 0,
      pageNum: 0,
      pageSize: 10,
      listLoading: false,
      sels: [], // 列表选中列
      editFormVisible: false, // 编辑界面是否显示
      // 编辑界面数据
      editForm: {
        id: 0,
        name: '',
        sex: -1,
        age: 0,
        birth: '',
        state: 0
      },
      addFormVisible: false // 添加界面是否显示
    }
  },
  methods: {
    filterState: function (value, row) {
      return row.state === value
    },
    // 状态转换
    formatState: function (value) {
      if (value === 1 || value === 2) {
        return this.$store.getters.formatState(value)
      } else {
        return ''
      }
    },
    // 性别显示转换
    formatSex: function (row, column) {
      return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知'
    },
    handleCurrentChange (val) {
      this.pageNum = val - 1
      this.getUsers()
    },
    // 获取用户列表
    getUsers () {
      this.listLoading = true
      this.getRequest('/config/sysmenu').then((res) => {
        this.users = res.data.data
        this.listLoading = false
      }).catch(err => {
        this.listLoading = false
        console.dir(err)
      })
    },
    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start();
        let para = {
          id: row.id
        }
        this.getRequest('/user/remove', para).then((res) => {
          this.listLoading = false
          // NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getUsers()
        }).catch(err => {
          this.listLoading = false
          console.dir(err)
        })
      }).catch(() => {

      })
    },
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    updateRowFormEditForm: function (row) {
      // TODO 是否进一步优化
      this.users.forEach(user => {
        if (user.id === row.id) {
          user.userName = row.userName
          user.name = row.name
          user.createDate = row.createDate
          user.state = parseInt(row.state)
          user.email = row.email
          user.address = row.address
        }
      })
    },
    // 显示新增界面
    handleAdd: function () {
      this.addFormVisible = true
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        console.dir(ids)
      }).catch(() => {

      })
    },
    handleSizeChange: function (val) {
      console.dir('page size :' + val)
    }
  },
  components: {
    AddMenu,
    EditMenu
  },
  mounted () {
    this.getUsers()
  }
}
