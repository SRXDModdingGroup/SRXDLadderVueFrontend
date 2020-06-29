<template>
  <div class="home">
      <input v-model="songSearchString" v-on:change="getSongs"/>
      <DefaultSongList v-if="!isSearchActive"/>
      <SearchSongList v-if="isSearchActive" v-bind:songArr="songArr"/>
  </div>
</template>

<script>
// @ is an alias to /src
import DefaultSongList from '@/components/Home/DefaultSongList.vue'
import SearchSongList from '@/components/Home/SearchSongList.vue'
import SSAPI from '@/modules/module.api.js'

export default {
  name: 'Home',
  components: {
    DefaultSongList,
    SearchSongList
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
      if (this.$data.songSearchString != ''){
          ssapi.search(this.$data.songSearchString).then(e => {
          this.$data.songArr = e.data.songs;
          this.$data.isSearchActive = true;
        });
      }
      else {this.$data.isSearchActive = false}
    }
  }
}
</script>
