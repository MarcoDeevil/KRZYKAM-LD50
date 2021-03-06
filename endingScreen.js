// Prepare the template to be visible in HTML and copy its children
const endingScreenTemplate = document.getElementById("endingScreen");
const endingScreenTemplateCopy = endingScreenTemplate.content.cloneNode(true);
// Get the quote div

export function showEndingScreen(score) {
    document.body.appendChild(endingScreenTemplateCopy);
    const quoteDiv = document.querySelector(".endingQuote")
    const templateBackground = document.querySelector(".endingScreenBackground")
    const quoteText = document.querySelector(".quoteText");
    if (score >= 30) {
        quoteDiv.style = `background:url("https://i.postimg.cc/WpwtR88r/Image-Name-Here-1.png");
        background-size: contain;
      background-repeat: no-repeat;
      padding-left:0px;`
        templateBackground.style = "background:#ffda79;"
        quoteText.style = "margin-top: 0px;margin-left: 50px; color:#12CBC4"
        quoteText.textContent = "The more you are motivated by love, the more fearless and free your action will be."
    } else if (score < 30) {
        quoteText.textContent = "It's impossible to find hapiness outside, you have to find it in yourself - trust me it's there"
    }
}