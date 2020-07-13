<template>
  <div class="songDetail">
    <div class="difficulty" v-if="SongInfoObj.hasXDDifficulty">
      <SongDetailScoreList :hash= "hash" :difficulty= "'XD'" :key="SongScoreListRefreshObj.XD"/>
    </div>
    <div class="difficulty" v-if="SongInfoObj.hasExtremeDifficulty">
      <SongDetailScoreList :hash= "hash" :difficulty= "'Expert'" :key="SongScoreListRefreshObj.Expert"/>
    </div>
    <div class="difficulty" v-if="SongInfoObj.hasHardDifficulty">
      <SongDetailScoreList :hash= "hash" :difficulty= "'Hard'" :key="SongScoreListRefreshObj.Hard"/>
    </div>
    <div class="difficulty" v-if="SongInfoObj.hasNormalDifficulty">
      <SongDetailScoreList :hash= "hash" :difficulty= "'Normal'" :key="SongScoreListRefreshObj.Normal"/>
    </div>
    <div class="difficulty" v-if="SongInfoObj.hasEasyDifficulty">
      <SongDetailScoreList :hash= "hash" :difficulty= "'Easy'" :key="SongScoreListRefreshObj.Easy"/>
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
    "SongInfoObj": Object,
    "hash": String
  },
  data: function () {
    return {
      difficulties:['XD', 'Expert', 'Hard', 'Normal', 'Easy'],
      SongScoreListObj: {'XD': [], 'Expert': [], 'Hard': [], 'Normal': [], 'Easy': []},
      SongScoreListPageObj: {'XD': 0, 'Expert': 0, 'Hard': 0, 'Normal': 0, 'Easy': 0},
      SongScoreListRefreshObj: {'XD': 0, 'Expert': 0, 'Hard': 0, 'Normal': 0, 'Easy': 0},
    }
  },
  mounted() {
    this.$on("changePage", e => {
      this.$data.SongScoreListPageObj[e.difficulty] = e.pageChange
      this.getScoreData();
    })
    this.$on("addPage", e => {
      if(e.pageChange == "back") { this.$data.SongScoreListPageObj[e.difficulty] = this.$data.SongScoreListPageObj[e.difficulty] - 1 }
      else if (e.pageChange == "next") { this.$data.SongScoreListPageObj[e.difficulty] = this.$data.SongScoreListPageObj[e.difficulty] + 1 }
      this.getScoreData();
    })
    this.$on("refreshComponent", e => {
      this.$data.SongScoreListRefreshObj[e] += 1
    })
  },
  methods: {
  }
}
</script>
