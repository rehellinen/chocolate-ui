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
  title: {
    text: '在线设备分布',
    left: '40%',
    top: '0px',
    textStyle: {
      color: '#fff',
      opacity: 0.7
    }
  },
  dataRange: {
    show: false,
    min: 0,
    max: 1000000,
    text: ['High', 'Low'],
    realtime: true,
    calculable: true,
    color: ['orangered', 'yellow', 'lightskyblue']
  },
  tooltip: {
    trigger: 'item'
  },
  geo: {
    map: 'uk',
    label: {
      emphasis: {
        show: false
      }
    },
    roam: false,
    silent: true,
    itemStyle: {
      normal: {
        areaColor: '#37376e',
        borderColor: '#000'
      },
      emphasis: {
        areaColor: '#2a333d'
      }
    }
  },
  series: [{
    type: 'map',
    mapType: 'uk',
    mapLocation: {
      y: 100
    },
    data: [
      { name: '苏格兰', value: 6067 },
      { name: '北爱尔兰', value: 1882 },
      { name: '英格兰', value: 69329 },
      { name: '威尔士', value: 5610 }
    ],
    symbolSize: 12,
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      emphasis: {
        borderColor: '#fff',
        borderWidth: 1
      }
    }
  }]
}
