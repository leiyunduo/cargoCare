//上传文件
function ajaxFile(data,url){
    $.ajax({
        url:url,
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        success: function (e) {
            if (e.status == 200) {
                LALERT.success(e.message)
            } else {
                LALERT.msg(e.message)
            }

        },
        error: function () {
            LALERT.msg('服务器失败')
        }

    });
}