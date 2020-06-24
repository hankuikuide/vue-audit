<template>
  <section>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="false" :model="filters">
         <el-form-item>
          <audio id="audioPlayer" style="width: 100%;" @timeupdate="onTimeupdate" src="/static/audios/Lesson25.mp3" controls autoplay loop>
              你的浏览器不支持audio标签
          </audio>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" v-on:click="getSubtitle">显示原文</el-button>
          <el-dropdown trigger="hover" @command="playRate">
            <span class="el-dropdown-link">
              <el-button type="primary" size="small">倍速播放</el-button>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command='0.8'>0.8</el-dropdown-item>
              <el-dropdown-item command='1'>1</el-dropdown-item>
              <el-dropdown-item command='1.2'>1.2</el-dropdown-item>
              <el-dropdown-item command='1.5'>1.5</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        </el-form-item>
      </el-form>
    </el-col>

        <!--列表-->
    <el-table :data="subTitles" :row-style="{height:0}" :header-row-style="{height:0}" :header-cell-style="{padding:0}" :cell-style="{padding:0}" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="45">
      </el-table-column>
      <el-table-column type="id" label="序号" width="80" sortable>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="150" sortable>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="150" sortable>
      </el-table-column>
      <el-table-column prop="text" label="字幕" width="400" sortable>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="small" @click="loop(scope.$index, scope.row)">循环播放</el-button>
          <el-button type="danger" size="small" @click="suspend(scope.$index, scope.row)">停止</el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script >
export default {
  data () {
    return {
      filters: {
        name: '1111',
        recipe: ''
      },
      subTitles: [],
      listLoading: false,
      loopCurrentTime: 0,
      loopEndTime: 0
    }
  },
  methods: {
    getSubtitle () {
      let para = {
        lessionId: '11'
      }
      this.getRequest('/subtitle/getSubtitle', para).then((res) => {
        console.dir(res)
        this.subTitles = res.data.data
      }).catch(err => {
        console.dir(err)
      })
    },
    // 显示编辑界面
    loop: function (index, row) {
      let audioPlayer = document.getElementById('audioPlayer')
      if (audioPlayer.ended || audioPlayer.pause) {
        let currentTime = timeToSecond(row.startTime)
        audioPlayer.currentTime = currentTime
        this.loopEndTime = timeToSecond(row.endTime)
        this.loopCurrentTime = timeToSecond(row.startTime)
        audioPlayer.play()
      }
    },
    suspend: function (index, row) {
      let audioPlayer = document.getElementById('audioPlayer')
      if (audioPlayer.ended) {
      } else {
        audioPlayer.pause()
      }
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate (res) {
      if (this.loopEndTime > 0 && res.target.currentTime > this.loopEndTime) {
        let audioPlayer = document.getElementById('audioPlayer')
        audioPlayer.currentTime = this.loopCurrentTime
      }
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    playRate (rate) {
      let audioPlayer = document.getElementById('audioPlayer')
      audioPlayer.playbackRate = rate
    }
  },
  mounted () {
  }
}

// 格式化秒
function timeToSecond (cTime) {
  let split = cTime.split(':')
  let min = parseInt(split[1])
  let sec = parseFloat(split[2])
  let total = min + sec

  return total
}
</script>
