<template>
  <section class="tournamentStream">
      <transition-group name="slide-fade" class="animcontainer" tag="div">
        <div class="songItem" 
        v-for="(score, index) in scores" 
        @click="open(index)"
        :style="[(index == (scores.length - 1)) ? {opacity:1} : {opacity: 0.7}]"
        :key="score">
          <div class="image">
              <img v-lazy="score.spinshareData.paths.cover" alt="">
          </div>
          <body>
              {{score.spinshareData.title}} by
              {{score.spinshareData.artist}}<br>
              Charter: {{score.spinshareData.charter}}<br>
              Hash: {{score.levelHash}}<br>
              {{score.time}}<br>
              Player: <a :href="'https://steamcommunity.com/profiles/'+score.steamID">{{score.steamUsername}}</a> SteamID:{{score.steamID}} <br>
              <span class="combotext">Combo: {{score.score}}</span>  Score: {{score.score}} 
              <span :style="{color: 'rgba(255, 255, 255, 0.25)'}"> - </span><span :style="{ color: '#228B22'}" v-if="score.hashVerified">Verified</span>
              <span :style="{ color: '#8B0000'}" v-if="!score.hashVerified"> Hash Not Verifed!</span>
          </body>
        </div>
      </transition-group>
  </section>
</template>

<script>
// @ is an alias to /src
import SSAPI from '@/modules/module.api.js'
import BACKBONE from '@/modules/module.backbone.js'

export default {
  name: 'TournamentStream',
  components: {
  },
  data: function () {
    return {
        tournamentSongs: [],
        scores: [],
        urlBase: "",
        key: 0,
    }
  },
  mounted() {
    var ssapi = new SSAPI;
    var backbone = new BACKBONE;

    ssapi.getTournamentMappool().then(e => {this.$data.tournamentSongs = e.data;})
    
    this.$data.urlBase = backbone.urlBase;
    var wsurl = backbone.urlBase.replace("https://", "wss://")

    var connection = new WebSocket(wsurl + "streamWebSocket")
    connection.onmessage = message => {
        if(message.data.startsWith("{")) {
            var message = JSON.parse(message.data)
            ssapi.getSongDetail(message.levelName).then(element => {
                message.hashVerified = false;
                var tournaSongObj = this.$data.tournamentSongs.filter(songobj => songobj.fileReference == message.levelName)
                if (tournaSongObj.length != 0 && message.levelHash == tournaSongObj[0].srtbMD5) {
                  message.hashVerified = true;
                }
                message.spinshareData = element.data
                var time = new Date(message.time);
                var timeobject = this.splitTime(time)
                message.time = timeobject.dd+'/'+timeobject.mm+'/'+timeobject.yyyy+' '+('0' + timeobject.hour).slice(-2)+':'+('0' + timeobject.minute).slice(-2)+':'+('0' + timeobject.second).slice(-2) + " GMT" + Math.abs(timeobject.timezone / 60);
                this.$data.scores.push(message)
            })
        }
        else if(message.data == "ping") {
            console.log(this.$data.scores)
            console.log("pinged")
            connection.send("pong");
        }
    }
    window.onbeforeunload = function() {
        connection.onclose = function () {}; // disable onclose handler first
        connection.close();
        console.log("closed")
    };
  },
  methods: {
      open(index) {
          window.location = this.$data.urlBase +"song/"+this.$data.scores[index].levelName +"/"+this.$data.scores[index].levelHash;
      },
      splitTime(time) {
        var timezone = time.getTimezoneOffset();
        var dd = time.getDate();
        var mm = time.getMonth()+1; 
        var yyyy = time.getFullYear();
        var hour = time.getHours();
        var minute = time.getMinutes();
        var second = time.getSeconds();
        return {dd, mm, yyyy, hour, minute, second, timezone};
      }
  }
}
</script>
<style scoped lang="less">
.animcontainer {
  display: flex;
  flex-wrap: wrap;
  margin: 8px;
  flex-direction: column-reverse;
}
.songItem {
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  overflow: hidden;
  position: relative;
  display: flex;
  width: 100%;
  height: 120px;
  margin-top: 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  color: #e22c78;
  grid-template-columns: 50px, 200px;
  grid-template-rows: 100%;

  & body {
    align-self: center;
    justify-self: center;
    font-size: 14px;
    display: block;
    width: auto;
    height: auto;
    text-align: center;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
    & a {
      margin-right: 4px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    & .combotext {
      margin-right: 4px;
    }
  }

  & .image {
    left: 0;
    z-index: 50;
    position: absolute;
    display: flex;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
    overflow: hidden;
    height: 100%;
    width: 120px;
    justify-self: flex-start;
    & img {
      height: 100%;
    }
  }
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
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-2000px);
  opacity: 0;
}
</style>
