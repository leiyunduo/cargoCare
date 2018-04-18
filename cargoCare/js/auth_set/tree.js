let TreeObj = null

let setting = {
  check: {
    enable: true,
  },
  data: {
    simpleData: {
      enable: true
    }
  },
  view: {
    // fontCss : {background:"#000"},
    showIcon: false,
	},
}

$(function () {
  getAuthList().then(zNodes => {
    TreeObj = $.fn.zTree.init($("#tree"), setting, zNodes)
    pageInfo.authList = zNodes
  })
})