<template>
  <div class="userSelect" @click="click">
    <div class="content">
      <ul class="panel" v-show="!isShowPanel">
        <li v-for="(item, index) in dataList" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="title">
      {{ userName }}
      <a-icon class="handle-bar-name" v-show="!isShowPanel" type="caret-up" />
      <a-icon class="handle-bar-name" v-show="isShowPanel" type="caret-down" />
    </div>
  </div>
</template>

<script>
export default {
  name: "userSelect",
  props: ["userName", "dataList"],
  data() {
    return {
      isShowPanel: false,
    };
  },
  mounted() {
    console.log(this.dataList);
  },
  methods: {
    click(e) {
      this.isShowPanel = !this.isShowPanel;
      if (e.target.nodeName.toLowerCase() == "li") {
        console.log(e.target.innerHTML);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.userSelect {
  background: red;
  width: 100px;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .title {
    height: 44px;
  }

  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    background: gray;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    bottom: 44px;

    li {
      font-size: 13px;
      height: 30px;
      line-height: 30px;
      border-bottom: #fff 0.5px solid;
      list-style: none;
      margin: 0 auto;
      width: 100%;

      &:last-child {
        border: none;
      }

      &:hover {
        background: #dcd9d94d;
      }
    }
  }
}
</style>