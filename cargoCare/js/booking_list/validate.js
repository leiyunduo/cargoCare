console.log(123456789456789)
//订舱录入
$('.ui.form.regular_booking')
.form({
  inline : true,
  on     : 'blur',
  fields : {
    'regular_booking_booking_number':{//订舱号 6位数字
        identifier  : 'regular_booking_booking_number',
        rules: [
          {
              type : 'regExp[/^[0-9]{6}$/]',
              prompt : '请输入订舱号(6位数字)'
          }
        ]
    },
    'regular_booking_waybill_number_three_code':{//运单号三字代码
        identifier  : 'regular_booking_waybill_number_three_code',
        rules: [
          {
              type : 'regExp[/^([0-9]{3}|)$/]',
              prompt : '请输入正确的运单号三字代码(数字)'
          }
        ] 
    },
    'regular_booking_waybill_number_eight_digits':{//运单号8位数字
        identifier  : 'regular_booking_waybill_number_eight_digits',
        rules: [
          {
              type   : 'regExp[/^([0-9]{8}|)$/]',
              prompt : '请输入正确的运单号8位数字'
          }
        ]
    },
    //客户代码？
    'regular_booking_customer_name':{//客户名称 
        identifier  : 'regular_booking_customer_name',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入正确的客户名称'
          }
        ]
    },
    'regular_booking_customer_call':{//客户 电话
        identifier  : 'regular_booking_customer_call',
        rules: [
          {
              type   : 'regExp[/^((((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+|)$/]',
               // type   : 'regExp[/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/]',
              prompt : '请输入正确的客户电话'
          }
        ]
    },3
    'regular_booking_customer_mobile':{//客户 手机
        identifier  : 'regular_booking_customer_mobile',
        rules: [
          {
              type   : 'regExp[/^((((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+|)$/]',
               // type   : 'regExp[/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/]',
              prompt : '请输入正确的客户 手机'
          }
        ]
    },
    'regular_booking_estimated_date_flight':{//预计航班日期
       identifier  : 'regular_booking_estimated_date_flight',
       rules: [
         {
             type: 'regExp[/((^[0-9]{4})-(((0[13578]|1[02])-(0[1-9]{1}$|[12][0-9]|3[01]{1}$))|((0[469]|11)-(0[1-9]{1}$|[12][0-9]{1}$|30$))|(02-(0[1-9]|[1][0-9]|2[0-8]{1}$))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29$)/g]',
             prompt : '请按正确的预计航班日期格式输入如:2017-01-01'
         }
       ]
    },
    'regular_booking_scheduled_flight_number_code':{//预计航班号代码
        identifier  : 'regular_booking_scheduled_flight_number_code',
        rules: [
          {
              type   : 'regExp[/^(?![0-9]+$)([A-Z]{2}|[A-Z0-9]{2})$/g]',
              prompt : '请输入正确的航空公司二字代码'
          }
        ]
    },
    'regular_booking_scheduled_flight_number_number':{//预计航班号4位数字
        identifier  : 'regular_booking_scheduled_flight_number_number',
        rules: [
          {
              type   : 'regExp[/^[0-9]{4}$/g]',
              prompt : '请输入正确的航空公司航班号(4位数字)'
          }
        ]
    },
    'regular_booking_eparture_tation_three_code':{//始发站代码
        identifier  : 'regular_booking_eparture_tation_three_code',
        rules: [
          {
              type   : 'regExp[/^[A-Z]{3}$/g]',
              prompt : '请输入正确的始发站机场三字代码'
          }
        ]
    },
    'regular_booking_destination_station_three_code':{//目的站代码
        identifier  : 'regular_booking_destination_station_three_code',
        rules: [
          {
              type   : 'regExp[/^[A-Z]{3}$/g]',
              prompt : '请输入正确的目的站机场三字代码'
          }
        ]
    },
    'regular_booking_jianshu_number': {//件数
      identifier: 'regular_booking_jianshu_number',
      rules: [
        {
          type: 'regExp[/^(\\d+|)$/g]',
          prompt: '请输入正整数'
        }
      ]
    },
    'regular_booking_weight': {//重量
      identifier: 'regular_booking_weight',
      rules: [
        {
          type: 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
          prompt: '请输入正整数或者小数(限两位小数)'
        }
      ]
    },
    'regular_booking_volume': {//体积
      identifier: 'regular_booking_volume',
      rules: [
        {
          type: 'regExp[/^([0-9]+([.]{1}[0-9]{1,3})?|)$/g]',
          prompt: '请输入正整数或者小数(限三位小数)'
        }
      ]
    },

    'regular_booking_box_plates_number': {//箱板数
      identifier: 'regular_booking_box_plates_number',
      rules: [
        {
          type: 'regExp[/^(\\d+|)$/g]',
          prompt: '请输入正整数'
        }
      ]
    },
}
})