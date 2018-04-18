// 全选
let checkAction = (context) => {
  let checkedNum = 0
  let len = $(context).find('.checkAll').data('size')
  let isAllChecked = () => {
    len = $(context).find('.checkAll').data('size')
    if(checkedNum === len) {
      $(context).find('.checkAll .checkbox').checkbox('check')
    }else{
      $(context).find('.checkAll .checkbox').checkbox('uncheck')
    }
  }

  let checkedAll = () => {
    $(context).find('.check_item').checkbox('check')
    $(context).find('.table_item').addClass('active')
    checkedNum = len
  }

  let clearChecked = () => {
    $(context).find('.check_item').checkbox('uncheck')
    $(context).find('.table_item').removeClass('active')
    checkedNum = 0
  }

  $(context).on('click', '.table_item', function(evt){
    $(this).toggleClass('active')
    let check_item = $(this).find('.check_item')
    check_item.checkbox('toggle')

    if(check_item.checkbox('is checked')){
      checkedNum++
      isAllChecked()
    }else{
      checkedNum--
      isAllChecked()
    }
  }) 

  // 全选
  $(context).find('.checkAll').click(function () {
    $(context).find('.checkAll .checkbox').checkbox('toggle')
    if($(context).find('.checkAll .checkbox').checkbox('is checked')) {
      checkedAll()
    }else{
      clearChecked()
    }
  })
}

// 获取选中数据
let getCheckedData = (context) => {
  return Array.from($(context).find('input:checked')).map(item => {
    return $(item).data('info')
  })
}
