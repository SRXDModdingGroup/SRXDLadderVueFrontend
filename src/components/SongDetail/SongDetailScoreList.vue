<template>
    <div class="score">
      {{difficulty}}:
      <table>
        <tr>
          <th>No.</th>
          <th>Score:</th> 
          <th>Steam Username:</th> 
        </tr>
        
        <tr v-if="scoreArr.length == 0">No Scores Yet!:</tr> 

        <SongDetailScore v-for="score in scoreArr" :key="score.score" :scoreObj="score"/>
      </table>
      <div class="pagechange">
        <input v-model="pageIndex" placeholder="Page No.">
        <button @click="refreshList()">Refresh</button>
        <button @click="pageIndex--">Last Page</button><button @click="pageIndex++">Next Page</button>
      </div>
    </div>
</template>

<script>
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
      scoreArr: []
    }
  },
  watch: {
  	'pageIndex': function() {
    	this.refreshList();
    }
  },
  mounted() {
    this.refreshList();
    localStorage.setItem("steamID", "76561198249679284")
  },
  methods: {
    refreshList: async function() {
      let backbone = new BACKBONE;     
      this.$data.scoreArr = await backbone.getScores(this.$props.hash, this.$props.difficulty, this.$data.pageIndex)
      console.log("refreshed")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.score {
  margin-top: 20px;
}
table {
  margin: auto;
  position: relative;
  border: 1px solid white;
  border-collapse: collapse;
  & th {
    border: 1px solid white;
    padding: 5px;
  }
}
input {
  width: 70px;
  padding: 3px 15px;
}
button {
  padding: 1.7px 15px;
}
.pagechange {
  margin-top: 10px;
  display: flex;
  width: 100%;
  justify-items: center;
  align-items: center;
  align-content: center;
  justify-content: center;
}
</style>
