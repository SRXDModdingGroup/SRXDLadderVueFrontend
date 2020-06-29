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
        SongInfoObj: {},
        SongScoreListObj: {},
    }
  },
  mounted() {
      let ssapi = new SSAPI;
      ssapi.getSongDetail(this.$data.SpinshareReference).then(e => {
          this.$data.SongInfoObj = e.data
          axios.get('http://localhost:3000/getScores?search='+ this.$data.SpinshareReference)
          .then(res => {
            this.$data.SongScoreListObj = res.data
          })
      });
  },
  methods: {

  }
}
</script>
