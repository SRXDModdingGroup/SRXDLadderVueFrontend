<template>
  <div class="songDetail">
    Name: {{ SongInfoObj.title }} <br>
    By: {{ SongInfoObj.artist }} <br>
    Charter: {{ SongInfoObj.charter }} <br>
  </div>
</template>

<script>
// @ is an alias to /src
import SSAPI from '@/modules/module.api.js'
import SongDetailScoreList from '@/components/SongDetail/SongDetailScoreList.vue'
import axios from 'axios'

export default {
  name: 'SongDetail',
  components: {
    SongDetailScoreList
  },
  data: function () {
    return {
        SpinshareReference: this.$route.params.SpinshareReference,
        hashArray: [],
        difficulties:['XD', 'Expert', 'Hard', 'Normal', 'Easy'],
        SongInfoObj: {},
        SongScoreListObj: {'XD': [], 'Expert': [], 'Hard': [], 'Normal': [], 'Easy': []},
        SongScoreListPageObj: {'XD': 0, 'Expert': 0, 'Hard': 0, 'Normal': 0, 'Easy': 0},
    }
  },
  mounted() {
      let ssapi = new SSAPI;
      ssapi.getSongDetail(this.$data.SpinshareReference).then(e => {
          axios.get('http://localhost:3000/getHashes?search='+ this.$data.SpinshareReference ).then(e => {
            this.$data.hashArray = e.data
          })
          this.$data.SongInfoObj = e.data
      });
  },
  methods: {
  }
}
</script>