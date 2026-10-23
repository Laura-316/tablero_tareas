// ==========================================
// GESTIÓN DE TAREAS Y VALIDACIÓN COMPLETA
// ==========================================

const gestorTareas = new TaskManager();

function validateTaskForm() {
    const nombreTarea = document.getElementById('input-nombre-tarea').value.trim();
    const estado = document.getElementById('select-estado').value;
    const fecha = document.getElementById('input-fecha').value;
    const asignado = document.getElementById('input-asignado').value.trim();

    if (nombreTarea === "" || nombreTarea.length <= 3) {
        alert("La tarea a realizar debe tener más de 3 caracteres.");
        return false;
    }

    if (estado === "") {
        alert("Por favor selecciona un estado para la tarea.");
        return false;
    }

    if (fecha === "") {
        alert("Por favor selecciona una fecha de entrega.");
        return false;
    }

    if (asignado === "" || asignado.length <= 5) {
        alert("El campo 'Asignado a' debe tener más de 5 caracteres.");
        return false;
    }

    return true;
}

// Función para renderizar/dibujar la tarjeta en pantalla
function mostrarTareaEnPantalla(tarea) {
    const contenedorTarjetas = document.getElementById('contenedor-tarjetas');

    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta-tarea'; 
    tarjeta.setAttribute('data-id', tarea.id); // Guardamos el ID único en la tarjeta HTML

    tarjeta.innerHTML = `
        <div class="detalles-tarea">
            <small>ID: ${tarea.id}</small><br>
            <span class="asignado-tarea">Asignado a: ${tarea.asignadoA}</span><br>
            <span class="descripcion-tarea">Tarea: ${tarea.nombre}</span><br>
            <span class="fecha-tarea">Entrega: ${tarea.fechaDeEntrega}</span>
        </div>
        <span class="estado-tarea">Estado: ${tarea.estado}</span><br><br>
        <button class="boton-eliminar" onclick="eliminarTareaVisual(${tarea.id})">Eliminar</button>
    `;

    contenedorTarjetas.appendChild(tarjeta);
}

// Función para eliminar la tarea tanto del array como de la pantalla
function eliminarTareaVisual(id) {
    // 1. La eliminamos de la memoria (TaskManager)
    gestorTareas.deleteTask(id);

    // 2. La eliminamos de la pantalla (DOM)
    const tarjetaAEliminar = document.querySelector(`[data-id="${id}"]`);
    if (tarjetaAEliminar) {
        tarjetaAEliminar.remove();
    }

    alert(`Tarea #${id} eliminada correctamente.`);
}

document.addEventListener('DOMContentLoaded', function() {
    const botonGuardar = document.getElementById('boton-guardar');

    if (botonGuardar) {
        botonGuardar.addEventListener('click', function(evento) {
            evento.preventDefault(); 

            if (validateTaskForm()) {
                const nombreTarea = document.getElementById('input-nombre-tarea').value.trim();
                const estado = document.getElementById('select-estado').value;
                const fecha = document.getElementById('input-fecha').value;
                const asignado = document.getElementById('input-asignado').value.trim();

                // Creamos la tarea (se genera su ID automático)
                const nuevaTareaCreada = gestorTareas.addTask(asignado, nombreTarea, "", estado, fecha);
                
                // Dibujamos la tarjeta en pantalla con su botón de eliminar
                mostrarTareaEnPantalla(nuevaTareaCreada);

                alert("¡Tarea guardada con éxito!");
                
                // Limpiamos los campos del formulario
                document.getElementById('input-nombre-tarea').value = "";
                document.getElementById('select-estado').value = "";
                document.getElementById('input-fecha').value = "";
                document.getElementById('input-asignado').value = "";
            }
        });
    }
});