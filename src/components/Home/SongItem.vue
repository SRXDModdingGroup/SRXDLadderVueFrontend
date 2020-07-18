<template>
  <div class="songItem" v-on:click="getSpinshareReference">
    <div class="image">
      <img v-lazy="songObj.cover" alt="">
    </div>
    <body>{{songObj.title}}<br>{{songObj.artist}}</body>
  </div>
</template>

<script>
import SSAPI from '@/modules/module.api.js'
import BACKBONE from '@/modules/module.backbone.js'
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
      let backbone = new BACKBONE;
      ssapi.getSongDetail(this.$props.songObj.id).then(async e => {
        let firstHash = await backbone.getHashes(e.data.fileReference);
        if (firstHash.length == 0) {firstHash = 0}
        else {firstHash = firstHash[0].levelHash}
        this.$router.push({ name: 'Song', params: {SpinshareReference: e.data.fileReference, SongHash: firstHash} })
      });
    },
    getHash: async function() {
      let backbone = new BACKBONE;
      return await backbone.getHashes(this.$data.SpinshareReference);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.songItem {
  overflow: hidden;
  position: relative;
  display: flex;
  width: 100%;
  height: 75px;
  margin-top: 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  color: #e22c78;
  grid-template-columns: 50px, 200px;
  grid-template-rows: 100%;

  & body {
    display: flex;
    width: 100%;
    text-align: center;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
  }

  & .image {
    z-index: 50;
    position: absolute;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
    overflow: hidden;
    height: 100%;
    width: 75px;
    justify-self: flex-start;
    & img {
      height: 100%;
    }
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
</style>
