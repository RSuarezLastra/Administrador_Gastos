// variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul ');

// eventos
eventListenners();
function eventListenners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto)
}


// clases
class Presupuesto {
    constructor(presupuesto, restante, gastos) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = []
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        //extraemos los valores del objeto
        const { presupuesto, restante } = cantidad;
        // insertamos los valores al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
    mostrarAlerta(mensaje, tipo){
        // creando el div del mensaje
        const divAlert = document.createElement('DIV');
        divAlert.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divAlert.classList.add('alert-danger');
        }else{
            divAlert.classList.add('alert-success');
        }
        divAlert.textContent = mensaje;
        document.querySelector('.primario').insertBefore(divAlert, formulario);
        // para eliminar el mensaje
        setTimeout(() => {
            divAlert.remove();
        }, 3000);
    }
}

const ui = new UI();
let presupuesto;

// funciones
function preguntarPresupuesto() {
    const presupuestoUser = prompt('¿cual es tu presupuesto?');
    // validamos el presupuesto
    if (presupuestoUser === '' || presupuestoUser === null || isNaN(presupuestoUser) || presupuestoUser <= 0) {
        window.location.reload()
    }
    presupuesto = new Presupuesto(presupuestoUser);
    ui.insertarPresupuesto(presupuesto);
}
// agregar gastos
function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    if (nombre === '' || cantidad === ''){
        ui.mostrarAlerta('Ambos campos osn obligatorios', 'error');
        return;
    }else if(cantidad <= 0 || isNaN(cantidad)){
        ui.mostrarAlerta('Ingrese una cantidad valida', 'error');
        return;
    }
    ui.mostrarAlerta('Agregando gasto', 'success');
}