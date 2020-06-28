<template>
    <div class="score">
        {{scoreObj.score}}
        {{scoreObj.difficulty}}
        Otter.jy126
    </div>
</template>

<script>
export default {
  name: 'SongList',
  components: {
  },
  props: {
    'scoreObj': Object
  },
  mounted() {
    console.log(this.$props.scoreObj);
    
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
