<template>
  <div class="home">
    <input v-model="songSearchString" v-on:change="getSongs"/>
    <SongList v-if="isSearchActive" v-bind:songArr="songArr"/>
  </div>
</template>

<script>
// @ is an alias to /src
import SongList from '@/components/Song/SongList.vue'
import SSAPI from '@/modules/module.api.js'

export default {
  name: 'Home',
  components: {
    SongList
  },
  data: function () {
    return {
      isSearchActive: false,
      songSearchString: "",
      songArr: []
    }
  },
  mounted() {
  },
  methods: {
    getSongs: function() {
      let ssapi = new SSAPI;
      ssapi.search(this.$data.songSearchString).then(e => {
        this.$data.songArr = e.data.songs;
        this.$data.isSearchActive = true;
      });
    }
  }
}
</script>
