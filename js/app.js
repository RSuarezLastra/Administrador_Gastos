// variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul ');

// eventos
eventListenners();
function eventListenners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}


// clases



// funciones
function preguntarPresupuesto(){
    const presupuesto = prompt('¿cual es tu presupuesto?');
    if(presupuesto === '' || presupuesto === null || isNaN(presupuesto) || presupuesto <= 0){
        window.location.reload()
    }
    console.log(presupuesto);
}