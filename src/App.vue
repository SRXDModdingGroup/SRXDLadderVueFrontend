<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> -->
    </div>
    <keep-alive include="Home">
      <router-view/>
    </keep-alive>
    <div class="footer"> SpinBoard - Freshly Baked by <a href="https://ayanamy.is-a.dev/">AyanAmy</a></div>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  background: #212629;
  display: block;
}
a {
  color: #e83f85;
  cursor: pointer;
}
html {
  background: #212629;
}
body {
  gap: 0;
  border: 0;
  margin: 0;
}
.footer {
  font-size: 10pt;
  margin-bottom: 5px;
  padding-top: 5px;
  z-index: 100;
  position: static;
  left: 0;
  bottom: 0;
  width: 100%;
  color: white;
  text-align: center;
}
textarea:focus, input:focus{
  outline: none;
}
</style>
