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
    /* Get the two degrees list items */
    const degreesFElement = document.querySelector("#degreesF");
    const degreesCElement = document.querySelector("#degreesC");

    /* convert the fahrenheight value to a Number — otherwise we'll
        get bad results since math operations like multiplication only
        work on numbers, not text */
    const degreesF = Number(degreesFElement.textContent);
    degreesCElement.textContent = convertFtoC(degreesF);
}   

/* when the user clicks the convert button, convert F to C. */
document.querySelector("#convert").addEventListener("click", convert);