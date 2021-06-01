<template>
  <div class="triageSystem">
    <header-tool :data="data"></header-tool>
    <triage-system-menu :dataList="menus" class="menu"></triage-system-menu>
  </div>
</template>

<script>
import HeaderTool from "@/components/common/HeaderTooler.vue";
import TriageSystemMenu from "./TriageSystemMenu.vue";
export default {
  name: "triageSystem",
  props: ["data"],
  components: {
    HeaderTool,
    TriageSystemMenu,
  },
  data() {
    return {
      menus: [
        {
          icon: require("@/assets/images/home/icon-triage.png"),
          title: "新增分诊",
          selected: true,
          id: 1,
        },
        {
          icon: require("@/assets/images/home/icon-firstAid.png"),
          title: "院前急救",
          selected: false,
          id: 2,
        },
        {
          icon: require("@/assets/images/home/icon-qualityControl.png"),
          title: "质控管理",
          selected: false,
          id: 3,
        },
        {
          icon: require("@/assets/images/home/icon-departments.png"),
          title: "科室管理",
          selected: false,
          id: 4,
        },
        {
          icon: require("@/assets/images/home/icon-setting.png"),
          title: "系统设置",
          id: 5,
        },
      ],
    };
  },
  mounted() {},
};
</script>

<style lang="stylus" scoped>
.triageSystem {
  position: absolute;
  background: #cab;
  width: 100vw;
  height: calc(100vh - 40px);

  .menu {
    height: calc(100vh - 80px);
  }
}
</style>