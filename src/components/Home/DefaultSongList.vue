<template>
    <div class="list">
      <SongItem v-for="song in songArr" :key="song.id" :songObj="song"/>
    </div>
</template>

<script>
import SongItem from '@/components/Home/SongItem.vue'
import SSAPI from '@/modules/module.api.js'

export default {
  name: 'DefaultSongList',
  components: {
    SongItem
  },
  props: {
  },
  data: function() {
      return {
        songArr: []
      }
  },
  mounted() {
    var ssapi = new SSAPI;
    ssapi.getHotThisWeekSongs(0).then(e => {
      this.$data.songArr = e;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.list {
  
  body {
    margin-top: 20px;
    text-align: start;
    margin: 0px;
  }
}
</style>
