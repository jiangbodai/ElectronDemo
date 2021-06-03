<template>
  <div class="QualityControl">
    <h1>质控管理</h1>

    <div id="container"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
export default {
  name: "QualityControl",
  mounted() {
    var options = {
      chart: {
        type: "column",
      },
      title: {
        text: "月平均气温",
      },
      subtitle: {
        text: "数据来源: WorldClimate.com",
      },
      tooltip: {
        // pointFormat: "Value: {point.y:,.1f} ",
        pointFormatter: function () {
          return "数量：" + this.y + "<br>" + "总比例：" + "20%";
        },
      },
      xAxis: {
        crosshair: true,
        categories: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
      },
      yAxis: {
        labels: {
          format: "{value}°C",
          style: {
            color: Highcharts.getOptions().colors[3],
          },
        },
        title: {
          text: "气温",
          style: {
            color: Highcharts.getOptions().colors[4],
          },
        },
        opposite: true,
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            // format: "{y}\n20%",
            formatter: function () {
              return this.y + "<br>" + "20%";
            },
            // verticalAlign: "bottom",
            // align: "center",
          },

          enableMouseTracking: true,
        },
      },
      series: [
        {
          name: "东京",
          tooltip: {
            valueSuffix: " °C",
          },
          data: [
            7.0,
            6.9,
            9.5,
            14.5,
            18.4,
            21.5,
            25.2,
            26.5,
            23.3,
            18.3,
            13.9,
            9.6,
          ],
        },
      ],
    };

    // 图表初始化函数
    var chart = Highcharts.chart("container", options);
  },
};
</script>

<style lang="stylus" scoped>
.QualityControl {
  height: 100%;
  background: white;
  overflow-y: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  #container {
    width: 800px;
    height: 400px;
    margin: 10px auto;
    border: 1px solid red;
  }
}
</style>