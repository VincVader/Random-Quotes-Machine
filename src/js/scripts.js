'use strict';

const quoteWrapper = document.querySelector('.quote-wrapper');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const quoteButton = document.querySelector('.quote-button');


const baseText = 'The main problem with quotes on the internet ' +
 'is that people unconditionally believe in their authenticity';
const randomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * getQuote  - gets random quote
 * @return {object} - with keys cite and author filled with
 * given values from api
 */
async function getQuote() {
    const response = await fetch('https://quotes15.p.rapidapi.com/quotes/random/', {
        'method': 'GET',
        'headers': {
            'x-rapidapi-key':
                'e396104c8emsh9df4a80540ab61ep184698jsn5ce49c716776',
            'x-rapidapi-host': 'quotes15.p.rapidapi.com',
        },
    }).then((response) => {
        return response.json();
    }).then((response) => {
        const cite = {};
        cite.text = response.content;
        cite.author = '&copy;' + response.originator.name;
        return cite;
    }).catch((err) => {
        console.error(err);
    });
    return response;
}
/**
 * Bruh
 * @param {string} text - text which should be checked for bad words
 * @return {promise} - on resolve return true/false
 */
async function filterBadWords(text) {
    const test = await fetch(`https://community-purgomalum.p.rapidapi.com/containsprofanity?text=${encodeURI(text)}`, {
        'method': 'GET',
        'headers': {
            'content-type': 'application/x-www-form-urlencoded',
            'x-rapidapi-key':
                'e396104c8emsh9df4a80540ab61ep184698jsn5ce49c716776',
            'x-rapidapi-host': 'community-purgomalum.p.rapidapi.com',
        },
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        console.error(err);
    });
    return test;
}
let quote;


/**
 * gets random values (in fixed range)
 * @return {string} - hsl(hue, saturation%, lightness%) - nice "random" color
 */
function getRandomColor() {
    const h = randomRange(0, 360);
    const s = randomRange(42, 98);
    const l = randomRange(40, 70);
    return `hsl(${h},${s}%,${l}%)`;
}

/**
 * gets hsl valus from  ^ colors funciton and
 * sets background and text color to that value
 * for elements on page
 */
function colorizePage() {
    const color = getRandomColor();
    quoteWrapper.style.background = color;
    quoteText.style.color = color;
    quoteAuthor.style.color = color;
    quoteButton.style.background = color;
}

/**
 * checks quote for containig bad words
 * if so => replaces quote with default one
 * also disables button for ~ 1 sec that user cannot spam api-service
 */
async function displayNewQuote() {
    colorizePage();
    quoteButton.disabled = true;
    quote = await getQuote();
    const testQuote = await filterBadWords(quote.text);
    if (testQuote) {
        quoteText.innerHTML = baseText;
        quoteAuthor.innerHTML = 'Albert Einstein';
    } else {
        quoteText.innerHTML = quote.text;
        quoteAuthor.innerHTML = quote.author;
    }
    setTimeout(() => {
        quoteButton.disabled = false;
    }, 1000);
}

colorizePage();
quoteButton.addEventListener('click', displayNewQuote);
