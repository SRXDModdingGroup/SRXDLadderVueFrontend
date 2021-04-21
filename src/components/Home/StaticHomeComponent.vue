<template>
<section class="container">
  <div class="buttonItem" v-on:click="open(urlBase + 'download')">
    <body><span class="mdi mdi-download" /></body>
  </div>
  <div class="buttonItem" v-on:click="open('https://gist.github.com/jy1263/35a9cadbdd25451d9de56054207ee6c5')">
    <body><span class="mdi mdi-help-circle-outline" /></body>
  </div>
  <router-link :to="{name: 'Legal'}" tag="div" class="buttonItem">
    <body><span class="mdi mdi-trophy-variant-outline" /></body>
  </router-link>
  <div class="buttonItem" v-on:click="open('https://spinsha.re/')">
    <img src="https://spinshare.b-cdn.net/assets/img/favicon.png" />
  </div>
  
</section>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import BACKBONE from '@/modules/module.backbone.js'

export default {
    name: 'StaticHomeComponent',
    data: function () {
        return {
          urlBase: ''
        }
    },
    props: {
    },
    mounted() {
      var backbone = new BACKBONE;
      this.$data.urlBase = backbone.urlBase.replace("api/","")
    },
    methods: {
        open: function(e) {
            window.location = e;
        },
        openTournament: function() {
            this.$router.push({ name: 'TournamentStream' })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.container {
    width: 100%;
    display: flex;
    gap: 8px;
}
.buttonItem {
  align-items: center;
  justify-items: center;
  justify-content: center;
  align-content: center;
  overflow: hidden;
  position: relative;
  display: flex;
  width: 100%;
  height: 30px;
  margin-top: 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  color: #e22c78;
  grid-template-columns: 50px, 200px;
  grid-template-rows: 100%;

    & img {
        height: 20px;
    }

  & body {
    align-self: center;
    justify-self: center;
    display: block;
    width: auto;
    height: auto;
    text-align: center;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
    & .mdi {
        font-size: 20px;
    }
    
    & a {
      margin-right: 10px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
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
