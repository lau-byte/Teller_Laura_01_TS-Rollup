export function flipCard(): void {

    //Fremdcode: Die Klasse flip wird getoggled. Wenn sie nicht da ist, wird sie hinzugefügt, wenn sie da ist, wird sie entfernt.
    function flipCard(this: any) {
        //Die Audio-Datei wird abgespielt, sobald eine Karte umgedreht wird.
        flipSound!.play();
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

        //Wenn es keine weiteren Karten zum Umdrehen gibt ist das Spiel gewonnen. Es wird ein Pop-Up angezeigt und die Wahl gegeben ob der Spieler noch eine Runde spielen möchte. Wenn er auf "OK" drückt, lädt die Seite nochmal. Wenn er auf abbrechen klickt, soll ein Textfeld eingeblendet werden (noch in Arbeit).
        if (!document.querySelectorAll('.memory-card:not(.flip)').length) {
        setTimeout(() => {
            PlayAgain();
            }, 1000)
        }
    }
}