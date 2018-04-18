///出港-订舱
const pageInfo = {
	isEdit: false,
	edit_order_no: '',
	// baseUrl: 'http://192.168.1.106:8080/lxtd-cca-apis',
	baseUrl: 'http://47.93.90.229/test',
}
let {baseUrl} = pageInfo
//***大小写
function toUpperCase(obj)
{
	obj.value = obj.value.toUpperCase()
}
$(function(){
	$(".tijiao").click(function(){
	var booking_no=$(".booking_no").val()
	var flight_no1=$(".flight_no1").val()
	var flight_no2=$(".flight_no2").val()
	var booking_customer_code=$(".booking_customer_code").val()
	var plan_fry_date=$(".plan_fry_date").val()
	var departure_code=$(".departure_code").val()
	var destination_code=$(".destination_code").val()
	var order_no1=$(".order_no1").val()
	var order_no2=$(".order_no2").val()
	var booking_customer_name=$(".booking_customer_name").val()
	var booking_contact_person=$(".booking_contact_person").val()
	var booking_contact_person_tel=$(".booking_contact_person_tel").val()
	var product_no=$(".product_no").val()
	var apply_quatity=$(".apply_quatity").val()
	var apply_weight=$(".apply_weight").val()
	var apply_volume=$(".apply_volume").val()
	var number_plate=$(".number_plate").val()
	var customer_service_records=$(".customer_service_records").val()
		var _data={
			"booking_no":booking_no,"flight_no":flight_no1+flight_no2,"booking_customer_code":booking_customer_code,"plan_fry_date":plan_fry_date,
			"departure_code":departure_code,"destination_code":destination_code,"order_no":order_no1+order_no2,"booking_customer_name":booking_customer_name,
			"booking_contact_person":booking_contact_person,"booking_contact_person_tel":booking_contact_person_tel,"product_no":product_no,
			"apply_quatity":apply_quatity,"apply_weight":apply_weight,"apply_volume":apply_volume,"number_plate":number_plate,"customer_service_records":customer_service_records 
		}
		//保存时的验证
		let validate = $('.ui.form.regular_booking').form('is valid')
		console.log($('.ui.form.regular_booking').form('is valid'))
		if(!validate){
			$('.ui.form').form('validate form')
			return  //校验通过直接加载ajax
		}
		//保存时的验证
		$.ajax({
          url:baseUrl+'/def/output/booking/generalBooking',
                 data:_data,
                 type:"POST",
                 dataType:"json",
                 error:function(){ LALERT.msg('服务器失败');},
                 success:function(e){   
                        console.log(e)
					 if(e.status==200){
						 LALERT.success(e.message)
						 $('input').val('')
						 $('.customer_service_records').val('')
					 }else{
						 LALERT.msg(e.message)
					 }

				 }
		})
                                    
	})

})