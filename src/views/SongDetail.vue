<template>
  <div class="songDetail">
    Name: {{ SongObj.title }} <br>
    By: {{ SongObj.artist }} <br>
    Charter: {{ SongObj.charter }} <br>
  </div>
</template>

<script>
// @ is an alias to /src
import SSAPI from '@/modules/module.api.js'

export default {
  name: 'Home',
  components: {

  },
  data: function () {
    return {
        SpinshareReference: this.$route.params.SpinshareReference,
        SongObj: {}
    }
  },
  mounted() {
      let ssapi = new SSAPI;
      ssapi.getSongDetail(this.$data.SpinshareReference).then(e => {
          this.$data.SongObj = e.data
      });
  },
  methods: {

  }
}
</script>
