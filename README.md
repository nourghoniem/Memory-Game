# Memory-Game
What is the memory game ? 

The memory game is a basic matching game to test the player's memory. In a deck of paired cards, the player needs to match each pair to win the game at specific time.



Requirements for the game
-----------------------------

A checklist of things I needed to do. I like the idea cause it just clears out your thinking:

. Cards are to be shuffled on load or restart
. Game should know how to handle matched and unmatched cards
. Game should display the current number of score a user has made
. When a player starts a game, a displayed timer should also start and once the player wins the game, the timer stops.
. Score List shows the high score of all players and the player can know his score to compete other players.
. LocalStorage save all information about all player whos play the game "ID , Name And Score".  
. If he lose automatically the game allow the player reset the game board, the timer, and the score rating.
. A congratulations modal should appear when the player wins while automatically return the player to Start menu and modal should show: How much time it took, and Score    rating.

Process / Flow
-----------------------------------------------

Creating the structure of Gameboard.

The structure of the gameboard was already provided in the repo, and it can be achieved with HTML and CSS. Create something like a grid. The parent div will be the deck containing all cards. The cards can be created as an unordered list and styled to look like the image below using flexbox.

Handling how a click on a card would display the card icon
It looks like the icons are behind the card and it flips to show the icon when it's clicked. If you examine the styles for each card you'll get a better understanding of what exactly is happening. When closed, card background color is black and the font size is zero and when opened background color changes to blue and font size increase*…not so mysterious right? Great!

We have a deck of cards what next? We need to ensure that on each click of a card the card displays it's icon. To achieve this, event listeners come in handy! Unfortunately, adding event listeners individually to each card would be stressful and doesn't promote code reuse. for loops will be best to use case here. To achieve this, a list of our cards is needed -- we can use an array.

In the code block above, the cards' array[1] was created and the for loop helps to loop through each card till the full length of cards array is covered. Each loop will add an event listener which listens for a click on the card and runs the displayCard function on click.

The displayCard function here toggles 'open', 'show' and 'disabled' classes. This lets the card icon show and disables the card when it's opened. Hence, when a card is shown it can't be clicked on again till it is closed.

Now we've sorted clicking to see the cards; we can start working on the game requirements better.

1. Shuffing Cards
------------------------------------------------------------------

Cards are to be shuffled on load or restart

There's really no game if cards can't shuffle. In this project, a function to shuffle an array was already provided from here. This is known as Fisher-Yates (aka Knuth) Shuffle. With this function, we should be able to shuffle our cards on the game board:

From the function above, our cards array will be the parameter. Like so: shuffle(cards);

Although that is sufficient to shuffle our cards, it will not change the position of cards on the game board. Hence, we need to loop through the generated shuffle array and display each card deck with.

In the code above is the startGame function and it will shuffle cards and display each card in the deck on game board. Since we know the startGame function shuffles the card in order to shuffle the cards on load, we add this to our JS:

Simply saying once this window (page) is loaded, run the startGame function.


2. Matching Cards
---------------------------------------------------------

Handling matched and unmatched cards

For this part, we need to make each card unique. Since icons on each cards are different, I gave each card object a type property that corresponds to the icon of the card to distinguish each card.

The cardOpen function runs on every click of a card just like the displayCard function. The function adds the selected cards to an openedCards array which we can use to know which cards are opened. An if-else statement runs when two cards are selected and checks to see if cards match or don't match. The key to identifying different cards is the type attribute I added to each card. The disable and enable functions enables a player to make only two selections at once by disabling or enabling cards when required.

3. Moves
--------------------------------------------------------------

Game should display the current number of moves a user has made

We can achieve this with a moveCounter function that counts a move on selecting two cards. In the snippet above the moveCounter function is called only when openedCards.length === 2


4. The Timer
---------------------------------------------------------------

When the player starts a game, a displayed timer should also start. Once the player wins the game, the timer stops.

We can create a timer using JS with the code below. This will be sufficient and will be displayed in the score panel just above the game board:


5. LocalStorage and List Of Scores
--------------------------------------------------------

we also store Score of the player in local-Storage then list it in the score list and after he finish, his score sort in the score list depend on his score value in the level he played .. if the player want to continue and update the previous score there is an option to do that , if he want to start again and delete his previous information he can do that easly. all option are available to make you have fun. 
"feel free to do what you want ... it will be your favourite game "
 
6. A Congratulations Modal
------------------------------------------------------------

A congratulations modal should appear when user wins and ask the player if they want to play again, Modal should show: a Congratulation message for the Player

This is the rounding up section of this project. What's the point if you're playing a game and you win but you don't even know when you do. Logically, you'll know you've won when all your cards are matched. To proceed, we need to alert the player when all cards are matched. This alert will be in form of a modal that shows the time spent, the rating and . To get this done, we need to add a modal in our html file, then style the modal with css and hide it. We will us JS to make the modal visible.

The congratulations function checks to see if all cards are matched, if they are matched then it stops the timer. gets number of moves, star rating and time spent. and displays on the congratulation modal.

There are also some functions that close the modal and reset the game on clicking the close icon and play again button provided in the modal.

Conclusion
------------------------------------------

I am so glad we've reached this point. This project helped me to recollect all I've learnt from the numerous basics /fundamentals of Javascript courses I've taken. I enjoyed working on this project and I'd love if you try your hands on it too.

thanks.

Team Members 
------------

1. Nour 
2. Mohamed Adel Saleh
3. Omer 
4. Ahmed Medhat
5. Eman 
