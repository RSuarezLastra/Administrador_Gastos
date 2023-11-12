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
    insertarPresupuesto(cantidad){
        //extraemos los valores del objeto
        const {presupuesto, restante} = cantidad;
        // insertamos los valores al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
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
    presupuesto = new Presupuesto(presupuestoUser);
    ui.insertarPresupuesto(presupuesto);
}