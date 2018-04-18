// 基于准备好的dom,初始化echarts实例
let myChart = echarts.init($('#echarts')[0])
// 指定图标的配置项和实例 
let options = {
  // 标题
  title: {
    show: true, // 是否显示标题
    text: '河北空港物流有限公司出港货量走势图(按日期)', // 主标题
    subtext: '', // 副标题
    left: '50%', // 数字就是像素值, 也可以是center，right，left，也可以使百分数
    top: '10px',
    textStyle: {
      fontWeight: 'bolder', // 加粗
      fontFamily: 'sans-serif', // 字体
      fontSize: 18, // 字体大小
    },
    textAlign: 'center',
    textBaseline: 'top', // 标题文本垂直对齐
    padding: [5, 20], // 内边距
    itemGap: 5, // 主副标题之间的距离
    shadowOffsetX: 0, // 阴影水平方向上的偏移距离
    shadowOffsetY: 0, // 阴影垂直方向上的偏移距离
  },
  toolbox: {
    show: true, // 显示工具箱  会显示在右侧
    top: '20px',
    right: '20px',
    feature: {
      dataView: {
        show: true, // 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新
      },
      restore: {
        show: true, // 配置项还原
      },
      saveAsImage: {
        show: true, // 保存图片的功能
      },
      magicType: {
        type: ['line', 'bar'], // 动态类型切换
      }
    }
  },
  // 弹窗组件
  tooltip: {
    trigger: 'axis', // item 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
  },
  // 图例
  legend: {
    data: ['销量'],
  },
  //x轴
  xAxis: {
    data: [],
    name: '日期',
    nameLocation: 'middle',
    nameGap: '30',
  },
  yAxis: {
    name: '货量(吨)',
    nameLocation: 'middle',
    nameGap: '30',
  },
  // 数据
  series: [
    {
      name: '货量(吨)',
      type: 'line', // line代表折线图
      data: [],
    }
  ]
}

// 使用刚指定的配置项和数据来显示图表
myChart.setOption(options)

let getParams = () => {
  return {
    day_start: $('.day_start').val(),
    day_end: $('.day_end').val(),
  }
}

let getData = () => {
  let url = baseUrl + '/def/zhcx/departure_cargo_count/get_departure_cargo'
  let params = getParams()

  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      let xList = res.data.map(item => formatDate(item.create_time))
      let data = res.data.map(item => item.weight)

      options.xAxis.data = xList
      options.series.data = data
      myChart.setOption({
        title: {
          subtext: $('.day_start').val() + '-' + $('.day_end').val()
        },
        xAxis: {
          data: xList,
        },
        series: [{
          data: data,
        }]
      })
    }
  })
}

$('.btn_search').on('click', function () {
  getData()
})