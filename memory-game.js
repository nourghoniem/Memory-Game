//get the cards (divs containing the front and back images)
const cards = document.querySelectorAll(".memory-card");
function flipCard(){
  console.log(this);
    
}
cards.forEach(card => card.addEventListener("click", flipCard));

