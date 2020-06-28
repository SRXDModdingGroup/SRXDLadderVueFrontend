<template>
  <div class="songDetail">
    Name: {{ SongObj.title }} <br>
    By: {{ SongObj.artist }} <br>
    Charter: {{ SongObj.charter }} <br>
    <SongDetailScore v-for="score in SongScoreList" :key="score.score" :scoreObj="score"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SSAPI from '@/modules/module.api.js'
import SongDetailScore from '@/components/SongDetailScore.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    SongDetailScore
  },
  data: function () {
    return {
        SpinshareReference: this.$route.params.SpinshareReference,
        SongObj: {},
        SongScoreList: []
    }
  },
  mounted() {
      let ssapi = new SSAPI;
      ssapi.getSongDetail(this.$data.SpinshareReference).then(e => {
          this.$data.SongObj = e.data
          axios.get('http://localhost:3000/getScores?search='+ this.$data.SpinshareReference)
          .then(res => {
            this.$data.SongScoreList = res.data
            this.$data.SongScoreList.sort(function(a, b) {
                return parseFloat(b.score) - parseFloat(a.score);
            });
          })
      });
  },
  methods: {

  }
}
</script>
