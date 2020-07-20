<template>
  <div class="songDetail">

    <div class="header">
      <div class="songItem">
        <div class="image">
          <img :src="SongInfoObj.paths.cover" alt="">
        </div>
        <body>
          Name: {{ SongInfoObj.title }} <br>
          By: {{ SongInfoObj.artist }} <br>
          Charter: {{ SongInfoObj.charter }} <br>
        </body>
      </div>
      <div class="homeButton" @click="backToHome"><span class="mdi mdi-home" /></div>
    </div>

    <SongDetailHashSection :SongInfoObj="SongInfoObj" :hash="selectedHash" />

    <br> 
    <div class="meta">
      <input class="steamIDInput" v-model="steamID" placeholder="Set your steamID here..."><br>
      Hashes:
      <ul class="hashChangerSection">
        <a class="hashChanger" v-for="(hash, index) in hashArray" @click="hashChanger(hash.levelHash)">
          <li>{{hash.levelHash}} - {{hash.length}} Submitted Scores</li>
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BACKBONE from '@/modules/module.backbone.js'
import SSAPI from '@/modules/module.api.js'
import SongDetailHashSection from '@/components/SongDetail/SongDetailHashSection.vue'
import axios from 'axios'

export default {
  name: 'SongDetail',
  components: {
    SongDetailHashSection
  },
  data: function () {
    return {
      SpinshareReference: this.$route.params.SpinshareReference,
      selectedHash: this.$route.params.SongHash,
      hashArray: [],
      SongInfoObj: {},
      steamID: ""
    }
  },
  mounted() {
      if(localStorage.getItem('steamID') != null) this.$data.steamID = localStorage.getItem('steamID')
      let ssapi = new SSAPI;
      let backbone = new BACKBONE;
      ssapi.getSongDetail(this.$data.SpinshareReference).then(async e => {
        this.$data.SongInfoObj = e.data
        this.$data.hashArray = await backbone.getHashes(this.$data.SpinshareReference);
      });
  },
  watch: {
    steamID() {
      if (this.$data.steamID == "") localStorage.removeItem('steamID')
      else localStorage.setItem('steamID', this.$data.steamID)
    }
  },
  methods: {
    hashChanger: function(hash) {
      this.$router.push({ name: 'Song', params: {SpinshareReference: this.$route.params.SpinshareReference, SongHash: hash} })
      window.location.reload();
    },
    backToHome: function () {
      this.$router.push({ name: 'Home', params: {} })
    }
  }
}
</script>
<style scoped lang="less">
.header {
  display: grid;
  grid-template-columns: auto 75px;
  margin: 7px;
  margin-top: 10px;

  .songItem {
    margin-right: 7px;
    overflow: hidden;
    position: relative;
    display: flex;
    width: auto;
    height: 75px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    color: #e22c78;

    & body {
      display: flex;
      width: 100%;
      text-align: center;
      align-items: center;
      justify-items: center;
      justify-content: center;
      align-content: center;
    }

    & .image {
      z-index: 50;
      position: absolute;
      display: flex;
      align-items: center;
      justify-items: center;
      justify-content: center;
      align-content: center;
      overflow: hidden;
      height: 100%;
      width: 75px;
      justify-self: flex-start;
      & img {
        height: 100%;
      }
    }
  }
  .homeButton {
    cursor: pointer;
    height: auto;
    border: 0px;
    font-size: 24px;
    border-radius: 6px;
    color: #e22c78;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
.songDetail {
  margin-top: 8px;
  margin-bottom: 8px;

  & input {
    font-family: 'Open Sans', sans-serif;
    color: white;
    border-radius: 6px;
    border: 0px;
    background: rgba(255, 255, 255, 0.2);
    width: 150px;
    padding: 5px 15px;
    text-align: center;
  }
  & .meta {
    & .steamIDInput {
      margin-bottom: 20px;
    }
    & .hashChangerSection {
      margin: 0px;
      padding: 0px;
      line-height: 10pt;
    }
  }
}
button {
  height: 25px;
}
.hashChanger {
  margin: 10px;
}
</style>
