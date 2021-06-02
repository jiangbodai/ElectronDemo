<template>
  <div class="TriageRecord">
    <div id="printTest">
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
      <p>明月照于山间</p>
      <p>清风来于江上</p>
    </div>
    <a-button type="primary" icon="printer" v-print="'#printTest'"
      >打印数据</a-button
    >
  </div>
</template>

<script>
export default {
  name: "TriageRecord",
  methods: {},
};
</script>

<style lang="stylus" scoped>
.TriageRecord {
  height: 100%;
  background: red;
  overflow-y: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  #printTest {
    text-align: center;

    p {
      margin: 0 auto;
    }
  }
}
</style>