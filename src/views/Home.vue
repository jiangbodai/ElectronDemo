<template>
  <div class="home">
    <a-button type="primary" @click="exitLogin">退出登录</a-button>
    <task-bar :medicalType="123"></task-bar>
  </div>
</template>

<script>
import TaskBar from "@/components/main/TaskBar.vue";
export default {
  name: "Home",
  components: {
    TaskBar,
  },
  methods: {
    exitLogin() {
      localStorage.setItem("login", "");
      console.log("退出");
      this.$electron.ipcRenderer.send("login");
    },
  },
};
</script>
