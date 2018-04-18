// 全选行为 =========================================================================================================
;(function(){
  let isAllChecked = (checkedData) => {
    if(checkedData.length === $('.main_table').data('list').length) {
      $('.checkAll').checkbox('check')
    }else{
      $('.checkAll').checkbox('uncheck')
    }
  }

  let checkedAll = () => {
    $('.check_item').checkbox('check')
    $('.main_table .table_item').addClass('active')
    checkedData = $('.main_table').data('list')
  }

  let clearChecked = () => {
    $('.check_item').checkbox('uncheck')
    $('.main_table .table_item').removeClass('active')
    checkedData = []
  }

  // 选中取消选中
  $('.main_table').on('click', '.table_item', function(evt){
    $(this).toggleClass('active')
    let check_item = $(this).find('.check_item')
    check_item.checkbox('toggle')

    if(check_item.checkbox('is checked')){
      checkedData.push($(this).data('info'))
      isAllChecked(checkedData)
    }else{
      checkedData.forEach((item,index) => {
        if(item.id === $(this).data('info').id){
          checkedData.splice(index, 1)
        }
      })
      isAllChecked(checkedData)
    }
  })

  // 全选
  $('.checkAll').click(function () {
    if($(this).checkbox('is checked')) {
      checkedAll()
    }else{
      clearChecked()
    }
  })
})()