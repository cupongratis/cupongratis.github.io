
        // Solo permite ingresar números
        function isNumberKey(evt) {
            const charCode = (evt.which) ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                evt.preventDefault();
                return false;
            }
            return true;
        }
        
        // Formatea automáticamente con espacios cada 4 dígitos
        function formatCardNumber(input) {
            // Elimina todos los espacios existentes
            let value = input.value.replace(/\s+/g, '');
            
            // Limita a 16 dígitos
            if (value.length > 16) {
                value = value.substr(0, 16);
            }
            
            // Añade espacios cada 4 dígitos
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            input.value = formattedValue;
            
            // Validación visual
            const cardNumber = value.replace(/\s/g, '');
            if (cardNumber.length === 16) {
                input.style.borderColor = '#28a745';
                input.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.2)';
            } else {
                input.style.borderColor = '#ddd';
                input.style.boxShadow = 'none';
            }
        }
        
        // Validación al enviar el formulario
        document.getElementById('creditCardForm').addEventListener('submit', function(e) {
            const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
            
            if (cardNumber.length !== 16 || isNaN(cardNumber)) {
                e.preventDefault();
                alert('Por favor ingrese un número de tarjeta válido de 16 dígitos');
                document.getElementById('cardNumber').focus();
                document.getElementById('cardNumber').style.borderColor = '#dc3545';
                document.getElementById('cardNumber').style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.2)';
            }
        });
       



// Solo permite ingresar números (función reutilizable)
function isNumberKey(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        evt.preventDefault();
        return false;
    }
    return true;
}

// Validación en tiempo real para CVV
function validateCVV(input) {
    // Limita a 3 dígitos
    if (input.value.length > 3) {
        input.value = input.value.substr(0, 3);
    }
    
    // Validación visual
    if (input.value.length === 3) {
        input.style.borderColor = '#28a745';
        input.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.2)';
    } else {
        input.style.borderColor = '#ddd';
        input.style.boxShadow = 'none';
    }
}

// Validación al enviar el formulario
document.getElementById('creditCardForm').addEventListener('submit', function(e) {
    const cvv = document.getElementById('cvv').value;
    
    if (cvv.length !== 3 || isNaN(cvv)) {
        e.preventDefault();
        alert('El CVV debe contener exactamente 3 dígitos numéricos');
        document.getElementById('cvv').focus();
        document.getElementById('cvv').style.borderColor = '#dc3545';
        document.getElementById('cvv').style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.2)';
    }
});


// Solo permite números y la barra /
function isNumberOrSlash(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    // Permitir números (48-57) y barra / (47)
    if (charCode > 31 && (charCode < 47 || charCode > 57 || charCode === 47)) {
        evt.preventDefault();
        return false;
    }
    return true;
}

// Formatea automáticamente como MM/YY
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, ''); // Elimina todo lo que no sea número
    
    // Auto-insertar / después de 2 dígitos
    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    // Limitar a MM/YY (5 caracteres)
    if (value.length > 5) {
        value = value.substring(0, 5);
    }
    
    input.value = value;
    
    // Validación visual básica
    if (value.length === 5) {
        input.style.borderColor = '#ddd'; // Reset hasta validación completa
    } else {
        input.style.borderColor = '#ddd';
        input.style.boxShadow = 'none';
    }
}

// Validación completa al perder el foco
function validateExpiryDate(input) {
    const value = input.value;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    // Validar formato MM/YY
    if (!/^\d{2}\/\d{2}$/.test(value)) {
        input.style.borderColor = '#dc3545';
        input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.2)';
        return false;
    }
    
    const [monthStr, yearStr] = value.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    
    // Validar mes (1-12)
    if (month < 1 || month > 12) {
        input.style.borderColor = '#dc3545';
        input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.2)';
        return false;
    }
    
    // Validar que no sea fecha pasada
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        input.style.borderColor = '#dc3545';
        input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.2)';
        return false;
    }
    
    // Si pasa todas las validaciones
    input.style.borderColor = '#28a745';
    input.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.2)';
    return true;
}

// Validación al enviar el formulario
document.getElementById('creditCardForm').addEventListener('submit', function(e) {
    const expiryInput = document.getElementById('expiryDate');
    if (!validateExpiryDate(expiryInput)) {
        e.preventDefault();
        alert('Por favor ingrese una fecha de expiración válida (MM/YY) que no esté vencida');
        expiryInput.focus();
    }
});
