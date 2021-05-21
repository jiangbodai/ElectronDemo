<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <a-alert
        v-if="!network"
        class="noInternet"
        message="网络链接不可用"
        type="error"
        show-icon
      ></a-alert>
      <router-view></router-view>
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
      network: true,
      locale: localStorage.lang === "zh-CN" ? zhCN : enUS,
    };
  },
  mounted() {
    this.locale = zhCN;
    window.addEventListener("offline", () => {
      console.log("已断网");
      this.network = false;
    });
    window.addEventListener("online", () => {
      console.log("网络已连接");
      this.network = true;
    });
  },
};
</script>

<style lang="stylus" scoped>
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.noInternet {
  z-index: 9999;
  width: 170px;
  margin: 0 auto 0;
}
</style>
