export const histogramOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  legend: {
    data: ['北美洲', '亚洲', '欧洲', '海外现存确诊'],
    left: '6%',
    top: 'top',
    itemWidth: 15,
    itemHeight: 15,
    textStyle: {
      fontSize: 15
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      data: ['3-08', '3-15', '3-22', '3-29', '4-05', '4-12', '4-13'],
      splitLine: { show: false },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#e7e7e7',
          width: '2'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#3a6186'
        },
        splitLine: {
          show: false
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#3a6186'
        },
        splitLine: {
          lineStyle: {
            color: ['#e7e7e7']
          }
        }
      }
    }
  ],
  series: [
    {
      name: '北美洲',
      type: 'bar',
      barWidth: 20,
      stack: '海外',
      data: [10, 24, 101, 134, 90, 230, 210]
    },
    {
      name: '亚洲',
      type: 'bar',
      barWidth: 20,
      stack: '海外',
      data: [10, 10, 100, 110, 130, 90, 110]
    },
    {
      name: '欧洲',
      type: 'bar',
      barWidth: 20,
      stack: '海外',
      data: [10, 24, 60, 123, 111, 140, 10]
    },
    {
      name: '海外现存确诊',
      type: 'bar',
      barWidth: 20,
      data: [40, 80, 200, 300, 300, 400, 300],
      itemStyle: {
        normal: {
          color: '#ff4f76'
        }
      }
    }
  ]
}

export const geographyOption = {
  tooltip: {
    show: true,
    formatter: function (params) {
      return params.data
        ? `${params.data.chineseName}<br/>确诊：${params.data.value}`
        : ''
    }
  },
  series: [
    {
      name: 'mapSer',
      type: 'map',
      roam: false,
      mapType: 'UK',
      top: 'top',
      left: 'center',
      right: '',
      label: {
        fontSize: 10,
        show: false
      },
      data: [
        {
          name: 'England',
          chineseName: '英格兰',
          selected: false,
          value: 69329,
          itemStyle: {
            areaColor: '#fe614f',
            emphasis: {}
          }
        },
        {
          name: 'Scotland',
          chineseName: '苏格兰',
          selected: false,
          value: 6067,
          itemStyle: {
            areaColor: '#ff7759',
            emphasis: {}
          }
        },
        {
          name: 'Wales',
          chineseName: '威尔士',
          selected: false,
          value: 5610,
          itemStyle: {
            areaColor: '#ff7759',
            emphasis: {}
          }
        },
        {
          name: 'Northern Ireland',
          chineseName: '北爱尔兰',
          selected: false,
          value: 1882,
          itemStyle: {
            areaColor: '#ff7759',
            emphasis: {}
          }
        }
      ],
      itemStyle: {
        normal: {
          areaColor: '#c7ccd5',
          borderColor: '#b5ddf1'
        },
        emphasis: {}
      }
    }
  ]
}
