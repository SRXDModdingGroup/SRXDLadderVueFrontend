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
      <router-link :to="{name: 'Home'}" class="homeButton"><span class="mdi mdi-home" /></router-link>
    </div>

    <SongDetailHashSection :key="refreshHashSectionKey" :SongInfoObj="SongInfoObj" :hash="selectedHash" />

    <br> 
    <div class="meta">
      <div class="metaButtons">
        <input class="steamIDInput" v-on:change="commitSteamID" v-model="steamID" placeholder="Set your steamID here...">
        <a :href="'https://spinsha.re/song/'+SongInfoObj.id" class="metaOpen">Open on SpinSha.re</a>
        <a :href="'spinshare-song://'+SpinshareReference" class="metaOpen"><button>Open in Client</button></a>
        <button @click="refreshHashSection" class="metaOpen">Refresh All</button>
        <button @click="toggleMultiHash" class="metaOpen" >Enable Merging of Similar Versions (Beta) <input class= "checkbox" type="checkbox" v-model="multiHash"></button>
        <select class="metaSelect metaOpen" v-model="dbDropdown">
          <option v-for="option in dbOptions" v-bind:value="option.value"> {{ option.text }} </option>
        </select>
      </div>
      <div class="hashFooter">
        Hashes:
        <ul class="hashChangerSection">
          <router-link v-for="(hash, index) in hashArray" :key="index" :to="{name: 'Song', params: {'SpinshareReference': SpinshareReference, 'SongHash': hash.levelHash}}" class="hashChanger">
            <li><span v-if="hash.newest">Newest - </span>{{hash.levelHash}} - {{hash.length}} Submitted Scores</li>
          </router-link>
        </ul>
      </div>
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
  name: 'Song',
  components: {
    SongDetailHashSection
  },
  data: function () {
    return {
      SpinshareReference: this.$route.params.SpinshareReference,
      selectedHash: this.$route.params.SongHash,
      hashArray: [],
      SongInfoObj: {},
      steamID: this.$store.state.steamID,
      refreshHashSectionKey: 0,

      multiHash: this.$store.state.multiHash,
      dbDropdown: this.$store.state.database,
      dbOptions: [
        { text: 'Main Database', value: '' },
        { text: 'PrePatch11Data', value: 'PrePatch11Data' }
      ]
    }
  },
  async mounted() {
    let ssapi = new SSAPI;
    this.$data.SongInfoObj = (await ssapi.getSongDetail(this.$data.SpinshareReference)).data
    this.mount()
  },
  watch: {
    multiHash() {
      this.$store.commit("setMultiHash", this.$data.multiHash)
      this.refreshHashSection();
    },
    dbDropdown() {
      this.$store.commit("setDatabase", this.$data.dbDropdown);
      this.mount();
      this.refreshHashSection();
    },
    selectedHash() {
      console.log("hash changed")
      this.refreshHashSection();
    },
  },
  methods: {
    mount: async function() {
      let backbone = new BACKBONE;

      this.$data.hashArray = await backbone.getHashes(this.$data.SpinshareReference, this.$store.state.database);
      
      //Displays if newest
      this.$data.hashArray.forEach(element => {
        element.newest = false;
        if (element.levelHash == this.$data.SongInfoObj.updateHash) {
          element.newest = true;
        }
      });

      if (this.$route.params.SongHash == "0"){
        this.$data.selectedHash = this.$data.hashArray[0].levelHash;
      }
    },
    hashChanger: function(hash) {
      this.$router.push({ name: 'Song', params: {SpinshareReference: this.$route.params.SpinshareReference, SongHash: hash} })
      window.location.reload();
    },
    backToHome: function () {
      this.$router.push({ name: 'Home', params: {} })
    },
    refreshHashSection: function() {
      this.$data.refreshHashSectionKey++
    },
    toggleMultiHash: function() {
      this.$data.multiHash = !this.$data.multiHash;
    },
    commitSteamID: function(params) {
      this.$store.commit("setSteamID", this.$data.steamID)
      this.refreshHashSection();
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$data.selectedHash = to.params.SongHash
    next()
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

  & .steamIDInput {
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
    display: inline-block;
    & .metaButtons{
      & .metaOpen {
        text-decoration: none;
        cursor: pointer;
        color: #e22c78;
        border-radius: 6px;
        border: 0px;
        background: rgba(255, 255, 255, 0.1);
        padding: 5px 15px;
        text-align: center;
        margin-left: 5px;
        margin-bottom: 10px;
        & .checkbox {
          transform: translateY(1px);
        }
      }
      & .steamIDInput {
        margin-bottom: 10px;
      }
      & .metaSelect {
        background-image: none;
        font-size: 12pt;
        appearance: none;
      }
    }
    & .hashChangerSection {
      margin: 0px;
      padding: 0px;
      line-height: 10pt;
    }
  }
}
.hashChanger {
  margin: 10px;
}
.hashFooter {
  margin: 10px;
}
button {
  font-family: 'Open Sans', sans-serif;
  cursor: pointer;
  color: #e22c78;
  text-align: center;
  font-size: 12pt;
  background: rgba(255, 255, 255, 0);
  border: 0;
  outline: none;
  box-shadow: none;
}
</style>
