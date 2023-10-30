/**
 * Function to convert fahrenheit to celsius.
 * 
 * degreesF {Number} degrees in fahrenheit
 * 
 * returns {Number} degrees in celsius
 */
function convertFtoC(degreesF) {
    const degreesC = (degreesF - 32) * 5 / 9;
    return degreesC;
}
/**
 * Event handler called when the user clicks the Convert button
 * 
 * event {Event} the event that triggered the action
 */
function convert(event) {
    const degreesFElement = document.querySelector("#degreesF");
    const degreesCElement = document.querySelector("#degreesC");

    const degreesF = Number(degreesFElement.value);
    degreesCElement.textContent = convertFtoC(degreesF);

    /* this prevents the browser from "submitting" the form
       and reloading the page. If this were being sent to a 
       server, we wouldn't want to prevent the default.*/
    event.preventDefault();
}
/* instead of onclick, forms use onsubmit */
document.querySelector("#convert").addEventListener("submit", convert);