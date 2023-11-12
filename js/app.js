// variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul ');

// eventos
eventListenners();
function eventListenners(){
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}


// clases
class Presupuesto{
    constructor(presupuesto, restante, gastos){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = []
    }
}

class UI{

}

const ui = new UI();
let presupuesto;
// funciones
function preguntarPresupuesto(){
    const presupuestoUser = prompt('¿cual es tu presupuesto?');
    // validamos el presupuesto
    if(presupuestoUser === '' || presupuestoUser === null || isNaN(presupuestoUser) || presupuestoUser <= 0){
        window.location.reload()
    }
    presupuesto = new Presupuesto(presupuestoUser)
}