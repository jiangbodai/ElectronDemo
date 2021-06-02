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
    return {
      jsonData: [
        {
          name: "路人甲",
          phone: "123456789",
          email: "000@123456.com",
        },
        {
          name: "炮灰乙",
          phone: "123456789",
          email: "000@123456.com",
        },
        {
          name: "土匪丙",
          phone: "123456789",
          email: "000@123456.com",
        },
        {
          name: "流氓丁",
          phone: "123456789",
          email: "000@123456.com",
        },
      ],
    };
  },
  methods: {
    exportExcel() {
      Excel.exportExcel(this.jsonData, "文件");
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