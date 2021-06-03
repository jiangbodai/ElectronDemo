<template>
  <div class="PreHospitalEmergency">
    <h1>院前急救</h1>
    <!-- <el-button size="small" type="success" @click="port"
      >导出为excel表格</el-button
    > -->
    <button @click="exportExcel">导出为excel表格</button>
  </div>
</template>

<script>
import Excel from "@/utils/excel.js";
export default {
  name: "PreHospitalEmergency",
  data() {
    return {};
  },
  methods: {
    async exportExcel() {
      // Excel.exportExcel(this.jsonData, "文件");
      let data = [];
      for (let i = 0; i < 10000; i++) {
        data.push({
          name: "姓名" + i,
          phone: i + "",
          email: "000@1" + i + ".com",
        });
      }

      console.log("====");
      Excel.exportExcelWithCallBack({
        json: data,
        name: new Date() + "",
        start() {
          console.log("开始导出");
        },
        end() {
          console.log("导出结束");
        },
      });
    },
    importFile() {
      Excel.importExcel((data, dataRef) => {
        alert("数据已经打印在控制台");
        console.log(data);
        console.log(dataRef);
      });
    },
  },
};
</script>

<style>
</style>