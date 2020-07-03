<template>
  <div class="songItem">
    <a v-on:click="getSpinshareReference">{{songObj.title}}</a>
  </div>
</template>

<script>
import SSAPI from '@/modules/module.api.js'
import axios from 'axios'

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
      ssapi.getSongDetail(this.$props.songObj.id).then(async e => {
        
        let firstHash = (await axios.get('http://localhost:3000/getHashes?search='+ e.data.fileReference)).data
        if (firstHash.length == 0) {firstHash = 0}
        else {firstHash = firstHash.data[0].levelHash}
        this.$router.push({ name: 'Song', params: {SpinshareReference: e.data.fileReference, SongHash: firstHash} })
      });
    },
    getHash: async function() {
      return (await axios.get('http://localhost:3000/getHashes?search='+ this.$data.SpinshareReference )).data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.songItem {
  display: flex;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  justify-content: center;
  text-align: center;
  line-height: 50px;

  & img {
    height: 100%;
    justify-self: flex-start;
  }
}
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
  cursor: pointer;
  color: #e22c78;
}
</style>
