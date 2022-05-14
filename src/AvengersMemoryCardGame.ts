//Die zwei ausgelagerten Funktionen werden importiert.
import { playSound } from "./audio";
import { showPlayAgainAlert } from "./notification";

//Alle memory-card Elemente werden als Karten definiert.
const cards = document.querySelectorAll<HTMLElement>(".memory-card");

//Fremdcode: Die Variable hasFlippedCard wird standardgemäß auf falsch gesetzt.
let hasFlippedCard = false;

//Fremdcode: Die Variable lockBoard wird auf falsch gesetzt, damit man die Spielkarten grundsätzlich anklicken kann.
let lockBoard = false;

//Die Variablen firstCard und secondCard werden deklariert.
let firstCard: HTMLElement | null, secondCard: HTMLElement | null;

//Fremdcode: Für jede Karte wird ein Event Listener hinzugefügt: Bei einem Klick-Event wird die Funktion flipCard ausgeführt.
cards.forEach((card) => card.addEventListener("click", startMemoryGame));

//Die Funktion wird in die index.ts exportiert.
export function startMemoryGame(this: any) {
  //Die Audio-Datei wird abgespielt, sobald eine Karte umgedreht wird.
  playSound("#cardSound");
  //Fremdcode: Wenn lockBoard true ist (also das Board gesperrt ist), wird der Rest der Funktion nicht ausgeführt.
  if (lockBoard) return;
  //Wenn die angeklickte Karte die erste ist die angeklickt wurde, wird der restliche Code der Funktion nicht ausgeführt.
  if (this === firstCard || !this) return;
  this.classList.toggle("flip");

  if (!hasFlippedCard) {
    //Fremdcode: Der erste Klick wird durchgeführt. Die Karte, die angeklickt wird ist damit die firstCard.
    hasFlippedCard = true;
    firstCard = this;

    //Wenn die if-Kondition so eintritt stoppt die Schleife durch das return-Statement und der Code von Zeile 23-26 wird übersprungen. Wenn nicht, wird der Code ausgeführt.
    return;
  }

  //Fremdcode: Der zweite Klick wird durchgeführt. Die Karte, die angeklickt wurde ist die secondCard.
  secondCard = this;

  checkForMatch();

  //Wenn es keine weiteren Karten zum Umdrehen gibt ist das Spiel gewonnen. Es wird ein Pop-Up angezeigt und die Wahl gegeben ob der Spieler noch eine Runde spielen möchte. Wenn er auf "OK" drückt, lädt die Seite nochmal. Wenn er auf abbrechen klickt, soll ein Textfeld eingeblendet werden (noch in Arbeit).
  if (!document.querySelectorAll(".memory-card:not(.flip)").length) {
    setTimeout(() => {
      showPlayAgainAlert();
    }, 1000);
  }
}

function checkForMatch() {
  //Fremdcode: Checken ob Karten identisch sind: Durch dataset kann man data-framework Attribut der HTML abrufen. Eigener Zusatz: Optional Chaining durch den ? Operator. Wenn firstCard bzw. secondCard definiert ist, wird der Code ausgeführt, wenn nicht wird der Vorgang gestoppt und "undefined" zurückgegeben.
  if (firstCard?.dataset.framework === secondCard?.dataset.framework) {
    disableCards();
    //Die Audio-Datei wird nach einer Verzögerung von 500ms abgespielt, wenn zwei umgedrehte Karten identisch sind.
    setTimeout(() => {
      playSound("#matchSound");
    }, 500);
  } else {
    unflipCards();
  }
}

function disableCards() {
  //Fremdcode: Wenn Karten (also data-framework Daten) identisch sind, wird der EventListener von beiden entfernt. Zusatz: ? Operator (s.o.)
  firstCard?.removeEventListener("click", startMemoryGame);
  secondCard?.removeEventListener("click", startMemoryGame);

  resetBoard();
}

function unflipCards() {
  //Fremdcode: Während die Karten wieder zugedeckt werden wird das Board gesperrt, damit der Spieler währenddessen nicht neue Karten aufdecken kann.
  lockBoard = true;

  //Fremdcode: Timeout hinzufügen: Es dauert nach dem Aufdecken beider Karten 1 Sekunde bis die else-Schleife ausgeführt wird.
  setTimeout(() => {
    //Wenn Karten verschieden sind, wird die Audio-Datei ausgeführt und die Klasse flip von ihnen entfernt. Optional Chaining wird wieder verwendet.
    playSound("#noMatch");
    firstCard?.classList.remove("flip");
    secondCard?.classList.remove("flip");

    resetBoard();
  }, 1000);
}

//Fremdcode: Die Variable hasFlippedCard wird auf falsch gesetzt. Das Board wird entsperrt. Die beiden umgedrehten Karten werden wieder auf ihre urprünglichen Positionen zurückgesetzt.
function resetBoard() {
  //Fremdcode: Die Variable hasFlippedCard wird auf falsch gesetzt. Das Board wird entsperrt.
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//Fremdcode: IIFE: Die Funktion wird gleich nach ihrer Definition ausgeführt. Math random wurde nachher von 12 auf 18 geändert, da 18 Spielkarten vorhanden sind.
(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 18);
    card.style.order = randomPos.toString();
  });
})();