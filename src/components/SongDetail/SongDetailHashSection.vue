<template>
  <div class="songDetail" v-if="index == 0">
    <div class="difficulty" v-if="SongScoreListObj.XD.length > 0">
      <SongDetailScoreList :difficulty= "'XD'" :scoreArr="SongScoreListObj.XD" />
    </div>
    <div class="difficulty" v-if="SongScoreListObj.Expert.length > 0">
      <SongDetailScoreList :difficulty= "'Expert'"  :scoreArr="SongScoreListObj.Expert"/>
    </div>
    <div class="difficulty" v-if="SongScoreListObj.Hard.length > 0">
      <SongDetailScoreList :difficulty= "'Hard'"  :scoreArr="SongScoreListObj.Hard"/>
    </div>
    <div class="difficulty" v-if="SongScoreListObj.Normal.length > 0">
      <SongDetailScoreList :difficulty= "'Normal'"  :scoreArr="SongScoreListObj.Normal"/>
    </div>
    <div class="difficulty" v-if="SongScoreListObj.Easy.length > 0">
      <SongDetailScoreList :difficulty= "'Easy'" :scoreArr="SongScoreListObj.Easy"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SSAPI from '@/modules/module.api.js'
import SongDetailScoreList from '@/components/SongDetail/SongDetailScoreList.vue'
import axios from 'axios'

export default {
  name: 'SongDetailHashSection',
  components: {
    SongDetailScoreList
  },
  props: {
    "index": Number,
    "songInfoObj": Object,
    "hash": Object
  },
  data: function () {
    return {
      difficulties:['XD', 'Expert', 'Hard', 'Normal', 'Easy'],
      SongScoreListObj: {'XD': [], 'Expert': [], 'Hard': [], 'Normal': [], 'Easy': []},
      SongScoreListPageObj: {'XD': 0, 'Expert': 0, 'Hard': 0, 'Normal': 0, 'Easy': 0},
    }
  },
  mounted() {
    console.log(this.$props.key)
    this.getScoreData()
    this.$on("ChangePage", e => {
      if(e == "back") { this.$data.SongScoreListPageObj[e.difficulty] = this.$data.SongScoreListPageObj[e.difficulty] - 1 }
      else { this.$data.SongScoreListPageObj[e.difficulty] = this.$data.SongScoreListPageObj[e.difficulty] + 1 }
      this.getScoreData();
    })
  },
  methods: {
    getScoreData: function() {
      this.$data.difficulties.forEach(difficulty => {
        axios.get('http://localhost:3000/getScores?search='+this.$props.hash.levelHash+"&difficulty="+difficulty+"&page="+this.$data.SongScoreListPageObj[difficulty]).then(e => {
          this.$data.SongScoreListObj[difficulty] = e.data
        })
      });
    }
  }
}
</script>
