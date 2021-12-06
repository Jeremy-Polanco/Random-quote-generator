const randomQuoteButton = document.querySelector(".random-quote-button");
const quoteContainer = document.querySelector(".quote-container");
const author = document.querySelector(".author");
const authorQuote = document.querySelector(".author-quote");
const authorContainer = document.querySelector(".author-container")
const authorIndustry = document.querySelector(".industry");
let params;

const url = "https://quote-garden.herokuapp.com/api/v3/quotes";

randomQuoteButton.addEventListener("click", randomQuote);
authorQuote.addEventListener("click", allQuotesOfAuthor);

function randomQuote() {

   if(authorContainer.classList.contains("hide")){
        authorContainer.classList.remove("hide")
    }

    fetch(`${url}/random`).then(Response => Response.json() ).then(data => {

        let quoteAuthor = data.data[0].quoteAuthor;
        let quoteText = data.data[0].quoteText;
        let quoteGenre = data.data[0].quoteGenre;

        quoteContainer.innerHTML = `<div class="vertical-line">
                                        <div class="quote-text">
                                        <p>${quoteText}</p>
                                        </div>
                                    </div>`
        author.innerHTML = `<p>${quoteAuthor} </p>`
        authorIndustry.innerHTML = `<p>${quoteGenre}</p>`

        params = new URLSearchParams({
        author: quoteAuthor,
        limit: 10,
      });

    }).catch(err =>console.log(err));

    

};

async function allQuotesOfAuthor() {
    const api = await fetch(`${url}?${params.toString()}`);
    const authorQuote = await api.json();
    let authorQuotes = authorQuote.data;
    console.log(authorQuotes);

    quoteContainer.innerHTML = `  <h1> ${authorQuotes[0].quoteAuthor} </h1>`;

    authorQuotes.forEach((item) => {
        let quoteOfAuthor = item.quoteText;
        let quoteItem = `
            <div class="vertical-line">
                <div class="quote-text">
                    <p>${quoteOfAuthor}</p>
                </div>
            </div>
        `
        quoteContainer.innerHTML += quoteItem;
    });
    
    authorContainer.classList.add("hide")
}

randomQuote();

