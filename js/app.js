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
    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }
    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
        this.restante = this.presupuesto - gastado;
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
    mostrarAlerta(mensaje, tipo) {
        // creando el div del mensaje
        const divAlert = document.createElement('DIV');
        divAlert.classList.add('text-center', 'alert');
        if (tipo === 'error') {
            divAlert.classList.add('alert-danger');
        } else {
            divAlert.classList.add('alert-success');
        }
        divAlert.textContent = mensaje;
        document.querySelector('.primario').insertBefore(divAlert, formulario);
        // para eliminar el mensaje
        setTimeout(() => {
            divAlert.remove();
        }, 3000);
    }
    agregarGastoListado(gastos) {
        this.limpiarHtml();
        // iterar sobre el arreglo gastos
        gastos.forEach(gasto => {
            const { nombre, cantidad, id } = gasto;
            // crar un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.classList = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;

            // Agregar HTML al gasto
            nuevoGasto.innerHTML = `${nombre} <span class='badge badge-primary badge-pill'> ${cantidad} </span>`;

            // Agregar boton para borrar
            const btn_borrar = document.createElement('button');
            btn_borrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btn_borrar.textContent = 'borrar'
            nuevoGasto.appendChild(btn_borrar);

            // agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        });
    }
    limpiarHtml() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
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
    const cantidad = Number(document.querySelector('#cantidad').value);

    if (nombre === '' || cantidad === '') {
        ui.mostrarAlerta('Ambos campos osn obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.mostrarAlerta('Ingrese una cantidad valida', 'error');
        return;
    }
    // Guardamos el nombre y la cantidad del gasto en objeto
    const gasto = { nombre, cantidad, id: Date.now() };

    // agregamos el nuevo gasto
    presupuesto.nuevoGasto(gasto);

    // imprimir el gasto
    const { gastos, restante } = presupuesto;
    ui.agregarGastoListado(gastos);
    // actualizar restante
    ui.actualizarRestante(restante);
    // mostramos la alerta de tofdo bien
    ui.mostrarAlerta('Gasto agregado correctamente');

    // limpiamos el formulario
    formulario.reset();
}