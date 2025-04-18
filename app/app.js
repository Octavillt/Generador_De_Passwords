/** @type {HTMLInputElement} */
const lengthSlider = (document.getElementById('length'));

/** @type {HTMLInputElement} */
const lengthValueDisplay = (document.getElementById('length-value'));
lengthValueDisplay.value = lengthSlider.value;

/** @type {HTMLButtonElement} */
const decreaseButton = (document.getElementById('decrease'));

/** @type {HTMLButtonElement} */
const increaseButton = (document.getElementById('increase'));

/** @type {HTMLButtonElement} */
const generateButton = (document.getElementById('generate'));

/** @type {HTMLInputElement} */
const passwordDisplay = (document.getElementById('password'));

/** @type {HTMLButtonElement} */
const copyButton = (document.getElementById('copy'));

/** @type {HTMLInputElement} */
const characters = (document.getElementById('textPass'));

/** @type {HTMLInputElement} */
const useCustomCharsCheckbox = (document.getElementById('useCustomChars'));

/** @type {HTMLElement} */
const customCharsContainer = document.getElementById('customCharsContainer');

/** @type {HTMLInputElement} */
const useMayusCheckbox = (document.getElementById('useMayus'));

/** @type {HTMLInputElement} */
const useMinusCheckbox = (document.getElementById('useMinus'));

/** @type {HTMLInputElement} */
const useNumbersCheckbox = (document.getElementById('useNumbers'));

/** @type {HTMLInputElement} */
const useSymbolsCheckbox = (document.getElementById('useSymbols'));

/** @constant {string} Letras mayúsculas */
const mayusCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/** @constant {string} Letras minúsculas */
const minusCharacters = 'abcdefghijklmnopqrstuvwxyz';

/** @constant {string} Dígitos numéricos */
const numbers = '0123456789';

/** @constant {string} Símbolos especiales */
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/** @constant {string} Conjunto completo de caracteres disponibles */
const specialCharacters = mayusCharacters + minusCharacters + numbers + symbols;

// Muestra el valor inicial del control deslizante.
lengthValueDisplay.innerText = lengthSlider.value;

/**
 * Actualiza el valor mostrado cuando se mueve el control deslizante.
 * @listens HTMLInputElement#input
 */
lengthSlider.oninput = function () {
    lengthValueDisplay.innerText = this.value;
};

/**
 * Disminuye la longitud en 1 al hacer clic en el botón de disminución.
 * @listens HTMLButtonElement#click
 */
decreaseButton.onclick = function () {
    lengthSlider.value--;
    lengthValueDisplay.innerText = lengthSlider.value;
};

/**
 * Aumenta la longitud en 1 al hacer clic en el botón de aumento.
 * @listens HTMLButtonElement#click
 */
increaseButton.onclick = function () {
    lengthSlider.value++;
    lengthValueDisplay.innerText = lengthSlider.value;
};

/**
 * Reemplaza espacios por guiones bajos al escribir en el campo de caracteres personalizados.
 * @listens HTMLInputElement#input
 */
characters.addEventListener('input', function () {
    this.value = this.value.replace(/ /g, '_');
});

/**
 * Controla la visibilidad de la sección de caracteres personalizados
 * y habilita/deshabilita otros checkboxes.
 * @listens HTMLInputElement#change
 */
useCustomCharsCheckbox.addEventListener('change', function () {
    if (this.checked) {
        customCharsContainer.style.display = 'block';
        useMayusCheckbox.disabled = true;
        useMinusCheckbox.disabled = true;
        useNumbersCheckbox.disabled = true;
        useSymbolsCheckbox.disabled = true;
        document
            .querySelectorAll('.custom-checkbox input[type="checkbox"]:not(#useCustomChars)')
            .forEach(cb => cb.parentElement.classList.add('disabled-checkbox'));
    } else {
        customCharsContainer.style.display = 'none';
        useMayusCheckbox.disabled = false;
        useMinusCheckbox.disabled = false;
        useNumbersCheckbox.disabled = false;
        useSymbolsCheckbox.disabled = false;
        document
            .querySelectorAll('.custom-checkbox input[type="checkbox"]:not(#useCustomChars)')
            .forEach(cb => cb.parentElement.classList.remove('disabled-checkbox'));
    }
    checkAtLeastOneSelected();
});

/**
 * Genera una nueva contraseña al hacer clic en el botón de generar.
 * @listens HTMLButtonElement#click
 */
generateButton.onclick = function () {
    // Si se usan caracteres personalizados y hay al menos uno
    if (useCustomCharsCheckbox.checked && characters.value.trim() !== '') {
        const customChars = characters.value.replace(/ /g, '_');
        passwordDisplay.value = generatePassword(lengthSlider.value, customChars);
    } else {
        // Construye el conjunto de caracteres según checkboxes
        let selectedChars = '';
        if (useMayusCheckbox.checked) selectedChars += mayusCharacters;
        if (useMinusCheckbox.checked) selectedChars += minusCharacters;
        if (useNumbersCheckbox.checked) selectedChars += numbers;
        if (useSymbolsCheckbox.checked) selectedChars += symbols;
        // Si no seleccionó nada, usar todos
        if (selectedChars === '') selectedChars = specialCharacters;
        passwordDisplay.value = generatePassword(lengthSlider.value, selectedChars);
    }
};

/**
 * Genera una contraseña aleatoria.
 *
 * @param {number} length – Longitud deseada de la contraseña.
 * @param {string} characters – Cadena con todos los caracteres posibles.
 * @returns {string} Contraseña aleatoria generada.
 */
let generatePassword = (length, characters) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

/**
 * Copia la contraseña al portapapeles y muestra una alerta de éxito o error.
 * @listens HTMLButtonElement#click
 */
copyButton.onclick = function () {
    navigator.clipboard.writeText(passwordDisplay.value)
        .then(() => { alert('Contraseña copiada al portapapeles'); })
        .catch(() => { alert('Error al copiar al portapapeles'); });
};

/**
 * Verifica que al menos un tipo de carácter esté seleccionado
 * para habilitar o deshabilitar el botón “Generar”.
 */
let checkAtLeastOneSelected = () => {
    const noOptionSelected =
        !useMayusCheckbox.checked &&
        !useMinusCheckbox.checked &&
        !useNumbersCheckbox.checked &&
        !useSymbolsCheckbox.checked &&
        !(useCustomCharsCheckbox.checked && characters.value.trim() !== '');

    generateButton.disabled = noOptionSelected;
}

// Asegura que el botón Generar tenga el estado correcto al cargar la página.
window.addEventListener('DOMContentLoaded', checkAtLeastOneSelected);

// Añadir verificación cada vez que cambie un checkbox o el input de caracteres
useMayusCheckbox.addEventListener('change', checkAtLeastOneSelected);
useMinusCheckbox.addEventListener('change', checkAtLeastOneSelected);
useNumbersCheckbox.addEventListener('change', checkAtLeastOneSelected);
useSymbolsCheckbox.addEventListener('change', checkAtLeastOneSelected);
useCustomCharsCheckbox.addEventListener('change', checkAtLeastOneSelected);
characters.addEventListener('input', checkAtLeastOneSelected);