/**
 * Function to convert fahrenheit to celsius.
 * 
 * degreesF {Number} degrees in fahrenheit
 * 
 * returns {Number} degrees in celsius
 */
function convertFtoC(degreesF) {
    const degreesC = (degreesF - 32) * 5/9;
    return degreesC;
}
/**
 * Event handler called when the user clicks the Convert button
 */
function convert() {
    const degreesFElement = document.querySelector("#degreesF");
    const degreesCElement = document.querySelector("#degreesC");

    /* even if an input field says it's a number, the "value" is
        still text, which means we have to change it to a Number. */
    const degreesF = Number(degreesFElement.value);
    degreesCElement.textContent = convertFtoC(degreesF);
}   
document.querySelector("#convert").addEventListener("click", convert);