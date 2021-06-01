<template>
  <div class="TriageSystemMenu">
    <div
      style="background: green; height: 40px"
      :class="collapsed ? 'collapsed' : 'unCollaps'"
    >
      <a-button
        type="link"
        style="margin: 0px; height: 40px; width: 40px;border-radius 0;text-align :center"
        :icon="collapsed ? 'double-left' : 'double-right'"
        @click="toggleCollapsed"
      >
      </a-button>
    </div>
    <ul :class="collapsed ? 'collapsed' : 'unCollaps'">
      <li
        :class="item.selected == true ? 'selected' : 'unselect'"
        v-for="(item, index) in dataList"
        :key="index"
        @click="itemClicked(item)"
      >
        <a>
          <img :src="item.icon" alt="" />
          <span v-show="collapsed">{{ item.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TriageSystemMenu",
  props: ["dataList"],
  data() {
    return {
      collapsed: true,
      currentSelectItem: this.dataList.filter(function (item) {
        return item.selected == true;
      })[0],
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    itemClicked(e) {
      if (this.currentSelectItem) {
        this.currentSelectItem.selected = false;
      }
      e.selected = true;
      this.currentSelectItem = e;
    },
  },
  mounted() {},
};
</script>

<style lang="stylus" scoped>
.TriageSystemMenu {
  overflow-y: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .collapsed {
    width: 120px;

    img {
      margin: 10px 10px 10px 0px;
    }
  }

  .unCollaps {
    width: 40px;

    img {
      margin: 10px 10px 10px 10px;
    }
  }

  ul {
    height: 100%;
    background: white;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      height: 40px;
      border-bottom: 0.5px solid #ddd;
      text-align: center;

      &:hover {
        background: yellow;
      }

      img {
        width: 20px;
        height: 20px;
      }

      span {
        height: 40px;
        line-height: 40px;
      }
    }

    .selected {
      background: blue;

      img {
        filter: brightness(100);
      }

      span {
        color: white;
      }

      &:hover {
        background: blue;
      }
    }

    .unselect {
      background: white;
    }
  }
}
</style>