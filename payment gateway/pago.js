document.addEventListener('DOMContentLoaded', () =>  {
    const form = document.getElementById('payment-form');
    const submitBtn = document.getElementById("submit-btn");

    const inputs = document.querySelectorAll("#payment-form input");
    // Añadir evento input a todos los campos
    inputs.forEach(input => {
        input.addEventListener("input", validateForm);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita el envío del formulario y la recarga de la página
        // Validaciones
        let isValid = validateForm();

        if (isValid) {
            // Redirigir a la página de éxito
            window.location.href = "success.html";
        }
        else{
            window.location.href = "cancel.html";

        }
    });

    // Funciones de validación
    function validateForm() {
        let isValid = true;

        if (!validateName()) isValid = false;
        if (!validateEmail()) isValid = false;
        if (!validateExpM()) isValid = false;
        if (!validateAddress()) isValid = false;
        if (!validateCity()) isValid = false;
        if (!validateCountry()) isValid = false;
        if (!validatePostalCode()) isValid = false;
        if (!validateCardHolder()) isValid = false;
        if (!validateCardNumber()) isValid = false;
        if (!validateExpiryYear()) isValid = false;
        if (!validateCVV()) isValid = false;

        submitBtn.disabled = !isValid;

        return isValid;
    }

    function validateName() {
        const name = document.getElementById("full-name").value.trim();
        const errorElement = document.getElementById("name-error");
        if (name === "") {
            errorElement.textContent = "Nombre completo es requerido.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    function validateEmail() {
        const email = document.getElementById("email").value.trim();
        const errorElement = document.getElementById("email-error");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            errorElement.textContent = "Correo electrónico es requerido.";
            return false;
        } else if (!emailPattern.test(email)) {
            errorElement.textContent = "Correo electrónico no es válido.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    function validateAddress() {
        const address = document.getElementById("address").value.trim();
        const errorElement = document.getElementById("address-error");
        if (address === "") {
            errorElement.textContent = "Dirección es requerida.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    function validateCity() {
        const city = document.getElementById("city").value.trim();
        const errorElement = document.getElementById("city-error");
        if (city === "") {
            errorElement.textContent = "Ciudad es requerida.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    function validateCountry() {
        const country = document.getElementById("country").value.trim();
        const errorElement = document.getElementById("country-error");
        if (country === "") {
            errorElement.textContent = "País es requerido.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }
    function validateExpM() {
        const expm = document.getElementById("expiry-month").value.trim();
        const errorElement = document.getElementById("expiry-month-error");
        if (expm === "") {
            errorElement.textContent = "Mes es requerido.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    function validatePostalCode() {
        const postalCode = document.getElementById("postal-code").value.trim();
        const errorElement = document.getElementById("postal-error");
        const postalPattern = /^[0-9]{3}\s?[0-9]{3}$/;
        if (postalCode === "") {
            errorElement.textContent = "Código postal es requerido.";
            return false;
        } else if (!postalPattern.test(postalCode)) {
            errorElement.textContent = "Código postal no es válido.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    function validateCardHolder() {
        const cardHolder = document.getElementById("card-holder").value.trim();
        const errorElement = document.getElementById("card-holder-error");
        if (cardHolder === "") {
            errorElement.textContent = "Titular de la tarjeta es requerido.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    function validateCardNumber() {
        const cardNumber = document.getElementById("card-number").value.trim();
        const errorElement = document.getElementById("card-number-error");
        const cardPattern = /^[0-9]{16}$/;
        if (cardNumber === "") {
            errorElement.textContent = "Número de tarjeta es requerido.";
            return false;
        } else if (!cardPattern.test(cardNumber)) {
            errorElement.textContent = "Número de tarjeta no es válido.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    function validateExpiryYear() {
        const expiryYear = document.getElementById("expiry-year").value.trim();
        const errorElement = document.getElementById("expiry-year-error");
        const currentYear = new Date().getFullYear();
        if (expiryYear === "") {
            errorElement.textContent = "Año de vencimiento es requerido.";
            return false;
        } else if (expiryYear < currentYear) {
            errorElement.textContent = "Año de vencimiento no es válido.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }

    function validateCVV() {
        const cvv = document.getElementById("cvv").value.trim();
        const errorElement = document.getElementById("cvv-error");
        const cvvPattern = /^[0-9]{3,4}$/;
        if (cvv === "") {
            errorElement.textContent = "CVV es requerido.";
            return false;
        } else if (!cvvPattern.test(cvv)) {
            errorElement.textContent = "CVV no es válido.";
            return false;
        }
        errorElement.textContent = "";
        return true;
    }
});


