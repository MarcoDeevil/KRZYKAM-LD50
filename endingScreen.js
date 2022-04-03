// Prepare the template to be visible in HTML and copy its children
const endingScreenTemplate = document.getElementById("endingScreen");
const endingScreenTemplateCopy = endingScreenTemplate.content.cloneNode(true);
// Get the quote div

export function showEndingScreen (score) {
    console.log(endingScreenTemplate)
    document.body.appendChild(endingScreenTemplateCopy);
    const quoteDiv = document.querySelector(".endingQuote")
    console.log(quoteDiv)
    if(score>= 200){
        console.log("jestem z ciebie dumny, walczyles jak lef")
        quoteDiv.style = `background:url("https://i.postimg.cc/WpwtR88r/Image-Name-Here-1.png");
        background-size: contain;
      background-repeat: no-repeat;
      color:#000`

    }else if(score <200){
        console.log("Nie starałes sie wystarczajaco")

    }
}