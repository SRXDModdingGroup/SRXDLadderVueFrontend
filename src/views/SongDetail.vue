<template>
  <div class="songDetail">
    Name: {{ SongInfoObj.title }} <br>
    By: {{ SongInfoObj.artist }} <br>
    Charter: {{ SongInfoObj.charter }} <br>
    XD:
    <SongDetailScoreList :scoreArr="SongScoreListObj.XD"/>
    Expert:
    <SongDetailScoreList :scoreArr="SongScoreListObj.Expert"/>
    Hard:
    <SongDetailScoreList :scoreArr="SongScoreListObj.Hard"/>
    Normal:
    <SongDetailScoreList :scoreArr="SongScoreListObj.Normal"/>
    Easy:
    <SongDetailScoreList :scoreArr="SongScoreListObj.Easy"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SSAPI from '@/modules/module.api.js'
import SongDetailScoreList from '@/components/SongDetail/SongDetailScoreList.vue'
import axios from 'axios'

export default {
  name: 'SongDetail',
  components: {
    SongDetailScoreList
  },
  data: function () {
    return {
        SpinshareReference: this.$route.params.SpinshareReference,
        difficulties:['XD', 'Expert', 'Hard', 'Normal', 'Easy'],
        SongInfoObj: {},
        SongScoreListObj: {'XD': [], 'Expert': [], 'Hard': [], 'Normal': [], 'Easy': []},
        SongScoreListPageObj: {'XD': 0, 'Expert': 0, 'Hard': 0, 'Normal': 0, 'Easy': 0},
    }
  },
  mounted() {
      let ssapi = new SSAPI;
      ssapi.getSongDetail(this.$data.SpinshareReference).then(e => {
          this.$data.SongInfoObj = e.data
          this.$data.difficulties.forEach(difficulty => {
            axios.get('http://localhost:3000/getScores?search='+ this.$data.SpinshareReference + "&difficulty=" + difficulty + "&page="+ this.$data.SongScoreListPageObj[difficulty])
            .then(res => {
              console.log(res.data)
              this.$data.SongScoreListObj[difficulty] = res.data
            })
          });
      });
  },
  methods: {

  }
}
</script>
