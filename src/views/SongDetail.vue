<template>
  <div class="songDetail">
    <div class="songItem">
      <div class="image">
        <img :src="SongInfoObj.paths.cover" alt="">
      </div>
      <body>
        Name: {{ SongInfoObj.title }} <br>
        By: {{ SongInfoObj.artist }} <br>
        Charter: {{ SongInfoObj.charter }} <br>
      </body>
    </div>
    <SongDetailHashSection :SongInfoObj="SongInfoObj" :hash="selectedHash" />
    <br> 
    <input v-model="steamID" placeholder="Set your steamID here...">
    <br><br>
    Hashes: <br>
    <a class="hashChanger" v-for="(hash, index) in hashArray" @click="hashChanger(hash.levelHash)">
      {{hash.levelHash}}
    </a>

  </div>
</template>

<script>
// @ is an alias to /src
import BACKBONE from '@/modules/module.backbone.js'
import SSAPI from '@/modules/module.api.js'
import SongDetailHashSection from '@/components/SongDetail/SongDetailHashSection.vue'
import axios from 'axios'

export default {
  name: 'SongDetail',
  components: {
    SongDetailHashSection
  },
  data: function () {
    return {
      SpinshareReference: this.$route.params.SpinshareReference,
      selectedHash: this.$route.params.SongHash,
      hashArray: [],
      SongInfoObj: {},
      steamID: ""
    }
  },
  mounted() {
      if(localStorage.getItem('steamID') != null) this.$data.steamID = localStorage.getItem('steamID')
      let ssapi = new SSAPI;
      let backbone = new BACKBONE;
      ssapi.getSongDetail(this.$data.SpinshareReference).then(async e => {
        this.$data.SongInfoObj = e.data
        this.$data.hashArray = await backbone.getHashes(this.$data.SpinshareReference);
      });
  },
  watch: {
    steamID() {
      if (this.$data.steamID == "") localStorage.removeItem('steamID')
      else localStorage.setItem('steamID', this.$data.steamID)
    }
  },
  methods: {
    hashChanger: function(hash) {
      this.$router.push({ name: 'Song', params: {SpinshareReference: this.$route.params.SpinshareReference, SongHash: hash} })
      window.location.reload();
    }
  }
}
</script>
<style scoped lang="less">
.songItem {
  margin: 7px;
  overflow: hidden;
  position: relative;
  display: flex;
  width: auto;
  height: 75px;
  margin-top: 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
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
.songDetail {
  margin-top: 8px;
  margin-bottom: 8px;
}
button {
  height: 25px;
}
.hashChanger {
  margin: 10px;
}
</style>
