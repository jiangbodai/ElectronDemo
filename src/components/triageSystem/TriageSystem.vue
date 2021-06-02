<template>
  <div class="triageSystem">
    <header-tool :data="data"></header-tool>
    <div class="content">
      <triage-system-menu
        :dataList="menus"
        @menuCollaps="menuCollaps"
        class="menu"
      ></triage-system-menu>
      <component
        :class="collapsed ? 'collapsed' : 'unCollaps'"
        :is="selectItem.componentName"
        :key="selectItem.id"
      ></component>
    </div>
  </div>
</template>

<script>
import HeaderTool from "@/components/common/HeaderTooler.vue";
import TriageSystemMenu from "./TriageSystemMenu.vue";

import TriageRecord from "./triageRecord/TriageRecord";
import SystemSetting from "./systemSettting/SystemSetting";
import QualityControl from "./qualityControl/QualityControl";
import PreHospitalEmergency from "./preHospitalEmergency/PreHospitalEmergency";
import DepartmentControl from "./departmentControl/DepartmentControl";

export default {
  name: "triageSystem",
  props: ["data"],
  components: {
    HeaderTool,
    TriageSystemMenu,
    TriageRecord,
    SystemSetting,
    QualityControl,
    PreHospitalEmergency,
    DepartmentControl,
  },
  data() {
    return {
      collapsed: true,
      menus: [
        {
          icon: require("@/assets/images/home/icon-triage.png"),
          title: "分诊记录",
          selected: true,
          componentName: "TriageRecord",
          id: 1,
        },
        {
          icon: require("@/assets/images/home/icon-firstAid.png"),
          title: "院前急救",
          selected: false,
          componentName: "PreHospitalEmergency",
          id: 2,
        },
        {
          icon: require("@/assets/images/home/icon-qualityControl.png"),
          title: "质控管理",
          selected: false,
          componentName: "QualityControl",
          id: 3,
        },
        {
          icon: require("@/assets/images/home/icon-departments.png"),
          title: "科室管理",
          selected: false,
          componentName: "DepartmentControl",
          id: 4,
        },
        {
          icon: require("@/assets/images/home/icon-setting.png"),
          title: "系统设置",
          componentName: "SystemSetting",
          id: 5,
        },
      ],
    };
  },
  computed: {
    selectItem() {
      return this.menus.filter((item) => {
        return item.selected == true;
      })[0];
    },
  },
  mounted() {},
  methods: {
    menuCollaps(collaps) {
      this.collapsed = collaps;
    },
  },
};
</script>

<style lang="stylus" scoped>
.triageSystem {
  position: absolute;
  background: #cab;
  width: 100vw;
  height: calc(100vh - 40px);

  .content {
    height: calc(100vh - 80px);
    display: flex;
    flex-direction: row;

    .collapsed {
      width: calc(100% - 120px);
    }

    .unCollaps {
      width: calc(100% - 40px);
    }
  }
}
</style>