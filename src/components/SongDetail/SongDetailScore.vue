<template>
    <div class="score">
        {{scoreObj.score}}
        <a :href="'https://steamcommunity.com/profiles/'+this.$props.scoreObj.userInfo.steamID">{{scoreObj.userInfo.steamUsername}}</a>
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
    }
  },
  mounted() {
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
