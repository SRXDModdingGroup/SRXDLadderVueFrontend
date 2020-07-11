<template>
  <div class="songDetail">
    Name: {{ SongInfoObj.title }} <br>
    By: {{ SongInfoObj.artist }} <br>
    Charter: {{ SongInfoObj.charter }} <br>
    <SongDetailHashSection v-for="(hash, index) in hashArray" :key="index" :index="index" :hash="hash" :selectedHash="selectedHash" v-if="hash.levelHash = selectedHash"/> <br>
    Hashes: <br>
    <button class="hashChanger" v-for="(hash, index) in hashArray" @click="hashChanger(hash.levelHash)">
      {{hash.levelHash}}:
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
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
      ssapi.getSongDetail(this.$data.SpinshareReference).then(e => {
        this.$data.SongInfoObj = e.data
          axios.get('http://localhost:3000/getHashes?search='+ this.$data.SpinshareReference ).then(e => {
            this.$data.hashArray = e.data
          })
      });
  },
  methods: {
    hashChanger: function(hash) {
      this.$router.push({ name: 'Song', params: {SpinshareReference: this.$route.params.SpinshareReference, SongHash: hash} })
    }
  }
}
</script>
<style scoped lang="less">button {
  height: 25px;
}
.hashChanger {
  margin: 10px;
}
</style>
