window.onload = function () {
    let lengthSlider = document.getElementById('length');
    let lengthValueDisplay = document.getElementById('length-value');
    lengthValueDisplay.value = lengthSlider.value;
    let decreaseButton = document.getElementById('decrease');
    let increaseButton = document.getElementById('increase');
    let generateButton = document.getElementById('generate');
    let passwordDisplay = document.getElementById('password');
    let copyButton = document.getElementById('copy');


    // Muestra el valor inicial del control deslizante.
    lengthValueDisplay.innerText = lengthSlider.value;

    // Actualiza el valor mostrado cuando se mueve el control deslizante.
    lengthSlider.oninput = function () {
        lengthValueDisplay.innerText = this.value;
    }

    // Disminuye la longitud en 1 al hacer clic en el botón de disminución.
    decreaseButton.onclick = function () {
        lengthSlider.value--;
        lengthValueDisplay.innerText = lengthSlider.value;
    }

    // Aumenta la longitud en 1 al hacer clic en el botón de aumento.
    increaseButton.onclick = function () {
        lengthSlider.value++;
        lengthValueDisplay.innerText = lengthSlider.value;
    }

    // Actualiza el valor mostrado cuando se mueve el control deslizante.
    lengthSlider.addEventListener('oninput', () => {
        lengthValueDisplay.value = this.value;
    });

    // Genera una nueva contraseña al hacer clic en el botón de generar.
    generateButton.onclick = function () {
        passwordDisplay.value = generatePassword(lengthSlider.value);
    }

    generateButton.addEventListener('click', function () {
        passwordDisplay.value = generatePassword(lengthSlider.value);
    });

    // Función para generar contraseñas aleatorias.
    function generatePassword(length) {
        let characters = 'Leslie2501';
        let result = '';
        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    }
    copyButton.onclick = function () {
        navigator.clipboard.writeText(passwordDisplay.value)
            .then(() => { alert('Contraseña copiada al portapapeles'); })
            .catch(err => { alert('Error al copiar al portapapeles'); });
    }
}
