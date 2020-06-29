<template>
    <div>
      <SongItem v-for="song in songArr" :key="song.id" :songObj="song"/>
    </div>
</template>

<script>
import SongItem from '@/components/Home/SongItem.vue'

export default {
  name: 'SearchSongList',
  components: {
    SongItem
  },
  props: {
    'songArr': Array
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
