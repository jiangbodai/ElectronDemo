<template>
  <div class="headerTool">
    <div class="left">
      <img :src="data.icon" />
      <span>{{ data.title }}</span>
    </div>

    <div class="right">
      <a-icon class="min" type="minus" @click="minTask" />
      <a-icon class="close" type="close" @click="closeTask" />
    </div>
  </div>
</template>

<script>
export default {
  name: "headerTool",
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    minTask() {
      this.$store.commit("minTask", this.data);
    },
    closeTask() {
      this.$store.commit("deleteTask", this.data);
    },
  },
};
</script>

<style lang="stylus" scoped>
.headerTool {
  height: 40px;
  width: 100vw;
  background: blue;

  .left {
    float: left;

    img {
      width: 26px;
      height: 26px;
      margin-left: 12px;
      margin-top: 7px;
      float: left;
    }

    span {
      height: 40px;
      line-height: 40px;
      margin-left: 10px;
      float: left;
    }
  }

  .right {
    float: right;
    height: 40px;
    margin-right: 5px;

    .min {
      height: 40px;
      width: 40px;
      font-size: 20px;
      margin-right: 5px;
      line-height: 40px;

      &:hover {
        background: red;
        color: white;
      }
    }

    .close {
      height: 40px;
      width: 40px;
      line-height: 40px;
      font-size: 20px;

      &:hover {
        background: red;
        color: white;
      }
    }
  }
}
</style>