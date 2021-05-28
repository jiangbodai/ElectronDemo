<template>
  <div class="QualityControl">
    <header-tool :data="data"></header-tool>
  </div>
</template>

<script>
import HeaderTool from "@/components/common/HeaderTooler.vue";
export default {
  name: "QualityControl",
  props: ["data"],
  components: {
    HeaderTool,
  },
};
</script>

<style lang="stylus" scoped>
.QualityControl {
  position: absolute;
  background: #abc;
  width: 100vw;
  height: calc(100vh - 40px);
}
</style>