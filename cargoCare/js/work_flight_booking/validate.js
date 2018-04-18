//订舱录入
$('.ui.form.booking_entry')
.form({
  inline : true,
  on     : 'blur',
  fields : {
    'booking_entry_booking_number':{//订舱号 6位数字
        identifier  : 'booking_entry_booking_number',
        rules: [
          {
              type : 'regExp[/^([0-9]{6}|)$/]',
              prompt : '请输入订舱号(6位数字)'
          }
        ]
    },
    'booking_entry_waybill_number_three_code':{//运单号三字代码
        identifier  : 'booking_entry_waybill_number_three_code',
        rules: [
          {
              type : 'regExp[/^([0-9]{3}|)$/]',
              prompt : '请输入正确的运单号三字代码(数字)'
          }
        ] 
    },
    'booking_entry_number_eight_digits':{//运单号8位数字
        identifier  : 'booking_entry_waybill_number_eight_digits',
        rules: [
          {
              type   : 'regExp[/^([0-9]{8}|)$/]',
              prompt : '请输入正确的运单号8位数字'
          }
        ]
    },
    //客户代码？
    'booking_entry_customer_name':{//客户名称 
        identifier  : 'booking_entry_customer_name',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入正确的客户名称'
          }
        ]
    },
    'booking_entry_customer_call':{//客户 电话
        identifier  : 'booking_entry_customer_call',
        rules: [
          {
              type   : 'regExp[/^((((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+|)$/]',
               // type   : 'regExp[/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/]',
              prompt : '请输入正确的客户电话'
          }
        ]
    },
    'booking_entry_customer_mobile':{//客户 手机
        identifier  : 'booking_entry_customer_mobile',
        rules: [
          {
              type   : 'regExp[/^((((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+|)$/]',
               // type   : 'regExp[/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/]',
              prompt : '请输入正确的客户 手机'
          }
        ]
    },

    'booking_entry_jianshu_number': {//件数
      identifier: 'booking_entry_jianshu_number',
      rules: [
        {
          type: 'regExp[/^(\\d+|)$/g]',
          prompt: '请输入正整数'
        }
      ]
    },
    'booking_entry_weight': {//重量
      identifier: 'booking_entry_weight',
      rules: [
        {
          type: 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
          prompt: '请输入正整数或者小数(限两位小数)'
        }
      ]
    },
    'booking_entry_volume': {//体积
      identifier: 'booking_entry_volume',
      rules: [
        {
          type: 'regExp[/^([0-9]+([.]{1}[0-9]{1,3})?|)$/g]',
          prompt: '请输入正整数或者小数(限三位小数)'
        }
      ]
    },

    'booking_entry_box_plates_number': {//箱板数
      identifier: 'booking_entry_box_plates_number',
      rules: [
        {
          type: 'regExp[/^(\\d+|)$/g]',
          prompt: '请输入正整数'
        }
      ]
    },
}
})

//订舱修改
$('.ui.form.booking_modification')
.form({
  inline : true,
  on     : 'blur',
  fields : {
    'booking_modification_booking_number':{//订舱号 6位数字
        identifier  : 'booking_modification_booking_number',
        rules: [
          {
              type : 'regExp[/^([0-9]{6}|)$/]',
              prompt : '请输入订舱号(6位数字)'
          }
        ]
    },
    'booking_modification_waybill_number_three_code':{//运单号三字代码
        identifier  : 'booking_modification_waybill_number_three_code',
        rules: [
          {
              type : 'regExp[/^([0-9]{3}|)$/]',
              prompt : '请输入正确的运单号三字代码(数字)'
          }
        ]
    },
    'booking_modification_number_eight_digits':{//运单号8位数字
        identifier  : 'booking_modification_number_eight_digits',
        rules: [
          {
              type   : 'regExp[/^([0-9]{8}|)$/]',
              prompt : '请输入正确的运单号8位数字'
          }
        ]
    },

    'booking_modification_jianshu_number': {//件数
      identifier: 'booking_modification_jianshu_number',
      rules: [
        {
          type: 'regExp[/^(\\d+|)$/g]',
          prompt: '请输入正整数'
        }
      ]
    },
    'booking_modification_weight': {//重量
      identifier: 'booking_modification_weight',
      rules: [
        {
          type: 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
          prompt: '请输入正整数或者小数(限两位小数)'
        }
      ]
    },
    'booking_modification_product_name':{//品名
        identifier  : 'booking_modification_product_name',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入品名'
          }
        ]
    },
    'booking_modification_volume': {//体积
      identifier: 'booking_modification_volume',
      rules: [
        {
          type: 'regExp[/^([0-9]+([.]{1}[0-9]{1,3})?|)$/g]',
          prompt: '请输入正整数或者小数(限三位小数)'
        }
      ]
    },

    'booking_modification_box_plates_number': {//箱板数
      identifier: 'booking_modification_box_plates_number',
      rules: [
        {
          type: 'regExp[/^(\\d+|)$/g]',
          prompt: '请输入正整数'
        }
      ]
    },
    'booking_modification_customer_call':{//客户 电话
        identifier  : 'booking_modification_customer_call',
        rules: [
          {
              type   : 'regExp[/^((((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+|)$/]',
               // type   : 'regExp[/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/]',
              prompt : '请输入正确的客户电话'
          }
        ]
    },
    'booking_modification_customer_mobile':{//客户 手机
        identifier  : 'booking_modification_customer_mobile',
        rules: [
          {
              type   : 'regExp[/^((((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+|)$/]',
               // type   : 'regExp[/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/]',
              prompt : '请输入正确的客户 手机'
          }
        ]
    },
}
})

//订舱模板添加
$('.ui.form.template_add')
.form({
  inline : true,
  on     : 'blur',
  fields : {
    'template_add_booking_number':{//订舱号 6位数字
        identifier  : 'template_add_booking_number',
        rules: [
          {
              type : 'regExp[/^([0-9]{6}|)$/]',
              prompt : '请输入订舱号(6位数字)'
          }
        ]
    },
    'template_add_waybill_number_three_code':{//运单号三字代码
        identifier  : 'template_add_waybill_number_three_code',
        rules: [
          {
              type : 'regExp[/^([0-9]{3}|)$/]',
              prompt : '请输入正确的运单号三字代码(数字)'
          }
        ]
    },
    'template_add_number_eight_digits':{//运单号8位数字
        identifier  : 'template_add_number_eight_digits',
        rules: [
          {
              type   : 'regExp[/^([0-9]{8}|)$/]',
              prompt : '请输入正确的运单号8位数字'
          }
        ]
    },
    'template_add_customer_name':{//客户名称 名称
        identifier  : 'template_add_customer_name',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入正确的客户名称'
          }
        ]
    },
    'template_add_customer_call':{//客户 电话
        identifier  : 'template_add_customer_call',
        rules: [
          {
              type   : 'regExp[/^((((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+|)$/]',
               // type   : 'regExp[/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/]',
              prompt : '请输入正确的客户电话'
          }
        ]
    },
    'template_add_customer_mobile':{//客户 手机
        identifier  : 'template_add_customer_mobile',
        rules: [
          {
              type   : 'regExp[/^((((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+|)$/]',
               // type   : 'regExp[/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/]',
              prompt : '请输入正确的客户 手机'
          }
        ]
    },

    'template_add_jianshu_number': {//件数
      identifier: 'template_add_jianshu_number',
      rules: [
        {
          type: 'regExp[/^(\\d+|)$/g]',
          prompt: '请输入正整数'
        }
      ]
    },
    'template_add_weight': {//重量
      identifier: 'template_add_weight',
      rules: [
        {
          type: 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
          prompt: '请输入正整数或者小数(限两位小数)'
        }
      ]
    },
    'template_add_volume': {//体积
      identifier: 'template_add_volume',
      rules: [
        {
          type: 'regExp[/^([0-9]+([.]{1}[0-9]{1,3})?|)$/g]',
          prompt: '请输入正整数或者小数(限三位小数)'
        }
      ]
    },

    'template_add_box_plates_number': {//箱板数
      identifier: 'template_add_box_plates_number',
      rules: [
        {
          type: 'regExp[/^(\\d+|)$/g]',
          prompt: '请输入正整数'
        }
      ]
    },
}
})