//表单验证
 $('.ui.form .submit')
            .form({
              on:'blur',
              fields: {
                oddNumber: {
                  identifier: 'oddNumber',
                  rules: [
                  {
                    type   : 'minLength[9]',
                    prompt : '至少填9位数字'
                  },
                  {
                    type   : 'number',
                    prompt : '请填写数字'
                  }
                  ]
                }
              }
            });

//更多按钮-查询区域。
            var forms=document.querySelectorAll(".row");
            if(forms.length==3){
                var fromsparent=document.querySelector(".padding10-20");
                var moreDivBorder=document.createElement("div");
                function moreCreate(){
                    if(forms[2].style.height="56px"){
                        forms[2].style.height="0";
                        forms[2].style.opacity="0";
                        moreDivBorder.className="moreDivBorder";
                        moreDivBorder.innerHTML="更多";
                        fromsparent.append(moreDivBorder);
                        var moreDiv=document.createElement("div");
                        moreDiv.className="moreDiv";
                        fromsparent.append(moreDiv);
                    }
                }
                moreCreate();
                function moreChange(){
                    if(forms[2].style.opacity=="0"){
                        forms[2].style.height="56px";
                        forms[2].style.opacity="1";
                        moreDivBorder.innerHTML="折叠";

                    }else{
                        forms[2].style.height="0";
                        forms[2].style.opacity="0";
                        moreDivBorder.innerHTML="更多";
                    }
                }
                $(".moreDivBorder").click(function(){
                    moreChange()
                });

            }