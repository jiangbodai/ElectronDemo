<template>
  <div class="Departments">
    <header-tool :data="data"></header-tool>
  </div>
</template>

<script>
import HeaderTool from "@/components/common/HeaderTooler.vue";
export default {
  name: "Departments",
  props: ["data"],
  components: {
    HeaderTool,
  },
};
</script>

<style lang="stylus" scoped>
.Departments {
  position: absolute;
  background: #ccc;
  width: 100vw;
  height: calc(100vh - 40px);
}
</style>