<template>
    <div class="score">
      {{difficulty}}
      <SongDetailScore v-for="score in scoreArr" :key="score.score" :scoreObj="score"/>
      <input v-model="pageIndex" @change="changePage(pageIndex)">
      <button @click="addPageChange('back')">Last Page</button><button @click="addPageChange('next')">Next Page</button>
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
      pageIndex: 0
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
      console.log(emitValue)
      this.$parent.$emit("changePage", {difficulty: this.$props.difficulty, pageChange: emitValue})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.score {
    margin-top: 10px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
