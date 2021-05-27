<template>
  <div class="TreatmentTag">
    <div class="content">
      <span class="title">急诊临床信息系统（ECIS）</span>
      <ul class="list">
        <li v-for="(item, index) in dataList(role)" :key="index">
          <a @click="clickTreatmentItem(item.title)">
            <div class="image" :class="item.name">
              <img :src="item.icon" align="middle" />
            </div>
            <span>{{ item.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "TreatmentTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      role: (state) => {
        return state.AppConfig.role;
      },
    }),
    ...mapGetters({
      dataList: "currentIcons",
    }),
  },
  methods: {
    clickTreatmentItem(event) {
      this.$emit("clickTreatmentItem", event);
    },
  },
};
</script>

<style lang="stylus" scoped>
.TreatmentTag {
  position: relative;

  .content {
    background: #152949;
    margin: 60px 20px 10px 50px;
    border-radius: 10px;

    .title {
      margin-left: 15px;
      font-weight: 400;
      font-size: 16px;
      width: 100%;
      height: 50px;
      color: lightgray;
      line-height: 50px;
    }

    .list {
      margin: 0;
      padding: 0;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      li {
        list-style: none;
        width: 50%;
        height: 80px;
        margin-bottom: 20px;

        a {
          margin: 10px;
          background: rgb(46, 63, 88);
          display: block;
          height: 100%;
          border-radius: 8px;
          position: relative;

          .triage {
            background-color: rgb(101, 186, 137);
          }

          .infusion {
            background-color: rgb(101, 186, 137);
          }

          .patient {
            background-color: rgb(101, 186, 137);
          }

          .qualityControl {
            background-color: rgb(101, 186, 137);
          }

          .shifts {
            background-color: rgb(49, 128, 222);
          }

          .firstAid {
            background-color: rgb(101, 186, 137);
          }

          .critically {
            background-color: rgb(101, 186, 137);
          }

          .departments {
            background-color: rgb(101, 186, 137);
          }

          .setting {
            background-color: rgb(38, 74, 124);
          }

          .image {
            position: absolute;
            left: 15px;
            top: 10px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            text-align: center;

            img {
              width: 60%;
              height: 60%;
              margin-top: 18%;
              filter: brightness(100);
            }
          }

          span {
            position: absolute;
            left: 65px;
            width: calc(100% - 65px);
            height: 80px;
            line-height: 80px;
            color: white;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>