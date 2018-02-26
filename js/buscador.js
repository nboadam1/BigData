var JSONdata=[];
var Arrciudades=[];
var arrTipo=[];
function iniciarVistaBuscador(){
	leerArchivoJSON();
	$("#mostrarTodos").click(function() {
		filtrarListadoBusqueda(false);
	});
	$('#formulario').submit(function( event ) {
		event.preventDefault();
		filtrarListadoBusqueda(true);
	});
}

function leerArchivoJSON() {
	if(JSONdata.length==0){
		$.getJSON("data-1.json", function(datos) {
			JSONdata=datos;
			$.each(datos,function(i, data) {
				if(!Arrciudades.includes(data.Ciudad)){
					Arrciudades.push(data.Ciudad);
					$('#selectCiudad').append('<option value="'+data.Ciudad+'">'+data.Ciudad+'</option>');
				}
				if(!arrTipo.includes(data.Tipo)){
					arrTipo.push(data.Tipo);
					$('#selectTipo').append('<option value="'+data.Tipo+'">'+data.Tipo+'</option>');
				}
			});
		});
	}
}

function filtrarListadoBusqueda(bandera){
	var filtro = new Object();
	if(bandera){
		var rangoPrecio = $("#rangoPrecio").val().split(";");
		filtro.ciudad=$("#selectCiudad").val();
		filtro.tipo=$("#selectTipo").val();
		filtro.precioInicio=rangoPrecio[0];
		filtro.precioFin=rangoPrecio[1];
	}else{
		filtro.ciudad="";
		filtro.tipo="";
		filtro.precioInicio="";
		filtro.precioFin="";
	}
	console.log(bandera);
	obtenerListadousqueda("#divResultadosBusqueda",filtro,bandera);
}

function obtenerListadousqueda(dom,filtro,bandera){
	var html='';
	var cantidadRsultados=0;
	if(JSONdata.length==0){
		leerArchivoJSON();
	}
	html+='<div class="tituloContenido card" style="justify-content: center;">';
	html+='<h5>Resultados de la búsqueda: <b id="numeroResultados"></b></h5>';
	html+='<div class="divider"></div>';
	html+='<button type="button" name="todos" class="btn-flat waves-effect" id="mostrarTodos" id="filtrarListadoBusqueda();">Mostrar Todos</button>';
	html+='</div>';

	if(JSONdata!=0){

		$.each(JSONdata,function(i, data) {
			if(bandera){
				var banderaMostrar=true;
				var precio='';
				if(filtro.ciudad!=""){
					if(data.Ciudad != filtro.ciudad){
						banderaMostrar=false;
					}
				}
				if(filtro.tipo!=""){
					if(data.Tipo != filtro.tipo){
						banderaMostrar=false;
					}
				}

				if(filtro.precioInicio!="" && filtro.precioFin!=""){

					precio=replaceAll(data.Precio, ",", "");
					precio=replaceAll(precio, "$", "");

					if(parseInt(precio)<parseInt(filtro.precioInicio)){
						banderaMostrar=false;
					}else{
						if(parseInt(precio)>parseInt(filtro.precioFin)){
							banderaMostrar=false;
						}
					}

				}

				if(banderaMostrar){
					cantidadRsultados++;
					html+='<div class="tituloContenido card">';
					html+='<img src="img/home.jpg" style="width: 30%;height: 80%;">';
					html+='<ul>';
					html+='<li><b>Dirección:</b>'+data.Direccion+'</li>';
					html+='<li><b>Ciudad:</b>'+data.Ciudad+'</li>';
					html+='<li><b>Telefono</b>'+data.Telefono+'</li>';
					html+='<li><b>Codigo postal:</b>'+data.Codigo_Postal+'</li>';
					html+='<li><b>Tipo:</b>'+data.Tipo+'</li>';
					html+='<li><b>Precio:</b>'+data.Precio+'</li>';
					html+='</ul>';
					html+='</div>';
				}

			}else{
				cantidadRsultados++;
				html+='<div class="tituloContenido card">';
				html+='<img src="img/home.jpg" style="width: 30%;height: 80%;">';
				html+='<ul>';
				html+='<li><b>Dirección:</b>'+data.Direccion+'</li>';
				html+='<li><b>Ciudad:</b>'+data.Ciudad+'</li>';
				html+='<li><b>Telefono</b>'+data.Telefono+'</li>';
				html+='<li><b>Codigo postal:</b>'+data.Codigo_Postal+'</li>';
				html+='<li><b>Tipo:</b>'+data.Tipo+'</li>';
				html+='<li><b>Precio:</b>'+data.Precio+'</li>';
				html+='</ul>';
				html+='</div>';
			}
		});


	}else{
		html+='<div class="tituloContenido card">';
		html+='Sin resultados de busqueda';
		html+='</div>';
	}

	$(dom).html(html);
	$("#numeroResultados").html(cantidadRsultados);
	$("#mostrarTodos").click(function() {
		filtrarListadoBusqueda(false);
	});
	
}

function replaceAll( text, busca, reemplaza ){
  while (text.toString().indexOf(busca) != -1)
      text = text.toString().replace(busca,reemplaza);
  return text;
}