//Variables Globales
var url = "http://localhost:3001/api";

$(document).ready(function(){ 

  function datepickerConf(){
  //Funcion para poner datepicker en español
  $(function($){
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '<Ant',
        nextText: 'Sig>',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
  });

  // activamos Datepicker
  $( ".datepicker" ).datepicker(); 
  
  }

  // agregamos la clase "active" al elemento del menú que se encuentra activo en el momento
  $.each($('.navbar').find('li'), function() {
        $(this).toggleClass('active', 
            window.location.pathname.indexOf($(this).find('a').attr('href')) > -1);
    }); 


  // configuración de Autocompletado de input "Buscar"
  function autocomplete(){
   var availableTags = [
      "ActionScript",
      "AppleScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#buscar" ).autocomplete({
      source: availableTags
    });
  }
    // Login 

    $('#btnIngresar').click(function(event){
        event.preventDefault();
        var email =  $('#inputEmail').val();
        var pass = $('#inputPassword').val();
        console.log(pass);
        signIn(email, pass);
        

    });


    function signUp(email, pass){

       $.ajax({
        type: 'POST',
        url: url + "/signUp",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded"
        },
        crossDomain: true,
        data: {
            "email": email, 
            "password": pass,
            "displayName": "Luispachu",
            "labName": "Lace"
        },
    }).done(function(data) { 
        var token = data.token;
        window.localStorage.setItem('token', token);
        console.log("Mi nuevo token es:" + token);
        });
  } //fin signUp

  function signIn(email, pass){
    var token = window.localStorage.getItem('token');
    console.log(token)

    $.ajax({
        type: 'POST',
        url: url + "/signIn",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token 
        },
        crossDomain: true,
        data: {
            "email": email, 
            "password": pass
        },
    }).done(function(data) { 
        if(data.success) // you should do your checking here
            {
              window.location = 'index.html'; //just to show that it went through
            }
            else
            {
              console.log(data);
              var mensaje = $('#mensaje');
              mensaje.removeClass( "no-display" ).addClass( "display" );
              $('#mensaje').append(data.message);
            }

        });
  } // Fin signIn

  function listarTurnos(){
    var token = window.localStorage.getItem('token');
    $.ajax({
        type: 'GET',
        url: url + "/appointments",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer " + token 
        },
        crossDomain: true,
        
    }).done(function(data) { 
          console.log(data);
          var tablaDatos = $('#tablaDatos');
          for (var i = data.appointments.length - 1; i >= 0; i--) {
           tablaDatos.prepend("<tr><td>"+i+"</td><td>"+data.appointments[i].day+"</td><td>"+data.appointments[i].hour+"</td><td>"+data.appointments[i].specialty+"</td></tr>"); 

         }
        });
  } //Fin listarTurnos

  //funcion get url
  function getURL(){
   var pathname = window.location.pathname;
    return pathname
  }

  // Al cargar página Turnos.html
  if(getURL()==="/turnos.html"){   
    autocomplete();
    listarTurnos(); 

  }
  // Al cargar página Derivaciones.html
  if(getURL()==="/resultados.html"){   
    autocomplete();
    datepickerConf();
    console.log("Estamos en los :" + getURL()); 
  }
  // Al cargar página Derivaciones.html
  if(getURL()==="/index.html"){   
    console.log("Estamos en la web :" + getURL());
  }

  
});// Fin document.ready
