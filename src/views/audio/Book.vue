<template>
  <section>
    <el-row :gutter="40" class="panel-group" align="middle">
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="card-panel-col"
        v-for="(item, index) in books"
        :key="index"
      >
        <div class="card-panel" @click="itemClick(item)">
          <div class="card-panel-icon-wrapper icon-people">
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">{{item.name}}</div>
            <count-to :start-val="0" :end-val="24" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" v-for="(o) in 2" :key="o">
        <el-card style="width:250px; height:400px" :body-style="{ padding: '0px' }">
          <img style="width:250px; height:300px"
            src="/static/img/junior1.jpg"
            class="image"
          />
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import CountTo from 'vue-count-to'
export default {
  components: {
    CountTo
  },
  data () {
    return {
      currentDate: new Date(),
      books: []
    }
  },
  methods: {
    itemClick (item) {
      this.$router.push('/lession')
      console.dir(item)
    }
  },
  mounted () {
    this.getRequest('/book/getBooks')
      .then(res => {
        this.books = res.data.data
      })
      .catch(err => {
        console.dir(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  width: 80%;
  .card-panel-col {
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }
  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;
    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
.time {
  font-size: 13px;
  color: #999;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
