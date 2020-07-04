/* GAME RULES: 
 
    he game has 2 players, playing in rounds. 
    In each turn, a player rolls a dice as many times as he whishes. Each result get added to his Total score. 
    But, if the player rolls 1 on both the dices, all his Current Round's score gets lost. After that, it's the next player's turn. 
    But the player can pravent that by choosing to 'HOLD', which means that his Current Round's score gets added to his Total score. After that, it's the next player's turn. 
    The first player to reach Winning Score(Default:100 OR the Score you set in the WIN SCORE box) as Total score & pressing 'HOLD' button wins the game ! 
  
  */
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

var scores,roundScore,activePlayer,gameplaying;
function init()
{
    scores=[0,0];
roundScore=0;
activePlayer=0;

document.getElementById('dice-1').style.display='none';
document.getElementById('dice-2').style.display='none';

document.getElementById('score-0').textContent='0';
document.getElementById('score-1').textContent='0';
document.getElementById('current-0').textContent='0';
document.getElementById('current-1').textContent='0';

document.getElementById('name-0').textContent='Player 1';
document.getElementById('name-1').textContent='Player 2';

document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.add('active');
document.querySelector('.player-1-panel').classList.remove('active');
gameplaying=true;



}

init();

//FUnction to switch to next player 
function nextPlayer( ) {
    activePlayer===0?activePlayer=1:activePlayer=0;
          
    roundScore=0;
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';
    
}

 
var  winningScore ;
document.querySelector('.btn-roll').addEventListener('click',function ()  {
    if(gameplaying){
             
    //Generating Random Number
    var dice1=Math.floor (Math.random()*6)+1;
    var dice2=Math.floor (Math.random()*6)+1;
   
    //Display the result
    document.getElementById('dice-1').style.display='block';
    document.getElementById('dice-2').style.display='block';
    //Selecting which dice image to show
    document.getElementById('dice-1').src='dice-'+dice1+'.png';
    document.getElementById('dice-2').src='dice-'+dice2+'.png';
 

   //Terminating game if both dices are 1
    if(dice1!==1 && dice2!==1){
        roundScore+=dice1+dice2;
        document.querySelector('#current-'+ activePlayer).textContent=roundScore;
    

    }else
    {
        //NextPlayer
        nextPlayer();
      }
 
 } 


    
});



document.querySelector('.btn-hold').addEventListener('click',function()
{
    //Checking if the current player is still playing 
    if(gameplaying)
    
    {
    //Updating to Total score
    scores[activePlayer]=scores[activePlayer]+roundScore;
    //update UI
    document.querySelector('#score-'+activePlayer).textContent=scores[activePlayer];
    
    //To change the final score (default 100) to what user inputs
    var input= document.querySelector('.final-score').value;
    if(input)
     {
           winningScore = input;
     }
     else{
         winningScore=100;
     }

     //Checking if Player has won after Clicking HOLD button
   if (scores[activePlayer]>=winningScore){
       document.querySelector('#name-'+activePlayer).textContent='Winner';
       document.getElementById('dice-1').style.display='none';
       document.getElementById('dice-2').style.display='none';
       document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
       document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
       gameplaying=false;
   }else{
    nextPlayer();
   }

    }
  

  
 
      
});

//Restarting NewGame whwn NEW GAME button is pressed
document.querySelector('.btn-new').addEventListener('click',init);

