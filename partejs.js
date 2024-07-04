
document.addEventListener('DOMContentLoaded', () => {
    const asientos = document.querySelectorAll('.asiento');
    const asientosvip = document.querySelectorAll('.asiento-vip');
    const asientosbs = document.querySelectorAll('.asiento-bussines');
    const reservacionForm = document.getElementById('reservacion-form');
    const cancelForm = document.getElementById('cancel-form');
    const botonVerpasajeros = document.getElementById('ver-pasajeros');
    const pasajerosList = document.getElementById('pasajeros-list');
    const bppago = document.getElementById('ppago');
    const flightTypeSelect = document.getElementById('flight-type');
    const returnDateContainer = document.getElementById('return-date-container');
    const returnDateInput = document.getElementById('return-date');

    let pasajeros = [];

    flightTypeSelect.addEventListener('change', () => {
        if (flightTypeSelect.value === 'ida-vuelta') {
            returnDateContainer.style.display = 'block';
            returnDateInput.required = true;
        } else {
            returnDateContainer.style.display = 'none';
            returnDateInput.required = false;
        }
    });
    
    asientos.forEach(asiento => {
        asiento.addEventListener('click', () => {
            if (!asiento.classList.contains('reserved')) {
                document.getElementById('asiento').value = asiento.id;
            }
            else{
                document.getElementById('cancel-asiento').value = asiento.id;
            }
        });
    });
    asientosvip.forEach(asientovip => {
        asientovip.addEventListener('click', () => {
            if (!asientovip.classList.contains('reserved')) {
                document.getElementById('asiento').value = asientovip.id;
            }
            else{
                document.getElementById('cancel-asiento').value = asientovip.id;
            }
        });
    });
    asientosbs.forEach(asientobs => {
        asientobs.addEventListener('click', () => {
            if (!asientobs.classList.contains('reserved')) {
                document.getElementById('asiento').value = asientobs.id;
            }
            else{
                document.getElementById('cancel-asiento').value = asientobs.id;
            }
        });
    });





    reservacionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const primernom = document.getElementById('primer-nom').value;
        const primerape = document.getElementById('primer-ape').value;
        const asientoId = document.getElementById('asiento').value;
        const equipajemano = document.getElementById('equipaje-mano').checked;
        const equipajebodega = document.getElementById('equipaje-bodega').checked;
        const genero = document.getElementById('genero').value;
        const fdn = document.getElementById('fdn').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const nacionalidad = document.getElementById('nacionalidad').value;
        const asientoclass = document.getElementById('asiento').className;
        let precio = 105.00;
        const flightType= flightTypeSelect.value;
        if (flightType === 'ida-vuelta') {
            precio = precio*2
        }

        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(primernom)) {
            alert('El primer nombre solo puede contener letras y espacios.');
            return;
        }

        // Validación del primer apellido
        if (!nameRegex.test(primerape)) {
            alert('El primer apellido solo puede contener letras y espacios.');
            return;
        }
        
        if (!equipajemano && !equipajebodega) {
            alert('Debe seleccionar al menos una opción de equipaje.');
            return;
        }

        if (!genero) {
            alert('Por favor seleccione su sexo.');
            return;
        }

        // Validación de la fecha de nacimiento
        if (!fdn) {
            alert('Por favor ingrese su fecha de nacimiento.');
            return;
        }
        // Validación de edad (mayores de 18 años)
        const hoy = new Date();
        const fechanacimiento = new Date(fdn);
        let edad = hoy.getFullYear() - fechanacimiento.getFullYear();
        const diferenciames = hoy.getMonth() - fechanacimiento.getMonth();
        if (diferenciames < 0 || (diferenciames === 0 && hoy.getDate() < fechanacimiento.getDate())) {
            edad--;
        }
        if (edad < 18) {
            alert('Debe tener al menos 18 años para reservar.');
            return;
        }

        // Validación del teléfono
        const phoneRegex = /^\+\d{1,3}\s\d{1,4}\s\d{1,4}\s\d{1,4}$/;
        if (!phoneRegex.test(phone)) {
            alert('Por favor ingrese un número de teléfono válido con prefijo.');
            return;
        }

        // Validación del correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor ingrese un correo electrónico válido.');
            return;
        }

        // Validación de la nacionalidad
        if (!nacionalidad) {
            alert('Por favor ingrese su nacionalidad.');
            return;
        }




        const asiento = document.getElementById(asientoId);
        if (asiento && !asiento.classList.contains('reserved')) {
            asiento.classList.add('reserved');
            pasajeros.push({ primernom, primerape, asientoId, equipajemano, equipajebodega, flightType, precio});
            alert(`Asiento ${asientoId} reservado para ${primernom+" "+primerape}`);
            document.getElementById('primer-nom').value = "";
            document.getElementById('primer-ape').value = "";
            document.getElementById('fdn').value = "";
            document.getElementById('phone').value = "";
            document.getElementById('email').value = "";
            document.getElementById('genero').value = ""
            document.getElementById('nacionalidad').value=""
            document.getElementById('asiento').value = "";
            document.getElementById('equipaje-mano').checked = false;
            document.getElementById('equipaje-bodega').checked = false;
            pasajerosList.innerHTML = "";
            bppago.addEventListener('click', () =>{
                window.location.href = "payment gateway/index.html";
            });

        } else {
            alert('Asiento no disponible o reservado');
            document.getElementById('primer-nom').value = "";
            document.getElementById('asiento').value = "";
        }
    });
    cancelForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const asientoId = document.getElementById('cancel-asiento').value;
        const asiento = document.getElementById(asientoId);

        if (asiento && asiento.classList.contains('reserved')) {
            asiento.classList.remove('reserved');
            pasajeros = pasajeros.filter(pasajero=> pasajero.asientoId !== asientoId);
            alert(`Reserva del asiento ${asientoId} ha sido cancelada`);
            document.getElementById('cancel-asiento').value = "";
            pasajerosList.innerHTML = ""
        } else {
            alert('Asiento no está reservado o no existe');
            document.getElementById('cancel-asiento').value = "";
        }
    });

    botonVerpasajeros.addEventListener('click', () => {
        pasajerosList.innerHTML = '<h2>Lista de Pasajeros</h2>';
        let total = 0;
        pasajeros.forEach(pasajero => {
            pasajerosList.innerHTML += `<p>${pasajero.primernom} ${pasajero.primerape} - ${pasajero.asientoId}- ${pasajero.flightType} - ${pasajero.precio}.00$ </p>`;            
            total += pasajero.precio;
        });
        pasajerosList.innerHTML += `<div>Total a pagar: ${total}.00$</div>`;

    });

});
window.onload = function(){
    alert('he cargado la pagina');
    $('#onload').fadeOut();
    $('body').removeClass('hidden');

}
 