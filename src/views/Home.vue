<template>
  <div class="home">
      <div class="search">
        <input v-model="songSearchString" v-on:change="getSongs" placeholder="Search for Songs"/>
      </div>
      <StaticHomeComponent v-if="!isSearchActive" />
      <DefaultSongList v-if="!isSearchActive"/>
      <SearchSongList v-if="isSearchActive" v-bind:songArr="songArr"/>
  </div>
</template>

<script>
// @ is an alias to /src

import DefaultSongList from '@/components/Home/DefaultSongList.vue'
import SearchSongList from '@/components/Home/SearchSongList.vue'
import StaticHomeComponent from '@/components/Home/StaticHomeComponent.vue'
import SSAPI from '@/modules/module.api.js'

export default {
  name: 'Home',
  components: {
    DefaultSongList,
    SearchSongList,
    StaticHomeComponent
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
<style scoped lang="less">
  .home {
    margin: 8px;
    & .search {
      display: flex;
      & input {
        font-family: 'Open Sans', sans-serif;
        color: white;
        width: 100%;
        border-radius: 6px;
        border: 0px;
        background: rgba(255, 255, 255, 0.2);
        padding: 9px 20px;
      }
    }
  }
  
</style>
