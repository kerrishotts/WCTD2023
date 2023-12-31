import { ready } from "../common/ready.js";


/**
 * Returns the sum of an array
 * 
 * arr {Number[]} an array of numbers
 * 
 * returns {Number} the sum of the array
 */
function sum(arr) {
    return arr.reduce((sum, current) => sum += current, 0);
}

/**
 * Creates the score card in the document using an array for par for each hole
 * and an ID that points to the table to use
 * 
 * parForHoles {Number[]} The par for each hole
 * scoreTableEl {HTMLTableElement} the table to use for the scorecard
 */
function makeScoreCard(parForHoles, scoreTableEl) {
    const headingRow = scoreTableEl.querySelector(".hole-numbers");
    const parRow = scoreTableEl.querySelector(".hole-pars");
    const strokesRow = scoreTableEl.querySelector(".hole-strokes");

    parForHoles.forEach((par, idx) => {
        /* create a cell for each hole */
        const holeNumEl = document.createElement("th");
        const holeParEl = document.createElement("td");
        const holeStrokesEl = document.createElement("td");

        holeNumEl.textContent = idx + 1;
        holeParEl.textContent = par;

        const strokeScoreEl = document.createElement("input");
        strokeScoreEl.type = "number";
        holeStrokesEl.appendChild(strokeScoreEl);

        headingRow.appendChild(holeNumEl);
        parRow.appendChild(holeParEl);
        strokesRow.appendChild(holeStrokesEl);
    })
}

/**
 * Calculate the final score for a form that contains the par and strokes for each
 * hole. It puts the score into a DIV with class .total-score 
 * 
 * scoreFormEl {HTMLFormElement} the form containing the scores
 */
function calculateFinalScore(scoreFormEl) {
    /* get all the pars from the score form */
    const parEls = scoreFormEl.querySelectorAll(".hole-pars td")
    const pars = Array.from(parEls, el => Number(el.textContent));

    /* get the scores too */
    const strokeEls = scoreFormEl.querySelectorAll(".hole-strokes input");
    const strokes = Array.from(strokeEls)
                            .map(el => Number(el.value));

    /* compute the scores */
    const totalPar = sum(pars);
    const totalStrokes = sum(strokes);
    const totalScore = totalStrokes - totalPar;

    const totalScoreEl = scoreFormEl.querySelector(".total-score");
    totalScoreEl.textContent = totalScore;
}


/**
 * Create the table and hook up the event listeners so we can calculate the score
 */
function setUpGame() {
    /* A game of golf has 18 holes */
    const parForHoles = [
        4, 4, 5, 7, 3, 4, 4, 5, 6, /* 9 holes */
        3, 4, 5, 5, 5, 4, 5, 4, 6
    ];
    const scoreTable = document.getElementById("scoreTable");
    makeScoreCard(parForHoles, scoreTable);

    document.querySelector("#scores").addEventListener("submit", event => {
        calculateFinalScore(event.target);
        event.preventDefault();
    });
}

/* when the document is ready, set up the game. */
ready(setUpGame);