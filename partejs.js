document.addEventListener('DOMContentLoaded', () => {
    const asientos = document.querySelectorAll('.asiento');
    const reservacionForm = document.getElementById('reservacion-form');
    const botonVerpasajeros = document.getElementById('ver-pasajeros');
    const pasajerosList = document.getElementById('pasajeros-list');

    let pasajeros = [];

    asientos.forEach(asiento => {
        asiento.addEventListener('click', () => {
            if (!asiento.classList.contains('reserved')) {
                document.getElementById('asiento').value = asiento.id;
            }
        });
    });

    reservacionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const asientoId = document.getElementById('asiento').value;
        const equipajemano = document.getElementById('equipaje-mano').checked;
        const equipajebodega = document.getElementById('equipaje-bodega').checked;

        const asiento = document.getElementById(asientoId);
        if (asiento && !asiento.classList.contains('reserved')) {
            asiento.classList.add('reserved');
            pasajeros.push({ nombre, asientoId, equipajemano, equipajebodega });
            alert(`Asiento ${asientoId} reservado para ${nombre}`);
        } else {
            alert('Asiento no disponible');
        }
    });

    botonVerpasajeros.addEventListener('click', () => {
        pasajerosList.innerHTML = '<h2>Lista de Pasajeros</h2>';
        pasajeros.forEach(pasajero => {
            pasajerosList.innerHTML += `<p>${pasajero.nombre} - ${pasajero.asientoId}</p>`;
        });
    });
});
 