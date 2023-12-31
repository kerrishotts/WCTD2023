import { ready } from "../common/ready.js";
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

ready(() => {

    /* sourced from https://weatherspark.com/y/21872/Average-Weather-in-Maryland-City-Maryland-United-States-Year-Round */
    const averageMonthlyTemps = [
        {month: 0, high: 42, low: 26},
        {month: 1, high: 46, low: 27},
        {month: 2, high: 55, low: 34},
        {month: 3, high: 65, low: 43},
        {month: 4, high: 74, low: 52},
        {month: 5, high: 82, low: 60},
        {month: 6, high: 86, low: 65},
        {month: 7, high: 84, low: 63},
        {month: 8, high: 77, low: 56},
        {month: 9, high: 67, low: 45},
        {month: 10, high: 56, low: 36},
        {month: 11, high: 46, low: 30},
    ];

    const plot = Plot.plot({
        x: {tickFormat: Plot.formatMonth("en", "short")},
        y: {grid: true, label: "Average High & Low Temperatures (2023)"},
        marks: [
            Plot.ruleY([0]),
            Plot.lineY(averageMonthlyTemps, {x: "month", y: "high", stroke: "red"}),
            Plot.lineY(averageMonthlyTemps, {x: "month", y: "low", stroke: "blue"})
        ]
    })

    const div = document.querySelector("#myplot");
    div.append(plot);
})