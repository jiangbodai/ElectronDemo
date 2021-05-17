<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import enUS from "ant-design-vue/lib/locale-provider/en_US";
export default {
  name: "app",
  data() {
    return {
      locale: localStorage.lang === "zh-CN" ? zhCN : enUS
    };
  },
};
</script>

<style lang="stylus">
body {
  background: var(--color-bg);
  color: var(--color-text);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-text);
  margin-top: 60px;

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: var(--color-text);

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
}
</style>
