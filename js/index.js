
var objeto;


function SendWebhook()
{

  let JsonData = $("#txtArea").val();

    $.ajax({
        url: "http://localhost:60932/WebhookReceiver_BillShark.aspx",
  crossDomain: true,
        contentType: "application/json; charset=utf-8",
        type: 'POST',
async: false,
        dataType: "json",
        data:JsonData,
        
        success: function(result) {
            
            $(".ContainDiv").html(result);
        }

    }).fail(function (jqXHR, textStatus, error) {
        // Handle error here
        $(".ContainDiv").html(jqXHR.responseText);
      
    });
  
    return false;


}
