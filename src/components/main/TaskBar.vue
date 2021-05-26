<template>
  <div class="taskBar">
    <div class="left">
      <a-button class="setting" type="link" icon="home" size="large" />
      <a-button
        class="medicalType"
        type="link"
        v-for="(item, index) in medicalTypes"
        :key="index"
      >
        {{ item }}
      </a-button>
    </div>
    <div class="right">
      <span class="welcome">欢迎您,</span>
      <user-select
        userName="张三"
        :dataList="dataList"
        @choseSelect="choseSelect"
      ></user-select>
      <span style="margin-right: 10px">(扁鹊飞救 总医院 急诊科门诊医生)</span>
      <div>所属科室：<span>急诊科</span></div>
    </div>
  </div>
</template>

<script>
import UserSelect from "../common/UserSelect.vue";
export default {
  name: "taskBar",
  props: ["medicalTypes"],
  components: {
    UserSelect,
  },
  data() {
    return {
      dataList: ["锁屏", "修改角色", "修改密码", "切换院区", "退出账号"],
    };
  },
  mounted() {},
  methods: {
    choseSelect(data) {
      switch (data.trim()) {
        case "锁屏":
          break;
        case "修改角色":
          this.$emit("changeRole");
          break;
        case "修改密码":
          break;
        case "切换院区":
          this.$emit("changeArea");
          break;
        case "退出账号":
          console.log("退出账号");
          localStorage.setItem("login", "");
          this.$electron.ipcRenderer.send("login");
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.taskBar {
  background: #2c579b;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;

  .left {
    height: 40px;
    line-height: 40px;

    .medicalType {
      height: 38px;
      width: 90px;
      margin-right: 1px;
      color: white;
      background: rgba(250, 250, 250 0.1);
      border-radius: 0;
      border-left: 0.5px solid lightgray;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:last-child {
        border-right: 0.5px solid lightgray;
      }
    }
  }

  .right {
    height: 40px;
    line-height: 40px;
    display: flex;
    flex-direction: row;
    font-weight: 450;
    color: white;
    margin-right: 10px;

    .welcome {
      font-weight: 700;
      color: white;
    }
  }
}
</style>