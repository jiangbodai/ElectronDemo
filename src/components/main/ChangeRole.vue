<template>
  <div id="changeRole">
    <a-modal
      title="切换角色"
      width="350px"
      :dialog-style="{ top: '80px' }"
      :visible="visible"
      @ok="clickOk"
      @cancel="clickCancel"
    >
      <a-alert
        message="提示：切换角色系统自动刷新，请确认内容是否全部保存！"
        banner
      />
      <div style="margin: 10px 0px">
        <span style="font-size: 15px; font-weight: 600">登录名：</span>
        <span style="color: gray">张三</span>
      </div>
      <div class="roles">
        <span style="width: 30%; color: red; margin-right: 5px">* 角色</span>
        <a-select style="width: 70%" v-model="role">
          <a-select-option value="急症科门诊医生">
            急症科门诊医生
          </a-select-option>
          <a-select-option value="急症科病区医生">
            急症科病区医生
          </a-select-option>
          <a-select-option value="急症科门诊护士">
            急症科门诊护士
          </a-select-option>
          <a-select-option value="超级管理员"> 超级管理员 </a-select-option>
        </a-select>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  props: ["visible"],
  data() {
    return {
      role: "--请选择角色--",
    };
  },
  methods: {
    clickOk() {
      this.$emit("clickOk");
      if (this.role != "--请选择角色--") {
        this.$store.commit("changeRole", this.role);
      }
    },
    clickCancel() {
      this.$emit("clickCancel");
    },
  },
};
</script>

<style lang="stylus" scoped>
.changeRole {
  background: red;
}
</style>