/**
 * Calls a function when the document is ready
 *  
 * @param {Function} fn function to execute
 */
export function ready(fn) {
    if (document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}