<template>
  <div class="songDetail">
    Name: {{ SongInfoObj.title }} <br>
    By: {{ SongInfoObj.artist }} <br>
    Charter: {{ SongInfoObj.charter }} <br>
    <SongDetailHashSection :SongInfoObj="SongInfoObj" :hash="selectedHash" /> <br>
    Hashes: <br>
    <button class="hashChanger" v-for="(hash, index) in hashArray" @click="hashChanger(hash.levelHash)">
      {{hash.levelHash}}
    </button>
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
    }
  },
  mounted() {
      let ssapi = new SSAPI;
      let backbone = new BACKBONE;
      ssapi.getSongDetail(this.$data.SpinshareReference).then(async e => {
        this.$data.SongInfoObj = e.data
        this.$data.hashArray = await backbone.getHashes(this.$data.SpinshareReference);
      });
  },
  methods: {
    hashChanger: function(hash) {
      this.$router.push({ name: 'Song', params: {SpinshareReference: this.$route.params.SpinshareReference, SongHash: hash} })
    }
  }
}
</script>
<style scoped lang="less">
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
