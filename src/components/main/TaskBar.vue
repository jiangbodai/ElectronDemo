<template>
  <div class="taskBar">
    <div class="left">
      <a-button class="setting" type="link" icon="home" size="large" />
      <span>{{ medicalType }}</span>
    </div>
    <div class="right">
      <span class="welcome">欢迎您,</span>
      <user-select userName="张三" :dataList="dataList"></user-select>
    </div>
  </div>
</template>

<script>
import UserSelect from "../common/UserSelect.vue";
export default {
  name: "taskBar",
  props: ["medicalType"],
  components: {
    UserSelect,
  },
  data() {
    return {
      dataList: ["锁屏", "修改角色", "修改密码", "切换院区", "退出账号"],
    };
  },
  mounted() {
    console.log(this.medicalType);
  },
};
</script>

<style lang="stylus" scoped>
.taskBar {
  background: red;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;

  .left {
    height: 44px;
    line-height: 44px;
  }

  .right {
    height: 44px;
    line-height: 44px;

    .welcome {
      font-weight: 700;
      color: white;
    }
  }
}
</style>