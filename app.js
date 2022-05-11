//Fremdcode: Alle memore-card Elemente werden als Karten definiert.
const cards = document.querySelectorAll('.memory-card');

//Die Audio-Datei wird in der Konstanten flipSound gespeichert.
const flipSound = document.getElementById("cardSound");

//s.o.
const matchSound = document.getElementById("matchSound");

//s.o.
const noMatch = document.getElementById("noMatch");

//Fremdcode: Die Variable hasFlippedCard wird standardgemäß auf falsch gesetzt.
let hasFlippedCard = false;

//Fremdcode: Die Variable lockBoard wird auf falsch gesetzt, damit man die Spielkarten grundsätzlich anklicken kann.
let lockBoard = false;

//Fremdcode: Die Variablen firstCard und secondCard werden deklariert.
let firstCard, secondCard;

//Fremdcode: Die Klasse flip wird getoggled. Wenn sie nicht da ist, wird sie hinzugefügt, wenn sie da ist, wird sie entfernt.
function flipCard() {
    //Die Audio-Datei wird abgespielt, sobald eine Karte umgedreht wird.
    flipSound.play();
    //Fremdcode: Wenn lockBoard true ist, wird der Rest der Funktion nicht ausgeführt, da das Board ja gesperrt ist.
    if (lockBoard) return;
    //Fremdcode: Wenn die angeklickte Karte die erste ist die angeklickt wurde, wird der restliche Code der Funktion nicht ausgeführt.
    if (this === firstCard) return;
    this.classList.toggle('flip');

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

     //Wenn es keine weiteren Karten zum Umdrehen gibt ist das Spiel gewonnen und ein entsprechender Alert wird angezeigt.
    if (!document.querySelectorAll('.memory-card:not(.flip)').length) {
    setTimeout(() => {
        alert("You won!");
        }, 1000)
    }
}

function checkForMatch() {
 //Fremdcode: Checken ob Karten identisch sind: Durch dataset kann man data-framework Attribut der HTML abrufen.
    if(firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        //Die Audio-Datei wird nach einer Verzögerung von 500ms abgespielt, wenn zwei umgedrehte Karten identisch sind.
        setTimeout(() => {
            playAudio2();
        }, 500);
    } else {
        unflipCards();
    }
}

function disableCards() {
    //Fremdcode: Wenn Karten (also data-framework Daten) identisch sind, wird der EventListener von beiden entfernt.
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    //Fremdcode: Während die Karten wieder zugedeckt werden wird das Board gesperrt, damit der Spieler währenddessen nicht neue Karten aufdecken kann.
    lockBoard = true;
    
    //Fremdcode: Timeout hinzufügen: Es dauert nach dem Aufdecken beider Karten 1 Sekunde bis die else-Schleife ausgeführt wird.
    setTimeout(() => {
        //Wenn Karten verschieden sind, wird die Audio-Datei ausgeführt und die Klasse flip von ihnen entfernt.
            playAudio3();
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            
            resetBoard();
        }, 1000);
}

function resetBoard() {
    //Fremdcode: Die Variable hasFlippedCard wird auf falsch gesetzt. Das Board wird entsperrt.
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//Fremdcode: IIFE: Die Funktion wird gleich nach ihrer Definition ausgeführt.
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

//Funktion erstellt, durch die die Audio-Datei abgespielt wird.
function playAudio() {
    flipSound.play();
}

//Funktion für die zweite Audio-Datei
function playAudio2() {
    matchSound.play();
}

//Funktion für die dritte Audio-Datei
function playAudio3() {
    noMatch.play();
}

//Fremdcode: Für jede Karte wird ein Event Listener hinzugefügt: Bei einem Klick-Event wird die Funktion flipCard ausgeführt.
cards.forEach(card => card.addEventListener('click', flipCard));