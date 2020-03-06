<template>
  <div class="echart">
    <div id="chart_example" :style="{width:'100%',height:'600px'}"></div>
  </div>
</template>

<script>
export default {
  methods: {
    Echart () {
      const isechart = require('echarts')
      const chartExample = isechart.init(
        document.getElementById('chart_example')
      )
      var dataCount = 5e5
      var data = generateData(dataCount)
      function generateData (count) {
        var baseValue = Math.random() * 1000
        var time = +new Date(2020, 0, 1)
        var smallBaseValue

        function next (idx) {
          smallBaseValue =
            idx % 30 === 0
              ? Math.random() * 700
              : smallBaseValue + Math.random() * 500 - 250
          baseValue += Math.random() * 20 - 10
          return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000)
        }

        var categoryData = []
        var valueData = []

        for (var i = 0; i < count; i++) {
          categoryData.push(
            isechart.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time)
          )
          valueData.push(next(i).toFixed(2))
          time += 1000
        }

        return {
          categoryData: categoryData,
          valueData: valueData
        }
      }
      chartExample.setOption({
        title: {
          text: '粉丝数据',
          left: 10
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            },
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          bottom: 90
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        xAxis: {
          data: data.categoryData,
          silent: false,
          splitLine: {
            show: false
          },
          splitArea: {
            show: false
          }
        },
        yAxis: {
          splitArea: {
            show: false
          }
        },
        series: [
          {
            type: 'bar',
            data: data.valueData,
            // Set `large` for large data amount
            large: true
          }
        ]
      })
    }
  },
  mounted () {
    // console.log(this.isechart)
    this.Echart()
    // console.log(this)
  }
}
</script>

<style lang='less' scoped>
// .echart{
// // background-image: url('../../assets/img/joke.jpg');
// }
</style>
