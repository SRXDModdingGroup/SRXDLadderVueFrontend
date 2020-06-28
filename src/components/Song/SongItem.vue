<template>
  <div>
  <a v-on:click="getSpinshareReference">{{songObj.title}}</a>
  </div>
</template>

<script>
import SSAPI from '@/modules/module.api.js'

export default {
  name: 'SongItem',
  data: function () {
    return {
    }
  },
  props: {
    'songObj': Object
  },
  mounted() {
  },
  methods: {
    getSpinshareReference: function() {
      let ssapi = new SSAPI;
      ssapi.getSongDetail(this.$props.songObj.id).then(e => {
        this.$router.push({ name: 'Song', params: {SpinshareReference: e.data.fileReference} })
      });
    }
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
