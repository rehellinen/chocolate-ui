<template lang="pug">
  .echarts__wrapper
    p.echarts__title 地图
    #geography
    p.echarts__title 柱状图
    #histogram
</template>

<script>
import { histogramOption, geographyOption } from '@/pages/echarts/config'
import { UKMapData } from '@/pages/echarts/UK'

export default {
  mounted () {
    this.draw()
  },
  methods: {
    draw () {
      this.$echarts.registerMap('uk', UKMapData)

      const histogram = this.$echarts.init(document.getElementById('histogram'))
      const geography = this.$echarts.init(document.getElementById('geography'))
      window.onresize = function () {
        histogram.resize()
        geography.resize()
      }
      histogram.setOption(histogramOption)
      geography.setOption(geographyOption)
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "~sass/base"

  .echarts__title
    font-size: 20px
    font-weight: bold
    margin: 15px 30px
    padding-bottom: 10px
    border-bottom: 1px solid #aaa
  #histogram
    width: 100%
    height: 500px
  #geography
    width: 100%
    height: 500px
  .de
</style>
