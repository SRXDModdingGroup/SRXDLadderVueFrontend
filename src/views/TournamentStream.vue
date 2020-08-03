<template>
  <section class="tournamentStream">
      <div class="songItem" v-for="(score, index) in scores" @click="open(index)">
        <div class="image">
            <img v-lazy="score.spinshareData.paths.cover" alt="">
        </div>
        <body>
            {{score.spinshareData.title}} by
            {{score.spinshareData.artist}}<br>
            Charter: {{score.spinshareData.charter}}<br>
            Hash: {{score.levelHash}}<br>
            {{score.time}} SteamID:{{score.steamID}}<br>
            Player: {{score.steamUsername}} Score: {{score.score}}
        </body>
      </div>
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
        scores: [],
        urlBase: ""
    }
  },
  mounted() {
    var ssapi = new SSAPI;
    var backbone = new BACKBONE;

    this.$data.urlBase = backbone.urlBase;
    var wsurl = backbone.urlBase.replace("https://", "wss://")

    var connection = new WebSocket(wsurl + "streamWebSocket")
    connection.onmessage = message => {
        if(message.data.startsWith("{")) {
            var message = JSON.parse(message.data)
            ssapi.getSongDetail(message.levelName).then(element => {
                message.spinshareData = element.data
                var time = new Date(message.time);
                var timeobject = this.splitTime(time)
                message.time = timeobject.dd+'/'+timeobject.mm+'/'+timeobject.yyyy+' '+('0' + timeobject.hour).slice(-2)+':'+('0' + timeobject.minute).slice(-2)+':'+('0' + timeobject.second).slice(-2) + " GMT" + Math.abs(timeobject.timezone / 60);
                this.$data.scores.push(message)
            })
        }
        else if(message.data == "ping") {
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
.tournamentStream {
  display: flex;
  flex-wrap: wrap;
  margin: 8px;
  flex-direction: column-reverse;
}
.songItem {
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
    font-size: 15px;
    display: inline-flex;
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
</style>
