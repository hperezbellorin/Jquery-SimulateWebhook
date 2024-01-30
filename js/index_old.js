
var objeto;

function inicio() {

    //Obtenemos el parametro idTransaccion

    var searchParam = new URLSearchParams(location.search);
    var idTransaccion = searchParam.get('idTransaccion');
 
    // DEFINIMOS EL AMBIENTE


    var urlConfig;
    var urlServicio;

    var host = location.host.split(':');

    if (host[0] === 'www.registropublico.gob.ni') {

        urlConfig = 'https://www.registropublico.gob.ni/ServiciosCertificados/API/Emision/'
        urlServicio = urlConfig + 'ObtenerCertificadoBase64?idTransaccion=';



    } else if (host[0] === 'siicarvalidacion.registropublico.gob.ni') {

        urlConfig = 'https://siicarvalidacion.registropublico.gob.ni/ServiciosCertificados/API/Emision/';
        urlServicio = urlConfig + 'ObtenerCertificadoBase64?idTransaccion=';

    } else {

        urlServicio = location.protocol + '//' + location.host + '/ServiciosCertificados/API/Emision/ObtenerCertificadoBase64?idTransaccion=';


    }
   
   

    $.ajax({
        type: 'GET',
        dataType: "json",
        async: false,
        url: urlServicio + idTransaccion,
        success: function (data) {
            objeto = data.Data;

            if (!objeto) {
                $.alert({
                    boxWidth: '50%',
                    useBootstrap: false,
                    type: 'red',
                    typeAnimated: true,
                    icon: 'fa fa-warning',
                    title: '<strong>Atencion!</strong>',
                    content: '<div style= "font-size: 23px">No se ha encontrado un certificado guardado para esta Transaccion' + '</div>'
                });

            } 

        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(JSON.stringify(xhr));
        },
    });



  var link = document.createElement('a');
  link.innerHTML = 'Descargar Certificado';
  link.className = "button button-primary";
   link.style = "width: 50%";
  link.download = 'certificado.pdf';
  link.href = objeto;
  document.getElementById("myform").appendChild(link);


}


async function verCertificado(sender, e) {

  e.preventDefault();

    var f = await fetch(objeto);
    var blob = await f.blob();
    window.open(URL.createObjectURL(blob), "_blank");

}


