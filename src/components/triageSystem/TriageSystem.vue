<template>
  <div class="triageSystem">
    <header-tool :data="data"></header-tool>
  </div>
</template>

<script>
import HeaderTool from "@/components/common/HeaderTooler.vue";
export default {
  name: "triageSystem",
  props: ["data"],
  components: {
    HeaderTool,
  },
  mounted() {},
};
</script>

<style lang="stylus" scoped>
.triageSystem {
  position: absolute;
  background: #fff;
  width: 100vw;
  height: calc(100vh - 40px);
}
</style>