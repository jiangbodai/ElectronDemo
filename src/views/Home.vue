<template>
  <div class="home">
    <task-bar
      class="taskBar"
      :medicalTypes="medicalTypes"
      @changeArea="changeArea"
      @changeRole="changeRole"
    ></task-bar>
    <div class="destop-logo"></div>
    <div class="content">
      <treatment-tag
        class="treatmentTag"
        @clickTreatmentItem="clickTreatmentItem"
      ></treatment-tag>
      <future-function class="futureFunction"></future-function>
    </div>
    <change-role
      :visible="visible"
      @clickOk="changeRoleClickOk"
      @clickCancel="changeRoleClickCancel"
    ></change-role>
    <transition-group
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <component
        class="workTask"
        :is="item.componentName"
        v-show="item.active"
        :class="item.isWorking"
        :data="item"
        v-for="item in medicalTypes"
        :key="item.id"
      ></component>
    </transition-group>
  </div>
</template>

<script>
import TaskBar from "@/components/main/TaskBar.vue";
import TreatmentTag from "@/components/main/TreatmentTag.vue";
import FutureFunction from "@/components/main/FutureFuntion.vue";
import ChangeRole from "@/components/main/ChangeRole.vue";
import TriageSystem from "@/components/triageSystem/TriageSystem.vue";
import MobileInfusion from "@/components/mobileInfusion/MobileinFusion.vue";
import PatientsControl from "@/components/patientsControl/PatientsControl.vue";
import QualityControl from "@/components/qualityControl/QualityControl.vue";
import ChangeShifts from "@/components/changeShifts/ChangeShifts.vue";
import PreHospitalCare from "@/components/preHospitalCare/PreHospitalCare.vue";
import Critically from "@/components/critically/Critically.vue";
import Departments from "@/components/departments/Departments.vue";
import Setting from "@/components/setting/Setting.vue";

import { mapState, mapMutations } from "vuex";
export default {
  name: "Home",
  components: {
    TaskBar,
    TreatmentTag,
    FutureFunction,
    ChangeRole,
    TriageSystem,
    MobileInfusion,
    PatientsControl,
    QualityControl,
    ChangeShifts,
    PreHospitalCare,
    Critically,
    Departments,
    Setting,
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapState({
      medicalTypes: (state) => {
        return state.WorkingTask.currentTasks;
      },
    }),
  },
  methods: {
    changeArea() {
      console.log("======切换院区");
    },
    /**
     * 点击修改角色
     */
    changeRole() {
      this.visible = !this.visible;
    },
    /**
     * 修改角色完毕
     */
    changeRoleClickOk() {
      this.visible = !this.visible;
    },
    /**
     * 取消修改角色
     */
    changeRoleClickCancel() {
      this.visible = !this.visible;
    },
    /**
     * 点击信息系统item
     */
    clickTreatmentItem(item) {
      this.$store.commit("addTask", {
        title: item.title,
        icon: item.icon,
        active: true,
        componentName: item.name,
        isWorking: "working",
        id: item.id,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/images/home/desktop-bg.png');
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  position: relative;

  .content {
    position: absolute;
    width: 100vw;
    top: 0;
    bottom: 40px;
    display: flex;
    flex-direction: row;

    .treatmentTag {
      width: 45%;
      height: 100%;
    }

    .futureFunction {
      width: 55%;
      height: 100%;
    }
  }

  .taskBar {
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .destop-logo {
    background-image: url('../assets/images/home/logo-desktop.png');
    background-repeat: no-repeat;
    background-size: auto auto;
    position: absolute;
    width: 321px;
    height: 119px;
    right: 50px;
    bottom: 70px;
  }

  .tasks {
    width: 100vw;
    height: 100vh;
    background: red;
  }

  .working {
    z-index: 600;
  }

  .unWork {
    z-index: 500;
  }
}
</style>
