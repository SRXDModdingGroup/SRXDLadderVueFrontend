<template>
  <div class="songDetail">
    Name: {{ SongInfoObj.title }} <br>
    By: {{ SongInfoObj.artist }} <br>
    Charter: {{ SongInfoObj.charter }} <br>
    <SongDetailHashSection v-for="(hash, index) in hashArray" :key="index" :hash="hash"/>
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
        hashArray: [],
        SongInfoObj: {},
        SongScoreListObj: {'XD': [], 'Expert': [], 'Hard': [], 'Normal': [], 'Easy': []},
        SongScoreListPageObj: {'XD': 0, 'Expert': 0, 'Hard': 0, 'Normal': 0, 'Easy': 0},
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
  }
}
</script>
