<template>
    <tr class="score">
      <th>{{scoreObj.index}}</th> 
      <th>{{scoreObj.score}}</th> 
      <th><a :href="'https://steamcommunity.com/profiles/'+ this.$props.scoreObj.steamID">{{scoreObj.steamUsername}}</a></th> 
      <th>{{rank}}</th> 
    </tr>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SongDetailScore',
  components: {
  },
  props: {
    'scoreObj': Object
  },
  data: function(){
    return{
      rank: this.$props.scoreObj.rank
    }
  },
  mounted() {
    if (Number.isInteger(this.$data.rank)) {
      this.$data.rank = this.getRank(this.$data.rank)
    }
  },
  methods: {
    getRank: function(rankIndex) {
      switch (rankIndex)
      {
          case 1: return "D";
          case 2: return "C";
          case 3: return "C+";
          case 4: return "B";
          case 5: return "A";
          case 6: return "A+";
          case 7: return "S";
          case 8: return "S+";
          default: return "Err";
      }
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
& th {
  border: 1px solid white;
  padding: 5px;
}
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

</style>
