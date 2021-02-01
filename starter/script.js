'use strict';

// selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  //generating a radnom dice roll
  if (playing == true) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');
    //check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

//adding currnet value to player score
btnHold.addEventListener('click', function () {
  if (playing == true) {
    if (currentScore != 0) {
      scores[`${activePlayer}`] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent =
        scores[`${activePlayer}`];

      console.log(scores[activePlayer]);
      if (scores[activePlayer] >= 100) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add('player--winner');
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove('player--active');
        playing = false;
        diceEl.classList.add('hidden');
      }

      activePlayer = activePlayer === 0 ? 1 : 0;
      currentScore = 0;
      diceEl.classList.add('hidden');
    } else {
      activePlayer = activePlayer === 0 ? 1 : 0;
      diceEl.classList.add('hidden');
    }
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});

btnNew.addEventListener('click', function () {
  for (let x = 0; x < 2; x++) {
    document.querySelector(`.player--${x}`).classList.remove('player--winner');
    document.querySelector(`.player--${x}`).classList.add('player--active');
  }
  document.querySelector('.player--1').classList.remove('player--active');
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  activePlayer = 0;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
});
