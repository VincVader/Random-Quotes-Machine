'use strict';

const quoteWrapper = document.querySelector('.quote-wrapper');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const quoteButton = document.querySelector('.quote-button');

const words = ['fuck', 'cool', 'non', 'sin', 'text', 'bto', 'check'];

const baseText = 'The main problem with quotes on the internet ' +
 'is that people unconditionally believe in their authenticity';
const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
/**
 * getQuote  - gets random quote
 * @return {object} - with cite and author
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
        cite.author = response.originator.name;
        return cite;
    }).catch((err) => {
        console.error(err);
    });
    return response;
}
/**
 * Bruh
 * @param {string} text - text which should be checked for bad words
 * @return {promise}
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
 * @param {sadf} testQuote - asdf
 * @return {promise} - text
 */
async function check() {
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
quoteButton.addEventListener('click', check);
