<template>
    <div class="score">
        {{scoreObj.score}}
        {{scoreObj.difficulty}}
        {{ username }}
    </div>
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
      username: ""
    }
  },
  mounted() {
    console.log(this.$props.scoreObj.steamID)
    axios.get('http://localhost:3000/getUser?search='+ this.$props.scoreObj.steamID)
    .then(res => {
      this.$data.username = res.data.steamUsername
    });
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
