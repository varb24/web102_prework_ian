/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page

function addGamesToPage(games) {
    //deleteChildElements(gamesContainer);
    // loop over each item in the data
    deleteChildElements(gamesContainer);
    const container = document.getElementById("games-container");
    console.log(games);
    for(const element of games)  {

        let cardElement = document.createElement("div");
        
        cardElement.classList.add("game-card");

        let imageElement = document.createElement("img");

        imageElement.classList.add("image");
        imageElement.src = element.img;
        
        const toFullBacking = element.goal - element.pledged;

        const cardHTML = `
        <p>${element.name} </p>
        <p>${element.description}</p>
        <p>Backers : ${element.backers}</p>
        <p>Amount to Full Backing: ${toFullBacking > 0? toFullBacking : "Fully Backed!"}</p>
        `;
        
        cardElement.appendChild(imageElement);
        cardElement.innerHTML += cardHTML;
        
        container.appendChild(cardElement);

    }
}


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);
const contributionsTemplate = totalContributions.toLocaleString();

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML += contributionsTemplate;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalMoney = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;
}, 0);
const moneyTemplate = totalMoney.toLocaleString();
// set inner HTML using template literal
raisedCard.innerHTML += `$${moneyTemplate}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numberOfGames = GAMES_JSON.reduce( (acc, gamescard) =>{
    return acc+1;
}, 0);

gamesCard.innerHTML += numberOfGames.toLocaleString();

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    let listOfUnfunded = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have not yet met their goal
    let listOfFunded = GAMES_JSON.filter ( (game) => {
        return game.pledged >= game.goal;
    });
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfFunded);
    // use filter() to get a list of games that have met or exceeded their goal
    // use the function we previously created to add unfunded games to the DOM
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}
showAllGames();
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
function unfundedButtonClickHandler(){
    filterUnfundedOnly();
}

function fundedButtonClickHandler(){
    filterFundedOnly();
}

function allButtonClickHandler(){
    showAllGames();
}
unfundedBtn.addEventListener("click", unfundedButtonClickHandler);
fundedBtn.addEventListener("click", fundedButtonClickHandler);
allBtn.addEventListener("click", allButtonClickHandler);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
    let listOfUnfunded = GAMES_JSON.filter ( (game) => {
        return game.pledged < game.goal;
    });
    let sumRaised = GAMES_JSON.reduce( ( acc, game) =>{
        return acc+game.pledged;
    }, 0).toLocaleString();

    let numOfUnfunded = listOfUnfunded.length;
// create a string that explains the number of unfunded games using the ternary operator
    const displayRaised = `A total of $${sumRaised} has been raised for ${numberOfGames} games.
        Currently, ${numOfUnfunded} ${(numOfUnfunded == 1) ? "game remains" : "games remain"} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
    const fundraisingDescription = document.createElement("p");
    fundraisingDescription.textContent = displayRaised;
    descriptionContainer.appendChild(fundraisingDescription);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const firstTwo = [sortedGames[0], sortedGames[1]];
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topName = firstTwo[0].name;
const topNameContainer = document.createElement("p");
topNameContainer.textContent += topName;
firstGameContainer.appendChild(topNameContainer);
// do the same for the runner up item
const secondName =  firstTwo[1].name;
const secondNameContainer = document.createElement("P");
secondNameContainer.textContent += secondName;
secondGameContainer.appendChild(secondNameContainer);

//Search for a game
//Add button

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (event) => {
    const { value } = event.target;

    const searchQuery = value.toLowerCase();   
    if(searchQuery.length > 0){
        addGamesToPage(GAMES_JSON.filter(game => {
            console.log(game.name);
            return game.name.toLowerCase().includes(searchQuery);
            })
        );
    }
    else{
        unfundedButtonClickHandler();
    }
})