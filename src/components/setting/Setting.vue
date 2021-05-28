<template>
  <div class="Setting">
    <header-tool :data="data"></header-tool>
  </div>
</template>

<script>
import HeaderTool from "@/components/common/HeaderTooler.vue";
export default {
  name: "Setting",
  props: ["data"],
  components: {
    HeaderTool,
  },
};
</script>

<style lang="stylus" scoped>
.Setting {
  position: absolute;
  background: #fff;
  width: 100vw;
  height: calc(100vh - 40px);
}
</style>