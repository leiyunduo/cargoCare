let LODOP

let createPage = (d) => {
  LODOP = getLodop()
  LODOP.PRINT_INITA(0,0,800,1000,"打印控件功能演示_Lodop功能_装载背景图");
  LODOP.ADD_PRINT_TEXT(70,116,82,40,d.departure_name);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(242,40,325,20,d.receiver_name);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
  LODOP.ADD_PRINT_TEXT(147,39,325,25,d.sender_name);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(168,39,325,25,d.sender_address);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(279,40,323,20,d.receiver_telephone);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(235,375,294,35,d.billing_remark);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(527,424,247,24,d.product_name);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(189,39,325,20,d.sender_telephone);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(71,277,92,34,d.destination_name);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",13);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(261,40,323,20,d.receiver_address);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(368,368,163,25,"无");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(346,203,160,43,d.expected_flight_no + ' ' + d.expected_flight_time);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(318,602,67,20,"MU3");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(318,531,70,20,"SHA");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(318,446,85,20,"MU2");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(318,368,73,20,"SHA");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(318,198,168,20,"MU1");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(318,117,81,20,d.destination_code);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(370,533,136,24,"无");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(516,252,64,25,d.weight);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(516,201,49,25,d.product_code);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(516,152,44,24,d.price_species_code);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(516,79,74,25,d.net_weight);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(516,28,50,25,d.quantity);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(648,367,55,25,"120.00");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(411,39,629,40,d.other_storage_remark);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(549,423,250,25,d.product_code);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(575,424,243,25,d.packaging_name);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(681,372,282,25,"");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(694,160,125,20,"");
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(516,366,56,25,"120.00");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(694,29,131,20,"");
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(603,423,247,30,d.volume + "M3");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(648,26,51,20,d.quantity);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(649,80,70,20,d.net_weight);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(516,319,48,23,d.invoice_price);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(897,26,70,20,"140.00");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(754,26,67,20,"38");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(829,26,72,20,"20.00");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(720,26,69,20,"120.00");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.ADD_PRINT_TEXT(925,153,131,25,d.payment_method);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",11);
  LODOP.ADD_PRINT_TEXT(891,390,65,20,d.billing_location);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(891,288,100,20,d.billing_time);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(891,492,158,20,d.issuer);
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
  LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
  LODOP.ADD_PRINT_TEXT(792,27,69,20,"20");
  LODOP.SET_PRINT_STYLEA(0,"FontName","黑体");
  LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
}

let url = window.location.href.split('html')[0] + 'images/print_bg.jpg'
let printDesign = (data) => {
  createPage(data)
  LODOP.ADD_PRINT_SETUP_BKIMG(`<img border='0' src='${url}'>`)
  LODOP.SET_SHOW_MODE("BKIMG_LEFT", 1)
  LODOP.SET_SHOW_MODE("BKIMG_TOP", 1)
  LODOP.SET_SHOW_MODE("BKIMG_WIDTH", "183mm")
  // LODOP.SET_SHOW_MODE("BKIMG_HEIGHT","297mm") // 这句可不加，因宽高比例固定按原图的
  LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1)
  LODOP.PRINT_DESIGN()
}

$('.print_report').on('click', function () {
  let url = baseUrl + '/def/print/receiptMainSingle'
  LXHR.POST(url, {order_no: pageInfo.order_no}).done(res => {
    if(res.status === 200) {
      let data = res.data[0].ccaMainSingle
      printDesign(data)
    }else{
      LALERT.msg(res.message)
    }
  })
})