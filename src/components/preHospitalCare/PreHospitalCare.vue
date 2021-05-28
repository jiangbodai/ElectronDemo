<template>
  <div class="preHospitalCare">
    <header-tool :data="data"></header-tool>
  </div>
</template>

<script>
import HeaderTool from "@/components/common/HeaderTooler.vue";
export default {
  name: "preHospitalCare",
  props: ["data"],
  components: {
    HeaderTool,
  },
};
</script>

<style lang="stylus" scoped>
.preHospitalCare {
  position: absolute;
  background: #fff;
  width: 100vw;
  height: calc(100vh - 40px);
}
</style>