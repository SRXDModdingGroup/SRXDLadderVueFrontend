<template>
    <div class="scoreList">
      <div class="difficultyId">{{difficulty}}:</div>
      <table>
        <tr>
          <th>No.</th>
          <th>Score:</th> 
          <th>Steam Username:</th> 
        </tr>

        <SongDetailScore v-for="score in scoreArr" :key="score.score" :scoreObj="score"/>
        <tr v-if="scoreArr.length == 0 && index == 0" v-for="(empty, index) in emptyArr">
          <td colspan="3">No scores yet!</td>
        </tr>

        <tr v-for="empty in emptyArr">
          <th>-</th>
          <th>-</th>
          <th>-</th>
        </tr>

        <tr>
          <td colspan="3">Your Score:</td>
        </tr>

        <SongDetailScore v-if="yourScore.length > 0" :scoreObj="yourScore[0]"/>
        <tr v-else>
          <th>-</th>
          <th>-</th>
          <th>-</th>
        </tr>

      </table> 
      <div class="pagechange">
        <input v-model="pageIndex" placeholder="Page No.">
        <button @click="refreshList()"><span class="mdi mdi-refresh" /></button>
        <button @click="pageIndex--"><span class="mdi mdi-arrow-left" /></button>
        <button @click="pageIndex++"><span class="mdi mdi-arrow-right" /></button>
      </div>
    </div>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import BACKBONE from '@/modules/module.backbone.js'
import axios from 'axios';
import SongDetailScore from '@/components/SongDetail/SongDetailScore.vue'

export default {
  name: 'SongDetailScoreList',
  components: {
    SongDetailScore
  },
  props: {
    'difficulty': String,
    'hash': String
  },
  data: function(){
    return{
      pageIndex: 0,
      scoreArr: [],
      yourScore: [],
      emptyArr: []
    }
  },
  watch: {
  	'pageIndex': function() {
    	this.refreshList();
    }
  },
  mounted() {
    this.refreshList();
    this.$data.emptyArr.length = 15;
    
  },
  methods: {
    refreshList: async function() {
      let backbone = new BACKBONE;     
      this.$data.scoreArr = await backbone.getScores(this.$props.hash, this.$props.difficulty, this.$data.pageIndex)
      if (localStorage.getItem("steamID") != null){
        this.$data.yourScore = await backbone.getUserScore(localStorage.getItem("steamID"),this.$props.hash, this.$props.difficulty)
      }
      console.log("refreshed")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.scoreList {
  position: relative;
  justify-content: center;
  width: auto;
  height: 100%;
  background: rgba(255, 255, 255, 0.1)
}
.difficultyId {
  padding: 8px;
}
table {
  margin: auto;
  position: relative;
  border: 1px solid white;
  border-collapse: collapse;
  font-size: 14pt;
  & tr {
    display: table-row;
    width: 100%;
  }
  & th {
    border: 1px solid white;
    padding: 5px;
  }
  & td {
    border: 1px solid white;
    padding: 5px;
  }
}
input {
  width: 70px;
  padding: 3px 15px;
}
button {
  text-align: center;
  cursor: pointer;
  color: #e22c78;
  margin-left: 30px;
  line-height: 30px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 0px;
}
.pagechange {
  width: 100%;
  position: absolute;
  bottom: 8px;
}
</style>
