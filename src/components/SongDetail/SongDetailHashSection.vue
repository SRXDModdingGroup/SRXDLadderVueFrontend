<template>
  <div class="scoreSection">
    <div class="difficulty" v-if="SongInfoObj.hasXDDifficulty">
      <SongDetailScoreList :SongInfoObj="SongInfoObj" :hash= "hash" :difficulty= "'XD'" :key="SongScoreListRefreshObj.XD"/>
    </div>
    <div class="difficulty" v-if="SongInfoObj.hasExtremeDifficulty">
      <SongDetailScoreList :SongInfoObj="SongInfoObj" :hash= "hash" :difficulty= "'Expert'" :key="SongScoreListRefreshObj.Expert"/>
    </div>
    <div class="difficulty" v-if="SongInfoObj.hasHardDifficulty">
      <SongDetailScoreList :SongInfoObj="SongInfoObj" :hash= "hash" :difficulty= "'Hard'" :key="SongScoreListRefreshObj.Hard"/>
    </div>
    <div class="difficulty" v-if="SongInfoObj.hasNormalDifficulty">
      <SongDetailScoreList :SongInfoObj="SongInfoObj" :hash= "hash" :difficulty= "'Normal'" :key="SongScoreListRefreshObj.Normal"/>
    </div>
    <div class="difficulty" v-if="SongInfoObj.hasEasyDifficulty">
      <SongDetailScoreList :SongInfoObj="SongInfoObj" :hash= "hash" :difficulty= "'Easy'" :key="SongScoreListRefreshObj.Easy"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SongDetailScoreList from '@/components/SongDetail/SongDetailScoreList.vue'


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
      truth: [
        this.$props.SongInfoObj.hasXDDifficulty, 
        this.$props.SongInfoObj.hasExtremeDifficulty, 
        this.$props.SongInfoObj.hasHardDifficulty,
        this.$props.SongInfoObj.hasNormalDifficulty,
        this.$props.SongInfoObj.hasEasyDifficulty
      ],
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
<style lang="less" scoped>
  .scoreSection {
    display: flex;
    flex-wrap: wrap;
    height: auto;
    margin-top: 4px;
    align-content: center;
    justify-content: center;
    .difficulty {
      overflow: hidden;
      border-radius: 6px;
      margin: 4px;
      min-width: 370px;
      height: 760px;
    }
  }
</style>
