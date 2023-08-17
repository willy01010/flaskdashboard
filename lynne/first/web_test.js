console.log('test');

$(document).ready(function(){
    $("#resultID_select").on('change',function(){
        $.ajax({
            type : "GET",
            url : "getResultIDInfo.php",
            data : {
                resultID : $("#resultID_select").val(),
            },
            dataType : 'html'
        }).done(function(data){
            if(data==""){

            }
            else{
                $("#content2").html(data);
            }
        }).fail(function(){

        });
    });
});
