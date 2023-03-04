function cambiarPagina(pagina){
    console.log("Entra cambiar pagina "+pagina);
    location = pagina;
}

function lista(){
    var puntajes = localStorage.getItem("puntaje");// Leer libros del localstorage, al inicio no existe
    puntajes=JSON.parse(puntajes);// Recibe una cadena JSON y en base a esta cadena construye un objeto JavaScript  
    if(puntajes==null) puntajes=[];// Si es nulo crea un arreglo vacio
    var puntajeOrd = [];
    for(var i in puntajes){
        var aux = JSON.parse(puntajes[i]);
        puntajeOrd.push(aux);
    }
    document.getElementById("listado").innerHTML="";
    puntajeOrd.sort(function (x, y) {
        // ordenar primero por el campo 'tiempo'
        if (x.tiempo < y.tiempo) {
            return -1;
        }
     
        if (x.tiempo > y.tiempo) {
            return 1;
        }
        // si los nombres son iguales, ordenar por 'puntuacion'
        return x.puntuacion - y.puntuacion;
    });
    var tabla="<tr><th>Nombre de usuario</th><th>Puntaje</th><th>Tiempo</th></tr>";
    
    // Recuperar la información        
    for(var i in puntajeOrd){
        var puntaje = puntajeOrd[i];
        
        tabla += "<tr><td>"+puntaje.nombre+"</td>";
        tabla += "<td>"+puntaje.puntuacion+"</td>";
        tabla += "<td>"+puntaje.tiempo+"</td>";
        tabla += "</tr>";
    }
            
    document.getElementById("listado").innerHTML=tabla;
}

window.onload = lista;