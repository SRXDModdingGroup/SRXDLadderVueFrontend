<template>
    <div class="score">
      {{difficulty}}:
      <table>
        <tr>
          <th>No.</th>
          <th>Score:</th> 
          <th>Steam Username:</th> 
        </tr>
        <SongDetailScore v-for="score in scoreArr" :key="score.score" :scoreObj="score"/>
      </table>
      <div class="pagechange">
        <input v-model="pageIndex" @change="changePage(pageIndex)" placeholder="Page No.">
        <button @click="refreshComponent()">Refresh</button>
        <button @click="addPageChange('back')">Last Page</button><button @click="addPageChange('next')">Next Page</button>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import SongDetailScore from '@/components/SongDetail/SongDetailScore.vue'

export default {
  name: 'SongDetailScoreList',
  components: {
    SongDetailScore
  },
  props: {
    'difficulty': String,
    'scoreArr': Array
  },
  data: function(){
    return{
      pageIndex: ""
    }
  },
  mounted() {
    // console.log(this.$props.scoreObj.steamID)
    // axios.get('http://localhost:3000/getUser?search='+ this.$props.scoreObj.steamID)
    // .then(res => {
    //   this.$data.username = res.data.steamUsername
    // });
  },
  methods: {
    addPageChange: function(emitValue) {
      this.$parent.$emit("addPage", {difficulty: this.$props.difficulty, pageChange: emitValue})
    },
    changePage: function(emitValue) {
      this.$parent.$emit("changePage", {difficulty: this.$props.difficulty, pageChange: emitValue})
    },
    refreshComponent: function(difficulty) {
      this.$parent.$emit("refreshComponent", this.$props.difficulty)
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
